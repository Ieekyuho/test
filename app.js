// app.js - 위드케어(WithCare) 병원 동행서비스 React 메인 애플리케이션

const { useState, useEffect, useMemo } = React;

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
  ChevronRight: (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
};

function App() {
  // 상태 관리
  const [role, setRole] = useState(window.withCareStore.getRole());
  const [reservations, setReservations] = useState(window.withCareStore.getReservations());
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'ai' | 'booking' | 'dashboard'
  const [dashboardFilter, setDashboardFilter] = useState('ALL'); // 'ALL' | 'REQUESTED' | 'MATCHED' | 'COMPLETED'
  const [bookingPrefill, setBookingPrefill] = useState({ hospital: '', department: '' });
  
  // 모달 상태
  const [activeModal, setActiveModal] = useState(null); // { type: 'report'|'managerReport'|'b2b', reservationId: '...' }
  const [toast, setToast] = useState(null);

  // 스토어 구독
  useEffect(() => {
    const unsubscribe = window.withCareStore.subscribe((state) => {
      setRole(state.role);
      setReservations([...state.reservations]);
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
        ? '동행 매니저 모드로 전환되었습니다. 예약 수락 및 안심 리포트 작성이 가능합니다.' 
        : '보호자 모드로 전환되었습니다. 예약 신청 및 실시간 안심 상태 확인이 가능합니다.',
      'info'
    );
  };

  const handleResetData = () => {
    if (window.confirm('모든 예약 데이터를 시연용 초기 상태로 리셋하시겠습니까?')) {
      window.withCareStore.resetToInitial();
      showToast('데모 데이터가 초기 상태로 재설정되었습니다.', 'success');
    }
  };

  const navigateToBookingWithHospital = (hospitalName, deptName) => {
    setBookingPrefill({ hospital: hospitalName, department: deptName });
    setActiveTab('booking');
    showToast(`'${hospitalName}' 정보가 예약 폼에 자동 입력되었습니다.`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 토스트 알림 */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-bounce text-sm font-medium">
          <span className="text-emerald-400">
            {toast.type === 'success' ? <Icons.Check className="w-5 h-5" /> : <Icons.Sparkles className="w-5 h-5" />}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 데모 시연 가이드 탑 배너 */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 text-white text-xs sm:text-sm py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px]">대학교 프로젝트 데모 MVP</span>
            <span className="hidden sm:inline">실시간 매칭 및 안심 리포트 시연용 풀스택 웹 애플리케이션</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleResetData}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition"
              title="초기 더미 데이터 복원"
            >
              <Icons.RotateCcw className="w-3.5 h-3.5" />
              <span>데이터 리셋</span>
            </button>
            <button 
              onClick={() => setActiveModal({ type: 'b2b' })}
              className="text-xs bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/30 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition"
            >
              <Icons.TrendingUp className="w-3.5 h-3.5" />
              <span>B2B 수익모델 보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* 로고 */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
              <Icons.Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">위드케어</span>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">WithCare</span>
              </div>
              <p className="text-[11px] text-slate-500 -mt-0.5">부모님 안심 병원 동행 매칭</p>
            </div>
          </div>

          {/* 중앙 네비 메뉴 */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'home' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              서비스 소개
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'ai' ? 'text-purple-700 bg-purple-50 font-bold' : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
              }`}
            >
              <Icons.Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI 증상 병원 찾기</span>
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'booking' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              간편 동행 예약
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold relative transition ${
                activeTab === 'dashboard' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{role === 'MANAGER' ? '매니저 업무 대시보드' : '예약 관리 & 대시보드'}</span>
              <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-sky-100 text-sky-700 font-bold">
                {reservations.length}
              </span>
            </button>
          </nav>

          {/* 우측 권한 모드 스위처 (보호자 <-> 동행 매니저) */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => handleRoleToggle('GUARDIAN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  role === 'MANAGER'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🩺</span>
                <span className="hidden sm:inline">동행 매니저 모드</span>
                <span className="sm:hidden">매니저</span>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 탭 바 */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-white py-2 px-1 text-xs font-medium">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${activeTab === 'home' ? 'text-sky-600 font-bold' : 'text-slate-500'}`}
          >
            <Icons.Hospital className="w-4 h-4" />
            <span>소개</span>
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
            <span>대시보드</span>
          </button>
        </div>
      </header>

      {/* 역할 안내 슬라이드 띠 (매니저 모드일 때 강조) */}
      {role === 'MANAGER' ? (
        <div className="bg-teal-50 border-b border-teal-200 py-2.5 px-4 text-xs sm:text-sm text-teal-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></span>
              <span className="font-bold text-teal-800">[동행 매니저 전용 모드]</span>
              <span>김서연 매니저님(요양보호사 1급), 신규 예약 요청을 확인하고 [수락] 및 [진료 안심 리포트]를 작성할 수 있습니다.</span>
            </div>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1 rounded-md transition whitespace-nowrap ml-2"
            >
              매니저 대시보드 바로가기
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-sky-50 border-b border-sky-100 py-1.5 px-4 text-xs text-sky-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>👨‍👩‍👧</span>
              <strong>[보호자(신청자) 모드]</strong>
              <span>부모님 동행 예약 신청 및 5단계 실시간 진행 상태와 안심 리포트를 확인하세요.</span>
            </span>
            <span className="text-slate-400 hidden md:inline">상단 우측에서 '동행 매니저 모드'로 자유롭게 전환 시연 가능</span>
          </div>
        </div>
      )}

      {/* 메인 뷰 분기 */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            onGoBooking={() => setActiveTab('booking')}
            onGoAI={() => setActiveTab('ai')}
            onGoDashboard={() => setActiveTab('dashboard')}
            onSelectHospital={navigateToBookingWithHospital}
            onOpenB2B={() => setActiveModal({ type: 'b2b' })}
          />
        )}

        {activeTab === 'ai' && (
          <AIFinderView 
            onSelectHospital={navigateToBookingWithHospital}
          />
        )}

        {activeTab === 'booking' && (
          <BookingView 
            prefill={bookingPrefill}
            onBookingComplete={(newRes) => {
              setActiveTab('dashboard');
              setDashboardFilter('ALL');
              showToast(`'${newRes.patientName}' 님의 동행 예약이 접수되었습니다! 매니저 매칭을 시작합니다.`, 'success');
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            role={role}
            reservations={reservations}
            filter={dashboardFilter}
            setFilter={setDashboardFilter}
            onOpenReport={(resId) => setActiveModal({ type: 'report', reservationId: resId })}
            onOpenManagerReport={(resId) => setActiveModal({ type: 'managerReport', reservationId: resId })}
            onGoBooking={() => setActiveTab('booking')}
            showToast={showToast}
          />
        )}
      </main>

      {/* 안심 리포트 모달 (보호자 확인 & 별점 리뷰 작성) */}
      {activeModal && activeModal.type === 'report' && (
        <ReportModal 
          reservationId={activeModal.reservationId}
          onClose={() => setActiveModal(null)}
          showToast={showToast}
        />
      )}

      {/* 매니저 전용 안심 리포트 작성/수정 모달 */}
      {activeModal && activeModal.type === 'managerReport' && (
        <ManagerReportEditorModal 
          reservationId={activeModal.reservationId}
          onClose={() => setActiveModal(null)}
          showToast={showToast}
        />
      )}

      {/* B2B 비즈니스 모델 상세 모달 */}
      {activeModal && activeModal.type === 'b2b' && (
        <B2BModal 
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 푸터 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                  <Icons.Heart className="w-5 h-5 fill-white" />
                </div>
                <span className="font-extrabold text-xl text-white">위드케어 (WithCare)</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed mb-4">
                부모님의 외래 진료 동행부터 원내 수납, 약국 처방전 수령, 안전 귀가까지 
                자격증을 보유한 전문 매니저가 보호자의 마음으로 정성을 다해 함께합니다.
              </p>
              <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-sky-400">
                🎓 대학교 수업 프로젝트 발표 및 시연용 포트폴리오 웹 애플리케이션
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">서비스 바로가기</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setActiveTab('home'); window.scrollTo(0, 0); }} className="hover:text-white transition">서비스 소개 및 특징</button></li>
                <li><button onClick={() => { setActiveTab('ai'); window.scrollTo(0, 0); }} className="hover:text-white transition">AI 증상 분석 및 병원 추천</button></li>
                <li><button onClick={() => { setActiveTab('booking'); window.scrollTo(0, 0); }} className="hover:text-white transition">동행 예약 신청 폼</button></li>
                <li><button onClick={() => { setActiveTab('dashboard'); window.scrollTo(0, 0); }} className="hover:text-white transition">실시간 매칭 대시보드</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">B2B 파트너십 & 고객센터</h4>
              <ul className="space-y-2 text-xs">
                <li>병원 타겟 광고 및 제휴 문의</li>
                <li>기업 임직원 부모님 복지 정기 구독</li>
                <li>고객센터: 1544-9988 (평일 09:00 - 18:00)</li>
                <li>응급 상황 24시간 안심 관제 센터 연계</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 WithCare. All rights reserved. University Course Project MVP Demonstration.</p>
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

// ==========================================
// 1. 랜딩 페이지 뷰 (HomeView)
// ==========================================
function HomeView({ onGoBooking, onGoAI, onGoDashboard, onSelectHospital, onOpenB2B }) {
  const [quickSymptom, setQuickSymptom] = useState('');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 좌측 메인 카피 */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-sky-100/80 border border-sky-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800">
                <Icons.ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>100% 자격증 보유 전문 매니저 · 배상책임보험 가입</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                부모님 병원 가는 날,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700">
                  든든한 동행 매니저
                </span>를 만나보세요
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                직장 출근과 바쁜 일상으로 직접 동행하지 못해 무거운 마음, 이제 덜어내세요.<br className="hidden sm:inline" />
                자택 픽업부터 진료실 동행, 수납 및 처방약 수령, 귀가까지 전문 자격증(간호/요양)을 보유한 
                매니저가 자녀의 마음으로 곁에서 함께합니다.
              </p>

              {/* CTA 버튼 그룹 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onGoBooking}
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <Icons.Calendar className="w-5 h-5" />
                  <span>간편 동행 예약하기</span>
                  <Icons.ArrowRight className="w-5 h-5 ml-1" />
                </button>
                <button
                  onClick={onGoAI}
                  className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <Icons.Sparkles className="w-5 h-5 text-purple-600" />
                  <span>AI 증상 기반 병원 추천</span>
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
                  <div className="text-xs text-slate-500 font-medium">전문 자격증 검증</div>
                </div>
              </div>
            </div>

            {/* 우측 실시간 시연 프리뷰 카드 */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-700">실시간 동행 안심 관제</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">
                    진행 중 라이브
                  </span>
                </div>

                <div className="py-4 space-y-4">
                  {/* 동행 매니저 프로필 미니 */}
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <img 
                      src={DEFAULT_MANAGERS[0].avatar} 
                      alt="김서연 매니저" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900">김서연 매니저</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-1.5 py-0.5 rounded">요양보호사 1급</span>
                      </div>
                      <p className="text-xs text-slate-500">신촌 세브란스병원 순환기내과 동행 중</p>
                    </div>
                  </div>

                  {/* 5단계 진행 트래커 미니 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-sky-700">현재: ④ 병원 진료 및 의사 소견 메모 중</span>
                      <span className="text-slate-400">80%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-sky-500 to-teal-500 h-full rounded-full w-4/5 animate-pulse"></div>
                    </div>
                  </div>

                  {/* 실시간 알림 피드 */}
                  <div className="bg-sky-50/60 rounded-xl p-3 border border-sky-100 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>10:45 실시간 안심 알림</span>
                      <span className="text-emerald-600 font-bold">전송 완료</span>
                    </div>
                    <p className="font-medium text-slate-800">
                      "이진우 교수님 진료실 동행 완료했습니다. 심전도 검사 결과 양호하며 처방약 수령 후 댁으로 출발 예정입니다."
                    </p>
                  </div>
                </div>

                <button
                  onClick={onGoDashboard}
                  className="w-full mt-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>내 예약 대시보드에서 전체 상태 확인하기</span>
                  <Icons.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 신뢰 포인트 요약 카드 3개 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 mb-2">WHY WITHCARE</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              가족을 맡길 수 있는 3가지 안심 기준
            </h3>
            <p className="text-slate-500 text-sm mt-3">
              단순 이동 보조를 넘어, 병원 진료의 전 과정을 책임지는 전문 헬스케어 동행 서비스입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-2xl p-8 border border-sky-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-6 shadow-md shadow-sky-600/20 group-hover:scale-110 transition">
                <Icons.ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">신뢰 검증</span>
              <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">
                100% 자격증 보유 매니저
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                간호사, 간호조무사, 요양보호사 1급, 사회복지사 등 국가 공인 자격증 소지자만 선발합니다.
                철저한 신원 보증 및 성범죄 경력 조회, 정기 응급처치(CPR) 교육을 통과한 매니저만 배정됩니다.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-sky-600" />
                  <span>국가공인 자격증 100% 전수 검증</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-sky-600" />
                  <span>업계 최고 한도 영업배상책임보험 가입</span>
                </li>
              </ul>
            </div>

            {/* 카드 2 */}
            <div className="bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-8 border border-teal-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-6 shadow-md shadow-teal-600/20 group-hover:scale-110 transition">
                <Icons.ClipboardCheck className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">실시간 투명성</span>
              <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">
                실시간 5단계 안심 리포트
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                ① 예약 완료 ➜ ② 매니저 배정 ➜ ③ 자택 픽업 ➜ ④ 병원 진료 중 ➜ ⑤ 귀가 완료까지 
                진행 상황을 실시간 앱 알림으로 제공합니다. 진료 후 의사 소견과 처방전 사진까지 꼼꼼히 전달합니다.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-teal-600" />
                  <span>진료 의사 소견 & 다음 재진일 상세 기록</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-teal-600" />
                  <span>처방전 사진 및 식후 복약 지도 전달</span>
                </li>
              </ul>
            </div>

            {/* 카드 3 */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-600/20 group-hover:scale-110 transition">
                <Icons.Users className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">맞춤 케어</span>
              <h4 className="text-xl font-bold text-slate-900 mt-3 mb-2">
                1:1 맞춤 전담 동행 케어
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                어르신의 거동 상태(독립 보행, 부축 필요, 휠체어 이용)에 맞추어 전문 케어를 제공합니다.
                복잡한 대형 종합병원 키오스크 접수, 원내 수납, 약국 조제 수령까지 전 과정을 옆에서 보좌합니다.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-blue-600" />
                  <span>휠체어 상하차 및 보행 부축 전담 매니저 배정</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <Icons.Check className="w-4 h-4 text-blue-600" />
                  <span>보호자 사전 요청사항(귀가 어두우심 등) 100% 반영</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 랜딩 내장형: AI 증상 분석 및 병원 찾기 섹션 */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <Icons.Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI 의료 언어 모델 탑재</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                어디가 아프신지 말씀해주시면,<br />
                <span className="text-purple-400">맞춤 진료과 & 제휴 병원</span>을 추천합니다
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                "어머니가 자꾸 다리가 저리고 걷기 힘드셔", "가슴이 뻐근하고 숨이 차요"와 같이
                일상 언어로 편하게 물어보세요. AI가 질환 의심군과 최적의 전문 병원을 찾아 즉시 동행 예약으로 연동해 드립니다.
              </p>
              <button
                onClick={onGoAI}
                className="mt-2 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-purple-600/30"
              >
                <span>AI 병원 찾기 전체 화면 열기</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl border border-slate-700 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  자주 묻는 어르신 주요 증상 예시 클릭
                </span>
                <span className="text-[11px] text-purple-300">원클릭 분석</span>
              </div>

              {/* 프리셋 칩들 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {SYMPTOM_ANALYSIS_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectHospital('신촌 세브란스병원', preset.department)}
                    className="text-xs bg-slate-700/80 hover:bg-purple-900/50 text-slate-200 hover:text-purple-200 border border-slate-600 hover:border-purple-500 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>💡</span>
                    <span>{preset.chipText}</span>
                  </button>
                ))}
              </div>

              {/* 추천 제휴 병원 맛보기 카드 */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-sky-400 bg-sky-950/70 border border-sky-800 px-2 py-0.5 rounded mr-2">
                      정형외과 / 척추관절센터 추천
                    </span>
                    <h5 className="font-bold text-white text-base mt-1">신촌 세브란스병원</h5>
                  </div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                    <Icons.Star className="w-4 h-4" filled={true} />
                    <span>4.9 (1,820)</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  서울시 서대문구 연세로 50-1 · 위드케어 공식 제휴 외래 접수 패스트트랙 운영
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-[11px] text-emerald-400 font-medium">✓ 동행 매니저 전용 대기석 완비</span>
                  <button
                    onClick={() => onSelectHospital('신촌 세브란스병원', '정형외과')}
                    className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition"
                  >
                    이 병원으로 예약하기 ➜
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B 비즈니스 모델 설명 섹션 (요구사항 반영) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">BUSINESS MODEL & EXPANSION</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                중개수수료 외 병원 타겟 광고 및 제휴 마케팅 (B2B BM)
              </h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xl">
                단순 매칭 수수료에 의존하지 않고, 헬스케어 생태계 전반과 연계된 확장성 높은 다각화 수익 구조를 실현합니다.
              </p>
            </div>
            <button
              onClick={onOpenB2B}
              className="mt-4 md:mt-0 self-start text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Icons.TrendingUp className="w-4 h-4" />
              <span>B2B 사업 계획서 상세 보기</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {B2B_MODEL_POINTS.map((bm, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                    {bm.badge}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  {bm.title}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {bm.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 검증된 전문 매니저 쇼케이스 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">CERTIFIED CAREGIVERS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              부모님 곁을 지키는 전문 동행 매니저
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              실제 활동 중인 위드케어 대표 매니저들을 미리 만나보세요. 100% 국가 자격증과 범죄경력 조회가 완료되었습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_MANAGERS.map((mgr) => (
              <div key={mgr.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition">
                <div className="relative mb-4">
                  <img 
                    src={mgr.avatar} 
                    alt={mgr.name} 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow" title="자격증 검증 완료">
                    ✓
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{mgr.name} 매니저</h4>
                <p className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 mt-1">
                  {mgr.badge}
                </p>

                <div className="flex items-center gap-1 my-3 text-xs">
                  <span className="flex text-amber-400">
                    <Icons.Star className="w-4 h-4" filled={true} />
                  </span>
                  <span className="font-extrabold text-slate-900">{mgr.rating}</span>
                  <span className="text-slate-400 font-normal">({mgr.reviewCount}회 후기)</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  "{mgr.intro}"
                </p>

                <div className="w-full pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                  <span>누적 동행</span>
                  <strong className="text-slate-800">{mgr.completedTrips}회 완료</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 보호자 이용후기 */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">GUARDIAN REVIEWS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              직장인 자녀들이 직접 전하는 생생 후기
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              불안했던 마음이 안심으로 바뀌는 순간, 실제 보호자분들의 목소리입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUARDIAN_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
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
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-slate-500 text-[11px]">{t.relation}</div>
                  </div>
                  <span className="text-slate-400 text-[11px]">{t.hospital}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 CTA 배너 */}
          <div className="mt-16 bg-gradient-to-r from-sky-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              다음 번 부모님 병원 진료, 위드케어와 함께하세요
            </h3>
            <p className="text-sky-100 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
              1분 만에 끝나는 간편 예약으로 전문 자격증을 보유한 따뜻한 매니저가 배정됩니다.
            </p>
            <button
              onClick={onGoBooking}
              className="bg-white text-sky-700 hover:bg-slate-100 font-extrabold text-base px-8 py-4 rounded-xl shadow-lg transition transform active:scale-95"
            >
              지금 바로 동행 예약 신청하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. AI 증상 분석 및 병원 추천 뷰 (AIFinderView)
// ==========================================
function AIFinderView({ onSelectHospital }) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // 자연어 키워드 매칭 분석 함수
  const runAnalysis = (inputQuery) => {
    const text = inputQuery.trim();
    if (!text) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // AI 시뮬레이션 지연 (약 800ms)
    setTimeout(() => {
      // 1. 프리셋 중 매칭 검사
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

      // 기본 폴백 (자연어 일반 입력 대응)
      if (!matched) {
        matched = {
          department: '가정의학과 / 종합외래센터',
          analysisSummary: `'${text}' 증상에 대한 전반적인 기초 진단 및 원인 감별을 위해 상급 종합병원 외래 또는 전문 클리닉 진료를 권장합니다.`,
          suggestedHospitalIds: ['hosp-1', 'hosp-2', 'hosp-3']
        };
      }

      // 추천 병원 목록 추출
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

  const handleChipClick = (preset) => {
    setQuery(preset.fullQuery);
    runAnalysis(preset.fullQuery);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
          <Icons.Sparkles className="w-4 h-4 text-purple-600" />
          <span>위드케어 AI 헬스케어 어시스턴트</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI 자연어 증상 기반 전문 병원 추천
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          부모님의 증상을 일상 대화처럼 입력하세요. 최적의 진료과와 검증된 제휴 병원을 추천하고 즉시 동행 예약으로 연동합니다.
        </p>
      </div>

      {/* 증상 입력창 */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto mb-8">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          증상 자연어 입력 (예: 어머니가 자꾸 다리가 저리고 걷기 힘드셔)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runAnalysis(query)}
              placeholder="예: 어머니가 자꾸 다리가 저리고 걷기 힘드셔, 계단 내려갈 때 무릎이 시큰거려요..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
            />
          </div>
          <button
            onClick={() => runAnalysis(query)}
            disabled={!query.trim() || isAnalyzing}
            className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>분석 중</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Icons.Sparkles className="w-4 h-4" />
                <span>AI 분석하기</span>
              </span>
            )}
          </button>
        </div>

        {/* 퀵 칩 선택기 */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 block mb-2">💡 빠른 증상 선택 예시:</span>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_ANALYSIS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleChipClick(preset)}
                className="text-xs bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 hover:border-purple-300 px-3 py-1.5 rounded-lg transition"
              >
                {preset.chipText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 분석 중 로딩 스켈레톤 */}
      {isAnalyzing && (
        <div className="max-w-3xl mx-auto bg-purple-50/60 rounded-2xl border border-purple-200 p-8 text-center animate-pulse space-y-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto">
            <Icons.Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <h4 className="text-base font-bold text-purple-900">
            의료 언어 모델이 증상 맥락을 분석하고 있습니다...
          </h4>
          <p className="text-xs text-purple-700">
            주요 키워드 추출 ➜ 의심 질환 및 진료과 매핑 ➜ 전문의 수 및 제휴 병원 거리 비교 중
          </p>
        </div>
      )}

      {/* AI 분석 결과 박스 및 추천 병원 리스트 */}
      {analysisResult && !isAnalyzing && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* AI 분석 요약 카드 */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-400/20 border border-purple-400/40 px-2.5 py-0.5 rounded-full text-xs font-bold text-purple-300">
                AI 진료과 추천 결과
              </span>
              <span className="text-xs text-purple-200">입력 증상: "{analysisResult.queryText}"</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800 pb-4 mb-4">
              <div>
                <span className="text-xs text-purple-300 font-semibold">추천 진료과</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {analysisResult.department}
                </h3>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs text-purple-200 border border-white/10">
                ⚡ 보건복지부 지정 전문병원 우선 선별 완료
              </div>
            </div>

            <p className="text-purple-100 text-sm leading-relaxed mb-4">
              {analysisResult.summary}
            </p>

            <div className="text-[11px] text-purple-300 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>본 AI 분석은 진료과 및 병원 선택을 돕기 위한 참고 정보이며, 정확한 진단은 전문의 외래 진료를 통해 확인해야 합니다.</span>
            </div>
          </div>

          {/* 추천 제휴 병원 목록 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>추천 전문 및 제휴 병원</span>
                <span className="text-xs bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                  {analysisResult.hospitals.length}곳 추천
                </span>
              </h4>
              <span className="text-xs text-slate-500">
                [이 병원으로 동행 예약하기] 클릭 시 예약 폼으로 즉시 연동됩니다.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisResult.hospitals.map((hosp) => (
                <div key={hosp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition">
                  <div>
                    {/* 상단 뱃지 및 제휴 배너 */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                        {hosp.category}
                      </span>
                      {hosp.isPartner && (
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Icons.ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>동행 제휴 병원</span>
                        </span>
                      )}
                    </div>

                    <h5 className="text-xl font-extrabold text-slate-900 mb-1">
                      {hosp.name}
                    </h5>
                    <p className="text-xs font-semibold text-sky-700 mb-3">
                      {hosp.department}
                    </p>

                    <p className="text-xs text-slate-600 flex items-center gap-1 mb-1">
                      <Icons.MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{hosp.address} (거리 약 {hosp.distanceKm})</span>
                    </p>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mb-4">
                      <Icons.Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>대표전화: {hosp.phone} · 전문의 {hosp.doctorCount}명</span>
                    </p>

                    {/* 태그 리스트 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hosp.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* B2B 제휴 혜택 박스 */}
                    {hosp.b2bBanner && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 font-medium mb-4 flex items-center gap-2">
                        <Icons.Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{hosp.b2bBanner}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA 버튼: 예약 폼으로 데이터 연동 */}
                  <button
                    onClick={() => onSelectHospital(hosp.name, hosp.department.split('/')[0].trim())}
                    className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Icons.Calendar className="w-4 h-4" />
                    <span>이 병원으로 동행 예약하기</span>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. 동행 예약 신청 페이지 (BookingView)
// ==========================================
function BookingView({ prefill, onBookingComplete }) {
  // 폼 입력 상태
  const [patientName, setPatientName] = useState('김순자');
  const [patientAge, setPatientAge] = useState(76);
  const [patientGender, setPatientGender] = useState('여성');
  const [patientPhone, setPatientPhone] = useState('010-3344-9988');

  const [guardianName, setGuardianName] = useState('김민수 (자녀)');
  const [guardianPhone, setGuardianPhone] = useState('010-9876-5432');

  const [mobility, setMobility] = useState('ASSISTED'); // INDEPENDENT, ASSISTED, WHEELCHAIR

  const [hospital, setHospital] = useState(prefill.hospital || '신촌 세브란스병원');
  const [department, setDepartment] = useState(prefill.department || '정형외과');
  const [doctor, setDoctor] = useState('전문의 진료');

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:30');

  const [pickupAddress, setPickupAddress] = useState('서울시 마포구 백범로 31길 21, 101동 502호');
  const [serviceDuration, setServiceDuration] = useState('2시간 기본');

  const [options, setOptions] = useState({
    pharmacy: true,
    paymentAssist: true,
    wheelchairRental: false
  });

  const [notes, setNotes] = useState('계단 오르실 때 무릎 통증이 심하시니 천천히 부축 부탁드립니다.');

  // prefill 변경 시 반영
  useEffect(() => {
    if (prefill.hospital) setHospital(prefill.hospital);
    if (prefill.department) setDepartment(prefill.department);
  }, [prefill]);

  // 실시간 예상 견적 계산
  const costCalculation = useMemo(() => {
    let base = 45000; // 2시간 기본

    if (serviceDuration === '3시간 심층') base = 65000;
    if (serviceDuration === '4시간 전일') base = 85000;

    let mobilitySurcharge = 0;
    if (mobility === 'ASSISTED') mobilitySurcharge = 10000;
    if (mobility === 'WHEELCHAIR') mobilitySurcharge = 20000;

    let optionCost = 0;
    if (options.pharmacy) optionCost += 10000; // 약국 수령 대행
    if (options.wheelchairRental) optionCost += 10000;

    const total = base + mobilitySurcharge + optionCost;

    return {
      base,
      mobilitySurcharge,
      optionCost,
      total
    };
  }, [serviceDuration, mobility, options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !hospital || !date || !pickupAddress) {
      alert('환자 성함, 병원명, 날짜 및 픽업 주소를 입력해주세요.');
      return;
    }

    const newRes = window.withCareStore.createReservation({
      patientName,
      patientAge,
      patientGender,
      patientPhone,
      guardianName,
      guardianPhone,
      mobility,
      hospital,
      department,
      doctor,
      date,
      time,
      pickupAddress,
      options,
      serviceDuration,
      notes,
      cost: costCalculation.total
    });

    onBookingComplete(newRes);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 타이틀 */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          병원 안심 동행 예약 신청
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          단일 스크롤 폼으로 간편하게 신청하실 수 있습니다. 작성된 정보는 배정된 전문 매니저에게 안전하게 전달됩니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측 입력 폼 영역 (8컬럼) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 섹션 1: 환자 정보 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">1</span>
              <h3 className="font-bold text-slate-900 text-base">환자 및 보호자 기본 정보</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">환자(부모님) 성함 *</label>
                <input 
                  type="text" 
                  value={patientName} 
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">연령(세) *</label>
                  <input 
                    type="number" 
                    value={patientAge} 
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">성별 *</label>
                  <select 
                    value={patientGender} 
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="여성">여성</option>
                    <option value="남성">남성</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">환자분 연락처</label>
                <input 
                  type="text" 
                  value={patientPhone} 
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">신청 보호자 성함 & 연락처 *</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={guardianName} 
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="성함(관계)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required 
                  />
                  <input 
                    type="text" 
                    value={guardianPhone} 
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* 거동 상태 선택 (3가지 카드) */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                어르신 거동 상태 선택 * (상태에 따른 전문 케어 매니저 배정)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => setMobility('INDEPENDENT')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    mobility === 'INDEPENDENT'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">🚶</span>
                    <span className="text-[11px] font-bold text-slate-500">기본 요율</span>
                  </div>
                  <div className="text-sm font-bold">① 혼자 걸음</div>
                  <p className="text-xs text-slate-500 font-normal mt-1">경미한 안내 및 원내 동행 보조</p>
                </div>

                <div 
                  onClick={() => setMobility('ASSISTED')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    mobility === 'ASSISTED'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">🤝</span>
                    <span className="text-[11px] font-bold text-sky-600">+10,000원</span>
                  </div>
                  <div className="text-sm font-bold">② 거동 불편 · 부축 필요</div>
                  <p className="text-xs text-slate-500 font-normal mt-1">보행 시 밀착 부축 및 차량 탑승 보조</p>
                </div>

                <div 
                  onClick={() => setMobility('WHEELCHAIR')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    mobility === 'WHEELCHAIR'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">♿</span>
                    <span className="text-[11px] font-bold text-sky-600">+20,000원</span>
                  </div>
                  <div className="text-sm font-bold">③ 휠체어 이용 필수</div>
                  <p className="text-xs text-slate-500 font-normal mt-1">휠체어 이동 지원 수료 매니저 배정</p>
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 2: 병원 방문 일정 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">2</span>
              <h3 className="font-bold text-slate-900 text-base">병원 방문 일정 및 진료과</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">방문 병원명 *</label>
                <input 
                  type="text" 
                  value={hospital} 
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="예: 신촌 세브란스병원"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  required 
                />
                {/* 퀵 병원 선택 버튼 */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="text-[10px] text-slate-400">빠른입력:</span>
                  {['신촌 세브란스병원', '서울성모병원', '서울아산병원', '바른세상병원'].map((h, i) => (
                    <button 
                      key={i} 
                      type="button" 
                      onClick={() => setHospital(h)}
                      className="text-[11px] text-slate-600 hover:text-teal-700 hover:bg-teal-50 px-1.5 py-0.5 rounded border border-slate-200"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">진료과 *</label>
                <select 
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="정형외과">정형외과 / 관절센터</option>
                  <option value="순환기내과">순환기내과 (심장내과)</option>
                  <option value="안과">안과 (백내장·녹내장)</option>
                  <option value="신경외과">신경외과 / 척추센터</option>
                  <option value="소화기내과">소화기내과</option>
                  <option value="호흡기내과">호흡기내과</option>
                  <option value="신경과">신경과 / 뇌신경센터</option>
                  <option value="이비인후과">이비인후과</option>
                  <option value="일반외래">기타 일반외래</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">희망 방문 날짜 (달력) *</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">희망 시간 선택 *</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['09:30', '10:30', '11:30', '14:00', '14:30', '15:30', '16:00', '16:30'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        time === slot
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 3: 픽업 주소 및 동행 범위 옵션 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">3</span>
              <h3 className="font-bold text-slate-900 text-base">자택 픽업 주소 및 서비스 범위 옵션</h3>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">자택 픽업 상세 주소 *</label>
                <button
                  type="button"
                  onClick={() => setPickupAddress('서울시 마포구 백범로 31길 21, 101동 502호')}
                  className="text-[11px] text-sky-600 hover:underline font-semibold"
                >
                  샘플 주소 채우기
                </button>
              </div>
              <input 
                type="text" 
                value={pickupAddress} 
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="시/도 구 동 아파트명 동호수까지 상세히 기재"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                required 
              />
            </div>

            {/* 기본 이용 시간 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">예상 소요 시간 선택</label>
              <div className="grid grid-cols-3 gap-3">
                {['2시간 기본', '3시간 심층', '4시간 전일'].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setServiceDuration(dur)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      serviceDuration === dur
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>{dur}</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                      {dur === '2시간 기본' ? '45,000원' : dur === '3시간 심층' ? '65,000원' : '85,000원'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 동행 추가 옵션 체크박스 */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">원내 대행 및 부가 옵션</label>
              
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={options.pharmacy}
                  onChange={(e) => setOptions({ ...options, pharmacy: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-800">진료 후 처방전 약국 조제 수령 및 복약 지도 (+10,000원)</div>
                  <div className="text-slate-500">약국 대기, 복약 방법 확인 후 자택 냉장고 부착 안내문 작성</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={options.paymentAssist}
                  onChange={(e) => setOptions({ ...options, paymentAssist: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-800">원내 무인 키오스크 수납 및 제증명 서류 발급 대행 (무료 제공)</div>
                  <div className="text-slate-500">진료비 영수증, 세부내역서 등 보험 청구용 서류 발급</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={options.wheelchairRental}
                  onChange={(e) => setOptions({ ...options, wheelchairRental: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-800">병원 내 휠체어 사전 대여 서비스 (+10,000원)</div>
                  <div className="text-slate-500">병원 로비 도착 즉시 사용 가능한 전용 휠체어 사전 확보</div>
                </div>
              </label>
            </div>

            {/* 특이사항 메모 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                매니저 전달 메모 및 안심 요청사항
              </label>
              <textarea 
                rows="2"
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="예: 귀가 조금 어두우셔서 진료실에서 의사 선생님 소견을 크게 메모해 주세요."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 우측 실시간 견적 박스 (4컬럼 스티키) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-5">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>실시간 예상 견적</span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">정찰제</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>기본 동행 요금 ({serviceDuration})</span>
                <span className="font-bold text-slate-900">{costCalculation.base.toLocaleString()}원</span>
              </div>

              {costCalculation.mobilitySurcharge > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>거동 상태 지원 추가금 ({mobility === 'WHEELCHAIR' ? '휠체어' : '부축'})</span>
                  <span className="font-bold text-slate-900">+{costCalculation.mobilitySurcharge.toLocaleString()}원</span>
                </div>
              )}

              {costCalculation.optionCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>부가 옵션 비용 (약국/대여)</span>
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

            <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1 font-semibold text-slate-700">
                <Icons.ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>현장 추가금 없는 사전 확정 견적</span>
              </p>
              <p>동행 완료 후 안심 리포트 확인 시 결제됩니다. (수업 데모에서는 결제 연동 생략)</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-sky-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Icons.Check className="w-5 h-5" />
              <span>동행 예약 신청 완료</span>
            </button>
          </div>

          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 text-xs text-sky-900 space-y-1.5">
            <span className="font-bold">💡 예약 후 진행 안내:</span>
            <p className="text-sky-800">
              신청 즉시 매니저 매칭 풀에 등록되며, 담당 매니저가 배정되면 실시간 진행 트래커를 통해 모든 과정을 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// 4. 예약 관리 및 대시보드 (DashboardView)
// ==========================================
function DashboardView({ role, reservations, filter, setFilter, onOpenReport, onOpenManagerReport, onGoBooking, showToast }) {
  // 필터링된 예약 목록
  const filtered = useMemo(() => {
    if (filter === 'ALL') return reservations;
    if (filter === 'REQUESTED') return reservations.filter(r => r.status === 'REQUESTED');
    if (filter === 'MATCHED') return reservations.filter(r => r.status === 'MATCHED' || r.status === 'IN_PROGRESS');
    if (filter === 'COMPLETED') return reservations.filter(r => r.status === 'COMPLETED');
    return reservations;
  }, [reservations, filter]);

  // 데모용: 다음 단계 진행 시뮬레이터 핸들러
  const handleSimulateNextStep = (resId, currentStep) => {
    const next = currentStep >= 5 ? 5 : currentStep + 1;
    window.withCareStore.updateStep(resId, next);
    
    const stepNames = ['', '예약 완료', '매니저 배정 완료', '자택 픽업 완료', '병원 진료 중', '귀가 완료'];
    showToast(`예약 [${resId}] 상태가 [${stepNames[next]}] 단계로 진행되었습니다.`, 'success');
  };

  // 매니저 모드: 예약 수락 핸들러
  const handleAcceptByManager = (resId) => {
    window.withCareStore.acceptReservation(resId, 'mgr-1');
    showToast(`김서연 매니저님이 예약 [${resId}] 건을 수락하셨습니다! 매칭이 완료되었습니다.`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 대시보드 상단 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {role === 'MANAGER' ? '동행 매니저 전용 업무 대시보드' : '동행 예약 관리 & 실시간 안심 트래커'}
            </h2>
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
              총 {reservations.length}건
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            {role === 'MANAGER'
              ? '신규 요청 수락, 동행 단계 진행 업데이트, 진료 결과 안심 리포트 작성 기능을 제공합니다.'
              : '예약된 동행 일정의 매칭 현황과 5단계 실시간 진행 상태, 안심 리포트를 확인하세요.'}
          </p>
        </div>

        {role === 'GUARDIAN' && (
          <button
            onClick={onGoBooking}
            className="self-start sm:self-auto px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Icons.Calendar className="w-4 h-4" />
            <span>새 동행 예약하기</span>
          </button>
        )}
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-slate-200 gap-2 mb-8 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
            filter === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          전체 ({reservations.length})
        </button>
        <button
          onClick={() => setFilter('REQUESTED')}
          className={`px-4 py-2.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            filter === 'REQUESTED'
              ? 'bg-amber-500 text-white'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>예약 대기중 ({reservations.filter(r => r.status === 'REQUESTED').length})</span>
        </button>
        <button
          onClick={() => setFilter('MATCHED')}
          className={`px-4 py-2.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            filter === 'MATCHED'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 hover:bg-sky-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span>매칭 및 진행중 ({reservations.filter(r => r.status === 'MATCHED' || r.status === 'IN_PROGRESS').length})</span>
        </button>
        <button
          onClick={() => setFilter('COMPLETED')}
          className={`px-4 py-2.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            filter === 'COMPLETED'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:bg-emerald-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>동행 완료 ({reservations.filter(r => r.status === 'COMPLETED').length})</span>
        </button>
      </div>

      {/* 예약 목록 카드들 */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <Icons.Hospital className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">해당 상태의 예약 건이 없습니다.</h4>
          <p className="text-xs">상단 탭을 전환하거나 새로운 동행 예약을 신청해 보세요.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((item) => {
            const manager = item.managerId ? window.withCareStore.getManagerById(item.managerId) : null;

            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* 카드 헤더 */}
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900 tracking-wide">{item.id}</span>
                    <span className="text-xs text-slate-400 font-medium">신청일: {item.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 상태 뱃지 */}
                    {item.status === 'REQUESTED' && (
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        <span>예약 대기중 (매니저 배정 중)</span>
                      </span>
                    )}
                    {item.status === 'MATCHED' && (
                      <span className="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full flex items-center gap-1">
                        <span>매니저 배정 완료</span>
                      </span>
                    )}
                    {item.status === 'IN_PROGRESS' && (
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span>실시간 동행 진행 중 ({item.step === 3 ? '자택 픽업' : '병원 진료 중'})</span>
                      </span>
                    )}
                    {item.status === 'COMPLETED' && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                        <span>✓ 동행 및 귀가 완료</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 카드 본문 */}
                <div className="p-6 space-y-6">
                  {/* 기본 정보 그리드 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">환자 및 거동 상태</span>
                      <div className="font-bold text-slate-900 text-sm">{item.patientName} ({item.patientAge}세/{item.patientGender})</div>
                      <div className="text-slate-600 mt-0.5">{item.mobilityLabel}</div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">방문 병원 & 진료과</span>
                      <div className="font-bold text-slate-900 text-sm">{item.hospital}</div>
                      <div className="text-sky-700 font-semibold mt-0.5">{item.department}</div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">방문 일시</span>
                      <div className="font-bold text-slate-900 text-sm">{item.date} {item.time}</div>
                      <div className="text-slate-500 mt-0.5">{item.serviceDuration}</div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">자택 픽업지 & 견적</span>
                      <div className="font-bold text-slate-900 text-xs truncate" title={item.pickupAddress}>
                        {item.pickupAddress}
                      </div>
                      <div className="font-bold text-sky-600 text-sm mt-0.5">
                        {item.cost ? item.cost.toLocaleString() : '55,000'}원
                      </div>
                    </div>
                  </div>

                  {/* 5단계 실시간 상태 트래커 (Progress Bar Stepper) */}
                  <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Icons.Clock className="w-4 h-4 text-sky-600" />
                        <span>실시간 5단계 동행 프로세스 트래커</span>
                      </span>
                      <span className="text-xs font-bold text-sky-700">
                        {item.step === 1 && '① 예약 대기'}
                        {item.step === 2 && '② 매니저 배정'}
                        {item.step === 3 && '③ 자택 픽업 이동'}
                        {item.step === 4 && '④ 병원 외래 진료 중'}
                        {item.step === 5 && '⑤ 귀가 완료 & 리포트'}
                      </span>
                    </div>

                    {/* 스텝 바 */}
                    <div className="grid grid-cols-5 gap-2 relative">
                      {[
                        { step: 1, label: '예약 완료', icon: '📝' },
                        { step: 2, label: '매니저 배정', icon: '🩺' },
                        { step: 3, label: '자택 픽업', icon: '🚗' },
                        { step: 4, label: '병원 진료 중', icon: '🏥' },
                        { step: 5, label: '귀가 완료', icon: '🏠' }
                      ].map((s) => {
                        const isDone = item.step > s.step;
                        const isCurrent = item.step === s.step;

                        return (
                          <div key={s.step} className="flex flex-col items-center text-center">
                            <div 
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                                isDone 
                                  ? 'bg-teal-600 text-white shadow-sm'
                                  : isCurrent 
                                    ? 'bg-sky-600 text-white ring-4 ring-sky-100 shadow-md animate-pulse'
                                    : 'bg-white text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isDone ? '✓' : s.step}
                            </div>
                            <span className={`text-[11px] font-bold ${
                              isCurrent ? 'text-sky-700 font-black' : isDone ? 'text-slate-800' : 'text-slate-400'
                            }`}>
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 배정된 매니저 카드 (매칭 완료 및 진행/완료 건) */}
                  {manager && (
                    <div className="bg-gradient-to-r from-sky-50/60 to-teal-50/60 rounded-2xl p-4 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={manager.avatar} 
                          alt={manager.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">{manager.name} 매니저</span>
                            <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                              {manager.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="flex items-center text-amber-500 font-bold">
                              ★ {manager.rating}
                            </span>
                            <span>·</span>
                            <span>누적 동행 {manager.completedTrips}건</span>
                            <span>·</span>
                            <span className="text-slate-700 font-semibold">{manager.phone}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1">
                            "{manager.intro}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button 
                          onClick={() => alert(`매니저 안심 가상번호로 연결됩니다: ${manager.phone}`)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold rounded-lg shadow-sm transition"
                        >
                          안심 통화
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 컨트롤 및 액션 버튼 영역 */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {/* 데모 시연 버튼: 단계 진행하기 */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        🎓 심사위원/시연용 툴:
                      </span>
                      {item.step < 5 && (
                        <button
                          onClick={() => handleSimulateNextStep(item.id, item.step)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
                          title="다음 단계로 즉시 진행 시연"
                        >
                          <span>다음 단계로 진행 시연 (➜ {item.step + 1}단계)</span>
                        </button>
                      )}
                      {item.status === 'REQUESTED' && role === 'MANAGER' && (
                        <button
                          onClick={() => handleAcceptByManager(item.id)}
                          className="text-xs bg-teal-600 hover:bg-teal-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition shadow-md flex items-center gap-1"
                        >
                          <span>🩺 [매니저] 이 예약 즉시 수락하기</span>
                        </button>
                      )}
                    </div>

                    {/* 주 액션 버튼: 리포트 확인 & 작성 */}
                    <div className="flex items-center gap-2">
                      {item.status === 'COMPLETED' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenReport(item.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                          >
                            <Icons.ClipboardCheck className="w-4 h-4" />
                            <span>안심 리포트 & 진료 결과 확인</span>
                          </button>

                          {role === 'MANAGER' && (
                            <button
                              onClick={() => onOpenManagerReport(item.id)}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                            >
                              리포트 수정
                            </button>
                          )}
                        </div>
                      ) : (
                        role === 'MANAGER' && item.step >= 4 && (
                          <button
                            onClick={() => onOpenManagerReport(item.id)}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                          >
                            <Icons.ClipboardCheck className="w-4 h-4" />
                            <span>진료 결과 안심 리포트 작성하기</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. 안심 리포트 모달 (보호자 확인 & 리뷰 작성)
// ==========================================
function ReportModal({ reservationId, onClose, showToast }) {
  const reservation = window.withCareStore.getReservationById(reservationId);
  const manager = reservation && reservation.managerId 
    ? window.withCareStore.getManagerById(reservation.managerId) 
    : DEFAULT_MANAGERS[0];

  const report = reservation ? reservation.report : null;

  // 별점 및 리뷰 폼 상태
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['친절하고 따뜻해요', '의사 소견을 상세히 전해줘요']);
  const [reviewComment, setReviewComment] = useState('');

  if (!reservation || !report) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
          <p className="text-sm font-bold text-slate-800">아직 등록된 안심 리포트가 없습니다.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-slate-800 text-white text-xs rounded-lg">
            닫기
          </button>
        </div>
      </div>
    );
  }

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
    showToast('매니저님께 소중한 별점과 안심 리뷰가 등록되었습니다.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* 모달 헤더 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Icons.ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">병원 동행 안심 리포트</h3>
              <p className="text-xs text-slate-500">
                {reservation.patientName} 님 · {reservation.hospital} ({reservation.department})
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
          >
            ✕
          </button>
        </div>

        {/* 본문 콘텐츠 */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 매니저 코멘트 & 환자 기본 요약 배너 */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={manager.avatar} 
              alt={manager.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-sm text-slate-900">{manager.name} 동행 매니저</span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {manager.badge}
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">
                "{report.managerMessage}"
              </p>
              <div className="text-[11px] text-emerald-700">
                동행 완료 시각: {report.completedAt}
              </div>
            </div>
          </div>

          {/* 1. 진료 결과 및 의사 소견 요약 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>1. 전문의 진료 소견 및 검사 결과</span>
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {report.medicalSummary}
            </div>
          </div>

          {/* 2. 다음 재진일 & 처방 약 수령 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80 space-y-1">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1">
                <Icons.Calendar className="w-4 h-4 text-sky-600" />
                <span>다음 병원 재진 예약일</span>
              </span>
              <div className="font-extrabold text-slate-900 text-sm pt-1">
                {report.nextAppointment}
              </div>
              <p className="text-[11px] text-slate-500">진료과 외래 창구에서 사전 예약 완료</p>
            </div>

            <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200/80 space-y-1">
              <span className="text-xs font-bold text-teal-800 flex items-center gap-1">
                <Icons.Pill className="w-4 h-4 text-teal-600" />
                <span>처방약 수령 및 복약 지도</span>
              </span>
              <div className="font-bold text-slate-900 text-xs pt-1">
                {report.prescriptions}
              </div>
              <p className="text-[11px] text-slate-500">원내 문전약국 수령 및 복용법 어르신께 안내 완료</p>
            </div>
          </div>

          {/* 3. 당일 어르신 건강 상태 메모 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>2. 당일 어르신 컨디션 및 특이사항</span>
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {report.patientCondition}
            </div>
          </div>

          {/* 4. 실시간 타임라인 이동 로그 */}
          {report.timeline && report.timeline.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                <span>3. 이동 및 진료 상세 타임라인</span>
              </h4>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                {report.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="text-xs font-extrabold text-sky-700 bg-white border border-sky-200 px-2.5 py-1 rounded-lg shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. 첨부 안심 사진 갤러리 Mockup */}
          {report.photos && report.photos.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>4. 안심 현장 사진 및 영수증 증빙</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {report.photos.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                    <img 
                      src={p.url} 
                      alt={p.label} 
                      className="w-full h-32 object-cover hover:scale-105 transition"
                    />
                    <div className="p-2 text-center text-xs font-bold text-slate-700">
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. 보호자 별점 및 한줄평 리뷰 작성 UI */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Star className="w-5 h-5 text-amber-500" filled={true} />
              <span>동행 매니저 평가 및 안심 리뷰 남기기</span>
            </h4>

            {reservation.review ? (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4" filled={i < reservation.review.rating} />
                    ))}
                    <span className="font-extrabold text-slate-900 text-xs ml-1">
                      {reservation.review.rating}.0 / 5.0
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    등록일: {reservation.review.createdAt}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {reservation.review.tags && reservation.review.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] bg-white text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full">
                      ✓ {t}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  "{reservation.review.comment}"
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                {/* 별점 선택기 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    동행 서비스 만족도 (별점을 클릭해주세요)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="text-amber-400 hover:scale-125 transition"
                      >
                        <Icons.Star className="w-7 h-7" filled={starVal <= rating} />
                      </button>
                    ))}
                    <span className="text-sm font-extrabold text-slate-900 ml-2">{rating}.0점</span>
                  </div>
                </div>

                {/* 칭찬 키워드 태그 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    칭찬 키워드 선택 (다중 선택 가능)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '친절하고 따뜻해요',
                      '의사 소견을 상세히 전해줘요',
                      '시간 약속을 철저히 지켜요',
                      '부모님이 편안해하셨어요',
                      '거동 부축이 능숙해요'
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-sm'
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 한줄평 입력창 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    매니저에게 남기는 한줄 감사평
                  </label>
                  <textarea
                    rows="2"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="김서연 매니저님 덕분에 직장에서도 부모님 진료를 안심하고 챙길 수 있었습니다..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                >
                  별점 및 리뷰 등록 완료
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
          >
            리포트 닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. 매니저 전용 리포트 작성/수정 모달
// ==========================================
function ManagerReportEditorModal({ reservationId, onClose, showToast }) {
  const reservation = window.withCareStore.getReservationById(reservationId);

  const existingReport = reservation ? reservation.report : null;

  const [medicalSummary, setMedicalSummary] = useState(
    existingReport ? existingReport.medicalSummary : `${reservation.department} 전문의 진료 완료. X-ray 결과 골밀도 양호하며 염증 소견 경미함.`
  );
  const [nextAppointment, setNextAppointment] = useState(
    existingReport ? existingReport.nextAppointment : '4주 후 정기 외래 진료 예약 완료'
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
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500"></span>
            <h3 className="font-extrabold text-slate-900 text-base">
              진료 결과 안심 리포트 작성 (동행 매니저 전용)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              전문의 진료 소견 및 검사 결과 요약 *
            </label>
            <textarea
              rows="3"
              value={medicalSummary}
              onChange={(e) => setMedicalSummary(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">처방약 및 복약 안내 *</label>
              <input
                type="text"
                value={prescriptions}
                onChange={(e) => setPrescriptions(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">당일 어르신 건강 상태 메모</label>
            <textarea
              rows="2"
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">보호자에게 남기는 안심 메시지</label>
            <textarea
              rows="2"
              value={managerMessage}
              onChange={(e) => setManagerMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-xl shadow-md transition"
            >
              리포트 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 7. B2B 비즈니스 모델 상세 모달
// ==========================================
function B2BModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
              BM
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                위드케어 B2B 비즈니스 모델 및 추가 수익화 전략
              </h3>
              <p className="text-[11px] text-slate-500">수업 프로젝트 심사위원 및 평가 참고용</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-700">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-sky-950">
            <h4 className="font-bold text-base mb-2">📌 비즈니스 모델 요약 (Core Value & Monetization)</h4>
            <p className="leading-relaxed">
              기존 단순 C2C 동행 중개는 거래 건당 수수료(15~20%)만으로는 CAC(고객 획득 비용) 회수가 어렵습니다.
              위드케어는 <strong>AI 증상 분석 기반 전문 병원 매칭 데이터</strong>를 활용하여 병원 타겟 광고, 
              외래 패스트트랙 제휴 수수료, 기업 임직원 복지 B2B 구독 모델을 결합한 지속가능한 하이브리드 수익 모델을 구축합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                1. 병원 타겟 광고 & 제휴 마케팅
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-2 mb-1">
                정밀 질환 타겟팅 병원 노출
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                사용자가 입력한 증상(예: 척추협착증, 무릎관절염)에 부합하는 보건복지부 인증 전문병원을 상단 추천 슬롯에 노출하고, 
                병원으로부터 월 정액 광고료 및 CPC/CPA 광고 수수료를 수취합니다.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                2. 원내 패스트트랙 제휴 수수료
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-2 mb-1">
                병원 공식 파트너십 창구 운영
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                대형 병원 내에 동행 매니저 전용 접수·수납 우선 창구를 협약하고, 
                병원 측에는 고령 환자의 외래 노쇼(No-Show) 방지 및 안전 사고 감소 가치를 제공하여 파트너십 수수료를 정산합니다.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                3. 기업 임직원 부모님 케어 B2B 구독
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-2 mb-1">
                사내 복지 포인트 연동 구독
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                IT 기업 및 대기업의 3040 직장인을 타겟으로, 연차 소진 없이 부모님 정기 통원을 챙길 수 있는
                "연간 6회/12회 병원 동행 법인 복지 바우처 패키지"를 사내 복지몰에 납품합니다.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                4. 지자체 어르신 돌봄 통합지원 바우처
              </span>
              <h5 className="font-bold text-slate-900 text-sm mt-2 mb-1">
                공공 복지 조달 파트너 진입
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                초고령사회 진입에 따른 보건복지부 및 지자체의 병원 안심동행 바우처 사업 공공 입찰에 참여하여 
                취약계층 어르신 동행을 공공 재정으로 정산받는 안정적 B2G 파이프라인을 구축합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// 렌더링 마운트
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
