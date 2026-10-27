// store.js - 위드케어(WithCare) 인메모리 & 로컬스토리지 연동 상태 관리자

const STORAGE_KEY = 'withcare_reservations_v2';
const ROLE_KEY = 'withcare_current_role_v2';

class WithCareStoreManager {
  constructor() {
    this.listeners = new Set();
    this.managers = DEFAULT_MANAGERS;
    this.hospitals = RECOMMENDED_HOSPITALS;
    this.symptomPresets = SYMPTOM_ANALYSIS_PRESETS;
    this.b2bPoints = B2B_MODEL_POINTS;
    this.testimonials = GUARDIAN_TESTIMONIALS;

    this.role = this.loadInitialRole();
    this.reservations = this.loadInitialReservations();

    // 멀티 탭 실시간 동기화 지원
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        this.reservations = this.loadInitialReservations();
        this.notify();
      }
      if (e.key === ROLE_KEY) {
        this.role = this.loadInitialRole();
        this.notify();
      }
    });
  }

  loadInitialRole() {
    try {
      const saved = localStorage.getItem(ROLE_KEY);
      return saved ? saved : 'GUARDIAN'; // 'GUARDIAN' 또는 'MANAGER'
    } catch (e) {
      return 'GUARDIAN';
    }
  }

  loadInitialReservations() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    // 기본 더미 데이터 저장 및 반환
    const initial = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    this.persist(initial);
    return initial;
  }

  persist(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  setRole(role) {
    this.role = role;
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch (e) {}
    this.notify();
  }

  getRole() {
    return this.role;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener({
          role: this.role,
          reservations: this.reservations
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  getReservations() {
    return [...this.reservations];
  }

  getReservationById(id) {
    return this.reservations.find(r => r.id === id) || null;
  }

  getManagerById(managerId) {
    return this.managers.find(m => m.id === managerId) || this.managers[0];
  }

  // 1. 신규 예약 신청 (보호자 모드)
  createReservation(bookingData) {
    const newId = `RES-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newReservation = {
      id: newId,
      patientName: bookingData.patientName || '홍길동',
      patientAge: Number(bookingData.patientAge) || 75,
      patientGender: bookingData.patientGender || '여성',
      patientPhone: bookingData.patientPhone || '010-0000-0000',
      guardianName: bookingData.guardianName || '신청 보호자',
      guardianPhone: bookingData.guardianPhone || '010-1234-5678',
      mobility: bookingData.mobility || 'INDEPENDENT',
      mobilityLabel: this.getMobilityLabel(bookingData.mobility),
      hospital: bookingData.hospital || '신촌 세브란스병원',
      department: bookingData.department || '일반내과',
      doctor: bookingData.doctor || '전문의 상담',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      time: bookingData.time || '10:00',
      pickupAddress: bookingData.pickupAddress || '서울시 마포구 공덕동 100',
      options: bookingData.options || { pharmacy: true, paymentAssist: true, wheelchairRental: false },
      serviceDuration: bookingData.serviceDuration || '2시간 기본',
      notes: bookingData.notes || '안전하고 편안한 이동 부탁드립니다.',
      cost: bookingData.cost || 55000,
      status: 'REQUESTED', // 초기 상태: 예약 대기중
      step: 1, // 1단계: 예약완료
      managerId: null,
      report: null,
      review: null,
      createdAt: nowStr
    };

    this.reservations.unshift(newReservation);
    this.persist(this.reservations);
    this.notify();
    return newReservation;
  }

  getMobilityLabel(mobilityKey) {
    switch (mobilityKey) {
      case 'INDEPENDENT': return '혼자 보행 가능';
      case 'ASSISTED': return '거동 불편 · 부축 필요';
      case 'WHEELCHAIR': return '휠체어 이용 필수';
      default: return '혼자 보행 가능';
    }
  }

  // 2. 예약 수락 (동행 매니저 모드)
  acceptReservation(id, managerId = 'mgr-1') {
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          managerId: managerId,
          status: 'MATCHED',
          step: 2 // 2단계: 매니저 배정 완료
        };
      }
      return r;
    });
    this.persist(this.reservations);
    this.notify();
  }

  // 3. 상태 단계 업데이트 (시뮬레이션 및 매니저 진행)
  updateStep(id, newStep) {
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        let newStatus = r.status;
        if (newStep === 1) newStatus = 'REQUESTED';
        else if (newStep === 2) newStatus = 'MATCHED';
        else if (newStep === 3 || newStep === 4) newStatus = 'IN_PROGRESS';
        else if (newStep >= 5) newStatus = 'COMPLETED';

        // 매니저 미배정 상태에서 단계 진행 시 기본 매니저 자동 배정
        let mgr = r.managerId;
        if (newStep >= 2 && !mgr) {
          mgr = 'mgr-1';
        }

        // 5단계 완료 시 기본 리포트가 없으면 샘플 리포트 생성
        let report = r.report;
        if (newStep >= 5 && !report) {
          report = {
            completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            medicalSummary: `${r.department} 전문의 진료 완료. 진료 소견 및 처방전 전달 완료되었습니다.`,
            nextAppointment: '진료실 권고에 따라 3주 후 재방문 예정',
            prescriptions: '처방 의약품(14일분) 원내 약국 수령 및 식후 30분 복약 설명 완료',
            patientCondition: '특이 불편감 없이 평온한 상태로 자택 안심 귀가 완료하셨습니다.',
            managerMessage: '정성껏 부축해 드리며 안전하게 다녀왔습니다. 푹 쉬시기 바랍니다!',
            timeline: [
              { time: '09:30', title: '자택 픽업 완료', desc: '자택 앞에서 어르신 만나 건강 상태 확인 후 이동' },
              { time: '10:00', title: '병원 도착 및 외래 접수', desc: `${r.hospital} 도착 후 키오스크 및 창구 접수 완료` },
              { time: '10:30', title: '진료실 동행 및 의사 상담', desc: '담당 전문의 진료실 동행하여 상담 내용 상세 청취' },
              { time: '11:15', title: '수납 및 약국 조제 수령', desc: '원내 수납 및 처방약 수령 후 복약 방법 확인' },
              { time: '11:50', title: '자택 안전 귀가', desc: '자택 거실까지 부축 후 가족에게 도착 알림 전달' }
            ],
            photos: [
              { label: '처방전 확인', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
              { label: '진료비 영수증', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400' },
              { label: '안심 귀가 완료', url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400' }
            ]
          };
        }

        return {
          ...r,
          step: newStep,
          status: newStatus,
          managerId: mgr,
          report: report
        };
      }
      return r;
    });
    this.persist(this.reservations);
    this.notify();
  }

  // 4. 안심 리포트 작성/저장 (동행 매니저 모드)
  saveReport(id, reportData) {
    const completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'COMPLETED',
          step: 5,
          report: {
            completedAt: completedAt,
            medicalSummary: reportData.medicalSummary || '진료 완료',
            nextAppointment: reportData.nextAppointment || '차후 안내',
            prescriptions: reportData.prescriptions || '처방약 수령 완료',
            patientCondition: reportData.patientCondition || '안정적인 상태로 귀가 완료',
            managerMessage: reportData.managerMessage || '정성을 다해 모셨습니다.',
            timeline: reportData.timeline || [
              { time: '09:30', title: '자택 픽업 완료', desc: '자택 앞 건강 상태 확인' },
              { time: '10:10', title: '병원 도착 및 접수', desc: `${r.hospital} 접수 완료` },
              { time: '10:45', title: '진료실 동행', desc: '담당의 진료 및 상담 소견 청취' },
              { time: '11:20', title: '수납 및 약국 수령', desc: '처방전 전달 및 복약 지도' },
              { time: '12:00', title: '자택 안전 귀가', desc: '보호자 전달 및 귀가 완료' }
            ],
            photos: reportData.photos || [
              { label: '처방전 확인', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
              { label: '진료비 영수증', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400' },
              { label: '안심 귀가 완료', url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400' }
            ]
          }
        };
      }
      return r;
    });
    this.persist(this.reservations);
    this.notify();
  }

  // 5. 별점 및 한줄평 리뷰 등록 (보호자 모드)
  addReview(id, reviewData) {
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          review: {
            rating: reviewData.rating || 5,
            tags: reviewData.tags || ['친절하고 따뜻해요'],
            comment: reviewData.comment || '덕분에 정말 안심하고 일할 수 있었습니다. 감사합니다!',
            createdAt: createdAt
          }
        };
      }
      return r;
    });
    this.persist(this.reservations);
    this.notify();
  }

  // 데모 초기화
  resetToInitial() {
    const fresh = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    this.reservations = fresh;
    this.persist(fresh);
    this.notify();
  }
}

// 글로벌 싱글톤 인스턴스 생성
window.withCareStore = new WithCareStoreManager();
