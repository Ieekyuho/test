// store.js - 위드케어(WithCare) 인메모리 & 로컬스토리지 연동 상태 관리자 v3.2
// 대전광역시 MVP & 대학생 동행 매니저 전용

const STORAGE_KEY = 'withcare_reservations_v8';
const USER_KEY = 'withcare_current_user_v8';
const PROFILE_KEY = 'withcare_patient_profile_v8';
const CHATS_KEY = 'withcare_chats_v8';
const MANAGERS_KEY = 'withcare_managers_v8';
const URGENT_KEY = 'withcare_urgent_v8';

class WithCareStoreManager {
  constructor() {
    this.listeners = new Set();

    this.managers = this.loadInitialManagers();
    this.hospitals = typeof DEFAULT_HOSPITALS !== 'undefined' ? DEFAULT_HOSPITALS : [];
    this.daejeonLocations = typeof DAEJEON_LOCATIONS !== 'undefined' ? DAEJEON_LOCATIONS : [];
    this.urgentRequests = this.loadInitialUrgentRequests();

    this.patientProfile = this.loadInitialPatientProfile();
    this.currentUser = this.loadInitialUser();
    this.reservations = this.loadInitialReservations();
    this.chats = this.loadInitialChats();

    // 멀티 탭 실시간 동기화 지원
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        this.reservations = this.loadInitialReservations();
        this.notify();
      }
      if (e.key === USER_KEY) {
        this.currentUser = this.loadInitialUser();
        this.notify();
      }
      if (e.key === PROFILE_KEY) {
        this.patientProfile = this.loadInitialPatientProfile();
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
      if (e.key === URGENT_KEY) {
        this.urgentRequests = this.loadInitialUrgentRequests();
        this.notify();
      }
    });
  }

  // ========================================================
  // 초기 데이터 로드 및 영속화
  // ========================================================
  loadInitialManagers() {
    try {
      const saved = localStorage.getItem(MANAGERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const initial = typeof DEFAULT_MANAGERS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_MANAGERS)) : [];
    this.persist(MANAGERS_KEY, initial);
    return initial;
  }

  loadInitialUrgentRequests() {
    try {
      const saved = localStorage.getItem(URGENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    const initial = typeof URGENT_REQUESTS !== 'undefined' ? JSON.parse(JSON.stringify(URGENT_REQUESTS)) : [];
    this.persist(URGENT_KEY, initial);
    return initial;
  }

  loadInitialPatientProfile() {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const initial = typeof DEFAULT_PATIENT_PROFILE !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_PATIENT_PROFILE)) : {};
    this.persist(PROFILE_KEY, initial);
    return initial;
  }

  loadInitialUser() {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // 기본 로그인 상태: 이용자 (김민수 / 환자 보호자)
    const defaultUser = {
      isLoggedIn: true,
      role: 'GUARDIAN', // 'GUARDIAN' (이용자: 환자/보호자) | 'MANAGER' (동행자: 대학생)
      type: 'MEMBER',
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
    const initial = typeof DEFAULT_RESERVATIONS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_RESERVATIONS)) : [];
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
    const initial = typeof DEFAULT_CHAT_HISTORY !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_CHAT_HISTORY)) : {};
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
          currentUser: this.currentUser,
          patientProfile: this.patientProfile,
          reservations: this.reservations,
          managers: this.managers,
          chats: this.chats,
          urgentRequests: this.urgentRequests
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  // ========================================================
  // 1. 이용자(환자/보호자) & 동행자(대학생) 로그인 / 로그아웃
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
        name: mgr.name,
        badge: mgr.badge,
        major: mgr.major,
        university: mgr.university,
        volunteerHours: mgr.volunteerHours || 38,
        phone: '010-4455-8899'
      };
    } else {
      userObj = {
        isLoggedIn: true,
        role: 'GUARDIAN', // 이용자 (환자/보호자 통일)
        type: type || 'MEMBER',
        name: name || (type === 'NON_MEMBER' ? '비회원 이용자' : '김민수'),
        birth: birth || '1982-08-25',
        phone: phone || '010-9876-5432'
      };
    }
    this.currentUser = userObj;
    this.persist(USER_KEY, this.currentUser);
    this.notify();
    return this.currentUser;
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
    this.persist(USER_KEY, this.currentUser);
    this.notify();
  }

  // ========================================================
  // 2. 환자 기본 프로필 수정 (이용자 페이지)
  // ========================================================
  updatePatientProfile(newProfile) {
    this.patientProfile = { ...this.patientProfile, ...newProfile };
    this.persist(PROFILE_KEY, this.patientProfile);
    this.notify();
    return this.patientProfile;
  }

  // ========================================================
  // 3. 동행 예약 신청 생성
  // ========================================================
  createReservation(bookingData) {
    const id = 'RES-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);
    const newReservation = {
      id,
      patientName: bookingData.patientName || this.patientProfile.name,
      patientBirth: bookingData.patientBirth || this.patientProfile.birth,
      hospital: bookingData.hospital,
      department: bookingData.department,
      date: bookingData.date,
      time: bookingData.time,
      mobility: bookingData.mobility || '혼자 걸음',
      pickupAddress: bookingData.pickupAddress || this.patientProfile.address,
      transportType: bookingData.transportType || 'TAXI',
      transportLabel: bookingData.transportLabel || '택시/대중교통 (실비 환자부담)',
      includePharmacy: Boolean(bookingData.includePharmacy),
      messageToDoctor: bookingData.messageToDoctor || '',
      messageToManager: bookingData.messageToManager || '',
      cost: bookingData.cost || 40000,
      step: bookingData.managerId ? 2 : 1, // 매니저 지정 시 2단계(동행자 배정)
      status: bookingData.managerId ? 'MATCHED' : 'REQUESTED',
      managerId: bookingData.managerId || null,
      volunteerHoursEarned: 4,
      createdAt: new Date().toISOString()
    };

    this.reservations = [newReservation, ...this.reservations];
    this.persist(STORAGE_KEY, this.reservations);

    // 기본 첫 인사 메시지 자동 생성
    if (!this.chats[id]) {
      this.chats[id] = [
        {
          id: 'msg-sys-1',
          sender: 'SYSTEM',
          senderName: '위드케어 시스템',
          text: `[${id}] 예약이 접수되었습니다. 담당 대학생 동행자가 배정되면 실시간 소통이 가능합니다.`,
          time: new Date().toTimeString().slice(0, 5)
        }
      ];
      this.persist(CHATS_KEY, this.chats);
    }

    this.notify();
    return newReservation;
  }

  // ========================================================
  // 4. 동행자가 긴급 요청 피드 수락하기 ("지금 당장 동행인 구해요!")
  // ========================================================
  acceptUrgentRequest(urgentId, managerId) {
    const target = this.urgentRequests.find(u => u.id === urgentId);
    if (!target) return null;

    // 긴급 요청 목록에서 상태 변경
    this.urgentRequests = this.urgentRequests.map(u => 
      u.id === urgentId ? { ...u, status: 'ACCEPTED', acceptedBy: managerId } : u
    );
    this.persist(URGENT_KEY, this.urgentRequests);

    // 내 예약 목록에 신규 배정 건으로 즉시 추가
    const newId = 'RES-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);
    const newRes = {
      id: newId,
      patientName: target.patientName,
      patientBirth: '1948-05-10',
      hospital: target.hospital,
      department: target.department,
      date: target.time.includes('내일') ? '2026-11-21' : '2026-11-20',
      time: target.time.includes('14:00') ? '14:00' : '16:30',
      mobility: target.mobility,
      pickupAddress: target.pickupLocation,
      transportType: 'TAXI',
      transportLabel: '택시/대중교통 (실비 환자부담)',
      includePharmacy: true,
      messageToDoctor: '긴급 동행 요청 건입니다.',
      messageToManager: target.note,
      cost: target.hourlyPay * 2,
      step: 2, // 2단계: 동행자 배정 완료
      status: 'MATCHED',
      managerId: managerId || 'mgr-1',
      volunteerHoursEarned: 4,
      createdAt: new Date().toISOString()
    };

    this.reservations = [newRes, ...this.reservations];
    this.persist(STORAGE_KEY, this.reservations);

    // 채팅방 생성
    this.chats[newId] = [
      {
        id: 'msg-1',
        sender: 'MANAGER',
        senderName: '동행자',
        text: '안녕하세요! 긴급 동행 요청 확인하고 즉시 수락하였습니다. 출발 준비 후 바로 연락드리겠습니다.',
        time: new Date().toTimeString().slice(0, 5)
      }
    ];
    this.persist(CHATS_KEY, this.chats);

    this.notify();
    return newRes;
  }

  // ========================================================
  // 5. 일반 예약 수락 및 단계 전진
  // ========================================================
  acceptReservation(id, managerId) {
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'MATCHED',
          managerId: managerId || r.managerId || 'mgr-1',
          step: Math.max(2, r.step)
        };
      }
      return r;
    });
    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

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
            summary: `${r.hospital} ${r.department} 외래 동행 및 수납·약국 조제 수령 완료. 의사 소견 경청 후 복약 지도 완료.`,
            doctorAdvice: '처방된 약 1일 2회 식후 30분 규칙적 복용. 차기 외래 일정 4주 후 예약.',
            pharmacyGuide: '약 복용 시 충분한 미온수와 함께 섭취 안내 완료.',
            aiAudioSummary: `[AI 음성 요약] ${r.patientName} 어르신 ${r.department} 외래 진료 안정적으로 마침.`,
            isLockedDeepReport: false
          };

          // 완료 시 해당 매니저 봉사시간 4시간 추가
          this.managers = this.managers.map(m => {
            if (m.id === mgr) {
              return { ...m, volunteerHours: (m.volunteerHours || 35) + 4 };
            }
            return m;
          });
          this.persist(MANAGERS_KEY, this.managers);
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
  // 6. 안심 리포트 작성 (동행자)
  // ========================================================
  saveReport(id, reportData) {
    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          step: 5,
          status: 'COMPLETED',
          report: {
            ...r.report,
            summary: reportData.summary || r.report?.summary,
            doctorAdvice: reportData.doctorAdvice || r.report?.doctorAdvice,
            pharmacyGuide: reportData.pharmacyGuide || r.report?.pharmacyGuide,
            aiAudioSummary: reportData.aiAudioSummary || r.report?.aiAudioSummary || '[AI 음성 요약] 외래 진료 및 복약 지도 완료.',
            isLockedDeepReport: Boolean(reportData.isLockedDeepReport)
          }
        };
      }
      return r;
    });

    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // ========================================================
  // 7. 별점 및 만족도 리뷰 작성 (이용자)
  // ========================================================
  submitReview(id, rating, reviewText) {
    let targetManagerId = null;

    this.reservations = this.reservations.map(r => {
      if (r.id === id) {
        targetManagerId = r.managerId;
        return {
          ...r,
          ratingGiven: rating,
          reviewText: reviewText
        };
      }
      return r;
    });

    if (targetManagerId) {
      this.managers = this.managers.map(m => {
        if (m.id === targetManagerId) {
          const oldTotal = m.rating * m.reviewCount;
          const newCount = m.reviewCount + 1;
          const newRating = Number(((oldTotal + rating) / newCount).toFixed(2));
          return {
            ...m,
            rating: newRating,
            reviewCount: newCount
          };
        }
        return m;
      });
      this.persist(MANAGERS_KEY, this.managers);
    }

    this.persist(STORAGE_KEY, this.reservations);
    this.notify();
  }

  // ========================================================
  // 8. 1:1 실시간 대화방 메시지 전송
  // ========================================================
  sendMessage(resId, sender, text) {
    if (!text || !text.trim()) return;

    const list = this.chats[resId] || [];
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: sender, // 'GUARDIAN' | 'MANAGER'
      senderName: sender === 'MANAGER' ? (this.currentUser.name + ' 동행자') : (this.currentUser.name + ' 보호자'),
      text: text.trim(),
      time: new Date().toTimeString().slice(0, 5)
    };

    this.chats[resId] = [...list, newMsg];
    this.persist(CHATS_KEY, this.chats);
    this.notify();
  }

  getMessages(resId) {
    return this.chats[resId] || [];
  }

  getManagerById(id) {
    return this.managers.find(m => m.id === id) || this.managers[0];
  }
}

// 전역 인스턴스 초기화
window.withCareStore = new WithCareStoreManager();
