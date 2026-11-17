// app.js - 위드케어(WithCare) 병원 동행서비스 React 메인 애플리케이션 v3.4
// 대전광역시 MVP & 의료 전공 대학생 동행 매니저 전용

const { useState, useEffect, useMemo, useRef } = React;

// ========================================================
// 0. 공통 SVG 아이콘 정의
// ========================================================
const Icons = {
  Heart: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  Calendar: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
    </svg>
  ),
  MapPin: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  ShieldCheck: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  MessageSquare: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  ClipboardCheck: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.09 1.976 1.053 1.976 2.188V18.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V6.108c0-1.135.845-2.098 1.976-2.188.374-.03.748-.057 1.124-.08" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
    </svg>
  ),
  User: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Clock: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sparkles: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  BuildingHospital: (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  )
};

// ========================================================
// 0-1. 이미지 안전 로드 & 폴백 헬퍼
// (assets/ 폴더에 있든 최상위 루트에 있든 자동 감지하며, 실패 시 내장 SVG로 즉시 대체)
// ========================================================
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0f2fe'/%3E%3Ccircle cx='50' cy='40' r='24' fill='%23334155'/%3E%3Ccircle cx='50' cy='44' r='18' fill='%23fed7aa'/%3E%3Cpath d='M34 38 Q50 24 66 38 Q50 30 34 38 Z' fill='%231e293b'/%3E%3Ccircle cx='44' cy='44' r='2' fill='%230f172a'/%3E%3Ccircle cx='56' cy='44' r='2' fill='%230f172a'/%3E%3Cpath d='M46 51 Q50 54 54 51' stroke='%23ea580c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='41' cy='48' r='2' fill='%23fca5a5' opacity='0.6'/%3E%3Ccircle cx='59' cy='48' r='2' fill='%23fca5a5' opacity='0.6'/%3E%3Cpath d='M26 84 C26 66 36 60 50 60 C64 60 74 66 74 84 Z' fill='%230284c7'/%3E%3Cpath d='M44 60 L50 68 L56 60' fill='%23fed7aa'/%3E%3Ccircle cx='62' cy='74' r='5' fill='%23ffffff'/%3E%3Cpath d='M62 71 V77 M59 74 H65' stroke='%23ef4444' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const handleAvatarError = (e) => {
  const step = e.target.dataset.fallbackStep || '0';
  if (step === '0') {
    e.target.dataset.fallbackStep = '1';
    const src = e.target.getAttribute('src') || '';
    const filename = src.split('/').pop() || 'avatar_kim.svg';
    e.target.src = filename;
  } else {
    e.target.onerror = null;
    e.target.src = DEFAULT_AVATAR;
  }
};

const handleLogoError = (e) => {
  const step = e.target.dataset.fallbackStep || '0';
  if (step === '0') {
    e.target.dataset.fallbackStep = '1';
    e.target.src = 'logo.png';
  } else {
    e.target.onerror = null;
    e.target.style.display = 'none';
  }
};

