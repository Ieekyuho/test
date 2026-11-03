// store.js - 위드케어(WithCare) 인메모리 & 로컬스토리지 연동 상태 관리자 v2.0

const STORAGE_KEY = 'withcare_reservations_v3';
const ROLE_KEY = 'withcare_current_role_v3';
const USER_KEY = 'withcare_current_user_v3';
const CHATS_KEY = 'withcare_chats_v3';
const MANAGERS_KEY = 'withcare_managers_v3';

class WithCareStoreManager {
  constructor() {
    this.listeners = new Set();

    this.managers = this.loadInitialManagers();
    this.hospitals = RECOMMENDED_HOSPITALS;
    this.symptomPresets = SYMPTOM_ANALYSIS_PRESETS;
    this.b2bPoints = B2B_MODEL_POINTS;
    this.testimonials = GUARDIAN_TESTIMONIALS;
    this.transportOptions = TRANSPORT_OPTIONS;

    this.role = this.loadInitialRole();
    this.currentUser = this.loadInitialUser();
    this.reservations = this.loadInitialReservations();
    this.chats = this.loadInitialChats();

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
      if (e.key === USER_KEY) {
        this.currentUser = this.loadInitialUser();
        this.notify();
      }
      if (e.key === CHATS_KEY) {
        this.chats = this.loadInitialChats();
        this.notify();
      }
      if (e.key === MANAGERS_KEY) {
        this.managers = this.loadInitialManagers();
        this.notify();
      }
    });
  }

  // ========================================================
  // 초기 로더 및 영속화 유틸
  // ========================================================
  loadInitialManagers() {
    try {
      const saved = localStorage.getItem(MANAGERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const initial = JSON.parse(JSON.stringify(DEFAULT_MANAGERS));
    this.persist(MANAGERS_KEY, initial);
    return initial;
  }

  loadInitialRole() {
    try {
      const saved = localStorage.getItem(ROLE_KEY);
      return saved ? saved : 'GUARDIAN'; // 'GUARDIAN' 또는 'MANAGER'
    } catch (e) {
      return 'GUARDIAN';
    }
  }

  loadInitialUser() {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // 기본 로그인 상태: 김민수 보호자
    const defaultUser = {
      isLoggedIn: true,
      role: 'GUARDIAN',
      type: 'MEMBER', // 'MEMBER' | 'NON_MEMBER'
      name: '김민수',
      birth: '1982-08-25',
      phone: '010-9876-5432'
    };
    this.persist(USER_KEY, defaultUser);
    return defaultUser;
  }

  loadInitialReservations() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const initial = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    this.persist(STORAGE_KEY, initial);
    return initial;
  }

  loadInitialChats() {
    try {
      const saved = localStorage.getItem(CHATS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    const initial = JSON.parse(JSON.stringify(DEFAULT_CHAT_HISTORY));
    this.persist(CHATS_KEY, initial);
    return initial;
  }

  persist(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', key, e);
    }
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
          currentUser: this.currentUser,
          reservations: this.reservations,
          managers: this.managers,
          chats: this.chats
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  // ========================================================
  // 1. 회원 / 비회원 로그인 및 권한 마이페이지 분기
  // ========================================================
  login({ role, type, name, birth, phone, password, managerId }) {
    let userObj;
    if (role === 'MANAGER') {
      const mgr = this.managers.find(m => m.id === (managerId || 'mgr-1')) || this.managers[0];
      userObj = {
        isLoggedIn: true,
        role: 'MANAGER',
        type: 'MEMBER',
        managerId: mgr.id,
        name: `${mgr.name} 매니저`,
        badge: mgr.badge,
        avatar: mgr.avatar,
        phone: mgr.phone
      };
      this.role = 'MANAGER';
    } else {
      // 환자/보호자 로그인 (회원 or 비회원)
      userObj = {
        isLoggedIn: true,
        role: 'GUARDIAN',
        type: type || 'MEMBER',
        name: name || (type === 'NON_MEMBER' ? '비회원 신청자' : '김민수'),
        birth: birth || '1982-08-25',
        phone: phone || '010-9876-5432'
      };
      this.role = 'GUARDIAN';
    }

    this.currentUser = userObj;
    this.persist(USER_KEY, this.currentUser);
    this.persist(ROLE_KEY, this.role);
    this.notify();
    return userObj;
  }

  logout() {
    this.currentUser = {
      isLoggedIn: false,
      role: 'GUARDIAN',
      type: 'GUEST',
      name: '게스트',
      birth: '',
      phone: ''
    };
    this.role = 'GUARDIAN';
    this.persist(USER_KEY, this.currentUser);
    this.persist(ROLE_KEY, this.role);
    this.notify();
  }

  setRole(newRole) {
    this.role = newRole;
    if (newRole === 'MANAGER' && this.currentUser.role !== 'MANAGER') {
      // 매니저 모드로 전환 시 기본 매니저 계정으로 자동 세팅
      this.login({ role: 'MANAGER', managerId: 'mgr-1' });
      return;
    } else if (newRole === 'GUARDIAN' && this.currentUser.role !== 'GUARDIAN') {
      this.login({ role: 'GUARDIAN', type: 'MEMBER', name: '김민수' });
      return;
    }
    this.persist(ROLE_KEY, newRole);
    this.notify();
  }

  getRole() {
    return this.role;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getManagers() {
    return this.managers;
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

  // ========================================================
  // 2. 예약 신청 (상세 환자 정보 & 개별 의견란 & 이동수단)
  // ========================================================
  createReservation(bookingData) {
    const newId = `RES-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newReservation = {
      id: newId,
      patientName: bookingData.patientName || '김순자',
      patientBirth: bookingData.patientBirth || '1950-01-01',
      patientAge: Number(bookingData.patientAge) || 75,
      patientGender: bookingData.patientGender || '여성',
      patientPhone: bookingData.patientPhone || '010-0000-0000',
      patientRegion: bookingData.patientRegion || '서울 마포구',
      guardianName: bookingData.guardianName || this.currentUser.name || '신청 보호자',
      guardianBirth: bookingData.guardianBirth || this.currentUser.birth || '1982-01-01',
      guardianPhone: bookingData.guardianPhone || this.currentUser.phone || '010-1234-5678',
      guardianPassword: bookingData.guardianPassword || 'demo',
      mobility: bookingData.mobility || 'INDEPENDENT',
      mobilityLabel: this.getMobilityLabel(bookingData.mobility),
      useWheelchair: Boolean(bookingData.useWheelchair),
      currentMedications: bookingData.currentMedications || '특이 복용약 없음',
      symptomsDescription: bookingData.symptomsDescription || '특이 증상 없음',
      messageToDoctor: bookingData.messageToDoctor || '진료 소견 메모 부탁드립니다.',
      messageToManager: bookingData.messageToManager || '안전하고 편안한 이동 부탁드립니다.',
      transportOption: bookingData.transportOption || 'TAXI_TRANSIT',
      transportLabel: this.getTransportLabel(bookingData.transportOption),
      agreePrivacy: Boolean(bookingData.agreePrivacy),
      hospital: bookingData.hospital || '신촌 세브란스병원',
      department: bookingData.department || '일반외래',
      doctor: bookingData.doctor || '전문의 상담',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      time: bookingData.time || '10:00',
      pickupAddress: bookingData.pickupAddress || '서울시 마포구 공덕동 100',
      options: bookingData.options || { pharmacy: true, paymentAssist: true, wheelchairRental: false },
      serviceDuration: bookingData.serviceDuration || '2시간 기본',
      cost: bookingData.cost || 55000,
      status: 'REQUESTED', // 초기 상태: 예약 대기중
      step: 1, // 1단계: 예약완료
      managerId: bookingData.managerId || null,
      report: null,
      review: null,
      createdAt: nowStr
    };

    // 만약 특정 매니저를 지정해 예약한 경우 바로 매칭
    if (bookingData.managerId) {
      newReservation.status = 'MATCHED';
      newReservation.step = 2;
    }

    this.reservations.unshift(newReservation);
    this.persist(STORAGE_KEY, this.reservations);

    // 채팅방 초기 환영 메시지 생성
    if (!this.chats[newId]) {
      this.chats[newId] = [
        {
          id: `c-${Date.now()}`,
          sender: 'SYSTEM',
          senderName: '위드케어 안심 알림봇',
          avatar: null,
          time: nowStr.split(' ')[1] || '10:00',
          text: `[예약 접수 완료] ${newReservation.patientName} 님의 동행 예약(${newReservation.hospital})이 성공적으로 접수되었습니다. 배정된 매니저와 1:1 실시간 소통이 가능합니다.`
        }
      ];
      this.persist(CHATS_KEY, this.chats);
    }

    this.notify();
    return newReservation;
  }

  getMobilityLabel(key) {
    switch (key) {
      case 'INDEPENDENT': return '혼자 보행 가능';
      case 'ASSISTED': return '거동 불편 · 부축 필요';
      case 'WHEELCHAIR': return '휠체어 이용 필수';
      default: return '혼자 보행 가능';
    }
  }

  getTransportLabel(key) {
    switch (key) {
      case 'TAXI_TRANSIT': return '택시 / 대중교통 (환자 부담)';
      case 'PERSONAL_CAR': return '매니저 자차 동행 (+15,000원)';
      case 'WALK': return '도보 동행 (인근 병원)';
      default: return '택시 / 대중교통 동행';
    }
  }

  // ========================================================
  // 3. 매니저 예약 수락
  // ========================================================
  acceptReservation(id, managerId = 'mgr-1') {
    const mgr = this.getManagerById(managerId);
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          managerId: mgr.id,
          status: 'MATCHED',
          step: 2 // 2단계: 매니저 배정 완료
        };
      }
      return r;
    });
    this.persist(STORAGE_KEY, this.reservations);

    // 채팅방에 매니저 수락 인사 메시지 추가
    this.sendChatMessage(
      id,
      `안녕하세요, 보호자님! 오늘 동행을 담당하게 된 ${mgr.name} 매니저(${mgr.badge})입니다. 어르신 안전하게 모시겠습니다. 요청사항 있으시면 언제든 말씀해 주세요!`,
      'MANAGER',
      `${mgr.name} 매니저`
    );

    this.notify();
  }

  // ========================================================
  // 4. 배민 스타일 위치 트래킹 단계 업데이트 (시뮬레이션)
  // ========================================================
  updateStep(id, newStep) {
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        let newStatus = r.status;
        if (newStep === 1) newStatus = 'REQUESTED';
        else if (newStep === 2) newStatus = 'MATCHED';
        else if (newStep === 3 || newStep === 4) newStatus = 'IN_PROGRESS';
        else if (newStep >= 5) newStatus = 'COMPLETED';

        let mgr = r.managerId || 'mgr-1';

        let report = r.report;
        if (newStep >= 5 && !report) {
          report = {
            completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            medicalSummary: `${r.department} 전문의 진료 완료. 진료 소견 및 처방전 전달 완료되었습니다.`,
            nextAppointment: '진료실 권고에 따라 3주 후 재방문 예정',
            prescriptions: '처방 의약품(14일분) 원내 약국 수령 및 식후 30분 복약 설명 완료',
            patientCondition: '특이 불편감 없이 평온한 상태로 자택 안심 귀가 완료하셨습니다.',
            managerMessage: '정성껏 부축해 드리며 안전하게 다녀왔습니다. 푹 쉬시기 바랍니다!',
            aiVoiceSummary: SAMPLE_AI_VOICE_SUMMARY,
            premiumReportUnlocked: false,
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
    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // ========================================================
  // 5. 카카오톡 스타일 1:1 채팅 메시지 전송
  // ========================================================
  sendChatMessage(reservationId, text, senderRole, senderName) {
    if (!text || !text.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const reservation = this.getReservationById(reservationId);
    let avatar = null;
    if (senderRole === 'MANAGER' && reservation && reservation.managerId) {
      const mgr = this.getManagerById(reservation.managerId);
      avatar = mgr.avatar;
    }

    const newMessage = {
      id: `chat-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sender: senderRole, // 'GUARDIAN' | 'MANAGER' | 'SYSTEM'
      senderName: senderName || (senderRole === 'GUARDIAN' ? '보호자' : '동행 매니저'),
      avatar: avatar,
      time: timeStr,
      text: text.trim()
    };

    if (!this.chats[reservationId]) {
      this.chats[reservationId] = [];
    }
    this.chats[reservationId].push(newMessage);
    this.persist(CHATS_KEY, this.chats);
    this.notify();
    return newMessage;
  }

  getChatHistory(reservationId) {
    return this.chats[reservationId] || [];
  }

  // ========================================================
  // 6. 안심 리포트 작성/수정 (보호자 안내용 진료 결과 & AI 음성요약)
  // ========================================================
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
            aiVoiceSummary: reportData.aiVoiceSummary || SAMPLE_AI_VOICE_SUMMARY,
            premiumReportUnlocked: Boolean(reportData.premiumReportUnlocked),
            timeline: reportData.timeline || (r.report && r.report.timeline) || [
              { time: '09:30', title: '자택 픽업 완료', desc: '자택 앞 건강 상태 확인' },
              { time: '10:10', title: '병원 도착 및 접수', desc: `${r.hospital} 접수 완료` },
              { time: '10:45', title: '진료실 동행', desc: '담당의 진료 및 상담 소견 청취' },
              { time: '11:20', title: '수납 및 약국 수령', desc: '처방전 전달 및 복약 지도' },
              { time: '12:00', title: '자택 안전 귀가', desc: '보호자 전달 및 귀가 완료' }
            ],
            photos: reportData.photos || (r.report && r.report.photos) || [
              { label: '처방전 확인', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
              { label: '진료비 영수증', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400' },
              { label: '안심 귀가 완료', url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400' }
            ]
          }
        };
      }
      return r;
    });
    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // 프리미엄 리포트 잠금 해제 토글 (BM 시뮬레이션)
  togglePremiumUnlock(id) {
    this.reservations = this.reservations.map(r => {
      if (r.id === id && r.report) {
        return {
          ...r,
          report: {
            ...r.report,
            premiumReportUnlocked: !r.report.premiumReportUnlocked
          }
        };
      }
      return r;
    });
    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // ========================================================
  // 7. 만족도 평가 등록 및 매니저 평점 실시간 연동
  // ========================================================
  addReview(reservationId, reviewData) {
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let targetManagerId = null;

    this.reservations = this.reservations.map(r => {
      if (r.id === reservationId) {
        targetManagerId = r.managerId || 'mgr-1';
        return {
          ...r,
          review: {
            rating: Number(reviewData.rating) || 5,
            tags: reviewData.tags || ['친절하고 따뜻해요'],
            comment: reviewData.comment || '덕분에 정말 안심하고 일할 수 있었습니다. 감사합니다!',
            createdAt: createdAt
          }
        };
      }
      return r;
    });

    // 매니저 평점/리뷰수 실시간 재계산 및 반영!
    if (targetManagerId) {
      this.managers = this.managers.map(m => {
        if (m.id === targetManagerId) {
          const newCount = m.reviewCount + 1;
          const currentTotal = m.rating * m.reviewCount;
          const updatedRating = Math.min(5.0, Number(((currentTotal + (reviewData.rating || 5)) / newCount).toFixed(2)));
          return {
            ...m,
            rating: updatedRating,
            reviewCount: newCount,
            completedTrips: m.completedTrips + 1
          };
        }
        return m;
      });
      this.persist(MANAGERS_KEY, this.managers);
    }

    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // 데모 초기화
  resetToInitial() {
    const freshReservations = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    const freshManagers = JSON.parse(JSON.stringify(DEFAULT_MANAGERS));
    const freshChats = JSON.parse(JSON.stringify(DEFAULT_CHAT_HISTORY));

    this.reservations = freshReservations;
    this.managers = freshManagers;
    this.chats = freshChats;
    this.role = 'GUARDIAN';
    this.currentUser = {
      isLoggedIn: true,
      role: 'GUARDIAN',
      type: 'MEMBER',
      name: '김민수',
      birth: '1982-08-25',
      phone: '010-9876-5432'
    };

    this.persist(STORAGE_KEY, freshReservations);
    this.persist(MANAGERS_KEY, freshManagers);
    this.persist(CHATS_KEY, freshChats);
    this.persist(ROLE_KEY, this.role);
    this.persist(USER_KEY, this.currentUser);

    this.notify();
  }
}

// 글로벌 싱글톤 인스턴스 생성
window.withCareStore = new WithCareStoreManager();
