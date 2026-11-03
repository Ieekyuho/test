// app.js - 위드케어(WithCare) 병원 동행서비스 React 메인 애플리케이션 v2.0

const { useState, useEffect, useMemo, useRef } = React;
// icons.js - 위드케어(WithCare) 인라인 고품질 SVG 아이콘 컴포넌트 v2.0

const Icons = {
  Heart: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  ShieldCheck: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Calendar: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  MapPin: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Users: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Hospital: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  ClipboardCheck: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  Sparkles: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Star: (props) => (
    <svg className={props.className || "w-5 h-5"} fill={props.filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={props.filled ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Check: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  ArrowRight: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Car: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-7h14l2 7M5 13h14M5 13v4h14v-4" />
    </svg>
  ),
  Phone: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Pill: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Briefcase: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  TrendingUp: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  RotateCcw: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  X: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Search: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  MessageSquare: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Lock: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Unlock: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  Volume2: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  ),
  Navigation: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Send: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
};

window.Icons = Icons;

window.Icons = Icons;

function App() {
  // 스토어 상태
  const [role, setRole] = useState(window.withCareStore.getRole());
  const [currentUser, setCurrentUser] = useState(window.withCareStore.getCurrentUser());
  const [reservations, setReservations] = useState(window.withCareStore.getReservations());
  const [managers, setManagers] = useState(window.withCareStore.getManagers());

  // 뷰 네비게이션 상태
  // 'home' | 'managers' | 'ai' | 'booking' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  const [dashboardFilter, setDashboardFilter] = useState('ALL');
  
  // 예약 폼 프리필
  const [bookingPrefill, setBookingPrefill] = useState({
    hospital: '',
    department: '',
    managerId: null
  });

  // 모달 제어 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeChatReservationId, setActiveChatReservationId] = useState(null);
  const [activeReportReservationId, setActiveReportReservationId] = useState(null);
  const [activeManagerReportReservationId, setActiveManagerReportReservationId] = useState(null);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);

  // 알림 토스트
  const [toast, setToast] = useState(null);

  // 스토어 구독
  useEffect(() => {
    const unsubscribe = window.withCareStore.subscribe((state) => {
      setRole(state.role);
      setCurrentUser(state.currentUser);
      setReservations([...state.reservations]);
      setManagers([...state.managers]);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleRoleToggle = (newRole) => {
    window.withCareStore.setRole(newRole);
    showToast(
      newRole === 'MANAGER' 
        ? '🩺 동행 매니저 모드로 전환되었습니다. 예약 수락 및 안심 리포트 작성이 가능합니다.' 
        : '👨‍👩‍👧 환자/보호자 모드로 전환되었습니다. 예약 신청 및 실시간 안심 상태 확인이 가능합니다.',
      'info'
    );
  };

  const handleResetData = () => {
    if (window.confirm('모든 예약, 매니저 평점, 채팅 데이터를 시연용 초기 상태로 리셋하시겠습니까?')) {
      window.withCareStore.resetToInitial();
      showToast('데모 데이터가 초기 상태로 재설정되었습니다.', 'success');
    }
  };

  // 매니저 카드에서 '이 매니저에게 동행 신청' 클릭 시
  const handleSelectManagerForBooking = (manager) => {
    setBookingPrefill({
      hospital: '',
      department: '',
      managerId: manager.id
    });
    setActiveTab('booking');
    showToast(`'${manager.name} 매니저'가 배정 매니저로 지정되었습니다. 일정을 입력해주세요.`, 'info');
  };

  // AI 병원 카드에서 '이 병원으로 동행 예약하기' 클릭 시
  const handleSelectHospitalForBooking = (hospitalName, deptName) => {
    setBookingPrefill({
      hospital: hospitalName,
      department: deptName,
      managerId: null
    });
    setActiveTab('booking');
    showToast(`'${hospitalName}' 병원 정보가 예약 폼에 자동 입력되었습니다.`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 토스트 알림 */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-slate-900/95 backdrop-blur text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-bounce text-xs sm:text-sm font-medium">
          <span className="text-emerald-400">
            {toast.type === 'success' ? <Icons.Check className="w-5 h-5" /> : <Icons.Sparkles className="w-5 h-5" />}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 데모 시연 가이드 탑 배너 */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
              대학교 수업 프로젝트 데모 MVP
            </span>
            <span className="hidden sm:inline">
              보호자-매니저 카카오톡 실시간 소통 · 배민 스타일 위치 트래킹 · AI 음성 요약 시연
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button 
              onClick={handleResetData}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
              title="초기 더미 데이터 복원"
            >
              <Icons.RotateCcw className="w-3.5 h-3.5" />
              <span>데이터 리셋</span>
            </button>
            <button 
              onClick={() => setIsB2BModalOpen(true)}
              className="text-xs bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/30 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition"
            >
              <Icons.TrendingUp className="w-3.5 h-3.5" />
              <span>B2B/B2C 수익모델</span>
            </button>
          </div>
        </div>
      </div>

      {/* 글로벌 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* 로고 */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
              <Icons.Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">위드케어</span>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">WithCare</span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-0.5">부모님 안심 병원 동행 매칭</p>
            </div>
          </div>

          {/* 중앙 네비 메뉴 */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'home' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              서비스 소개
            </button>
            <button
              onClick={() => setActiveTab('managers')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'managers' ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <Icons.Users className="w-4 h-4 text-teal-600" />
              <span>매니저 탐색 & AI 추천</span>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">신뢰검증</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'ai' ? 'text-purple-700 bg-purple-50 font-bold' : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
              }`}
            >
              <Icons.Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI 증상 병원 찾기</span>
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'booking' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              간편 동행 예약
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold relative transition ${
                activeTab === 'dashboard' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{role === 'MANAGER' ? '매니저 업무 마이페이지' : '보호자 마이페이지'}</span>
              <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-sky-100 text-sky-700 font-bold">
                {reservations.length}
              </span>
            </button>
          </nav>

          {/* 우측 로그인 분기 & 권한 모드 토글 */}
          <div className="flex items-center gap-2">
            {/* 로그인 계정 상태 배지 & 로그인 모달 트리거 */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl text-xs transition"
              title="로그인 계정 전환 및 비회원 로그인"
            >
              <Icons.User className="w-3.5 h-3.5 text-slate-500" />
              <div className="text-left">
                <span className="font-bold text-slate-800">
                  {currentUser.isLoggedIn ? currentUser.name : '로그인'}
                </span>
                <span className="text-[10px] text-slate-500 block -mt-0.5">
                  {currentUser.type === 'NON_MEMBER' ? '비회원' : currentUser.role === 'MANAGER' ? '전담 매니저' : '회원 보호자'}
                </span>
              </div>
            </button>

            {/* 역할 스위처 */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => handleRoleToggle('GUARDIAN')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  role === 'GUARDIAN'
                    ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>👨‍👩‍👧</span>
                <span className="hidden sm:inline">보호자 모드</span>
                <span className="sm:hidden">보호자</span>
              </button>
              <button
                onClick={() => handleRoleToggle('MANAGER')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  role === 'MANAGER'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🩺</span>
                <span className="hidden sm:inline">동행 매니저</span>
                <span className="sm:hidden">매니저</span>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 하단 내비게이션 */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-white py-2 px-1 text-[11px] font-medium">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'home' ? 'text-sky-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.Hospital className="w-4 h-4" />
            <span>소개</span>
          </button>
          <button 
            onClick={() => setActiveTab('managers')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'managers' ? 'text-teal-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.Users className="w-4 h-4" />
            <span>매니저</span>
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'ai' ? 'text-purple-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.Sparkles className="w-4 h-4" />
            <span>AI 병원</span>
          </button>
          <button 
            onClick={() => setActiveTab('booking')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'booking' ? 'text-sky-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.Calendar className="w-4 h-4" />
            <span>예약신청</span>
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'dashboard' ? 'text-sky-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.ClipboardCheck className="w-4 h-4" />
            <span>마이페이지</span>
          </button>
        </div>
      </header>

      {/* 역할 안내 슬라이드 띠 */}
      {role === 'MANAGER' ? (
        <div className="bg-teal-50 border-b border-teal-200 py-2 px-4 text-xs text-teal-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></span>
              <span className="font-bold text-teal-800">[동행 매니저 전용 모드]</span>
              <span>{currentUser.name} (요양보호사 1급 인증), 예약 수락 및 실시간 위치 전송, 안심 리포트 작성 가능</span>
            </div>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1 rounded-lg transition whitespace-nowrap ml-2"
            >
              매니저 마이페이지 열기
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-sky-50 border-b border-sky-100 py-1.5 px-4 text-xs text-sky-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>👨‍👩‍👧</span>
              <strong>[환자/보호자 모드]</strong>
              <span>
                {currentUser.type === 'NON_MEMBER' ? `(비회원: ${currentUser.name})` : `(회원: ${currentUser.name})`} 부모님 동행 예약, 1:1 카카오톡 소통, 배민 스타일 위치 트래킹 확인
              </span>
            </span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[11px] text-sky-700 underline font-semibold hover:text-sky-900 hidden sm:inline"
            >
              로그인 모드 전환
            </button>
          </div>
        </div>
      )}

      {/* 메인 뷰 렌더링 */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            onGoBooking={() => setActiveTab('booking')}
            onGoManagers={() => setActiveTab('managers')}
            onGoAI={() => setActiveTab('ai')}
            onGoDashboard={() => setActiveTab('dashboard')}
            onSelectHospital={handleSelectHospitalForBooking}
            onOpenB2B={() => setIsB2BModalOpen(true)}
          />
        )}

        {activeTab === 'managers' && (
          <ManagerExploreView 
            managers={managers}
            onSelectManager={handleSelectManagerForBooking}
          />
        )}

        {activeTab === 'ai' && (
          <AIFinderView 
            onSelectHospital={handleSelectHospitalForBooking}
          />
        )}

        {activeTab === 'booking' && (
          <BookingView 
            prefill={bookingPrefill}
            managers={managers}
            currentUser={currentUser}
            onBookingComplete={(newRes) => {
              setActiveTab('dashboard');
              setDashboardFilter('ALL');
              showToast(`'${newRes.patientName}' 님의 동행 예약이 접수되었습니다! 배정 매니저와 1:1 대화방이 개설되었습니다.`, 'success');
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            role={role}
            currentUser={currentUser}
            reservations={reservations}
            filter={dashboardFilter}
            setFilter={setDashboardFilter}
            onOpenReport={(resId) => setActiveReportReservationId(resId)}
            onOpenManagerReport={(resId) => setActiveManagerReportReservationId(resId)}
            onOpenChat={(resId) => setActiveChatReservationId(resId)}
            onGoBooking={() => setActiveTab('booking')}
            showToast={showToast}
          />
        )}
      </main>

      {/* 1. 로그인 및 권한 분기 모달 (회원 / 비회원 / 매니저) */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          showToast={showToast}
          onLoginSuccess={(role) => {
            setIsLoginModalOpen(false);
            setActiveTab('dashboard');
          }}
        />
      )}

      {/* 2. 카카오톡 스타일 1:1 실시간 채팅 모듈 */}
      {activeChatReservationId && (
        <KakaoChatModal 
          reservationId={activeChatReservationId}
          currentRole={role}
          currentUser={currentUser}
          onClose={() => setActiveChatReservationId(null)}
          onToggleRole={handleRoleToggle}
          showToast={showToast}
        />
      )}

      {/* 3. 안심 리포트 열람 & AI 음성요약 & 등급별 잠금 & 만족도 평가 모달 */}
      {activeReportReservationId && (
        <ReportModal 
          reservationId={activeReportReservationId}
          onClose={() => setActiveReportReservationId(null)}
          showToast={showToast}
        />
      )}

      {/* 4. 매니저 전용 진료 결과 입력 모달 */}
      {activeManagerReportReservationId && (
        <ManagerReportEditorModal 
          reservationId={activeManagerReportReservationId}
          onClose={() => setActiveManagerReportReservationId(null)}
          showToast={showToast}
        />
      )}

      {/* 5. B2B / B2C 비즈니스 모델 상세 모달 */}
      {isB2BModalOpen && (
        <B2BModal onClose={() => setIsB2BModalOpen(false)} />
      )}

      {/* 글로벌 푸터 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                  <Icons.Heart className="w-5 h-5 fill-white" />
                </div>
                <span className="font-extrabold text-xl text-white">위드케어 (WithCare)</span>
              </div>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed mb-4">
                부모님의 외래 진료 동행부터 원내 수납, 약국 처방전 수령, 안전 귀가까지 
                자격증을 보유한 전문 매니저가 보호자의 마음으로 정성을 다해 함께합니다.
              </p>
              <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-sky-400">
                🎓 대학교 수업 프로젝트 발표 및 시연용 포트폴리오 웹 애플리케이션
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm mb-3">서비스 바로가기</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setActiveTab('home'); window.scrollTo(0, 0); }} className="hover:text-white transition">서비스 소개 및 특징</button></li>
                <li><button onClick={() => { setActiveTab('managers'); window.scrollTo(0, 0); }} className="hover:text-white transition">매니저 인재검증 & AI 추천</button></li>
                <li><button onClick={() => { setActiveTab('ai'); window.scrollTo(0, 0); }} className="hover:text-white transition">AI 증상 분석 및 병원 추천</button></li>
                <li><button onClick={() => { setActiveTab('booking'); window.scrollTo(0, 0); }} className="hover:text-white transition">동행 예약 신청 폼</button></li>
                <li><button onClick={() => { setActiveTab('dashboard'); window.scrollTo(0, 0); }} className="hover:text-white transition">마이페이지 / 라이브 트래커</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm mb-3">B2B 파트너십 & 고객센터</h4>
              <ul className="space-y-2 text-xs">
                <li>병원 타겟 광고 및 제휴 문의</li>
                <li>기업 임직원 부모님 복지 정기 구독</li>
                <li>고객센터: 1544-9988 (평일 09:00 - 18:00)</li>
                <li className="text-amber-400/90">{AMBULANCE_NOTICE}</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 WithCare. All rights reserved. University Course Project Demonstration.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
              <span className="hover:text-slate-400 cursor-pointer">개인정보처리방침</span>
              <span className="hover:text-slate-400 cursor-pointer">배상책임보험 보상기준</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ========================================================
// 0. 회원 / 비회원 로그인 및 권한 분기 모달 (LoginModal)
// ========================================================
function LoginModal({ onClose, showToast, onLoginSuccess }) {
  const [loginRole, setLoginRole] = useState('GUARDIAN'); // 'GUARDIAN' | 'MANAGER'
  const [guardianMode, setGuardianMode] = useState('MEMBER'); // 'MEMBER' | 'NON_MEMBER'

  // 비회원 입력 필드
  const [nonMemberName, setNonMemberName] = useState('홍길동');
  const [nonMemberBirth, setNonMemberBirth] = useState('1985-05-15');
  const [nonMemberPassword, setNonMemberPassword] = useState('1234');

  // 매니저 선택
  const [selectedManagerId, setSelectedManagerId] = useState('mgr-1');

  const handleGuardianMemberLogin = () => {
    window.withCareStore.login({
      role: 'GUARDIAN',
      type: 'MEMBER',
      name: '김민수',
      birth: '1982-08-25',
      phone: '010-9876-5432'
    });
    showToast('회원(김민수 보호자)으로 로그인되었습니다. 마이페이지로 이동합니다.', 'success');
    onLoginSuccess('GUARDIAN');
  };

  const handleGuardianNonMemberLogin = (e) => {
    e.preventDefault();
    if (!nonMemberName || !nonMemberBirth || !nonMemberPassword) {
      alert('이름, 생년월일, 비밀번호를 모두 입력해주세요.');
      return;
    }
    window.withCareStore.login({
      role: 'GUARDIAN',
      type: 'NON_MEMBER',
      name: nonMemberName,
      birth: nonMemberBirth,
      password: nonMemberPassword
    });
    showToast(`비회원(${nonMemberName} 님)으로 로그인되었습니다. 비회원 마이페이지로 진입합니다.`, 'success');
    onLoginSuccess('GUARDIAN');
  };

  const handleManagerLogin = () => {
    window.withCareStore.login({
      role: 'MANAGER',
      managerId: selectedManagerId
    });
    const mgr = window.withCareStore.getManagerById(selectedManagerId);
    showToast(`${mgr.name} 매니저 계정으로 로그인되었습니다. 매니저 업무 마이페이지로 진입합니다.`, 'success');
    onLoginSuccess('MANAGER');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* 모달 헤더 */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Icons.User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">로그인 및 권한 선택</h3>
              <p className="text-[11px] text-slate-500">환자/보호자 및 동행 매니저 전용 마이페이지 분기</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        {/* 대분류: 환자/보호자 vs 매니저 탭 */}
        <div className="grid grid-cols-2 p-3 bg-slate-100 border-b border-slate-200 gap-2">
          <button
            onClick={() => setLoginRole('GUARDIAN')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              loginRole === 'GUARDIAN'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>👨‍👩‍👧</span>
            <span>환자 / 보호자 로그인</span>
          </button>
          <button
            onClick={() => setLoginRole('MANAGER')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              loginRole === 'MANAGER'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>🩺</span>
            <span>동행 매니저 로그인</span>
          </button>
        </div>

        {/* 탭 내용 */}
        <div className="p-6">
          {loginRole === 'GUARDIAN' ? (
            <div className="space-y-5">
              {/* 회원 vs 비회원 선택 칩 */}
              <div className="flex border border-slate-200 rounded-xl p-1 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setGuardianMode('MEMBER')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    guardianMode === 'MEMBER'
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  기존 회원 로그인
                </button>
                <button
                  type="button"
                  onClick={() => setGuardianMode('NON_MEMBER')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    guardianMode === 'NON_MEMBER'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  비회원 간편 로그인
                </button>
              </div>

              {guardianMode === 'MEMBER' ? (
                <div className="space-y-4">
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-sky-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <Icons.Check className="w-4 h-4 text-sky-600" />
                      <span>원클릭 시연용 등록 회원: 김민수 님</span>
                    </p>
                    <p className="text-[11px] text-sky-700">생년월일: 1982-08-25 · 연락처: 010-9876-5432</p>
                  </div>
                  <button
                    onClick={handleGuardianMemberLogin}
                    className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                  >
                    김민수(회원 보호자)로 로그인하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuardianNonMemberLogin} className="space-y-3 text-xs">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 font-medium">
                    💡 비회원도 이름, 생년월일, 비밀번호로 간편하게 예약 및 조회가 가능합니다.
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">신청자 성함 *</label>
                    <input 
                      type="text" 
                      value={nonMemberName} 
                      onChange={(e) => setNonMemberName(e.target.value)}
                      placeholder="성함 입력"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">생년월일 (YYYY-MM-DD) *</label>
                    <input 
                      type="date" 
                      value={nonMemberBirth} 
                      onChange={(e) => setNonMemberBirth(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">비밀번호 (예약 조회용 4자리) *</label>
                    <input 
                      type="password" 
                      value={nonMemberPassword} 
                      onChange={(e) => setNonMemberPassword(e.target.value)}
                      placeholder="숫자 4자리"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500"
                      required 
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition mt-2"
                  >
                    비회원으로 로그인 및 마이페이지 진입
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-[11px] text-teal-900">
                🩺 <strong>매니저 계정 선택</strong>: 인재검증 시스템을 통과한 전문 매니저 계정으로 접속하여 예약 수락, 라이브 위치 전송 및 진료 리포트를 작성합니다.
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">활동 매니저 선택</label>
                <div className="space-y-2">
                  {window.withCareStore.getManagers().map((mgr) => (
                    <label 
                      key={mgr.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        selectedManagerId === mgr.id 
                          ? 'border-teal-600 bg-teal-50/70' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="mgr" 
                        checked={selectedManagerId === mgr.id}
                        onChange={() => setSelectedManagerId(mgr.id)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <img src={mgr.avatar} alt={mgr.name} className="w-10 h-10 rounded-full object-cover border" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span>{mgr.name} 매니저</span>
                          <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-semibold">{mgr.badge}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{mgr.region} · 평점 {mgr.rating}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleManagerLogin}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                선택한 매니저로 로그인하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 1. 랜딩 페이지 뷰 (HomeView)
// ========================================================
function HomeView({ onGoBooking, onGoManagers, onGoAI, onGoDashboard, onSelectHospital, onOpenB2B }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 좌측 메인 카피 */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-sky-100/80 border border-sky-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800">
                <Icons.ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>3단계 인재검증 시스템 통과 전문 매니저 · 배상책임보험 가입</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                부모님 병원 가는 날,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700">
                  든든한 전문 동행 매니저
                </span>를 만나보세요
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                직장 출근과 일상으로 직접 가지 못해 무거운 마음, 이제 덜어내세요.<br className="hidden sm:inline" />
                국가 자격증 전수 검증, 심층 인성 면접, 40시간 필수 보건교육을 통과한 전문 매니저가 
                자택 픽업부터 진료실 동행, 카카오톡 실시간 소통, 처방약 수령까지 자녀의 마음으로 함께합니다.
              </p>

              {/* CTA 버튼 그룹 */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onGoBooking}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <Icons.Calendar className="w-5 h-5" />
                  <span>간편 동행 예약하기</span>
                  <Icons.ArrowRight className="w-5 h-5 ml-1" />
                </button>
                <button
                  onClick={onGoManagers}
                  className="px-5 py-4 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-bold text-sm border border-teal-200 shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <Icons.Users className="w-5 h-5 text-teal-600" />
                  <span>검증 매니저 AI 추천</span>
                </button>
                <button
                  onClick={onGoAI}
                  className="px-5 py-4 rounded-xl bg-white hover:bg-purple-50 text-purple-800 font-bold text-sm border border-purple-200 shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <Icons.Sparkles className="w-5 h-5 text-purple-600" />
                  <span>AI 증상 병원 찾기</span>
                </button>
              </div>

              {/* 신뢰 지표 바 */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl font-black text-slate-900">14,280+</div>
                  <div className="text-xs text-slate-500 font-medium">누적 안심 동행</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-teal-600">99.4%</div>
                  <div className="text-xs text-slate-500 font-medium">보호자 만족도</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-sky-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium">자격증·면접 검증</div>
                </div>
              </div>
            </div>

            {/* 우측 실시간 시연 프리뷰 카드: 배민 스타일 트래커 & 카톡 미니 */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 relative space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-800">배민 스타일 라이브 위치 트래킹</span>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                    실시간 시뮬레이션
                  </span>
                </div>

                {/* 배민 스타일 이동 핀 바 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-800 flex items-center gap-1.5">
                      <Icons.Car className="w-4 h-4 text-teal-600" />
                      <span>김서연 매니저님이 자택으로 이동 중입니다</span>
                    </span>
                    <span className="text-slate-400 font-bold">도착 약 8분 전</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full w-3/5 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">현재 위치: 마포역 인근 도로 주행 중 (약 1.2km 전방)</p>
                </div>

                {/* 카카오톡 미니 프리뷰 */}
                <div className="bg-[#bacee0] rounded-2xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold px-1">
                    <span>💬 1:1 카카오톡 실시간 소통</span>
                    <span className="text-[10px] bg-yellow-400 text-slate-900 px-1.5 py-0.2 rounded font-bold">실시간</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img 
                      src={DEFAULT_MANAGERS[0].avatar} 
                      className="w-7 h-7 rounded-full object-cover border" 
                      alt="김서연"
                    />
                    <div className="bg-white rounded-xl rounded-tl-none p-2 shadow-sm text-slate-800 text-[11px] max-w-[80%]">
                      "보호자님, 어머님 댁 10분 전 도착 예정입니다! 편안하게 준비 부탁드립니다 😊"
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGoDashboard}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>마이페이지에서 실시간 전체 화면 확인하기</span>
                  <Icons.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3대 안심 기준 카드 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 mb-2">TRUST & SAFETY</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              가족을 맡길 수 있는 3단계 인재검증 시스템
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3">
              단순 매칭을 넘어, 국가 공인 자격증 검증과 심층 인성 면접, 40시간 돌봄 안전 교육을 마친 매니저만 배정됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-2xl p-8 border border-sky-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-6">
                <Icons.ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">검증 1단계</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2 mb-2">국가 자격증 100% 전수 검증</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                간호사, 요양보호사 1급, 사회복지사, 간호조무사 등 공인 자격증 및 면허를 공공 전산망을 통해 전수 조회합니다.
              </p>
            </div>

            <div className="bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-8 border border-teal-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-6">
                <Icons.User className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">검증 2단계</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2 mb-2">1:1 심층 인성 & 돌봄 면접</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                성범죄 경력 및 범죄 이력 조회는 기본, 위급 상황 대처 및 어르신 공감 대화법 심층 대면 면접을 실시합니다.
              </p>
            </div>

            <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6">
                <Icons.ClipboardCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">검증 3단계</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2 mb-2">40시간 필수 보건안전 교육</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                휠체어 상하차, 낙상 방지 보행 부축, CPR 심폐소생술, 병원 외래 동행 매뉴얼을 수료한 매니저만 활동합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B / B2C 수익모델 설명 섹션 */}
      <section className="py-16 bg-slate-100 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">BUSINESS MODEL & EXPANSION</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                중개수수료 외 병원 타겟 광고 및 심층 리포트 B2C/B2B 수익모델
              </h3>
            </div>
            <button
              onClick={onOpenB2B}
              className="text-xs font-bold text-sky-700 bg-white border border-sky-200 px-4 py-2 rounded-xl shadow-sm hover:bg-sky-50 transition flex items-center gap-1.5 self-start md:self-auto"
            >
              <Icons.TrendingUp className="w-4 h-4" />
              <span>BM 상세 사업계획서 팝업 열기</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {B2B_MODEL_POINTS.map((bm, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {bm.badge}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{bm.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{bm.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 보호자 생생 리뷰 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">REVIEWS</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">직장인 자녀들의 생생한 안심 후기</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUARDIAN_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Icons.Star key={i} className="w-4 h-4" filled={true} />
                      ))}
                    </div>
                    <span className="text-[11px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4">"{t.text}"</p>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-800">{t.author}</span>
                  <span>{t.hospital}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================================================
// 2. 매니저 탐색 & AI 추천 뷰 (ManagerExploreView - 1단계)
// ========================================================
function ManagerExploreView({ managers, onSelectManager }) {
  // 필터 상태
  const [filterGender, setFilterGender] = useState('ALL'); // 'ALL' | '여성' | '남성'
  const [filterRegion, setFilterRegion] = useState('ALL'); // 'ALL' | '마포구' | '서초구' | '송파구' | '영등포구' | '종로구'
  const [filterCert, setFilterCert] = useState('ALL'); // 'ALL' | '간호사' | '요양보호사' | '사회복지사'
  const [filterDriverOnly, setFilterDriverOnly] = useState(false);

  // AI 추천 매니저 (상단 1~2명)
  const aiPickManagers = useMemo(() => {
    return managers.filter(m => m.isAiPick);
  }, [managers]);

  // 필터링된 전체 매니저 목록
  const filteredManagers = useMemo(() => {
    return managers.filter(m => {
      if (filterGender !== 'ALL' && m.gender !== filterGender) return false;
      if (filterRegion !== 'ALL' && !m.region.includes(filterRegion)) return false;
      if (filterCert !== 'ALL' && !m.certifications.some(c => c.includes(filterCert))) return false;
      if (filterDriverOnly && !m.hasDriverLicense) return false;
      return true;
    });
  }, [managers, filterGender, filterRegion, filterCert, filterDriverOnly]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 border border-teal-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <Icons.ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>위드케어 인재 검증 시스템 (Trust & Verification)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          전담 동행 매니저 탐색 & AI 맞춤 추천
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          국가 자격증 검증, 심층 면접, 필수 안전교육을 통과한 전문 매니저의 프로필과 평점을 확인하고 직접 지정 예약할 수 있습니다.
        </p>
      </div>

      {/* 1. 상단 AI 맞춤 추천 카드 섹션 (1~2명 카드) */}
      <div className="mb-10 bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">AI MATCHING RECOMMENDATION</span>
          </div>
          <span className="text-[11px] bg-white/10 text-teal-200 px-2.5 py-1 rounded-full border border-white/10">
            증상 및 거동 맞춤 최적 매니저
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black mb-6">
          어르신 증상과 거동에 최적화된 AI 추천 매니저 TOP 2
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiPickManagers.map((mgr) => (
            <div key={mgr.id} className="bg-white/10 rounded-2xl p-5 border border-white/15 flex flex-col justify-between backdrop-blur">
              <div>
                {/* 상단 추천 뱃지 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold bg-teal-400 text-slate-900 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Icons.Sparkles className="w-3 h-3" />
                    <span>AI PICK</span>
                  </span>
                  <span className="text-xs text-amber-300 font-bold flex items-center gap-0.5">
                    <Icons.Star className="w-3.5 h-3.5" filled={true} />
                    <span>{mgr.rating} ({mgr.reviewCount}회 후기)</span>
                  </span>
                </div>

                <div className="flex gap-4 items-start mb-3">
                  <img src={mgr.avatar} alt={mgr.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">{mgr.name} 매니저</h4>
                      <span className="text-xs text-slate-300 font-medium">({mgr.gender}/{mgr.age}세)</span>
                    </div>
                    <p className="text-xs text-teal-300 font-semibold">{mgr.badge}</p>
                    <p className="text-[11px] text-slate-300 mt-1">지역: {mgr.region}</p>
                  </div>
                </div>

                {/* AI 추천 사유 */}
                <div className="bg-black/30 rounded-xl p-2.5 text-xs text-teal-200 font-medium mb-4 flex items-center gap-1.5">
                  <Icons.Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{mgr.aiPickReason}</span>
                </div>

                {/* 인재검증 3대 마크 미니 */}
                <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center mb-4">
                  <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-teal-200">✓ 자격증 100%</div>
                  <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-teal-200">✓ 심층면접 완료</div>
                  <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-teal-200">✓ 40시간 교육</div>
                </div>
              </div>

              <button
                onClick={() => onSelectManager(mgr)}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1"
              >
                <span>이 매니저에게 동행 신청하기</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 상세 카테고리 필터 바 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Icons.Search className="w-4 h-4 text-slate-500" />
            <span>상세 조건 필터 (성별 / 활동지역 / 자격증 / 운전면허)</span>
          </span>
          <span className="text-xs text-teal-700 font-bold">
            검색 결과 {filteredManagers.length}명
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {/* 성별 필터 */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">성별</label>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">전체 성별</option>
              <option value="여성">여성 매니저</option>
              <option value="남성">남성 매니저</option>
            </select>
          </div>

          {/* 지역 필터 */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">활동 가능 지역</label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">서울 전체 지역</option>
              <option value="마포구">마포구 / 서대문구</option>
              <option value="서초구">서초구 / 강남구</option>
              <option value="송파구">송파구 / 강동구</option>
              <option value="영등포구">영등포구 / 구로구</option>
              <option value="종로구">종로구 / 중구</option>
            </select>
          </div>

          {/* 자격증 필터 */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">보유 자격증 / 전공</label>
            <select
              value={filterCert}
              onChange={(e) => setFilterCert(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">전체 자격증</option>
              <option value="간호사">간호사 면허 소지</option>
              <option value="요양보호사">요양보호사 1급 소지</option>
              <option value="사회복지사">사회복지사 소지</option>
            </select>
          </div>

          {/* 운전면허 소지 토글 */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 p-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={filterDriverOnly}
                onChange={(e) => setFilterDriverOnly(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="font-bold text-slate-700 text-xs">자차 운행 가능 매니저만</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. 전체 매니저 목록형 카드 배치 */}
      <div className="space-y-4">
        {filteredManagers.map((mgr) => (
          <div 
            key={mgr.id} 
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex gap-4 items-start">
              <div className="relative shrink-0">
                <img src={mgr.avatar} alt={mgr.name} className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm" />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow" title="인재검증 완료">
                  ✓
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-extrabold text-base text-slate-900">{mgr.name} 매니저</h4>
                  <span className="text-xs text-slate-500">({mgr.gender} · {mgr.age}세)</span>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                    {mgr.badge}
                  </span>
                  {mgr.hasDriverLicense && (
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <Icons.Car className="w-3 h-3 text-sky-600" />
                      <span>자차 운행 가능</span>
                    </span>
                  )}
                </div>

                {/* 인재검증 시스템 3대 마크 표시 */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Icons.Check className="w-3 h-3 text-emerald-600" />
                    <span>자격증 100% 검증</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Icons.Check className="w-3 h-3 text-emerald-600" />
                    <span>심층 면접 통과</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Icons.Check className="w-3 h-3 text-emerald-600" />
                    <span>필수 보건교육 이수</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 max-w-xl line-clamp-2 pt-1">
                  "{mgr.intro}"
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center text-amber-500 font-bold">
                    ★ {mgr.rating} ({mgr.reviewCount}회 후기)
                  </span>
                  <span>·</span>
                  <span>누적 동행 {mgr.completedTrips}건</span>
                  <span>·</span>
                  <span>활동: {mgr.region}</span>
                </div>
              </div>
            </div>

            {/* 가격 & 신청 버튼 */}
            <div className="w-full sm:w-auto shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-3">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block">기본 시간 요율</span>
                <span className="text-base font-black text-slate-900">{mgr.hourlyRate.toLocaleString()}원</span>
                <span className="text-xs text-slate-500"> / 시간</span>
              </div>
              <button
                onClick={() => onSelectManager(mgr)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition whitespace-nowrap"
              >
                이 매니저에게 동행 신청
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================================
// 3. 동행 예약 신청 폼 (BookingView - 2단계 & 이동수단 3종)
// ========================================================
function BookingView({ prefill, managers, currentUser, onBookingComplete }) {
  // 1. 환자 및 보호자 기본 정보
  const [patientName, setPatientName] = useState('김순자');
  const [patientBirth, setPatientBirth] = useState('1950-04-12');
  const [patientAge, setPatientAge] = useState(76);
  const [patientGender, setPatientGender] = useState('여성');
  const [patientPhone, setPatientPhone] = useState('010-3344-9988');
  const [patientRegion, setPatientRegion] = useState('서울시 마포구');

  const [guardianName, setGuardianName] = useState(currentUser.name || '김민수 (자녀)');
  const [guardianPhone, setGuardianPhone] = useState(currentUser.phone || '010-9876-5432');

  // 2. 사전 문진 및 상태
  const [symptomsDescription, setSymptomsDescription] = useState('계단 오를 때 무릎에 찌릿한 통증이 있고 10분 이상 서 계시기 어려우심.');
  const [currentMedications, setCurrentMedications] = useState('혈압약(아침 식후 1정), 관절염 진통소염제');
  const [useWheelchair, setUseWheelchair] = useState(false);
  const [mobility, setMobility] = useState('ASSISTED');

  // 3. 개별 의견란 분리
  const [messageToDoctor, setMessageToDoctor] = useState('지난주부터 아침에 일어날 때 핑 도는 기립성 어지럼증이 있었는데 혈압약 용량 점검 부탁드립니다.');
  const [messageToManager, setMessageToManager] = useState('어르신 귀가 어두우시니 진료실에서 선생님 말씀을 크게 메모해 주시고, 천천히 부축 부탁드립니다.');

  // 4. 이동 수단 선택 (3가지 옵션)
  const [transportOption, setTransportOption] = useState('TAXI_TRANSIT');

  // 5. 병원 및 일정
  const [hospital, setHospital] = useState(prefill.hospital || '신촌 세브란스병원');
  const [department, setDepartment] = useState(prefill.department || '정형외과 / 관절센터');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:30');
  const [pickupAddress, setPickupAddress] = useState('서울시 마포구 독막로 12길 15, 102동 402호');
  const [serviceDuration, setServiceDuration] = useState('2시간 기본');

  // 지정 매니저 (없을 경우 자동 배정)
  const [assignedManagerId, setAssignedManagerId] = useState(prefill.managerId || null);

  // 동행 옵션
  const [options, setOptions] = useState({
    pharmacy: true,
    paymentAssist: true,
    wheelchairRental: false
  });

  // 6. 개인정보 활용 동의서
  const [agreePrivacy, setAgreePrivacy] = useState(true);

  // prefill 변경 반영
  useEffect(() => {
    if (prefill.hospital) setHospital(prefill.hospital);
    if (prefill.department) setDepartment(prefill.department);
    if (prefill.managerId) setAssignedManagerId(prefill.managerId);
  }, [prefill]);

  // 실시간 견적 계산
  const costCalculation = useMemo(() => {
    let base = 45000;
    if (serviceDuration === '3시간 심층') base = 65000;
    if (serviceDuration === '4시간 전일') base = 85000;

    let mobilityCost = 0;
    if (mobility === 'ASSISTED') mobilityCost = 10000;
    if (mobility === 'WHEELCHAIR' || useWheelchair) mobilityCost = 20000;

    let transportCost = 0;
    if (transportOption === 'PERSONAL_CAR') transportCost = 15000; // 자차 유류비

    let optionCost = 0;
    if (options.pharmacy) optionCost += 10000;
    if (options.wheelchairRental) optionCost += 10000;

    const total = base + mobilityCost + transportCost + optionCost;

    return {
      base,
      mobilityCost,
      transportCost,
      optionCost,
      total
    };
  }, [serviceDuration, mobility, useWheelchair, transportOption, options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreePrivacy) {
      alert('개인정보 수집 및 동행 매니저 제공 동의서에 동의하셔야 신청이 가능합니다.');
      return;
    }

    const newRes = window.withCareStore.createReservation({
      patientName,
      patientBirth,
      patientAge,
      patientGender,
      patientPhone,
      patientRegion,
      guardianName,
      guardianPhone,
      mobility: useWheelchair ? 'WHEELCHAIR' : mobility,
      useWheelchair,
      currentMedications,
      symptomsDescription,
      messageToDoctor,
      messageToManager,
      transportOption,
      agreePrivacy,
      hospital,
      department,
      date,
      time,
      pickupAddress,
      options,
      serviceDuration,
      cost: costCalculation.total,
      managerId: assignedManagerId
    });

    onBookingComplete(newRes);
  };

  const assignedManager = assignedManagerId ? managers.find(m => m.id === assignedManagerId) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          병원 안심 동행 예약 신청 폼
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          환자 상태와 이동 수단, 의사/매니저 전달사항을 기재하시면 안전하고 편안한 맞춤 동행이 시작됩니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측 입력 영역 (8컬럼) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 지정된 매니저 배너 (있을 경우) */}
          {assignedManager && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={assignedManager.avatar} alt={assignedManager.name} className="w-12 h-12 rounded-xl object-cover border" />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-teal-900">
                    <span>{assignedManager.name} 매니저 지정 예약 중</span>
                    <span className="text-[10px] bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded">{assignedManager.badge}</span>
                  </div>
                  <p className="text-xs text-teal-700">인재검증 완료 · 평점 {assignedManager.rating} ★</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setAssignedManagerId(null)}
                className="text-xs text-slate-500 underline"
              >
                지정 취소 (자동 매칭)
              </button>
            </div>
          )}

          {/* 섹션 1: 환자 기본 정보 및 거주 지역 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">1</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">환자 및 보호자 기본 정보</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">환자(부모님) 성함 *</label>
                <input 
                  type="text" 
                  value={patientName} 
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                  required 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">환자 생년월일 (YYYY-MM-DD) *</label>
                <input 
                  type="date" 
                  value={patientBirth} 
                  onChange={(e) => setPatientBirth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                  required 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">환자 거주 지역 (시/군/구) *</label>
                <input 
                  type="text" 
                  value={patientRegion} 
                  onChange={(e) => setPatientRegion(e.target.value)}
                  placeholder="예: 서울시 마포구"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                  required 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">환자분 연락처</label>
                <input 
                  type="text" 
                  value={patientPhone} 
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">신청 보호자 성함 & 연락처 *</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={guardianName} 
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="보호자 성함"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                    required 
                  />
                  <input 
                    type="text" 
                    value={guardianPhone} 
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 font-medium"
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 2: 사전 문진 & 상태 & 개별 의견란 분리 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">2</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">사전 문진, 복용약 및 개별 전달의견란</h3>
            </div>

            <div className="space-y-4 text-xs">
              {/* 증상 정리 */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">어르신 현재 주요 증상 정리 *</label>
                <textarea 
                  rows="2"
                  value={symptomsDescription}
                  onChange={(e) => setSymptomsDescription(e.target.value)}
                  placeholder="예: 오른쪽 무릎이 쑤시고 10분 이상 연속 보행 시 통증 심화"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 font-medium"
                  required
                />
              </div>

              {/* 현재 복용 중인 약 & 휠체어 이용 여부 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">현재 복용 중인 약 (혈압약, 당뇨약 등)</label>
                  <input 
                    type="text"
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    placeholder="예: 혈압약 아침 1정, 고지혈증약"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>

                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2.5 p-2.5 border border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer w-full">
                    <input 
                      type="checkbox"
                      checked={useWheelchair}
                      onChange={(e) => {
                        setUseWheelchair(e.target.checked);
                        if (e.target.checked) setMobility('WHEELCHAIR');
                      }}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <div>
                      <span className="font-bold text-slate-800">휠체어 이용 필수 여부 체크</span>
                      <p className="text-[10px] text-slate-500">체크 시 휠체어 전용 케어 매니저 배정</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 개별 의견란 2개 분리 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 space-y-1.5">
                  <label className="block font-extrabold text-sky-900 text-xs">
                    💬 의사에게 하고 싶은 말 (진료 상담 질문)
                  </label>
                  <p className="text-[10px] text-sky-700">진료실에서 매니저가 보호자를 대신하여 질문합니다.</p>
                  <textarea 
                    rows="3"
                    value={messageToDoctor}
                    onChange={(e) => setMessageToDoctor(e.target.value)}
                    placeholder="예: 최근 아침에 핑 도는 어지럼증이 잦은데 혈압약 용량 점검 부탁드립니다."
                    className="w-full bg-white border border-sky-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100 space-y-1.5">
                  <label className="block font-extrabold text-teal-900 text-xs">
                    🤝 매니저에게 하고 싶은 말 (안심 요청사항)
                  </label>
                  <p className="text-[10px] text-teal-700">매니저가 자택 픽업부터 귀가까지 숙지합니다.</p>
                  <textarea 
                    rows="3"
                    value={messageToManager}
                    onChange={(e) => setMessageToManager(e.target.value)}
                    placeholder="예: 귀가 어두우시니 선생님 소견을 크게 메모해 주시고, 승하차 시 천천히 부축 부탁드립니다."
                    className="w-full bg-white border border-teal-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 3: 이동 수단 선택 (3가지 옵션 & 구급차 제외 명시) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">3</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">이동 수단 선택 (3가지 옵션)</h3>
            </div>

            {/* 이동수단 카드 3종 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TRANSPORT_OPTIONS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTransportOption(t.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    transportOption === t.id
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border">
                        {t.badge}
                      </span>
                      <span className="text-xs font-extrabold text-sky-700">{t.costDesc}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black mb-1">{t.name}</div>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 구급차 지원 제외 안내 문구 (요구사항 필수 반영) */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 flex items-start gap-2">
              <span className="text-base shrink-0">⚠️</span>
              <div>
                <strong>구급차 지원 제외 안내:</strong>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  본 서비스는 비응급 일반 외래 진료 동행 목적입니다. 심각한 응급 증상이나 호흡 곤란 발생 시에는 즉시 119 구급차를 호출하셔야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 섹션 4: 방문 병원, 픽업지 및 개인정보동의 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">4</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">병원 일정, 픽업 주소 및 동의서</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">방문 병원명 *</label>
                <input 
                  type="text" 
                  value={hospital} 
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                  required 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">진료과 *</label>
                <input 
                  type="text" 
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                  required 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">희망 방문 날짜 (달력) *</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">희망 시간 선택 *</label>
                <select 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                >
                  {['09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:30', '16:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">자택 픽업 상세 주소 *</label>
                <input 
                  type="text" 
                  value={pickupAddress} 
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required 
                />
              </div>
            </div>

            {/* 개인정보 활용 동의서 필수 체크박스 */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                  required
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900">[필수] 개인정보 수집·이용 및 배정 매니저 업무 제공 동의서</span>
                  <p className="text-[11px] text-slate-500">환자 및 보호자의 성명, 생년월일, 연락처, 건강 정보를 병원 동행 목적 범위 내에서만 안전하게 처리합니다.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 우측 실시간 견적 박스 (4컬럼 스티키) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-5">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>실시간 예상 견적</span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">정찰제</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>기본 동행 요금 ({serviceDuration})</span>
                <span className="font-bold text-slate-900">{costCalculation.base.toLocaleString()}원</span>
              </div>

              {costCalculation.mobilityCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>거동 지원금 ({useWheelchair ? '휠체어 전용' : '보행 부축'})</span>
                  <span className="font-bold text-slate-900">+{costCalculation.mobilityCost.toLocaleString()}원</span>
                </div>
              )}

              {costCalculation.transportCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>매니저 자차 동행 유류비</span>
                  <span className="font-bold text-slate-900">+{costCalculation.transportCost.toLocaleString()}원</span>
                </div>
              )}

              {costCalculation.optionCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>부가 대행 (약국 수령 대행)</span>
                  <span className="font-bold text-slate-900">+{costCalculation.optionCost.toLocaleString()}원</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">최종 예상 결제액</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-sky-600">
                    {costCalculation.total.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-700 ml-1">원</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Icons.Check className="w-5 h-5" />
              <span>동행 예약 신청 완료</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ========================================================
// 4. AI 증상 검색 & 병원 추천 뷰 (AIFinderView)
// ========================================================
function AIFinderView({ onSelectHospital }) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const runAnalysis = (inputQuery) => {
    const text = inputQuery.trim();
    if (!text) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      let matched = SYMPTOM_ANALYSIS_PRESETS.find(p => 
        text.includes('다리') || text.includes('저림') || text.includes('걷기') || text.includes('보행')
      );

      if (!matched && (text.includes('가슴') || text.includes('숨') || text.includes('심장') || text.includes('답답'))) {
        matched = SYMPTOM_ANALYSIS_PRESETS[1];
      } else if (!matched && (text.includes('눈') || text.includes('뿌연') || text.includes('백내장') || text.includes('시야'))) {
        matched = SYMPTOM_ANALYSIS_PRESETS[2];
      } else if (!matched && (text.includes('무릎') || text.includes('관절') || text.includes('계단') || text.includes('쑤심'))) {
        matched = SYMPTOM_ANALYSIS_PRESETS[3];
      } else if (!matched && (text.includes('어지럼') || text.includes('기억') || text.includes('깜빡') || text.includes('치매'))) {
        matched = SYMPTOM_ANALYSIS_PRESETS[4];
      }

      if (!matched) {
        matched = {
          department: '가정의학과 / 종합외래센터',
          analysisSummary: `'${text}' 증상에 대한 전반적인 기초 진단 및 원인 감별을 위해 상급 종합병원 외래 또는 전문 클리닉 진료를 권장합니다.`,
          suggestedHospitalIds: ['hosp-1', 'hosp-2', 'hosp-3']
        };
      }

      const hospitalList = matched.suggestedHospitalIds 
        ? matched.suggestedHospitalIds.map(id => RECOMMENDED_HOSPITALS.find(h => h.id === id)).filter(Boolean)
        : RECOMMENDED_HOSPITALS.slice(0, 3);

      setAnalysisResult({
        queryText: text,
        department: matched.department,
        summary: matched.analysisSummary,
        hospitals: hospitalList
      });

      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
          <Icons.Sparkles className="w-4 h-4 text-purple-600" />
          <span>위드케어 AI 헬스케어 어시스턴트</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI 자연어 증상 기반 전문 병원 추천
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          부모님의 증상을 입력하시면 병원 정문 사진, GPS 소요시간, 전문과를 한눈에 비교하고 즉시 예약으로 연동합니다.
        </p>
      </div>

      {/* 증상 입력창 */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto mb-8">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          증상 자연어 입력 (예: 어머니가 자꾸 다리가 저리고 걷기 힘드셔)
        </label>
        <div className="flex gap-2">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runAnalysis(query)}
            placeholder="어머니가 자꾸 다리가 저리고 걷기 힘드셔, 계단 내려갈 때 무릎이 시큰거려요..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => runAnalysis(query)}
            disabled={!query.trim() || isAnalyzing}
            className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm shadow-md transition whitespace-nowrap"
          >
            {isAnalyzing ? '분석 중...' : 'AI 분석'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 block mb-2">💡 빠른 증상 선택 예시:</span>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_ANALYSIS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setQuery(preset.fullQuery);
                  runAnalysis(preset.fullQuery);
                }}
                className="text-xs bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                {preset.chipText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 분석 결과 및 병원 카드 UI */}
      {analysisResult && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <span className="bg-purple-400/20 text-purple-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
              AI 분석 추천 진료과
            </span>
            <h3 className="text-2xl font-black mt-2 mb-2">{analysisResult.department}</h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">{analysisResult.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisResult.hospitals.map((hosp) => (
              <div key={hosp.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  {/* 병원 정문 실사 이미지 */}
                  <div className="relative h-44 bg-slate-200">
                    <img src={hosp.image} alt={hosp.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {hosp.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                      {hosp.driveTime}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-lg text-slate-900">{hosp.name}</h4>
                      <span className="text-amber-500 font-bold text-xs">★ {hosp.rating}</span>
                    </div>

                    <p className="text-xs font-semibold text-sky-700">{hosp.department}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Icons.MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{hosp.address} (거리 {hosp.distanceKm})</span>
                    </p>

                    {hosp.b2bBanner && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 font-medium">
                        {hosp.b2bBanner}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectHospital(hosp.name, hosp.department.split('/')[0].trim())}
                    className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Icons.Calendar className="w-4 h-4" />
                    <span>이 병원으로 동행 예약하기</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================================
// 5. 마이페이지 & 대시보드 (배민 스타일 트래커 & 카톡 대화방 연동)
// ========================================================
function DashboardView({ role, currentUser, reservations, filter, setFilter, onOpenReport, onOpenManagerReport, onOpenChat, onGoBooking, showToast }) {
  const filtered = useMemo(() => {
    if (filter === 'ALL') return reservations;
    if (filter === 'REQUESTED') return reservations.filter(r => r.status === 'REQUESTED');
    if (filter === 'MATCHED') return reservations.filter(r => r.status === 'MATCHED' || r.status === 'IN_PROGRESS');
    if (filter === 'COMPLETED') return reservations.filter(r => r.status === 'COMPLETED');
    return reservations;
  }, [reservations, filter]);

  // 배민 스타일 위치 단계 시뮬레이션
  const handleSimulateTracking = (resId, currentStep) => {
    const next = currentStep >= 5 ? 5 : currentStep + 1;
    window.withCareStore.updateStep(resId, next);
    const meta = TRACKING_STEPS_META.find(m => m.step === next);
    showToast(`위치 시뮬레이션: [${meta.riderStatus}] 단계로 전진했습니다.`, 'success');
  };

  const handleAcceptByManager = (resId) => {
    const mgrId = currentUser.managerId || 'mgr-1';
    window.withCareStore.acceptReservation(resId, mgrId);
    showToast('예약을 수락하였습니다! 매칭이 완료되어 1:1 카카오톡 대화방이 활성화되었습니다.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {role === 'MANAGER' ? '동행 매니저 전용 마이페이지' : '환자/보호자 안심 마이페이지'}
            </h2>
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
              총 {reservations.length}건
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            배달의민족 스타일 실시간 라이브 트래커, 1:1 카카오톡 대화방, 진료 결과 안심 리포트를 확인하세요.
          </p>
        </div>

        {role === 'GUARDIAN' && (
          <button
            onClick={onGoBooking}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Icons.Calendar className="w-4 h-4" />
            <span>새 동행 예약하기</span>
          </button>
        )}
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-slate-200 gap-2 mb-8 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2.5 rounded-lg transition whitespace-nowrap ${filter === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          전체 ({reservations.length})
        </button>
        <button
          onClick={() => setFilter('REQUESTED')}
          className={`px-4 py-2.5 rounded-lg transition whitespace-nowrap ${filter === 'REQUESTED' ? 'bg-amber-500 text-white' : 'text-slate-600'}`}
        >
          예약 대기중 ({reservations.filter(r => r.status === 'REQUESTED').length})
        </button>
        <button
          onClick={() => setFilter('MATCHED')}
          className={`px-4 py-2.5 rounded-lg transition whitespace-nowrap ${filter === 'MATCHED' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}
        >
          매칭 & 동행 진행중 ({reservations.filter(r => r.status === 'MATCHED' || r.status === 'IN_PROGRESS').length})
        </button>
        <button
          onClick={() => setFilter('COMPLETED')}
          className={`px-4 py-2.5 rounded-lg transition whitespace-nowrap ${filter === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
        >
          동행 완료 ({reservations.filter(r => r.status === 'COMPLETED').length})
        </button>
      </div>

      {/* 예약 목록 카드들 */}
      <div className="space-y-6">
        {filtered.map((item) => {
          const manager = item.managerId ? window.withCareStore.getManagerById(item.managerId) : null;
          const trackingMeta = TRACKING_STEPS_META.find(m => m.step === item.step) || TRACKING_STEPS_META[0];

          return (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-5 p-6">
              {/* 상단 예약 번호 & 상태 배지 */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="font-black text-sm text-slate-900 mr-2">{item.id}</span>
                  <span className="text-xs text-slate-400">신청일시: {item.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-200">
                    {item.transportLabel}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'REQUESTED' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status === 'REQUESTED' ? '예약 대기중' : item.status === 'COMPLETED' ? '동행 완료' : '매칭 및 이동 중'}
                  </span>
                </div>
              </div>

              {/* 기본 예약 개요 */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">환자(어르신)</span>
                  <span className="font-bold text-slate-900">{item.patientName} ({item.patientAge}세/{item.patientGender})</span>
                  <p className="text-slate-500 text-[11px]">{item.mobilityLabel}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">방문 병원 & 진료과</span>
                  <span className="font-bold text-slate-900">{item.hospital}</span>
                  <p className="text-sky-700 text-[11px] font-semibold">{item.department}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">방문 일시</span>
                  <span className="font-bold text-slate-900">{item.date} {item.time}</span>
                  <p className="text-slate-500 text-[11px]">{item.serviceDuration}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">픽업 주소 & 금액</span>
                  <span className="font-bold text-slate-900 truncate block" title={item.pickupAddress}>{item.pickupAddress}</span>
                  <p className="text-sky-600 text-[11px] font-bold">{item.cost.toLocaleString()}원</p>
                </div>
              </div>

              {/* 배달의민족 스타일 실시간 라이브 트래커 시뮬레이션 UI */}
              <div className="bg-gradient-to-r from-teal-50/70 via-sky-50/70 to-blue-50/70 p-5 rounded-2xl border border-teal-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></span>
                    <span className="text-xs font-bold text-teal-900">배민 스타일 라이브 위치 안내</span>
                  </div>
                  <span className="text-xs font-extrabold text-teal-800 bg-white border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {trackingMeta.eta}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-teal-200/60 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-slate-900 text-sm">{trackingMeta.riderStatus}</strong>
                    <span className="text-teal-600 font-bold">{trackingMeta.percent}%</span>
                  </div>
                  {/* 프로그레스 바 */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-sky-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${trackingMeta.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Icons.MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{trackingMeta.locationText}</span>
                  </p>
                </div>
              </div>

              {/* 배정된 매니저 카드 (인재검증 인증 마크) */}
              {manager && (
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={manager.avatar} alt={manager.name} className="w-14 h-14 rounded-2xl object-cover border" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{manager.name} 매니저</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                          {manager.badge}
                        </span>
                        <span className="text-xs font-bold text-amber-500">★ {manager.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-bold">
                        <span>✓ 자격증 전수검증</span>
                        <span>·</span>
                        <span>✓ 심층면접 통과</span>
                        <span>·</span>
                        <span>✓ 40시간 교육이수</span>
                      </div>
                      <p className="text-[11px] text-slate-500">연락처: {manager.phone}</p>
                    </div>
                  </div>

                  {/* 카카오톡 1:1 대화방 열기 버튼 */}
                  <button
                    onClick={() => onOpenChat(item.id)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-[#fee500] hover:bg-[#ebd300] text-slate-900 font-black text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Icons.MessageSquare className="w-4 h-4" />
                    <span>1:1 카카오톡 대화방 열기</span>
                  </button>
                </div>
              )}

              {/* 하단 시연용 액션 툴바 */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
                    🎓 심사위원 시연 툴:
                  </span>
                  {item.step < 5 && (
                    <button
                      onClick={() => handleSimulateTracking(item.id, item.step)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      다음 위치 단계로 시뮬레이션 (➜ {item.step + 1}단계)
                    </button>
                  )}
                  {item.status === 'REQUESTED' && role === 'MANAGER' && (
                    <button
                      onClick={() => handleAcceptByManager(item.id)}
                      className="text-xs bg-teal-600 hover:bg-teal-500 text-white font-bold px-3 py-1.5 rounded-lg transition shadow"
                    >
                      🩺 [매니저] 이 예약 즉시 수락하기
                    </button>
                  )}
                </div>

                {/* 리포트 액션 버튼 */}
                <div className="flex items-center gap-2">
                  {item.status === 'COMPLETED' ? (
                    <button
                      onClick={() => onOpenReport(item.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      <Icons.ClipboardCheck className="w-4 h-4" />
                      <span>안심 리포트 & AI 음성요약 열람</span>
                    </button>
                  ) : (
                    role === 'MANAGER' && item.step >= 4 && (
                      <button
                        onClick={() => onOpenManagerReport(item.id)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Icons.ClipboardCheck className="w-4 h-4" />
                        <span>진료 결과 안심 리포트 작성하기</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========================================================
// 6. 카카오톡 스타일 1:1 채팅 모듈 (KakaoChatModal)
// ========================================================
function KakaoChatModal({ reservationId, currentRole, currentUser, onClose, onToggleRole, showToast }) {
  const [messages, setMessages] = useState(() => window.withCareStore.getChatHistory(reservationId));
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);

  const reservation = window.withCareStore.getReservationById(reservationId);
  const manager = reservation && reservation.managerId 
    ? window.withCareStore.getManagerById(reservation.managerId) 
    : DEFAULT_MANAGERS[0];

  useEffect(() => {
    const unsubscribe = window.withCareStore.subscribe(() => {
      setMessages([...window.withCareStore.getChatHistory(reservationId)]);
    });
    return () => unsubscribe();
  }, [reservationId]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text || !text.trim()) return;

    const senderRole = currentRole; // 'GUARDIAN' 또는 'MANAGER'
    const senderName = currentRole === 'GUARDIAN' 
      ? (currentUser.name || '보호자') 
      : `${manager.name} 매니저`;

    window.withCareStore.sendChatMessage(reservationId, text, senderRole, senderName);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#bacee0] rounded-3xl max-w-md w-full h-[620px] flex flex-col shadow-2xl border border-slate-300 overflow-hidden font-sans">
        {/* 카카오톡 상단 헤더 */}
        <div className="bg-[#a0b8cc] px-4 py-3 flex items-center justify-between text-slate-800 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <img src={manager.avatar} alt={manager.name} className="w-9 h-9 rounded-full object-cover border border-white" />
            <div>
              <div className="font-extrabold text-sm flex items-center gap-1 text-slate-900">
                <span>{manager.name} 매니저</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-1 rounded">인증</span>
              </div>
              <p className="text-[10px] text-slate-600">환자: {reservation.patientName} 님 병원 동행</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 시연용 모드 즉시 전환 칩 */}
            <button
              onClick={() => onToggleRole(currentRole === 'GUARDIAN' ? 'MANAGER' : 'GUARDIAN')}
              className="text-[10px] font-bold bg-white/70 hover:bg-white text-slate-800 px-2 py-1 rounded-md transition"
              title="상대방 시점으로 변경하여 메시지 수신 테스트"
            >
              시점: {currentRole === 'GUARDIAN' ? '보호자' : '매니저'} ⇄
            </button>
            <button onClick={onClose} className="text-slate-700 font-bold px-1.5 hover:text-black">✕</button>
          </div>
        </div>

        {/* 퀵 메시지 칩 바 */}
        <div className="bg-white/40 px-3 py-1.5 flex gap-1.5 overflow-x-auto text-[10px] border-b border-black/5">
          {currentRole === 'GUARDIAN' ? (
            <>
              <button onClick={() => handleSend('출발하실 때 연락 주세요!')} className="bg-white text-slate-800 px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                "출발하실 때 연락 주세요!"
              </button>
              <button onClick={() => handleSend('어머니 복약 설명 꼭 부탁드립니다')} className="bg-white text-slate-800 px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                "어머니 복약 설명 꼭 부탁드립니다"
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleSend('자택 앞 5분 전 도착 예정입니다!')} className="bg-teal-700 text-white px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                "자택 앞 5분 전 도착 예정입니다!"
              </button>
              <button onClick={() => handleSend('병원 1층 로비 도착 및 접수 완료했습니다')} className="bg-teal-700 text-white px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                "병원 1층 로비 접수 완료했습니다"
              </button>
            </>
          )}
        </div>

        {/* 대화 메시지 영역 */}
        <div ref={chatBottomRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {messages.map((m) => {
            const isMe = m.sender === currentRole;
            const isSystem = m.sender === 'SYSTEM';

            if (isSystem) {
              return (
                <div key={m.id} className="text-center my-2">
                  <span className="bg-black/15 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full">
                    {m.text}
                  </span>
                </div>
              );
            }

            return (
              <div key={m.id} className={`flex items-start gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isMe && (
                  <img 
                    src={m.avatar || manager.avatar} 
                    alt={m.senderName} 
                    className="w-8 h-8 rounded-full object-cover border shrink-0" 
                  />
                )}
                <div className={`max-w-[70%] space-y-0.5 ${isMe ? 'items-end text-right' : 'items-start text-left'}`}>
                  {!isMe && <span className="text-[10px] text-slate-600 block ml-1">{m.senderName}</span>}
                  <div className={`flex items-end gap-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div 
                      className={`p-2.5 rounded-2xl text-xs break-words shadow-sm font-medium ${
                        isMe 
                          ? 'bg-[#fee500] text-slate-900 rounded-tr-none' 
                          : 'bg-white text-slate-900 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap">{m.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 입력창 */}
        <div className="bg-white p-3 border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }} 
            className="flex gap-2"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentRole === 'GUARDIAN' ? '보호자로서 메시지 입력...' : '매니저로서 메시지 입력...'}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-[#fee500] hover:bg-[#ebd300] text-slate-900 font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 7. 안심 리포트 열람 & AI 음성요약 & 등급별 잠금 모달 (ReportModal)
// ========================================================
function ReportModal({ reservationId, onClose, showToast }) {
  const reservation = window.withCareStore.getReservationById(reservationId);
  const report = reservation ? reservation.report : null;
  const manager = reservation && reservation.managerId ? window.withCareStore.getManagerById(reservation.managerId) : DEFAULT_MANAGERS[0];

  // 별점 및 리뷰 폼 상태
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['친절하고 따뜻해요', '의사 소견을 상세히 전해줘요']);
  const [reviewComment, setReviewComment] = useState('');

  // 음성 재생 시뮬레이션 상태
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!reservation || !report) return null;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    window.withCareStore.addReview(reservationId, {
      rating,
      tags: selectedTags,
      comment: reviewComment || '김서연 매니저님 덕분에 직장에서도 부모님 진료를 안심하고 챙길 수 있었습니다. 정말 감사합니다!'
    });
    showToast('소중한 별점과 후기가 등록되었으며, 해당 매니저의 평점에 실시간 반영되었습니다!', 'success');
  };

  const handleTogglePremiumLock = () => {
    window.withCareStore.togglePremiumUnlock(reservationId);
    showToast(
      report.premiumReportUnlocked 
        ? '심층 건강 리포트가 잠금 상태로 전환되었습니다.' 
        : '🎉 [BM 시뮬레이션] 프리미엄 심층 건강 리포트가 잠금 해제되었습니다!', 
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 sm:px-8 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
              <Icons.ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900">병원 동행 안심 리포트</h3>
              <p className="text-xs text-slate-500">
                {reservation.patientName} 님 · {reservation.hospital} ({reservation.department})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        {/* 본문 콘텐츠 */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* 매니저 프로필 & 요약 */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center gap-4">
            <img src={manager.avatar} alt={manager.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow" />
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-sm text-slate-900">{manager.name} 동행 매니저</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">{manager.badge}</span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">"{report.managerMessage}"</p>
              <div className="text-[10px] text-emerald-700">동행 완료 시각: {report.completedAt}</div>
            </div>
          </div>

          {/* 1. 보호자 안내용 진료 결과 (매니저 직접 입력본) */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>1. 전문의 진료 소견 및 검사 결과 요약 (매니저 기록)</span>
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {report.medicalSummary}
            </div>
          </div>

          {/* 다음 재진일 & 처방약 복용법 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 space-y-1">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1">
                <Icons.Calendar className="w-4 h-4 text-sky-600" />
                <span>다음 병원 재진 예약일</span>
              </span>
              <div className="font-extrabold text-slate-900 text-xs sm:text-sm pt-1">{report.nextAppointment}</div>
            </div>
            <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-1">
              <span className="text-xs font-bold text-teal-800 flex items-center gap-1">
                <Icons.Pill className="w-4 h-4 text-teal-600" />
                <span>처방약 수령 및 복약 지도</span>
              </span>
              <div className="font-bold text-slate-900 text-xs pt-1">{report.prescriptions}</div>
            </div>
          </div>

          {/* 2. AI 음성 녹음 요약 (시뮬레이션 UI) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>2. 진료실 AI 음성 녹음본 분석 및 핵심 요약 뷰 (시뮬레이션)</span>
              </h4>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                AI STT 정확도 {SAMPLE_AI_VOICE_SUMMARY.sttAccuracy}
              </span>
            </div>

            <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-200 space-y-3">
              {/* 가상 오디오 플레이어 웨이브폼 UI */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-purple-100">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center text-xs shadow shrink-0"
                >
                  {isPlayingAudio ? '⏸' : '▶'}
                </button>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-purple-950">
                    <span>진료실 녹음 파일: audio_consultation_202610.mp3</span>
                    <span>{isPlayingAudio ? '03:12 / 14:32' : '14:32 (전체)'}</span>
                  </div>
                  {/* 가상 음파 파형 */}
                  <div className="flex items-center gap-1 h-4">
                    {[40, 70, 30, 90, 60, 100, 45, 80, 20, 95, 70, 50, 85, 30, 60, 90, 40].map((h, i) => (
                      <span 
                        key={i} 
                        className={`w-1 rounded-full ${isPlayingAudio ? 'bg-purple-600 animate-pulse' : 'bg-purple-300'}`} 
                        style={{ height: `${h}%` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 핵심 추출 요약 불렛 포인트 */}
              <div className="bg-white/80 p-3.5 rounded-xl border border-purple-100 space-y-2 text-xs">
                <span className="font-bold text-purple-900 block">📌 AI 추출 진료 핵심 요약 3포인트:</span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  {SAMPLE_AI_VOICE_SUMMARY.keyBulletPoints.map((pt, idx) => (
                    <li key={idx} className="font-medium">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. 리포트 등급별 잠금 (수익화 시뮬레이션 B2B/B2C 프리미엄 BM) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>3. 심층 건강 리포트 (프리미엄 구독 잠금 모델)</span>
              </h4>
              <button
                type="button"
                onClick={handleTogglePremiumLock}
                className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 transition"
              >
                {report.premiumReportUnlocked ? '🔒 다시 잠그기' : '🔓 [BM 시연] 잠금 해제 토글'}
              </button>
            </div>

            {report.premiumReportUnlocked ? (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-300 space-y-3 text-xs animate-fadeIn">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                  <span>✨ 프리미엄 심층 건강 리포트 (잠금 해제됨)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                  <div className="bg-white p-3 rounded-xl border border-amber-200">
                    <span className="font-bold text-amber-800 block mb-1">📊 AI 혈압/혈당 추세 분석</span>
                    <p className="text-[11px] text-slate-600">최근 3개월 수치 변동성 분석 결과 안정 구간 진입. 기립성 저혈압 위험도 '관심' 단계.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-200">
                    <span className="font-bold text-amber-800 block mb-1">🏃 맞춤형 관절 재활 운동 가이드</span>
                    <p className="text-[11px] text-slate-600">무릎 연골 부담을 줄이는 의자 스트레칭 3종 영상 및 매일 30분 보행 코스 추천.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative bg-slate-100 rounded-2xl p-6 border border-slate-300 text-center space-y-3 overflow-hidden">
                <div className="filter blur-sm select-none opacity-40 text-left text-xs space-y-2">
                  <p>■■■■■ AI 혈압/혈당 6개월 장기 추세 변동성 분석 및 위험도 경보 ■■■■■</p>
                  <p>■■■■■ 재활 전문의 감수 맞춤 영양 식단 및 관절 가동 범위 회복 운동법 ■■■■■</p>
                  <p>■■■■■ 24시간 실시간 응급 관제 센터 및 비상 호출 패키지 연계 ■■■■■</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold mb-2 shadow-lg">
                    <Icons.Lock className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-sm text-white">프리미엄 심층 건강 리포트 잠금 (B2C/B2B 모델)</span>
                  <p className="text-[11px] text-slate-200 max-w-md mt-1">
                    기본 진료 요약은 무료 제공되며, AI 혈압 추세 및 재활 가이드는 유료 구독 모델로 제공됩니다.
                  </p>
                  <button
                    onClick={handleTogglePremiumLock}
                    className="mt-3 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-lg shadow"
                  >
                    발표 시연용 잠금 해제 체험하기 ➜
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. 증빙 사진 Mockup */}
          {report.photos && (
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span>4. 안심 현장 사진 및 영수증 증빙</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {report.photos.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                    <img src={p.url} alt={p.label} className="w-full h-28 object-cover" />
                    <div className="p-2 text-center text-xs font-bold text-slate-700">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. 동행 종료 만족도 평가 (매니저 평점에 실시간 반영!) */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Icons.Star className="w-5 h-5 text-amber-500" filled={true} />
              <span>동행 매니저 만족도 평가 (매니저 평점에 실시간 반영 연동)</span>
            </h4>

            {reservation.review ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4" filled={i < reservation.review.rating} />
                    ))}
                    <span className="font-extrabold text-slate-900 ml-1">{reservation.review.rating}.0 / 5.0</span>
                  </div>
                  <span className="text-[10px] text-slate-400">등록일: {reservation.review.createdAt}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {reservation.review.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-white text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full">
                      ✓ {t}
                    </span>
                  ))}
                </div>
                <p className="text-slate-800 font-medium pt-1">"{reservation.review.comment}"</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">만족도 별점 선택</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setRating(s)} className="text-amber-400 hover:scale-125 transition">
                        <Icons.Star className="w-6 h-6" filled={s <= rating} />
                      </button>
                    ))}
                    <span className="font-extrabold text-slate-900 text-sm ml-2">{rating}.0점</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">칭찬 키워드 선택</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['친절하고 따뜻해요', '의사 소견을 상세히 전해줘요', '시간 약속을 철저히 지켜요', '어르신 부축이 능숙해요'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTag(t)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                          selectedTags.includes(t) ? 'bg-sky-600 text-white border-sky-600 font-bold' : 'bg-white text-slate-600 border-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">매니저에게 남기는 한줄 감사평</label>
                  <textarea
                    rows="2"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="김서연 매니저님 덕분에 직장에서도 부모님 진료를 안심하고 챙길 수 있었습니다..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow transition"
                >
                  별점 및 리뷰 등록 완료 (매니저 평점에 즉시 반영)
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-slate-50 px-6 sm:px-8 py-3.5 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 8. 매니저 전용 리포트 작성 모달 (ManagerReportEditorModal)
// ========================================================
function ManagerReportEditorModal({ reservationId, onClose, showToast }) {
  const reservation = window.withCareStore.getReservationById(reservationId);
  const existingReport = reservation ? reservation.report : null;

  const [medicalSummary, setMedicalSummary] = useState(
    existingReport ? existingReport.medicalSummary : `${reservation.department} 전문의 진료 완료. 진료 소견 및 X-ray 결과 전달 완료.`
  );
  const [nextAppointment, setNextAppointment] = useState(
    existingReport ? existingReport.nextAppointment : '4주 뒤 정기 외래 진료 예약 완료'
  );
  const [prescriptions, setPrescriptions] = useState(
    existingReport ? existingReport.prescriptions : '처방약 14일분 수령 및 아침/저녁 식후 30분 복약 설명 완료'
  );
  const [patientCondition, setPatientCondition] = useState(
    existingReport ? existingReport.patientCondition : '보행 시 안정적인 상태 유지하셨으며, 자택 거실까지 안전하게 부축해 드렸습니다.'
  );
  const [managerMessage, setManagerMessage] = useState(
    existingReport ? existingReport.managerMessage : '어르신께서 편안하게 진료 잘 마치셨습니다. 가족분들 모두 안심하세요!'
  );

  const handleSave = (e) => {
    e.preventDefault();
    window.withCareStore.saveReport(reservationId, {
      medicalSummary,
      nextAppointment,
      prescriptions,
      patientCondition,
      managerMessage
    });
    showToast('진료 결과 안심 리포트가 성공적으로 저장 및 전송되었습니다.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500"></span>
            <h3 className="font-extrabold text-slate-900 text-base">
              진료 결과 안심 리포트 작성 (동행 매니저 전용)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">전문의 진료 소견 및 검사 결과 요약 *</label>
            <textarea
              rows="3"
              value={medicalSummary}
              onChange={(e) => setMedicalSummary(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">다음 병원 재진일 *</label>
              <input
                type="text"
                value={nextAppointment}
                onChange={(e) => setNextAppointment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">처방약 및 복약 안내 (필수) *</label>
              <input
                type="text"
                value={prescriptions}
                onChange={(e) => setPrescriptions(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">당일 어르신 건강 상태 및 거동 메모</label>
            <textarea
              rows="2"
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">보호자에게 남기는 안심 메시지</label>
            <textarea
              rows="2"
              value={managerMessage}
              onChange={(e) => setManagerMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl">취소</button>
            <button type="submit" className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-xl shadow">
              리포트 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 9. B2B / B2C 수익모델 상세 모달 (B2BModal)
// ========================================================
function B2BModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">BM</span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">위드케어 수익화 모델 (B2B & B2C 프리미엄)</h3>
              <p className="text-[10px] text-slate-500">수업 프로젝트 심사위원 및 평가 참고용</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-sky-950">
            <h4 className="font-bold text-sm mb-1">📌 비즈니스 모델 요약 (Core Value & Multi-Monetization)</h4>
            <p className="text-xs leading-relaxed">
              단순 동행 중개수수료(15~20%)에 머무르지 않고, <strong>AI 증상 데이터 기반 병원 타겟 광고</strong>, 
              외래 패스트트랙 제휴 수수료, 기업 임직원 복지 B2B 구독, 그리고 <strong>심층 건강 리포트 잠금(B2C 프리미엄 모델)</strong>을 결합한 하이브리드 수익 구조를 수립했습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {B2B_MODEL_POINTS.map((bm, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">{bm.badge}</span>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm pt-1">{bm.title}</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">{bm.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl">닫기</button>
        </div>
      </div>
    </div>
  );
}

// 렌더링 마운트
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