// ========================================================
// 1. 메인 App 루트 컴포넌트
// ========================================================
function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const [storeState, setStoreState] = useState({
    currentUser: window.withCareStore.currentUser,
    patientProfile: window.withCareStore.patientProfile,
    reservations: window.withCareStore.reservations,
    managers: window.withCareStore.managers,
    urgentRequests: window.withCareStore.urgentRequests
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeChatResId, setActiveChatResId] = useState(null);
  const [activeReportResId, setActiveReportResId] = useState(null);
  const [activeManagerReportResId, setActiveManagerReportResId] = useState(null);
  const [isVolunteerCertModalOpen, setIsVolunteerCertModalOpen] = useState(false);

  const [preselectedManager, setPreselectedManager] = useState(null);
  const [preselectedHospital, setPreselectedHospital] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const unsubscribe = window.withCareStore.subscribe((state) => {
      setStoreState({ ...state });
    });
    return unsubscribe;
  }, []);

  const handleSelectManagerForBooking = (manager, hospital = null) => {
    setPreselectedManager(manager);
    if (hospital) setPreselectedHospital(hospital);
    setCurrentTab('booking');
    showToast(`[${manager.name}] 동행자님이 선택되었습니다. 일정을 확인하고 예약을 진행하세요.`, 'success');
  };

  // 서비스 소개 클릭 시: 메인페이지 하단 서비스 소개 및 비즈니스 모델 섹션으로 부드럽게 스크롤
  const handleServiceIntroClick = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('service-intro');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const el = document.getElementById('service-intro');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogoClick = () => {
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMyPageClick = () => {
    if (!storeState.currentUser.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentTab('myPage');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#6edfec]/40">
      {/* 1. 상단 글로벌 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 좌측 로고 */}
            <div 
              onClick={handleLogoClick} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="assets/logo.png" 
                alt="WithCare 로고" 
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105" 
                onError={handleLogoError}
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                  WithCare
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  부모님 병원 동행 서비스
                </span>
              </div>
            </div>

            {/* 중앙 통합 메뉴: 서비스 소개 | 동행자 찾기 | 동행 예약 | 마이페이지 */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={handleServiceIntroClick}
                className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                  currentTab === 'home' 
                    ? 'text-slate-900 bg-slate-100 font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                서비스 소개
              </button>
              <button
                onClick={() => setCurrentTab('nearFinder')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'nearFinder' 
                    ? 'text-slate-900 bg-slate-100 font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icons.MapPin className="w-3.5 h-3.5 text-[#0bbecb]" />
                <span>동행자 찾기</span>
              </button>
              <button
                onClick={() => setCurrentTab('booking')}
                className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                  currentTab === 'booking' 
                    ? 'text-slate-900 bg-slate-100 font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                동행 예약
              </button>
              <button
                onClick={handleMyPageClick}
                className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'myPage' 
                    ? 'text-slate-900 bg-slate-100 font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icons.User className="w-3.5 h-3.5 text-slate-500" />
                <span>마이페이지</span>
              </button>
            </nav>

            {/* 우측 로그인 / 로그아웃 버튼 */}
            <div className="flex items-center gap-2">
              {storeState.currentUser.isLoggedIn ? (
                <div className="flex items-center gap-2 text-xs">
                  <span className="hidden sm:inline font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {storeState.currentUser.role === 'MANAGER' 
                      ? `${storeState.currentUser.name} 동행자` 
                      : `${storeState.currentUser.name} 이용자`}
                  </span>
                  <button
                    onClick={() => {
                      window.withCareStore.logout();
                      showToast('로그아웃되었습니다.', 'info');
                    }}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-1.5 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  로그인
                </button>
              )}
            </div>
          </div>

          {/* 모바일 4대 메뉴 바 (작은 화면에서도 서비스 소개 및 주요 기능 원터치) */}
          <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs font-bold text-slate-600">
            <button
              onClick={handleServiceIntroClick}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                currentTab === 'home' ? 'text-slate-900 bg-slate-100 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              서비스 소개
            </button>
            <button
              onClick={() => setCurrentTab('nearFinder')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                currentTab === 'nearFinder' ? 'text-slate-900 bg-slate-100 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              동행자 찾기
            </button>
            <button
              onClick={() => setCurrentTab('booking')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                currentTab === 'booking' ? 'text-slate-900 bg-slate-100 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              동행 예약
            </button>
            <button
              onClick={handleMyPageClick}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                currentTab === 'myPage' ? 'text-slate-900 bg-slate-100 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              마이페이지
            </button>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onGoNearFinder={() => setCurrentTab('nearFinder')}
            onGoBooking={() => setCurrentTab('booking')}
          />
        )}

        {currentTab === 'nearFinder' && (
          <NearFinderView
            managers={storeState.managers}
            locations={window.DAEJEON_LOCATIONS || []}
            hospitals={window.DEFAULT_HOSPITALS || []}
            onSelectManager={handleSelectManagerForBooking}
          />
        )}

        {currentTab === 'booking' && (
          <BookingView
            patientProfile={storeState.patientProfile}
            managers={storeState.managers}
            hospitals={window.DEFAULT_HOSPITALS || []}
            preselectedManager={preselectedManager}
            preselectedHospital={preselectedHospital}
            onComplete={(newRes) => {
              showToast('동행 예약이 정상 접수되었습니다! 마이페이지에서 실시간 상태를 확인하세요.', 'success');
              setCurrentTab('myPage');
            }}
          />
        )}

        {currentTab === 'myPage' && (
          storeState.currentUser.role === 'MANAGER' ? (
            <CompanionMyPageView
              currentUser={storeState.currentUser}
              reservations={storeState.reservations}
              urgentRequests={storeState.urgentRequests}
              majorInsights={window.MAJOR_INSIGHTS || []}
              onOpenManagerReport={(resId) => setActiveManagerReportResId(resId)}
              onOpenChat={(resId) => setActiveChatResId(resId)}
              onOpenCertModal={() => setIsVolunteerCertModalOpen(true)}
              onAcceptUrgent={(urgId) => {
                const res = window.withCareStore.acceptUrgentRequest(urgId, storeState.currentUser.managerId || 'mgr-1');
                if (res) {
                  showToast(`[${res.patientName}] 어르신 긴급 동행을 수락하였습니다. 봉사시간 4시간이 매칭되었습니다!`, 'success');
                }
              }}
              showToast={showToast}
            />
          ) : (
            <UserMyPageView
              currentUser={storeState.currentUser}
              patientProfile={storeState.patientProfile}
              reservations={storeState.reservations}
              managers={storeState.managers}
              onOpenReport={(resId) => setActiveReportResId(resId)}
              onOpenChat={(resId) => setActiveChatResId(resId)}
              onSelectManagerFromAI={(mgr) => handleSelectManagerForBooking(mgr)}
              onGoBooking={() => setCurrentTab('booking')}
              showToast={showToast}
            />
          )
        )}
      </main>

      {/* 3. 모달 레이어 */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={(user) => {
            setIsLoginModalOpen(false);
            setCurrentTab('myPage');
            showToast(`${user.name} ${user.role === 'MANAGER' ? '동행자' : '이용자'}님, 환영합니다!`, 'success');
          }}
        />
      )}

      {/* 1:1 실시간 대화방 모달 */}
      {activeChatResId && (
        <ChatModal
          reservationId={activeChatResId}
          currentUser={storeState.currentUser}
          onClose={() => setActiveChatResId(null)}
        />
      )}

      {/* 안심 리포트 및 만족도 평가 모달 */}
      {activeReportResId && (
        <ReportModal
          reservationId={activeReportResId}
          onClose={() => setActiveReportResId(null)}
          showToast={showToast}
        />
      )}

      {/* 안심 리포트 작성 모달 */}
      {activeManagerReportResId && (
        <ManagerReportEditorModal
          reservationId={activeManagerReportResId}
          onClose={() => setActiveManagerReportResId(null)}
          showToast={showToast}
        />
      )}

      {/* 1365 / VMS 봉사활동 확인서 미리보기 모달 */}
      {isVolunteerCertModalOpen && (
        <VolunteerCertModal
          currentUser={storeState.currentUser}
          onClose={() => setIsVolunteerCertModalOpen(false)}
        />
      )}

      {/* 토스트 알림 */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#6edfec]"></span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 글로벌 푸터 */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="assets/logo.png" alt="WithCare" className="w-5 h-5 object-contain" onError={handleLogoError} />
            <span className="font-extrabold text-slate-800">위드케어 (WithCare)</span>
            <span>· 대전광역시 거점 부모님 병원 동행 서비스 플랫폼</span>
          </div>
          <div className="text-slate-400">
            대전광역시 거점 대학병원 공식 봉사 협약 시연 모델
          </div>
        </div>
      </footer>
    </div>
  );
}

// ========================================================
// 2. 메인 랜딩페이지 (사용자 첨부 이미지: 얼굴 제외 상체~팔 크롭본 적용)
// ========================================================
function HomeView({ onGoNearFinder, onGoBooking }) {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero 섹션 */}
      <section className="relative w-full min-h-[500px] sm:min-h-[560px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* 상체~팔 위주 크롭본 배경 이미지 (assets 또는 루트 경로 자동 지원) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('assets/hero_companion.jpg'), url('hero_companion.jpg')` }}
        ></div>

        {/* 텍스트 시인성을 위한 소프트 딤 오버레이 (그라데이션 없이 플랫) */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[0.5px]"></div>

        {/* Hero 컨텐츠 */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 py-16">
          <span className="inline-block bg-[#6edfec]/20 text-[#6edfec] border border-[#6edfec]/40 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full">
            대전광역시 의료전공 대학생 & 병원 동행 플랫폼
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            부모님 병원 가는 길,<br />
            근처 동행 매니저와 신속하게
          </h1>

          <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/15 shadow-xs">
            <p className="text-sm sm:text-lg text-white font-medium drop-shadow-xs">
              내일의 의료인이 따뜻한 동행 매니저가 되어드립니다.
            </p>
          </div>

          {/* 간결한 2개 버튼 */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={onGoNearFinder}
              className="px-6 sm:px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              동행자 찾기
            </button>
            <button
              onClick={onGoBooking}
              className="px-6 sm:px-8 py-3.5 bg-slate-900/90 hover:bg-black text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md border border-slate-700 transition-all hover:scale-105 cursor-pointer"
            >
              예약하기
            </button>
          </div>
        </div>
      </section>

      {/* 서비스 핵심 3대 신뢰 포인트 (플랫 화이트 카드) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0bbecb] flex items-center justify-center font-black text-xs border border-slate-200">
              01
            </div>
            <h3 className="font-extrabold text-base text-slate-900">대전권 의료전공 대학생 인증</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              충남대, 을지대, 건양대, 대전대 등 간호·의예·물리치료학과 재학생들의 학생증 및 심폐소생술(CPR/BLS) 수료 여부를 철저히 검증합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0bbecb] flex items-center justify-center font-black text-xs border border-slate-200">
              02
            </div>
            <h3 className="font-extrabold text-base text-slate-900">1365·VMS 공식 봉사시간 연계</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              대학생 동행자에게는 1회 3~4시간의 공인 봉사시간과 함께 대학병원 취업 준비를 위한 환자 케어 포트폴리오를 제공합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0bbecb] flex items-center justify-center font-black text-xs border border-slate-200">
              03
            </div>
            <h3 className="font-extrabold text-base text-slate-900">5단계 실시간 안심 케어 프로세스</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              자택 픽업부터 진료실 동행, 의사 소견 경청 및 복약 지도, 처방전 수령, 안전 귀가까지 전 과정을 마이페이지에서 투명하게 확인합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 대전 권역 바로가기 배너 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-[#6edfec] text-slate-900 text-xs font-black px-3 py-1 rounded-full">
              DAEJEON MVP SERVICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              지금 대전 전 지역에서 가까운 대학생 동행자를 찾아보세요
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              충남대학교병원, 대전을지대병원, 건양대병원, 대전성모병원 외래 진료 동행 지원
            </p>
          </div>

          <button
            onClick={onGoNearFinder}
            className="px-6 py-3.5 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-extrabold text-sm rounded-2xl shadow-md transition cursor-pointer shrink-0"
          >
            내 근처 동행자 조회하기
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. 서비스 소개 & 교육 방법 및 비즈니스 모델 (양면 플랫폼 & 차별화 전략) */}
      {/* ======================================================== */}
      <section id="service-intro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        {/* 상단 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center bg-slate-100 text-slate-700 border border-slate-200 text-xs font-black px-4 py-1.5 rounded-full">
            WITHCARE BUSINESS MODEL & STRATEGY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            기존 전문 인력 중심 구조를 전환한<br />
            <span className="text-[#0bbecb] underline decoration-[#6edfec] decoration-4 underline-offset-4">대학생 참여형 양면 플랫폼</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed">
            기존 병원동행 서비스의 전문 인력 중심 구조를 대학생 참여형 모델로 전환하고, 
            서비스 제공 범위를 <strong className="text-slate-900 font-extrabold">지역 대학병원으로 집중</strong>하여 
            가격 경쟁력과 운영 효율성을 확보하는 양면 플랫폼 사업입니다.
          </p>
        </div>

        {/* 핵심 가치 제안 박스 (Core Value Connection) */}
        <div className="bg-slate-100/80 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-black text-[#0bbecb] uppercase tracking-wider block">
              CORE VALUE CONNECTION
            </span>
            <p className="text-sm sm:text-base text-slate-800 font-bold leading-relaxed">
              단순히 기존 서비스보다 저렴한 병원동행 서비스를 제공하는 것이 아니라,{' '}
              <span className="bg-[#6edfec]/30 px-1.5 py-0.5 rounded text-slate-900 font-black">
                병원 이용에 도움이 필요한 시니어의 수요
              </span>와{' '}
              <span className="bg-[#6edfec]/30 px-1.5 py-0.5 rounded text-slate-900 font-black">
                보건·의료·복지 분야의 현장 경험을 원하는 대학생의 수요
              </span>를 연결하는 것이 핵심입니다.
            </p>
          </div>
        </div>

        {/* 양면 플랫폼 비즈니스 모델 구조도 (다이어그램) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400">PLATFORM ARCHITECTURE</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                대학병원 특화 동행 양면 플랫폼 구조
              </h3>
            </div>
            <span className="inline-flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              선순환 상생 모델 (Two-Sided Platform)
            </span>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            {/* 상단 2대 수요-공급 주체 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 시니어 · 보호자 */}
              <div className="bg-slate-50 border border-slate-200 hover:border-[#6edfec] rounded-2xl p-6 transition-all shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Demand</span>
                  <span className="text-[10px] font-bold bg-white text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                    수요자
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900">시니어 · 보호자</h4>
                <p className="text-sm font-extrabold text-[#0bbecb] mt-1">
                  합리적인 비용으로 병원 이용 지원
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 기존 간병인 대비 부담을 낮춘 실속형 병원 동행
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 진료 접수, 원내 이동, 의사 소견 경청 지원
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 보호자를 위한 1:1 실시간 이동 알림 및 안심 리포트
                  </li>
                </ul>
              </div>

              {/* 대학생 · 취업준비생 */}
              <div className="bg-slate-50 border border-slate-200 hover:border-[#6edfec] rounded-2xl p-6 transition-all shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Supply</span>
                  <span className="text-[10px] font-bold bg-white text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                    공급자
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900">대학생 · 취업준비생</h4>
                <p className="text-sm font-extrabold text-[#0bbecb] mt-1">
                  유급 일경험 · 실무 역량 축적
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 간호·의예·보건·사회복지 전공 맞춤형 현장 일경험
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 1365·VMS 공식 공인 봉사시간 인정 (회당 3~4시간)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0bbecb]"></span> 대학병원 취업 준비를 위한 공식 환자 케어 포트폴리오
                  </li>
                </ul>
              </div>
            </div>

            {/* 양방향 연결 */}
            <div className="flex items-center justify-center py-0.5">
              <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold">
                수요-공급 스마트 매칭 및 프로세스 연계
              </div>
            </div>

            {/* 중앙 플랫폼: 대학병원 특화 동행 플랫폼 */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-[#6edfec]/40">
              <div className="text-center space-y-3">
                <div className="inline-block bg-[#6edfec] text-slate-900 text-xs font-black px-3.5 py-1 rounded-full">
                  CORE PLATFORM
                </div>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight">
                  대학병원 특화 동행 플랫폼
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  매칭부터 표준교육, 원내 동선 안내, 안전관리, 활동 기록까지 전 과정을 체계적으로 총괄 운영합니다.
                </p>

                {/* 5대 플랫폼 기능 칩 */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="bg-white/10 hover:bg-white/20 text-[#6edfec] border border-[#6edfec]/30 text-xs font-bold px-3 py-1.5 rounded-xl">
                    매칭
                  </span>
                  <span className="bg-white/10 hover:bg-white/20 text-[#6edfec] border border-[#6edfec]/30 text-xs font-bold px-3 py-1.5 rounded-xl">
                    표준교육
                  </span>
                  <span className="bg-white/10 hover:bg-white/20 text-[#6edfec] border border-[#6edfec]/30 text-xs font-bold px-3 py-1.5 rounded-xl">
                    병원별 동선 안내
                  </span>
                  <span className="bg-white/10 hover:bg-white/20 text-[#6edfec] border border-[#6edfec]/30 text-xs font-bold px-3 py-1.5 rounded-xl">
                    안전관리
                  </span>
                  <span className="bg-white/10 hover:bg-white/20 text-[#6edfec] border border-[#6edfec]/30 text-xs font-bold px-3 py-1.5 rounded-xl">
                    활동 기록
                  </span>
                </div>
              </div>
            </div>

            {/* 하단 지역 상생 협력: 지역 대학병원 & 지역 대학 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h5 className="font-extrabold text-sm text-slate-900">지역 대학병원</h5>
                <p className="text-xs text-[#0bbecb] font-bold mt-0.5">현장 운영 · 안내 협력</p>
                <p className="text-[11px] text-slate-500 mt-1">충남대병원, 대전을지대병원, 건양대병원 외래 진료 연계</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h5 className="font-extrabold text-sm text-slate-900">지역 대학교</h5>
                <p className="text-xs text-[#0bbecb] font-bold mt-0.5">학생 모집 · 교육 협력</p>
                <p className="text-[11px] text-slate-500 mt-1">간호·보건의료 전공생 선발 및 사전 직무·에티켓 교육</p>
              </div>
            </div>
          </div>
        </div>

        {/* 위드케어만의 차별화된 5대 핵심 강점 */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-black text-[#0bbecb] tracking-wider uppercase">
                WITHCARE KEY STRENGTHS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                위드케어만의 차별화된 5대 핵심 강점
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              기존 민간 간병 및 단순 매칭 알바와 비교할 수 없는 위드케어만의 신뢰와 전문성
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 전략 1: 병원별 특화 운영 */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#6edfec]/20 text-[#0bbecb] font-black text-xs flex items-center justify-center">
                  01
                </span>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  병원별 특화 운영
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                병원별 동선 및 절차 집중 교육
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                병원 내부 동선과 이용 절차를 사전 교육하고, 한정된 병원에서 운영 역량을 집중적으로 축적합니다.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-extrabold text-slate-800">
                정확하고 신속한 매뉴얼과 빠른 인수인계로 서비스 질 향상
              </div>
            </div>

            {/* 전략 2: 청년 일경험 프로그램화 */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#6edfec]/20 text-[#0bbecb] font-black text-xs flex items-center justify-center">
                  02
                </span>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  청년 일경험 프로그램화
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                단순 알바를 넘어 역량 인증까지
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                단순 아르바이트 매칭을 넘어 교육 · 활동 · 피드백 · 역량 인증까지 유기적으로 연결합니다.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-extrabold text-slate-800">
                대학병원 취업 준비 및 의료 현장 직무 포트폴리오 연계
              </div>
            </div>

            {/* 전략 3: 표준화된 안심 서비스 */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#6edfec]/20 text-[#0bbecb] font-black text-xs flex items-center justify-center">
                  03
                </span>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  표준화된 안심 서비스
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                체계적인 신원 확인 및 관리 시스템
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                자격증 대신 체계적인 교육, 철저한 신원 확인, 명확한 활동 범위 제한, 관리자 개입으로 신뢰를 확보합니다.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-extrabold text-slate-800">
                1:1 대화 모듈 및 보호자 실시간 안심 트래킹 상시 가동
              </div>
            </div>

            {/* 전략 4: 병원별 전담 인력풀 */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#6edfec]/20 text-[#0bbecb] font-black text-xs flex items-center justify-center">
                  04
                </span>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  병원별 전담 인력풀
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                익숙한 병원 반복 활동으로 효율 개선
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                매번 낯선 병원으로 파견하기보다 익숙한 병원에서 반복 활동하여 운영 효율을 개선합니다.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-extrabold text-slate-800">
                복잡한 대학병원 채혈실·검사실 동선 지체 없는 이동 보장
              </div>
            </div>

            {/* 전략 5: 정기 진료 고객 확보 */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-xs space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#6edfec]/20 text-[#0bbecb] font-black text-xs flex items-center justify-center">
                  05
                </span>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  정기 진료 고객 확보
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                단발성 예약을 넘어 재이용 및 정기 관리 유도
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                단발성 예약뿐 아니라 만성질환 반복 진료, 동일 동행자 우선 매칭 등 재이용을 유도합니다.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-extrabold text-slate-800">
                환자의 진료 특성을 잘 아는 동행자와의 친밀한 라포(Rapport) 형성
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 포지셔닝 강조 카드 (이미지 2 하단) */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#6edfec] text-slate-900 text-[11px] font-black px-3.5 py-1 rounded-full">
              핵심 포지셔닝 (Core Positioning)
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              단순 저가형 병원동행 플랫폼이 아닌,<br />
              <span className="text-[#6edfec]">지역 대학병원에 특화된 청년 일경험 기반 진료 지원 서비스</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              위드케어는 어르신에게는 자녀처럼 따뜻하고 안전한 병원 동행을 제공하고, 
              지역 보건의료 청년에게는 가치 있는 실무 일경험과 봉사를 제공하여 지속 가능한 지역 의료 복지 생태계를 만듭니다.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#6edfec]/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}

// ========================================================
// 3. 신규 화면: 내 근처 동행자 찾기 (화이트 모드 GPS 지도 & 클릭 시에만 세부사항 표시 & 지도 클릭 이동)
// ========================================================
function NearFinderView({ managers, locations, hospitals, onSelectManager }) {
  // 내 위치 상태 (기본: 대전 서구 둔산동 x: 50, y: 42)
  const [myPos, setMyPos] = useState({
    x: 50,
    y: 42,
    name: '대전 서구 둔산동 (크로바Apt)'
  });

  // 사용자가 클릭한 동행자 (null이면 세부사항 숨김, 클릭 시 팝업 카드 열림!)
  const [activeManager, setActiveManager] = useState(null);

  // 지도 영역 레퍼런스
  const mapContainerRef = useRef(null);

  // 지도 위를 직접 클릭하여 내 위치 변경
  const handleMapClick = (e) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const clickY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // 5% ~ 95% 범위 내로 제한
    const clampedX = Math.max(8, Math.min(92, clickX));
    const clampedY = Math.max(8, Math.min(92, clickY));

    let areaName = '대전 서구 둔산 인근';
    if (clampedX < 40 && clampedY < 50) areaName = '대전 유성구 궁동 인근';
    else if (clampedX < 45 && clampedY >= 50) areaName = '대전 서구 관저/도안 인근';
    else if (clampedX >= 60) areaName = '대전 중구 대사/대흥 인근';

    setMyPos({ x: clampedX, y: clampedY, name: areaName });
  };

  // 상단 거점 버튼 클릭 시 내 위치 이동
  const handlePresetLocation = (loc) => {
    setMyPos({
      x: loc.mapX || 50,
      y: loc.mapY || 42,
      name: loc.label
    });
  };

  // 내 위치(myPos)를 기준으로 4명의 매니저가 항상 주변(반경)에 다채롭게 포진하도록 계산
  const visibleManagers = useMemo(() => {
    return managers.map((mgr) => {
      // 내 위치에 상대 오프셋을 더해 위치 계산 (경계 내 클램핑)
      const posX = Math.max(10, Math.min(90, myPos.x + (mgr.offsetX || 0)));
      const posY = Math.max(12, Math.min(88, myPos.y + (mgr.offsetY || 0)));

      // 유클리드 거리 기반 실시간 도보 시간 계산
      const dist = Math.sqrt(Math.pow(posX - myPos.x, 2) + Math.pow(posY - myPos.y, 2));
      const dynamicMinutes = Math.max(3, Math.round(dist * 0.5) + (mgr.etaMinutes ? (mgr.etaMinutes % 4) : 3));
      const dynamicDistMeters = Math.round(dynamicMinutes * 70);

      return {
        ...mgr,
        posX,
        posY,
        calcEtaText: `도보 ${dynamicMinutes}분 (약 ${dynamicDistMeters}m)`
      };
    });
  }, [managers, myPos]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. 상단 GPS 위치 컨트롤 바 (화이트 룩) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0bbecb] animate-ping"></span>
            <h2 className="text-xl font-extrabold text-slate-900">GPS 실시간 동행자 지도 (대전광역시)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            지도를 직접 클릭하거나 아래 거점 버튼을 누르면 내 위치가 이동하며, <strong>동행자 프로필 핀을 누르면 세부사항</strong>이 나타납니다.
          </p>
        </div>

        {/* 대전 주요 거점 빠른 이동 버튼들 */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <span className="text-slate-400 mr-1 text-[11px]">추천 거점:</span>
          {locations.map((loc) => {
            const isNear = Math.abs(loc.mapX - myPos.x) < 8 && Math.abs(loc.mapY - myPos.y) < 8;

            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handlePresetLocation(loc)}
                className={`px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                  isNear 
                    ? 'bg-slate-900 text-white border-slate-900 font-black shadow-xs' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {loc.name.replace('대전 ', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 메인: 화이트 모드 GPS 지도 캔버스 */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#6edfec]/30 text-slate-900 font-black text-[11px]">
              GPS LIVE RADAR
            </span>
            <span className="font-extrabold text-slate-800">
              현재 내 위치: <strong className="text-slate-900">{myPos.name}</strong>
            </span>
          </div>

          <span className="text-slate-500 text-[11px]">
            지도를 클릭하여 위치를 변경할 수 있습니다 (현재 반경 내 4명 대기 중)
          </span>
        </div>

        {/* 화이트 모드 지도 뷰포트 */}
        <div
          ref={mapContainerRef}
          onClick={handleMapClick}
          className="relative w-full h-[460px] sm:h-[520px] bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none cursor-crosshair"
        >
          {/* 화이트 지도 도로망 & 강줄기 SVG 백그라운드 */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 500">
            <defs>
              <pattern id="lightGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lightGrid)" />

            {/* 갑천 강줄기 (맑은 파스텔 블루) */}
            <path d="M 120 0 Q 200 180 250 250 T 360 500" fill="none" stroke="#bae6fd" strokeWidth="20" opacity="0.8" strokeLinecap="round" />
            <path d="M 120 0 Q 200 180 250 250 T 360 500" fill="none" stroke="#7dd3fc" strokeWidth="10" opacity="0.9" strokeLinecap="round" />

            {/* 유등천 지류 */}
            <path d="M 320 220 Q 340 320 380 500" fill="none" stroke="#bae6fd" strokeWidth="14" opacity="0.7" strokeLinecap="round" />

            {/* 주요 도로망 (화이트 & 연회색 도로선) */}
            <line x1="0" y1="210" x2="500" y2="230" stroke="#ffffff" strokeWidth="10" />
            <line x1="0" y1="210" x2="500" y2="230" stroke="#cbd5e1" strokeWidth="2" opacity="0.7" />

            <line x1="140" y1="0" x2="380" y2="500" stroke="#ffffff" strokeWidth="8" />
            <line x1="140" y1="0" x2="380" y2="500" stroke="#cbd5e1" strokeWidth="2" opacity="0.7" />

            <line x1="0" y1="360" x2="500" y2="340" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="360" x2="500" y2="340" stroke="#cbd5e1" strokeWidth="2" opacity="0.7" />
          </svg>

          {/* 지도 지역 라벨 */}
          <span className="absolute top-[28%] left-[16%] text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pointer-events-none">
            유성구 (궁동/충남대)
          </span>
          <span className="absolute top-[36%] left-[46%] text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pointer-events-none">
            서구 둔산동 (시청/청사)
          </span>
          <span className="absolute top-[68%] left-[60%] text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pointer-events-none">
            중구 (대흥동/대사동)
          </span>
          <span className="absolute top-[76%] left-[14%] text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pointer-events-none">
            서구 관저동 (건양대)
          </span>

          {/* 1. 병원 마커들 (보조 핀) */}
          {hospitals.map(hosp => (
            <div
              key={hosp.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: `${hosp.mapX || 50}%`, top: `${hosp.mapY || 50}%` }}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-700 text-white flex items-center justify-center text-[10px] font-black shadow-md border border-emerald-400">
                H
              </div>
              <span className="text-[9px] text-emerald-800 font-extrabold whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs mt-0.5 border border-emerald-200">
                {hosp.name}
              </span>
            </div>
          ))}

          {/* 2. 내 현재 위치 핀 (펄싱 레이더 링) */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-500 ease-out"
            style={{ left: `${myPos.x}%`, top: `${myPos.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-[#6edfec]/40 animate-ping absolute"></span>
              <span className="w-5 h-5 rounded-full bg-[#0bbecb] text-white flex items-center justify-center text-[10px] font-black shadow-lg border-2 border-white">
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </span>
            </div>
            <span className="text-[10px] font-black text-slate-900 whitespace-nowrap bg-[#6edfec] px-2.5 py-0.5 rounded-full shadow-md mt-1 border border-white">
              내 위치 ({myPos.name.replace('대전 ', '').split(' ')[0]})
            </span>
          </div>

          {/* 3. 대학생 동행자 마커들 (클릭 가능 인터랙티브 핀) */}
          {visibleManagers.map((mgr) => {
            const isSelected = activeManager?.id === mgr.id;

            return (
              <button
                key={mgr.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 지도 클릭 이벤트 전파 차단
                  setActiveManager(mgr);
                }}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-125 z-40' : 'hover:scale-115 opacity-95'
                }`}
                style={{ left: `${mgr.posX}%`, top: `${mgr.posY}%` }}
                title={`${mgr.name} (${mgr.badge}) 클릭하여 세부 프로필 보기`}
              >
                {/* 상단 소요 시간 말풍선 배지 */}
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap mb-1 transition-all ${
                  isSelected 
                    ? 'bg-[#6edfec] text-slate-900 ring-2 ring-slate-900 font-black scale-105' 
                    : 'bg-white text-slate-800 border border-slate-300 group-hover:border-[#0bbecb]'
                }`}>
                  ⏱️ {mgr.calcEtaText.split(' ')[0]}
                </span>

                {/* 원형 아바타 (로컬 SVG 적용) */}
                <div className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 transition-all bg-white ${
                  isSelected 
                    ? 'ring-4 ring-[#0bbecb] shadow-xl animate-bounce' 
                    : 'ring-2 ring-slate-300 shadow-md group-hover:ring-[#0bbecb]'
                }`}>
                  <img 
                    src={mgr.avatar} 
                    alt={mgr.name} 
                    className="w-full h-full rounded-full object-cover" 
                    onError={handleAvatarError}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
                </div>

                {/* 동행자 이름 */}
                <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-md shadow-xs ${
                  isSelected ? 'bg-slate-900 text-white font-black' : 'text-slate-800 bg-white/95 border border-slate-200'
                }`}>
                  {mgr.name} ({mgr.badge.split(' ')[1] || '전공'})
                </span>
              </button>
            );
          })}

          {/* 4. 프로필을 눌렀을 때만 나타나는 세부사항 오버레이 카드 (드롭다운/슬라이드업) */}
          {activeManager && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#6edfec] space-y-4 animate-fadeIn"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeManager.avatar} 
                    alt={activeManager.name} 
                    className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-xs" 
                    onError={handleAvatarError}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-base text-slate-900">{activeManager.name}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-800 font-extrabold px-2 py-0.5 rounded border border-slate-200">
                        {activeManager.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{activeManager.university} {activeManager.major}</p>
                    <div className="text-[11px] text-amber-500 font-bold">
                      ★ {activeManager.rating} <span className="text-slate-400 font-normal">({activeManager.reviewCount}회 후기)</span>
                    </div>
                  </div>
                </div>

                {/* 닫기 버튼 */}
                <button
                  type="button"
                  onClick={() => setActiveManager(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                  title="세부사항 닫기"
                >
                  ✕
                </button>
              </div>

              {/* 세부사항 내용 */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500">내 위치 기준 도착:</span>
                  <strong className="text-slate-900 font-black">{activeManager.calcEtaText}</strong>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500">동행 이용 요금:</span>
                  <div className="text-right">
                    <strong className="text-slate-900 font-black">
                      {activeManager.hourlyRate ? activeManager.hourlyRate.toLocaleString() : '18,000'}원/h
                    </strong>
                    <span className="text-[10px] text-slate-500 block">
                      ({activeManager.hourlyRate === 21000 ? '전문 매니저' : '학생 매니저'} · 교통비 별도)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#0bbecb]" />
                    <span>자격 및 신원 검증</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-5">
                    {activeManager.certification} · 인정 봉사 {activeManager.volunteerHours}시간
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">주요 동행 병원:</span>
                  <p className="text-[11px] text-slate-600 pl-2">
                    {activeManager.primaryHospitals}
                  </p>
                </div>

                <p className="text-[11px] text-slate-600 italic bg-[#6edfec]/10 p-2.5 rounded-xl border border-[#6edfec]/30">
                  "{activeManager.intro}"
                </p>
              </div>

              {/* 예약 CTA */}
              <button
                type="button"
                onClick={() => onSelectManager(activeManager)}
                className="w-full py-3 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{activeManager.name} 동행자와 바로 예약하기</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. 지도 하단: 대기 중인 동행자 프로필 미니 바 (클릭 시 세부사항 열림) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">대기 중인 대학생 동행자 목록 (프로필을 누르면 세부사항이 팝업됩니다):</span>
            <span className="text-[11px] text-slate-400">총 {visibleManagers.length}명 활동 중</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {visibleManagers.map((mgr) => {
              const isSelected = activeManager?.id === mgr.id;

              return (
                <div
                  key={mgr.id}
                  onClick={() => setActiveManager(mgr)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                    isSelected 
                      ? 'border-[#0bbecb] bg-[#6edfec]/10 ring-2 ring-[#6edfec]' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <img 
                    src={mgr.avatar} 
                    alt={mgr.name} 
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200" 
                    onError={handleAvatarError}
                  />
                  <div className="overflow-hidden">
                    <div className="font-extrabold text-slate-900 truncate">{mgr.name} ({mgr.badge.split(' ')[1] || '전공'})</div>
                    <div className="text-[11px] text-[#0bbecb] font-bold">{mgr.calcEtaText.split(' ')[0]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 4. 동행 예약 신청 폼 (BookingView)
// ========================================================
function BookingView({ patientProfile, managers, hospitals, preselectedManager, preselectedHospital, onComplete }) {
  const [formData, setFormData] = useState({
    patientName: patientProfile.name || '김순자',
    patientBirth: patientProfile.birth || '1950-04-12',
    hospital: preselectedHospital ? preselectedHospital.name : (hospitals[0]?.name || '충남대학교병원'),
    department: '순환기내과',
    date: '2026-11-25',
    time: '10:00',
    mobility: '거동 불편·부축 필요',
    pickupAddress: patientProfile.address || '대전광역시 서구 둔산로 123 (크로바Apt)',
    transportType: 'TAXI',
    transportLabel: '택시/대중교통 (실비 환자부담)',
    includePharmacy: true,
    managerId: preselectedManager ? preselectedManager.id : (managers[0]?.id || 'mgr-1'),
    messageToDoctor: '최근 아침 혈압 변동 및 기립 시 어지럼증 여부 확인',
    messageToManager: '계단 보행 시 천천히 부축 부탁드리며 진료실 설명 꼼꼼히 메모 요청합니다.',
    agreeTerms: true
  });

  const selectedManager = useMemo(() => {
    return managers.find(m => m.id === formData.managerId) || managers[0];
  }, [managers, formData.managerId]);

  const estimatedCost = useMemo(() => {
    const rate = selectedManager?.hourlyRate || 18000;
    return rate * 2;
  }, [selectedManager]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('개인정보 및 의료동행 이용약관에 동의해 주세요.');
      return;
    }

    const created = window.withCareStore.createReservation({
      ...formData,
      cost: estimatedCost
    });

    onComplete(created);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[#0bbecb] text-xs font-extrabold">BOOKING STEP</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">병원 동행 간편 예약 신청</h2>
          <p className="text-xs text-slate-500 mt-1">
            대전 지역 대학생 동행 매니저가 부모님의 안전한 병원 방문을 1:1로 케어합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* 섹션 1. 환자 기본 정보 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
              <span>환자 정보 및 거동 상태</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">환자 성함 *</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">생년월일 *</label>
                <input
                  type="date"
                  value={formData.patientBirth}
                  onChange={(e) => setFormData({ ...formData, patientBirth: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">거동 상태 선택 *</label>
              <div className="grid grid-cols-3 gap-2">
                {['혼자 걸음', '거동 불편·부축 필요', '휠체어 이용'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, mobility: opt })}
                    className={`py-2.5 px-2 rounded-xl font-bold border transition text-center cursor-pointer ${
                      formData.mobility === opt 
                        ? 'border-slate-900 bg-slate-900 text-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 섹션 2. 병원 일정 */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
              <span>방문 병원 및 일정</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">방문 병원 (대전 권역) *</label>
                <select
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold cursor-pointer"
                >
                  {hospitals.map(h => (
                    <option key={h.id} value={h.name}>{h.name} ({h.region})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">진료과 *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold cursor-pointer"
                >
                  {['순환기내과', '정형외과', '안과', '신경과', '소화기내과', '재활의학과', '이비인후과'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">방문 날짜 *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">방문 시간 *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* 섹션 3. 동행 옵션 & 픽업 주소 */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
              <span>자택 픽업 주소 & 이동 수단</span>
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">자택 픽업지 주소 *</label>
              <input
                type="text"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">이동 수단 선택 * (※ 구급차 지원 제외)</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, transportType: 'TAXI', transportLabel: '택시/대중교통 (실비 환자부담)' })}
                  className={`p-3 rounded-xl border text-left font-bold cursor-pointer ${
                    formData.transportType === 'TAXI' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>택시 / 대중교통</div>
                  <div className="text-[10px] opacity-75">교통비 별도 (실비 환자 부담)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, transportType: 'OWN_CAR', transportLabel: '보호자 자차 / 도보 동행' })}
                  className={`p-3 rounded-xl border text-left font-bold cursor-pointer ${
                    formData.transportType === 'OWN_CAR' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>도보 / 보호자 자차</div>
                  <div className="text-[10px] opacity-75">별도 교통비 없음 (0원)</div>
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includePharmacy}
                onChange={(e) => setFormData({ ...formData, includePharmacy: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900"
              />
              <span className="font-bold text-slate-800">진료 후 원외 약국 처방약 수령 및 복약 지도 동행 포함</span>
            </label>
          </div>

          {/* 섹션 4. 배정 희망 동행 매니저 선택 */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">4</span>
                <span>배정 희망 동행 매니저 선택</span>
              </h4>
              <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200 w-fit">
                전문 매니저 21,000원/h · 학생 매니저 18,000원/h (교통비 별도)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {managers.map(mgr => (
                <div
                  key={mgr.id}
                  onClick={() => setFormData({ ...formData, managerId: mgr.id })}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    formData.managerId === mgr.id 
                      ? 'border-[#0bbecb] bg-[#6edfec]/10 ring-2 ring-[#6edfec]' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={mgr.avatar} 
                      alt={mgr.name} 
                      className="w-10 h-10 rounded-xl object-cover" 
                      onError={handleAvatarError}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{mgr.name}</span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                          mgr.hourlyRate === 21000 
                            ? 'bg-slate-900 text-white' 
                            : 'bg-[#6edfec]/30 text-slate-900'
                        }`}>
                          {mgr.hourlyRate === 21000 ? '전문 매니저' : '학생 매니저'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{mgr.badge} · 평점 {mgr.rating} ★</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-900 block">
                      {mgr.hourlyRate.toLocaleString()}원/h
                    </span>
                    <span className="text-[10px] text-slate-400">교통비 별도</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 섹션 5. 전달사항 및 사전 문진 */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">5</span>
              <span>사전 문진 및 전달 메모</span>
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">의사 선생님께 하고 싶은 말 (진료 메모)</label>
              <textarea
                rows="2"
                value={formData.messageToDoctor}
                onChange={(e) => setFormData({ ...formData, messageToDoctor: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">동행 매니저에게 하고 싶은 말 (부축 유의점 등)</label>
              <textarea
                rows="2"
                value={formData.messageToManager}
                onChange={(e) => setFormData({ ...formData, messageToManager: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
          </div>

          {/* 견적 박스 & 약관 동의 */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-sm font-bold border-b border-slate-800 pb-3">
              <div>
                <div>기본 2시간 동행 예상 견적</div>
                <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                  {selectedManager?.name} ({selectedManager?.hourlyRate === 21000 ? '전문 매니저 21,000원' : '학생 매니저 18,000원'}/h 기준)
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#6edfec] text-lg font-black">{estimatedCost.toLocaleString()}원</span>
                <span className="text-[10px] text-slate-400 block font-normal">교통비 별도</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              * 기본 2시간 기준 금액이며, 이동 교통비(택시·대중교통)는 환자 부담 실비로 별도 처리됩니다. (구급차 미지원)
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-4 h-4 rounded text-[#6edfec]"
              />
              <span className="text-slate-200 font-bold">[필수] 병원 동행 서비스 이용약관 및 개인정보 활용에 동의합니다.</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-black text-sm rounded-2xl shadow-md transition cursor-pointer"
          >
            동행 예약 신청 완료하기
          </button>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 5-0. 실시간 5단계 동행 프로세스 트래커 컴포넌트
// ========================================================
function RealtimeProcessTracker({ reservation, onAdvanceStep, showAdvanceButton = true }) {
  const currentStep = reservation.step || 1;
  const [selectedStep, setSelectedStep] = useState(currentStep);

  useEffect(() => {
    setSelectedStep(currentStep);
  }, [currentStep]);

  const activeMeta = TRACKING_STEPS_META.find(m => m.step === selectedStep) || TRACKING_STEPS_META[0];
  const currentMeta = TRACKING_STEPS_META.find(m => m.step === currentStep) || TRACKING_STEPS_META[0];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0bbecb] animate-ping absolute"></span>
            <span className="w-2 h-2 rounded-full bg-[#0bbecb]"></span>
          </div>
          <span className="font-extrabold text-slate-900 text-sm">⏱️ 실시간 5단계 동행 프로세스 트래커</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500">현재 상태:</span>
          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${currentMeta.badgeColor}`}>
            {currentMeta.statusTitle}
          </span>
        </div>
      </div>

      <div className="relative pt-2 pb-1 px-4 sm:px-10">
        <div className="absolute top-7 left-10 right-10 sm:left-16 sm:right-16 h-1 bg-slate-200 z-0">
          <div 
            className="h-full bg-slate-900 transition-all duration-500 ease-out"
            style={{ width: `${((Math.max(1, currentStep) - 1) / 4) * 100}%` }}
          ></div>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          {TRACKING_STEPS_META.map((stepMeta) => {
            const isDone = currentStep > stepMeta.step;
            const isCurrent = currentStep === stepMeta.step;
            const isSelected = selectedStep === stepMeta.step;

            return (
              <button
                key={stepMeta.step}
                type="button"
                onClick={() => setSelectedStep(stepMeta.step)}
                title={`클릭하여 ${stepMeta.step}단계 [${stepMeta.name}] 세부 설명 보기`}
                className="group flex flex-col items-center focus:outline-hidden cursor-pointer"
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-xs group-hover:scale-105'
                    : isCurrent
                      ? 'bg-slate-900 text-white ring-4 ring-[#6edfec] shadow-md scale-110 font-extrabold animate-pulse'
                      : 'bg-white text-slate-400 border-2 border-slate-300 group-hover:border-slate-400'
                } ${isSelected && !isCurrent ? 'ring-2 ring-slate-400' : ''}`}>
                  {isDone ? '완료' : stepMeta.step}
                </div>

                <span className={`mt-2 text-[11px] sm:text-xs font-bold text-center whitespace-nowrap transition-colors ${
                  isCurrent ? 'text-slate-900 font-extrabold' : isDone ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {stepMeta.name}
                </span>

                {isCurrent && (
                  <span className="text-[10px] text-slate-900 font-extrabold bg-[#6edfec] px-1.5 py-0.5 rounded mt-0.5">
                    진행 중
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-xs ${
              selectedStep === currentStep ? 'bg-[#6edfec]/30 text-slate-900' : 'bg-slate-100 text-slate-700'
            }`}>
              {selectedStep}단계 {selectedStep === currentStep ? '실시간 브리핑' : '단계 안내'}
            </span>
            <h5 className="font-extrabold text-slate-900 text-sm">
              {activeMeta.statusTitle}
            </h5>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
            <Icons.Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>상태 안내: {activeMeta.eta}</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <span>단계별 동행 세부 프로세스 설명</span>
            {selectedStep !== currentStep && (
              <span className="text-[10px] text-slate-400 font-normal">
                (원형 아이콘을 클릭하여 {selectedStep}단계 내용을 열람 중입니다)
              </span>
            )}
          </div>
          <p className="text-slate-700 pl-1 text-[12px] font-medium leading-normal">
            {activeMeta.stepDetail}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-sky-50/70 p-3 rounded-xl border border-sky-100">
          <Icons.MapPin className="w-4 h-4 text-[#0bbecb] shrink-0" />
          <span className="text-slate-500 shrink-0">실시간 위치 안내:</span>
          <span className="text-slate-900 font-bold">{activeMeta.locationText}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-1 gap-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] text-slate-400">
            발표 시연 시 다음 단계 버튼을 클릭하면 세부 설명과 위치가 실시간으로 갱신됩니다.
          </span>
          <div className="flex gap-2">
            {currentStep < 5 && showAdvanceButton && onAdvanceStep && (
              <button
                type="button"
                onClick={() => onAdvanceStep(reservation.id, currentStep)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>다음 단계 진행 ({currentStep + 1}단계)</span>
              </button>
            )}
            {currentStep >= 5 && (
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                모든 동행 프로세스가 안전하게 완료되었습니다.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 5-A. 이용자 마이페이지 (UserMyPageView)
// ========================================================
function UserMyPageView({ currentUser, patientProfile, reservations, managers, onOpenReport, onOpenChat, onSelectManagerFromAI, onGoBooking, showToast }) {
  const [subTab, setSubTab] = useState('reservations');
  const [profileForm, setProfileForm] = useState({ ...patientProfile });

  const handleProfileSave = (e) => {
    e.preventDefault();
    window.withCareStore.updatePatientProfile(profileForm);
    showToast('환자 기본 정보가 성공적으로 저장되었습니다! 다음 예약에 자동 반영됩니다.', 'success');
  };

  const aiManagers = useMemo(() => managers.filter(m => m.isAiPick), [managers]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#6edfec]/20 text-slate-900 flex items-center justify-center font-bold text-xs border border-[#6edfec]/40">
            환자
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{patientProfile.name} 어르신 (이용자 마이페이지)</h2>
              <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                보호자: {currentUser.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              거주지: {patientProfile.address} · 주요 증상: {patientProfile.symptoms}
            </p>
          </div>
        </div>

        <button
          onClick={onGoBooking}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
        >
          새 동행 예약하기
        </button>
      </div>

      <div className="flex border-b border-slate-200 gap-3 text-xs font-bold">
        <button
          onClick={() => setSubTab('reservations')}
          className={`pb-3 px-1 transition border-b-2 flex items-center gap-1.5 cursor-pointer ${
            subTab === 'reservations' ? 'border-slate-900 text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Icons.Calendar className="w-4 h-4" />
          <span>내 동행 예약 & 실시간 5단계 트래커 ({reservations.length})</span>
        </button>
        <button
          onClick={() => setSubTab('profile')}
          className={`pb-3 px-1 transition border-b-2 flex items-center gap-1.5 cursor-pointer ${
            subTab === 'profile' ? 'border-slate-900 text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Icons.User className="w-4 h-4" />
          <span>환자 기본 정보 관리 (조회/수정)</span>
        </button>
        <button
          onClick={() => setSubTab('aiManagers')}
          className={`pb-3 px-1 transition border-b-2 flex items-center gap-1.5 cursor-pointer ${
            subTab === 'aiManagers' ? 'border-slate-900 text-slate-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Icons.Sparkles className="w-4 h-4 text-purple-600" />
          <span>내 조건 맞춤 AI 추천 동행자</span>
        </button>
      </div>

      {subTab === 'reservations' && (
        <div className="space-y-6">
          {reservations.map((item) => {
            const manager = item.managerId ? window.withCareStore.getManagerById(item.managerId) : null;
            const trackingMeta = TRACKING_STEPS_META.find(m => m.step === item.step) || TRACKING_STEPS_META[0];

            return (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900">{item.id}</span>
                    <span className="text-xs text-slate-400">신청일: {item.date} {item.time}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'REQUESTED' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status === 'REQUESTED' ? '동행자 매칭 중' : item.status === 'COMPLETED' ? '동행 완료' : `실시간 동행 진행 중 (${trackingMeta.name})`}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">환자 및 거동 상태</span>
                    <strong className="text-slate-900">{item.patientName} / {item.mobility}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">방문 병원 & 진료과</span>
                    <strong className="text-slate-900">{item.hospital} / {item.department}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">방문 일시</span>
                    <strong className="text-slate-900">{item.date} {item.time}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">자택 픽업지 & 견적</span>
                    <strong className="text-slate-900">{item.cost.toLocaleString()}원 ({item.transportLabel})</strong>
                  </div>
                </div>

                <RealtimeProcessTracker 
                  reservation={item}
                  onAdvanceStep={(resId, currentStep) => {
                    const next = currentStep >= 5 ? 5 : currentStep + 1;
                    window.withCareStore.updateStep(resId, next);
                    const nextMeta = TRACKING_STEPS_META.find(m => m.step === next);
                    showToast(`동행 상태를 [${nextMeta.statusTitle}] 단계로 전진했습니다.`, 'success');
                  }}
                  showAdvanceButton={true}
                />

                {manager && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3.5">
                      <img 
                        src={manager.avatar} 
                        alt={manager.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100" 
                        onError={handleAvatarError}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{manager.name} 동행자</span>
                          <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-extrabold border border-slate-200">
                            {manager.badge} ({manager.major})
                          </span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">평점 {manager.rating} ★ · 봉사 {manager.volunteerHours}시간 누적</div>
                        <p className="text-slate-600 text-[11px] mt-1 line-clamp-1">"{manager.intro}"</p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => onOpenChat(item.id)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Icons.MessageSquare className="w-4 h-4" />
                        <span>1:1 안심 대화방</span>
                      </button>
                      {(item.status === 'COMPLETED' || item.step >= 5) && (
                        <button
                          type="button"
                          onClick={() => onOpenReport(item.id)}
                          className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Icons.ClipboardCheck className="w-4 h-4" />
                          <span>안심 리포트 보기</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {subTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto text-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">환자 기본 인적사항 및 건강 정보</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">저장된 정보는 새로운 동행 예약 시 자동 반영됩니다.</p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">환자 성함 *</label>
                <input 
                  type="text" 
                  value={profileForm.name} 
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                  required 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">생년월일 *</label>
                <input 
                  type="date" 
                  value={profileForm.birth} 
                  onChange={(e) => setProfileForm({ ...profileForm, birth: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                  required 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">환자 연락처</label>
                <input 
                  type="text" 
                  value={profileForm.phone} 
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">거주 지역 (대전 구 단위)</label>
                <input 
                  type="text" 
                  value={profileForm.region} 
                  onChange={(e) => setProfileForm({ ...profileForm, region: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">자택 상세 주소</label>
              <input 
                type="text" 
                value={profileForm.address} 
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">평소 주요 질환 및 증상</label>
              <textarea 
                rows="2"
                value={profileForm.symptoms} 
                onChange={(e) => setProfileForm({ ...profileForm, symptoms: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">정기 복용 약</label>
              <input 
                type="text" 
                value={profileForm.medications} 
                onChange={(e) => setProfileForm({ ...profileForm, medications: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">동행자 전달 기본 메모</label>
              <textarea 
                rows="2"
                value={profileForm.notes} 
                onChange={(e) => setProfileForm({ ...profileForm, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl shadow-xs transition mt-2 cursor-pointer"
            >
              환자 정보 저장하기
            </button>
          </form>
        </div>
      )}

      {subTab === 'aiManagers' && (
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="bg-[#6edfec] text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded">AI MATCHING</span>
              <h4 className="text-base font-bold text-white mt-1">{patientProfile.name} 어르신의 증상에 최적화된 추천 대학생</h4>
            </div>
            <span className="text-slate-400 text-[11px] hidden sm:inline">재학 및 CPR 인증 완료</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {aiManagers.map((mgr) => (
              <div key={mgr.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex gap-3 items-center">
                    <img 
                      src={mgr.avatar} 
                      alt={mgr.name} 
                      className="w-12 h-12 rounded-xl object-cover" 
                      onError={handleAvatarError}
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{mgr.name} ({mgr.badge})</div>
                      <p className="text-[11px] text-[#0bbecb] font-semibold">{mgr.aiPickReason}</p>
                      <span className="text-amber-500 text-[11px]">★ {mgr.rating} (후기 {mgr.reviewCount}회)</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-2 line-clamp-2">"{mgr.intro}"</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectManagerFromAI(mgr)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition cursor-pointer"
                >
                  이 동행자로 예약하기
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================================
// 5-B. 동행자 마이페이지 (CompanionMyPageView)
// ========================================================
function CompanionMyPageView({ currentUser, reservations, urgentRequests, majorInsights, onOpenManagerReport, onOpenChat, onOpenCertModal, onAcceptUrgent, showToast }) {
  const handleAdvanceStep = (resId, currentStep) => {
    const next = currentStep >= 5 ? 5 : currentStep + 1;
    window.withCareStore.updateStep(resId, next);
    const meta = TRACKING_STEPS_META.find(m => m.step === next);
    showToast(`동행 위치 상태를 [${meta.statusTitle}] 단계로 갱신했습니다.`, 'success');
  };

  const currentVolunteerHours = currentUser.volunteerHours || 38;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#6edfec] text-slate-900 flex items-center justify-center font-black text-sm">
            동행자
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black">{currentUser.name} 동행자님의 마이페이지</h2>
              <span className="bg-[#6edfec]/20 text-[#6edfec] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#6edfec]/30">
                {currentUser.badge || '충남대 간호학과'}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              대전광역시 거점 대학병원 전문 병원 동행 활동 중
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700">
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold">누적 인정 봉사시간</span>
            <span className="text-xl font-black text-[#6edfec]">{currentVolunteerHours}시간</span>
            <span className="text-[10px] text-slate-500 block">1365·VMS 공식 연계</span>
          </div>
          <button
            onClick={onOpenCertModal}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            확인서 미리보기
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <h3 className="font-extrabold text-lg text-slate-900">
              지금 당장 동행인 구해요! (실시간 긴급 환자 요청)
            </h3>
          </div>
          <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            수락 즉시 봉사 3~4시간 인정
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {urgentRequests.map(urg => {
            const isAccepted = urg.status === 'ACCEPTED';

            return (
              <div 
                key={urg.id} 
                className={`rounded-2xl p-4 border transition flex flex-col justify-between space-y-3 ${
                  isAccepted ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900 text-sm">{urg.patientName}</span>
                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                      {urg.time}
                    </span>
                  </div>

                  <div className="text-slate-600 space-y-0.5 text-[11px]">
                    <div>병원: <strong className="text-slate-800">{urg.hospital} ({urg.department})</strong></div>
                    <div>픽업: <strong className="text-slate-800">{urg.pickupLocation}</strong></div>
                    <div>상태: <strong className="text-slate-800">{urg.mobility}</strong></div>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{urg.note}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{urg.volunteerCredit}</span>
                  {isAccepted ? (
                    <span className="text-slate-500 font-bold">수락 완료</span>
                  ) : (
                    <button
                      onClick={() => onAcceptUrgent(urg.id)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      즉시 수락하기
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900">
          내 동행 배정 업무 관리
        </h3>

        <div className="space-y-6">
          {reservations.map((item) => {
            const isRequested = item.status === 'REQUESTED';

            return (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="font-extrabold text-slate-900 text-base">{item.id} · {item.patientName} 어르신 ({item.hospital})</span>
                  <span className={`px-3 py-1 rounded-full font-bold ${isRequested ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-900 border border-slate-200'}`}>
                    {isRequested ? '신규 요청' : '배정 진행 업무'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div>일시: <strong className="text-slate-900 block mt-0.5">{item.date} {item.time}</strong></div>
                  <div>진료과: <strong className="text-slate-900 block mt-0.5">{item.department}</strong></div>
                  <div>이동수단: <strong className="text-slate-900 block mt-0.5">{item.transportLabel}</strong></div>
                  <div>정산 예정액: <strong className="text-slate-900 block mt-0.5">{item.cost.toLocaleString()}원</strong></div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-slate-700 border border-slate-100">
                  <span className="font-bold text-slate-900">보호자 전달사항:</span> {item.messageToManager}
                </div>

                {!isRequested && (
                  <RealtimeProcessTracker 
                    reservation={item}
                    onAdvanceStep={handleAdvanceStep}
                    showAdvanceButton={true}
                  />
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex gap-2">
                    {isRequested && (
                      <button
                        type="button"
                        onClick={() => {
                          window.withCareStore.acceptReservation(item.id, currentUser.managerId || 'mgr-1');
                          showToast('예약을 수락하였습니다! 1:1 대화방이 활성화되었습니다.', 'success');
                        }}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
                      >
                        이 예약 즉시 수락하기
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenChat(item.id)}
                      className="px-4 py-2 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Icons.MessageSquare className="w-4 h-4" />
                      <span>이용자 1:1 대화</span>
                    </button>
                    {item.step >= 4 && (
                      <button
                        type="button"
                        onClick={() => onOpenManagerReport(item.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition shadow-xs cursor-pointer"
                      >
                        진료 리포트 작성/확인
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900">
          전공별 동행 현황 (비슷한 학과 학생들은 주로 이런 병원에 동행하고 있어요!)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {majorInsights.map(m => (
            <div key={m.majorName} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{m.majorName}</h4>
                  <span className="text-slate-400 text-[11px]">활동 대학생 {m.totalStudents}명</span>
                </div>
                <span className="text-xs bg-slate-100 text-slate-800 font-extrabold px-2.5 py-1 rounded-full">
                  평균 {m.avgHours}h
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500">주요 동행 병원 TOP 3:</span>
                {m.topHospitals.map((h, i) => (
                  <div key={h.name} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900 mr-1.5">{i + 1}. {h.name}</span>
                      <span className="text-[10px] text-slate-400">({h.badge})</span>
                    </div>
                    <span className="font-extrabold text-[#0bbecb]">{h.share}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-600 bg-[#6edfec]/10 p-3 rounded-xl border border-[#6edfec]/30 italic leading-relaxed">
                {m.reviewQuote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 6. 1:1 실시간 대화방 모달 (ChatModal)
// ========================================================
function ChatModal({ reservationId, currentUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatScrollRef = useRef(null);

  const reservation = useMemo(() => {
    return window.withCareStore.reservations.find(r => r.id === reservationId) || window.withCareStore.reservations[0];
  }, [reservationId]);

  const loadMessages = () => {
    setMessages(window.withCareStore.getMessages(reservationId));
  };

  useEffect(() => {
    loadMessages();
    const unsubscribe = window.withCareStore.subscribe(() => {
      loadMessages();
    });
    return unsubscribe;
  }, [reservationId]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    window.withCareStore.sendMessage(reservationId, currentUser.role, inputText);
    setInputText('');
  };

  const isManager = currentUser.role === 'MANAGER';
  const otherPartyTitle = isManager 
    ? `${reservation.patientName} 어르신 보호자` 
    : `${window.withCareStore.getManagerById(reservation.managerId)?.name || '담당'} 동행자`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col h-[580px] overflow-hidden border border-slate-200">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6edfec] animate-pulse"></span>
            <div>
              <h4 className="font-bold text-sm text-white">{otherPartyTitle} 1:1 대화</h4>
              <p className="text-[10px] text-slate-400">예약번호 {reservationId} · 대전 실시간 안심 소통</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition cursor-pointer">
            ✕
          </button>
        </div>

        <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => {
            const isMe = m.sender === currentUser.role;

            return (
              <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-slate-400 mb-0.5 px-1">{m.senderName}</span>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl shadow-xs font-medium leading-relaxed ${
                  isMe 
                    ? 'bg-slate-900 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요 (예: 자택 1층 도착했습니다!)"
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 7. 안심 리포트 및 만족도 평가 모달 (ReportModal)
// ========================================================
function ReportModal({ reservationId, onClose, showToast }) {
  const reservation = useMemo(() => {
    return window.withCareStore.reservations.find(r => r.id === reservationId) || window.withCareStore.reservations[0];
  }, [reservationId]);

  const report = reservation.report || {};
  const [rating, setRating] = useState(reservation.ratingGiven || 5);
  const [review, setReview] = useState(reservation.reviewText || '');
  const [submitted, setSubmitted] = useState(Boolean(reservation.ratingGiven));

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    window.withCareStore.submitReview(reservationId, rating, review);
    setSubmitted(true);
    showToast('소중한 별점과 후기가 등록되었으며, 동행자 평점에 반영되었습니다!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto space-y-5 border border-slate-200 text-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <span className="text-[#0bbecb] text-[10px] font-extrabold">SAFE CARE REPORT</span>
            <h3 className="font-extrabold text-base text-slate-900">외래 진료 결과 안심 리포트</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">✕</button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="font-bold text-slate-900 block text-xs">진료 소견 및 요약</span>
          <p className="text-slate-700 leading-relaxed font-medium">{report.summary || '진료 소견 메모 완료.'}</p>
        </div>

        <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 space-y-1">
          <span className="font-bold text-slate-900 block text-xs">처방약 복용 지도 안내</span>
          <p className="text-slate-700 leading-relaxed">{report.pharmacyGuide || '처방전 수령 및 복약 지도 완료.'}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-900 text-xs">
            <Icons.Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI 진료실 음성 메모 요약</span>
          </div>
          <p className="text-purple-800 leading-relaxed font-medium">{report.aiAudioSummary || '[AI 요약] 원활한 외래 상담 완료.'}</p>
        </div>

        <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-slate-100 space-y-3">
          <h4 className="font-bold text-slate-900">동행자 만족도 평가 (평점에 실시간 반영)</h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-xl transition cursor-pointer ${star <= rating ? 'text-amber-400 scale-110' : 'text-slate-300'}`}
              >
                ★
              </button>
            ))}
            <span className="font-extrabold text-slate-700 ml-2">{rating}점 / 5점</span>
          </div>

          <textarea
            rows="2"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="동행자님의 친절도 및 병원 케어에 대한 한줄평을 남겨주세요."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
            disabled={submitted}
          />

          {!submitted ? (
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl transition cursor-pointer"
            >
              별점 및 이용후기 등록하기
            </button>
          ) : (
            <div className="text-center text-emerald-600 font-extrabold py-1">
              후기 등록이 완료되었습니다. 감사합니다.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 8. 안심 리포트 작성 모달 (ManagerReportEditorModal)
// ========================================================
function ManagerReportEditorModal({ reservationId, onClose, showToast }) {
  const reservation = useMemo(() => {
    return window.withCareStore.reservations.find(r => r.id === reservationId) || window.withCareStore.reservations[0];
  }, [reservationId]);

  const [form, setForm] = useState({
    summary: reservation.report?.summary || `${reservation.hospital} ${reservation.department} 외래 진료 완료. 의사 선생님께서 처방해 주신 약 복용 안내 완료.`,
    doctorAdvice: reservation.report?.doctorAdvice || '다음 재진 일정 4주 후 예약됨.',
    pharmacyGuide: reservation.report?.pharmacyGuide || '1일 2회 식후 30분 미온수와 함께 복용.',
    aiAudioSummary: reservation.report?.aiAudioSummary || `[AI 요약] ${reservation.patientName} 어르신 진료 안정적 완료.`
  });

  const handleSave = (e) => {
    e.preventDefault();
    window.withCareStore.saveReport(reservationId, form);
    showToast('진료 결과 안심 리포트가 성공적으로 등록되었습니다!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4 text-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <span className="text-[#0bbecb] text-[10px] font-extrabold">REPORT EDITOR</span>
            <h3 className="font-extrabold text-base text-slate-900">외래 결과 안심 리포트 작성</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">진료 결과 핵심 요약 *</label>
            <textarea
              rows="3"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">의사 소견 및 주의사항 *</label>
            <input
              type="text"
              value={form.doctorAdvice}
              onChange={(e) => setForm({ ...form, doctorAdvice: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">처방약 복용법 및 약국 수령 확인 *</label>
            <input
              type="text"
              value={form.pharmacyGuide}
              onChange={(e) => setForm({ ...form, pharmacyGuide: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl shadow-xs transition mt-2 cursor-pointer"
          >
            리포트 최종 저장 및 보호자 전송
          </button>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 9. 1365 / VMS 봉사활동 확인서 미리보기 모달 (VolunteerCertModal)
// ========================================================
function VolunteerCertModal({ currentUser, onClose }) {
  const printDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  const hours = currentUser.volunteerHours || 38;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 space-y-6 text-xs max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm">1365 · VMS 연계 봉사활동 확인서</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">✕</button>
        </div>

        <div className="border-2 border-slate-800 p-6 rounded-2xl bg-slate-50/50 space-y-6 text-slate-800">
          <div className="text-center space-y-1">
            <span className="text-[10px] text-slate-500 font-bold tracking-widest">[ 제 2026-V-0882 호 ]</span>
            <h2 className="text-xl font-black tracking-widest text-slate-900">봉 사 활 동 확 인 서</h2>
          </div>

          <div className="border-t border-b border-slate-300 py-3 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>성 명: <strong className="text-slate-900">{currentUser.name}</strong></div>
              <div>소 속: <strong className="text-slate-900">{currentUser.university || '충남대학교'} {currentUser.major || '간호학과'}</strong></div>
            </div>
            <div>활동기간: <strong>2026. 09. 01 ~ 2026. 11. 20</strong></div>
            <div>활동처: <strong>위드케어 대전광역시 시니어 병원동행 지원단 (충남대병원·을지대병원)</strong></div>
            <div>인정시간: <strong className="text-[#0bbecb] text-sm">총 {hours} 시간</strong> (1회당 3~4시간 인정)</div>
          </div>

          <div className="text-center text-xs text-slate-700 leading-relaxed py-2">
            위 사람은 대전광역시 의료소외계층 및 거동불편 노인 환자의<br />
            병원 외래진료 동행과 낙상예방 케어 의료봉사활동에 성실히 참여하였음을 확인합니다.
          </div>

          <div className="text-center space-y-1 pt-2">
            <div className="font-bold text-slate-700">{printDate}</div>
            <div className="font-extrabold text-slate-900 text-sm tracking-wider">
              위드케어 병원동행 운영협의회장 [직인생략]
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition cursor-pointer"
          >
            인쇄 / PDF 저장
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 10. 로그인 모달 (대표 동행자 김서연 1인 간소화)
// ========================================================
function LoginModal({ onClose, onSuccess }) {
  const [role, setRole] = useState('GUARDIAN'); // 'GUARDIAN' | 'MANAGER'
  const [type, setType] = useState('MEMBER');

  const [name, setName] = useState('김민수');
  const [birth, setBirth] = useState('1982-08-25');

  const defaultManager = window.withCareStore.managers[0] || {
    id: 'mgr-1',
    name: '김서연',
    badge: '충남대 간호학과',
    university: '충남대학교',
    major: '간호학과 3학년',
    avatar: 'assets/avatar_kim.svg'
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = window.withCareStore.login({
      role,
      type,
      name,
      birth,
      managerId: defaultManager.id
    });
    onSuccess(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-5 text-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <img src="assets/logo.png" alt="WithCare" className="w-5 h-5 object-contain" onError={handleLogoError} />
            <h3 className="font-extrabold text-base text-slate-900">위드케어 로그인</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">✕</button>
        </div>

        {/* 1. 권한 선택 탭 */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('GUARDIAN')}
            className={`py-2.5 rounded-xl font-extrabold text-xs transition cursor-pointer ${
              role === 'GUARDIAN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            이용자 (환자/보호자)
          </button>
          <button
            type="button"
            onClick={() => setRole('MANAGER')}
            className={`py-2.5 rounded-xl font-extrabold text-xs transition cursor-pointer ${
              role === 'MANAGER' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            동행자 (대학생)
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {role === 'GUARDIAN' ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('MEMBER')}
                  className={`flex-1 py-1.5 rounded-lg font-bold border transition cursor-pointer ${
                    type === 'MEMBER' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  회원 로그인 (김민수)
                </button>
                <button
                  type="button"
                  onClick={() => setType('NON_MEMBER')}
                  className={`flex-1 py-1.5 rounded-lg font-bold border transition cursor-pointer ${
                    type === 'NON_MEMBER' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  비회원 간편 로그인
                </button>
              </div>

              {type === 'NON_MEMBER' ? (
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">성함 *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름 입력"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">생년월일 (YYYY-MM-DD) *</label>
                    <input
                      type="date"
                      value={birth}
                      onChange={(e) => setBirth(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 space-y-1">
                  <span className="font-extrabold text-slate-900 block">기본 보호자 계정 (데모 시연용)</span>
                  <div className="text-[11px]">이름: 김민수 / 환자: 김순자 어르신</div>
                  <div className="text-[11px] text-[#0bbecb] font-bold">클릭 시 이용자 마이페이지로 즉시 진입합니다.</div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block font-bold text-slate-700">시연용 대표 대학생 동행자 계정</label>
              <div className="p-4 rounded-2xl border-2 border-slate-900 bg-[#6edfec]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={defaultManager.avatar} 
                    alt={defaultManager.name} 
                    className="w-12 h-12 rounded-xl object-cover" 
                    onError={handleAvatarError}
                  />
                  <div>
                    <div className="font-black text-slate-900 text-sm">{defaultManager.name} 동행자</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">{defaultManager.university} {defaultManager.major}</div>
                    <span className="text-[#0bbecb] font-extrabold text-[10px]">인정 봉사 {defaultManager.volunteerHours}시간 누적</span>
                  </div>
                </div>
                <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                  대표 계정
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                원클릭으로 접속하여 동행자 마이페이지(봉사시간, 확인서 미리보기, 긴급 환자 요청 수락)를 시연할 수 있습니다.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#6edfec] hover:bg-[#5cd4e2] text-slate-900 font-black rounded-xl shadow-xs transition cursor-pointer"
          >
            {role === 'MANAGER' ? '동행자 마이페이지로 접속하기' : '이용자 마이페이지로 접속하기'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// 11. React DOM 렌더링
// ========================================================
ReactDOM.render(<App />, document.getElementById('root'));
