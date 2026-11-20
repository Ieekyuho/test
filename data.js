// data.js - 위드케어(WithCare) 병원 동행서비스 데이터셋 v3.4
// 대전광역시 MVP 모델 & 의료 관련 전공 대학생 동행 매니저 전용

// ========================================================
// 1. 환자 기본 프로필 (마이페이지 조회 및 수정용 기본값)
// ========================================================
const DEFAULT_PATIENT_PROFILE = {
  name: '김순자',
  birth: '1950-04-12',
  gender: '여성',
  phone: '010-3344-9988',
  address: '대전광역시 서구 둔산로 123, 크로바아파트 105동 802호',
  region: '대전 서구 둔산동',
  symptoms: '퇴행성 무릎 관절염, 계단 보행 시 통증 및 10분 이상 연속 보행 부축 필요',
  medications: '혈압약(아침 식후 1정), 관절염 소염진통제(아침/저녁)',
  useWheelchair: false,
  guardianName: '김민수 (자녀)',
  guardianPhone: '010-9876-5432',
  notes: '보행 시 무릎 통증이 있으시니 천천히 부축해 주시고, 병원 진료 시 의사 선생님 소견과 다음 내원일을 꼼꼼히 메모 부탁드립니다.'
};

// ========================================================
// 2. 의료 관련 전공 대학생 및 전문 동행 매니저 프로필 데이터 (로컬 SVG 아바타 적용)
// 전문 매니저 21,000원/h / 학생 매니저 18,000원/h (기본 1시간 기준, 교통비 별도)
// ========================================================
const DEFAULT_MANAGERS = [
  {
    id: 'mgr-1',
    name: '김서연',
    gender: '여성',
    age: 22,
    university: '충남대학교',
    major: '간호학과 3학년',
    managerType: 'STUDENT',
    managerTypeLabel: '학생 매니저',
    badge: '충남대 간호 3학년 (학생)',
    certification: '대한적십자사 CPR / BLS 기본소생술 수료',
    rating: 4.98,
    reviewCount: 42,
    volunteerHours: 38,
    hourlyRate: 18000,
    region: '대전 유성구 궁동 / 서구',
    baseLocation: '대전 유성구 대학로 (충남대 대덕캠퍼스 인근)',
    primaryHospitals: '충남대학교병원, 대전을지대학교병원, 유성선병원',
    etaMinutes: 7,
    etaText: '도보 7분 (약 480m)',
    avatar: 'assets/avatar_kim.svg',
    mapX: 30, // 대전 지도 내 고정 좌표
    mapY: 34,
    tags: ['학생 매니저', '간호학과', 'CPR 자격', '친절한 말벗', '휠체어 숙련'],
    title: '어르신의 눈높이에 맞춘 따뜻한 예비 간호사',
    intro: '충남대학교 간호학과 3학년에 재학 중입니다. 외래 실습 경험과 CPR 수료를 바탕으로 어르신을 제 가족처럼 안전하고 정성껏 모시겠습니다.',
    isAiPick: true,
    aiPickReason: '무릎 관절 환자 부축 및 충남대병원 동행 경험 18회 보유'
  },
  {
    id: 'mgr-2',
    name: '박준혁',
    gender: '남성',
    age: 24,
    university: '을지대학교',
    major: '의예과 본과 1학년',
    managerType: 'EXPERT',
    managerTypeLabel: '전문 매니저',
    badge: '을지대 의예과 (전문)',
    certification: '응급처치 전문과정 수료 / 대한심폐소생협회 인증',
    rating: 4.95,
    reviewCount: 35,
    volunteerHours: 45,
    hourlyRate: 21000,
    region: '대전 서구 둔산동 / 중구',
    baseLocation: '대전 서구 둔산동 (을지대병원 인근)',
    primaryHospitals: '대전을지대학교병원, 대전성모병원, 대전선병원',
    etaMinutes: 4,
    etaText: '도보 4분 (약 310m)',
    avatar: 'assets/avatar_park.svg',
    mapX: 52,
    mapY: 40,
    tags: ['전문 매니저', '의예과', '진료 소견 메모', '복약 지도', '든든한 부축'],
    title: '진료실 핵심 소견을 꼼꼼히 정리해 드리는 예비 의사',
    intro: '을지대학교 의과대학 본과 1학년 재학 중입니다. 진료실에서 교수님의 처방과 설명을 정확히 경청하고 보호자님께 명쾌하게 전달해 드립니다.',
    isAiPick: true,
    aiPickReason: '의학적 소견 경청 능력 우수 & 둔산동 거주 접근성 최상'
  },
  {
    id: 'mgr-3',
    name: '이민지',
    gender: '여성',
    age: 21,
    university: '건양대학교',
    major: '간호학과 2학년',
    managerType: 'STUDENT',
    managerTypeLabel: '학생 매니저',
    badge: '건양대 간호 2학년 (학생)',
    certification: '보건복지부 인성교육 이수 / 응급처치 수료',
    rating: 4.92,
    reviewCount: 28,
    volunteerHours: 26,
    hourlyRate: 18000,
    region: '대전 서구 관저동 / 도안동',
    baseLocation: '대전 서구 관저동 (건양대 메디컬캠퍼스)',
    primaryHospitals: '건양대학교병원, 충남대학교병원',
    etaMinutes: 9,
    etaText: '도보 9분 (약 620m)',
    avatar: 'assets/avatar_lee.svg',
    mapX: 24,
    mapY: 76,
    tags: ['학생 매니저', '간호학과', '밝은 에너지', '약국 처방전 수령', '키오스크 접수 대행'],
    title: '손녀처럼 다정하고 씩씩한 간호대 동행 매니저',
    intro: '건양대학교 간호학과 2학년입니다. 어르신들의 병원 원내 무인 접수부터 수납, 약국 조제 수령까지 편안하게 챙겨드립니다.',
    isAiPick: false,
    aiPickReason: '건양대병원 외래 동행 최다 매칭 매니저'
  },
  {
    id: 'mgr-4',
    name: '최현우',
    gender: '남성',
    age: 23,
    university: '대전대학교',
    major: '물리치료학과 3학년',
    managerType: 'EXPERT',
    managerTypeLabel: '전문 매니저',
    badge: '대전대 물리치료 (전문)',
    certification: '보행 보조 및 낙상예방 케어 수료',
    rating: 4.97,
    reviewCount: 31,
    volunteerHours: 32,
    hourlyRate: 21000,
    region: '대전 중구 대흥동 / 동구',
    baseLocation: '대전 중구 대흥동 (대전성모병원 인근)',
    primaryHospitals: '가톨릭대 대전성모병원, 충남대학교병원, 대전선병원',
    etaMinutes: 11,
    etaText: '도보 11분 (약 780m)',
    avatar: 'assets/avatar_choi.svg',
    mapX: 72,
    mapY: 60,
    tags: ['전문 매니저', '물리치료학과', '낙상 예방', '보행 부축 전문가', '재활외래 특화'],
    title: '안전한 보행을 책임지는 물리치료 전공 매니저',
    intro: '대전대학교 물리치료학과 3학년입니다. 보행이 불편하시거나 관절 질환이 있으신 어르신들의 낙상 방지와 편안한 이동을 책임집니다.',
    isAiPick: false,
    aiPickReason: '거동 불편 및 휠체어 이용 환자 선호도 1위'
  },
  {
    id: 'mgr-5',
    name: '정다은',
    gender: '여성',
    age: 23,
    university: '충남대학교',
    major: '의예과 본과 2학년',
    managerType: 'EXPERT',
    managerTypeLabel: '전문 매니저',
    badge: '충남대 의예 본과 (전문)',
    certification: '대한적십자사 전문응급처치 강사과정 수료',
    rating: 4.99,
    reviewCount: 39,
    volunteerHours: 52,
    hourlyRate: 21000,
    region: '대전 유성구 지족동 / 노은동',
    baseLocation: '대전 유성구 지족동 (유성선병원 인근)',
    primaryHospitals: '유성선병원, 충남대학교병원',
    etaMinutes: 5,
    etaText: '도보 5분 (약 350m)',
    avatar: 'assets/avatar_kim.svg',
    mapX: 28,
    mapY: 24,
    tags: ['전문 매니저', '의예과', '유성선병원 특화', '응급처치 강사', '세심한 설명'],
    title: '유성선병원 외래 및 심뇌혈관 전문 안심 동행',
    intro: '충남대학교 의과대학 본과 2학년에 재학 중입니다. 유성선병원 인근에 거주하여 신속한 매칭과 진료 브리핑이 가능합니다.',
    isAiPick: true,
    aiPickReason: '유성선병원 최인접 & 뇌혈관 외래 동행 평점 5.0 만점'
  },
  {
    id: 'mgr-6',
    name: '한지원',
    gender: '여성',
    age: 22,
    university: '을지대학교',
    major: '간호학과 3학년',
    managerType: 'STUDENT',
    managerTypeLabel: '학생 매니저',
    badge: '을지대 간호 3학년 (학생)',
    certification: '기본소생술(BLS) Provider / 노인간호 실습 우수',
    rating: 4.94,
    reviewCount: 29,
    volunteerHours: 34,
    hourlyRate: 18000,
    region: '대전 중구 목동 / 서구 탄방동',
    baseLocation: '대전 중구 목동 (대전선병원 본원 인근)',
    primaryHospitals: '대전선병원, 대전을지대학교병원',
    etaMinutes: 6,
    etaText: '도보 6분 (약 420m)',
    avatar: 'assets/avatar_lee.svg',
    mapX: 62,
    mapY: 48,
    tags: ['학생 매니저', '간호학과', '대전선병원 특화', '낙상 예방', '친절한 동행'],
    title: '원도심 선병원 외래를 꼼꼼히 챙기는 예비 간호사',
    intro: '을지대학교 간호학과 3학년입니다. 선병원과 성모병원 외래 동행 경험이 풍부하며, 부모님을 따뜻하게 부축해 드리겠습니다.',
    isAiPick: false,
    aiPickReason: '대전선병원 본원 최단거리 매칭 가능'
  }
];

// ========================================================
// 3. 대전광역시 주요 대학/대형종합병원 데이터셋
// ========================================================
const DEFAULT_HOSPITALS = [
  {
    id: 'hosp-1',
    name: '충남대학교병원',
    category: '상급종합병원 (국립)',
    region: '대전 중구 대사동',
    address: '대전광역시 중구 문화로 282',
    mapX: 68,
    mapY: 65,
    departments: ['순환기내과', '정형외과', '신경과', '소화기내과', '안과'],
    partnered: true,
    description: '대전·충남 거점 상급종합병원으로 대학생 의료봉사단 공식 연계 병원'
  },
  {
    id: 'hosp-2',
    name: '건양대학교병원',
    category: '상급종합병원 (사립)',
    region: '대전 서구 관저동',
    address: '대전광역시 서구 관저동로 158',
    mapX: 24,
    mapY: 78,
    departments: ['안과', '정형외과', '심혈관센터', '내분비내과', '재활의학과'],
    partnered: true,
    description: '서구 관저동 위치, 최신 외래 센터 및 환자 안심 동행 전용 접수 창구 보유'
  },
  {
    id: 'hosp-3',
    name: '대전을지대학교병원',
    category: '종합병원',
    region: '대전 서구 둔산동',
    address: '대전광역시 서구 둔산서로 95',
    mapX: 52,
    mapY: 38,
    departments: ['정형외과', '신경외과', '심장내과', '이비인후과'],
    partnered: true,
    description: '정부대전청사 및 둔산 중심가 위치, 둔산동 거주 어르신 방문 선호도 1위'
  },
  {
    id: 'hosp-4',
    name: '가톨릭대학교 대전성모병원',
    category: '종합병원',
    region: '대전 중구 대흥동',
    address: '대전광역시 중구 대흥로 64',
    mapX: 74,
    mapY: 56,
    departments: ['소화기내과', '신경과', '정형외과', '비뇨의학과'],
    partnered: true,
    description: '원도심 중심 가톨릭 의료기관, 따뜻한 호스피스 및 만성질환 케어 특화'
  },
  {
    id: 'hosp-5',
    name: '유성선병원',
    category: '대형종합병원 (선메디컬센터)',
    region: '대전 유성구 지족동',
    address: '대전광역시 유성구 북유성대로 93',
    mapX: 28,
    mapY: 24,
    departments: ['뇌졸중센터', '심장센터', '정형외과', '소화기내과', '응급의학과'],
    partnered: true,
    description: '유성구 거점 종합병원, 선메디컬센터 암·뇌졸중 및 관절치료 특화 전문 병원'
  },
  {
    id: 'hosp-6',
    name: '대전선병원 (목동 본원)',
    category: '종합병원 (선메디컬센터 본원)',
    region: '대전 중구 목동',
    address: '대전광역시 중구 목중로 29',
    mapX: 62,
    mapY: 48,
    departments: ['척추관절센터', '소화기센터', '인공신장실', '가정의학과'],
    partnered: true,
    description: '원도심 중심 대형 종합병원, 정형외과 수술 및 전문 종합검진 특화'
  }
];

// ========================================================
// 4. 내 근처 동행자 찾기용 GPS 시뮬레이션 거점 데이터
// ========================================================
const DAEJEON_LOCATIONS = [
  { 
    id: 'loc-1', 
    name: '대전 서구 둔산동', 
    label: '대전 서구 둔산동 (시청/크로바Apt)', 
    nearHospital: '대전을지대학교병원', 
    mapX: 50, 
    mapY: 42,
    activeManagers: 6 
  },
  { 
    id: 'loc-2', 
    name: '대전 유성구 대학로/궁동', 
    label: '대전 유성구 궁동 (충남대 대덕캠)', 
    nearHospital: '충남대학교병원', 
    mapX: 32, 
    mapY: 34,
    activeManagers: 6 
  },
  { 
    id: 'loc-3', 
    name: '대전 중구 대사동/대흥동', 
    label: '대전 중구 대사동 (충남대병원/성모병원)', 
    nearHospital: '충남대학교병원, 대전성모병원', 
    mapX: 70, 
    mapY: 62,
    activeManagers: 6 
  },
  { 
    id: 'loc-4', 
    name: '대전 서구 관저동/도안동', 
    label: '대전 서구 관저동 (건양대병원 인근)', 
    nearHospital: '건양대학교병원', 
    mapX: 28, 
    mapY: 74,
    activeManagers: 6 
  },
  { 
    id: 'loc-5', 
    name: '대전 유성구 지족동/노은동', 
    label: '대전 유성구 지족동 (유성선병원 인근)', 
    nearHospital: '유성선병원', 
    mapX: 28, 
    mapY: 24,
    activeManagers: 6 
  },
  { 
    id: 'loc-6', 
    name: '대전 중구 목동/용두동', 
    label: '대전 중구 목동 (대전선병원 본원 인근)', 
    nearHospital: '대전선병원', 
    mapX: 62, 
    mapY: 48,
    activeManagers: 6 
  }
];

// ========================================================
// 5. "지금 당장 동행인 구해요!" (즉각적인 환자 수요 신청 피드)
// ========================================================
const URGENT_REQUESTS = [
  {
    id: 'urg-101',
    patientName: '박*옥 어르신 (76세)',
    hospital: '충남대학교병원',
    department: '순환기내과',
    time: '오늘 14:00 (급구)',
    pickupLocation: '대전 서구 둔산동 크로바아파트',
    mobility: '부축 보행 필요 (무릎 관절염)',
    volunteerCredit: '봉사 4시간 인정',
    hourlyPay: 20000,
    status: 'WAITING',
    note: '오후 14시 진료 예약인데 보호자가 급한 출장으로 부득이 신청합니다. 둔산동 자택 픽업부터 진료실 동행 부탁드립니다.'
  },
  {
    id: 'urg-102',
    patientName: '이*수 어르신 (81세)',
    hospital: '대전을지대학교병원',
    department: '정형외과',
    time: '오늘 16:30 (접수 대기)',
    pickupLocation: '대전 서구 월평동 무지개아파트',
    mobility: '휠체어 대여 및 이동 보조 필요',
    volunteerCredit: '봉사 3시간 인정',
    hourlyPay: 20000,
    status: 'WAITING',
    note: '깁스 푼 뒤 재활 경과 확인 진료입니다. 병원 키오스크 접수와 휠체어 이동을 도와주실 대학생 동행자님 모십니다.'
  },
  {
    id: 'urg-103',
    patientName: '정*선 어르신 (73세)',
    hospital: '건양대학교병원',
    department: '안과 (망막 검진)',
    time: '내일 09:30',
    pickupLocation: '대전 서구 관저동 구봉마을',
    mobility: '혼자 걸으시나 안약 점안 후 시야 흐림',
    volunteerCredit: '봉사 4시간 인정',
    hourlyPay: 20000,
    status: 'WAITING',
    note: '산동 검사 후 귀가 시 혼자 걷기 어려우시니 약국 수령과 자택 안전 귀가까지 꼼꼼히 부탁드립니다.'
  }
];

// ========================================================
// 6. "비슷한 학과 학생들은 주로 이런 병원에 동행하고 있어요!" 통계
// ========================================================
const MAJOR_INSIGHTS = [
  {
    majorName: '간호학과',
    totalStudents: 142,
    avgHours: 36.5,
    topHospitals: [
      { name: '충남대학교병원', share: '44%', badge: '외래 진료 및 복약 지도' },
      { name: '대전을지대학교병원', share: '32%', badge: '주사·검사실 안내' },
      { name: '가톨릭대 대전성모병원', share: '24%', badge: '노인 환자 말벗 케어' }
    ],
    reviewQuote: '"수업에서 배운 환자 응대와 의사 소견 청취를 실제로 체감하며 큰 보람과 취업 스펙을 쌓고 있어요."'
  },
  {
    majorName: '의예과 / 의학과',
    totalStudents: 68,
    avgHours: 42.0,
    topHospitals: [
      { name: '대전을지대학교병원', share: '46%', badge: '교수님 진료 소견 정리' },
      { name: '충남대학교병원', share: '38%', badge: '심장·혈관 검진 동행' },
      { name: '건양대학교병원', share: '16%', badge: '중증 외래 접수 보조' }
    ],
    reviewQuote: '"환자와 의사 사이의 소통 가교 역할을 하며 예비 의료인으로서의 책임감을 배웁니다."'
  },
  {
    majorName: '물리치료학과',
    totalStudents: 54,
    avgHours: 31.0,
    topHospitals: [
      { name: '가톨릭대 대전성모병원', share: '52%', badge: '낙상 예방 및 안전 보행' },
      { name: '충남대학교병원', share: '30%', badge: '재활의학과 휠체어 보조' },
      { name: '대전한국병원', share: '18%', badge: '관절 수술 후 외래 동행' }
    ],
    reviewQuote: '"보행이 불편한 어르신의 이동을 직접 보조하며 임상 물리치료 테크닉을 실전에서 익힙니다."'
  }
];

// ========================================================
// 7. 실시간 5단계 동행 프로세스 트래커 메타
// ========================================================
const TRACKING_STEPS_META = [
  {
    step: 1,
    name: '예약 완료',
    statusTitle: '① 예약 완료 (대전 대학생 동행자 매칭 중)',
    stepDetail: '보호자님의 동행 신청이 정상 접수되었으며, 대전권 의료 관련 학과(간호/의예/물리치료 등) 인증 대학생 동행자를 매칭하고 있습니다.',
    locationText: '접수 완료 · 대전 서구/유성구 매니저 풀 매칭 중',
    percent: 20,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    eta: '매칭 진행 중'
  },
  {
    step: 2,
    name: '동행자 배정',
    statusTitle: '② 동행자 배정 완료 (자택 출발 준비)',
    stepDetail: '의료 전공 동행자가 배정되었습니다. 문진표와 주의사항을 확인한 뒤 자택으로 출발 준비 중입니다. 1:1 대화방을 통해 소통하실 수 있습니다.',
    locationText: '현재 위치: 대전 유성구 대학로 인근 (약 800m 전방 이동 중)',
    percent: 40,
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    eta: '자택 도착까지 약 7분 전'
  },
  {
    step: 3,
    name: '자택 픽업',
    statusTitle: '③ 자택 픽업 완료 (병원으로 이동 중)',
    stepDetail: '동행자가 자택 1층에서 어르신을 직접 대면하여 낙상 위험을 점검한 뒤, 안전하게 차량/대중교통에 탑승하여 병원으로 이동 중입니다.',
    locationText: '현재 위치: 둔산대로 주행 중 (충남대병원/을지대병원 방향)',
    percent: 60,
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    eta: '병원 도착 예정'
  },
  {
    step: 4,
    name: '병원 진료 중',
    statusTitle: '④ 병원 도착 및 외래 진료 동행 중',
    stepDetail: '병원 본관 도착 후 무인 키오스크 접수를 마치고 외래 진료실에 동행하여 대기 중입니다. 의사 선생님 소견과 복약 지도를 꼼꼼히 메모하고 있습니다.',
    locationText: '현재 위치: 충남대학교병원 본관 외래 진료실 앞 대기',
    percent: 80,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    eta: '진료실 대기 & 상담 진행 중'
  },
  {
    step: 5,
    name: '귀가 완료',
    statusTitle: '⑤ 안전 귀가 및 안심 리포트 완료',
    stepDetail: '처방전 약국 수령을 마치고 어르신을 자택 안까지 안전하게 모셔다드렸습니다. 진료 핵심 요약과 복약 지도서가 포함된 안심 리포트가 등록되었습니다.',
    locationText: '자택 도착 완료 · 복약 설명서 전달 완료',
    percent: 100,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    eta: '동행 완료 (봉사 4시간 적립)'
  }
];

// ========================================================
// 8. 1:1 실시간 대화방 초기 내역
// ========================================================
const DEFAULT_CHAT_HISTORY = {
  'RES-2026-101': [
    {
      id: 'c-1',
      sender: 'MANAGER',
      senderName: '김서연 동행자 (충남대 간호)',
      text: '안녕하세요, 보호자님! 오늘 어르신 충남대병원 순환기내과 동행을 맡은 충남대학교 간호학과 3학년 김서연입니다. 출발 15분 전 자택 앞에서 다시 연락드리겠습니다.',
      time: '08:30'
    },
    {
      id: 'c-2',
      sender: 'GUARDIAN',
      senderName: '김민수 (보호자)',
      text: '네, 김서연 학생님 반갑습니다. 어머니께서 무릎이 조금 불편하시니 계단 내려오실 때 천천히 부축 부탁드릴게요.',
      time: '08:32'
    },
    {
      id: 'c-3',
      sender: 'MANAGER',
      senderName: '김서연 동행자 (충남대 간호)',
      text: '네, 걱정 마세요! 어르신 낙상 예방에 유의하여 안전하게 엘리베이터 이용하겠습니다. 진료실 질문 리스트도 잘 챙겼습니다.',
      time: '08:35'
    }
  ]
};

// ========================================================
// 9. 초기 예약 내역 데이터
// ========================================================
const DEFAULT_RESERVATIONS = [
  {
    id: 'RES-2026-101',
    patientName: '김순자',
    patientBirth: '1950-04-12',
    hospital: '충남대학교병원',
    department: '순환기내과',
    date: '2026-11-20',
    time: '09:30',
    mobility: '거동 불편·부축 필요',
    pickupAddress: '대전광역시 서구 둔산로 123 (크로바아파트)',
    transportType: 'TAXI',
    transportLabel: '택시/대중교통 (실비 환자부담)',
    includePharmacy: true,
    messageToDoctor: '최근 아침 기상 시 가슴 답답함 증상이 주 2회 정도 있으셨습니다.',
    messageToManager: '귀가 어두우시니 원내 이동 시 큰 소리로 친절하게 안내 부탁드립니다.',
    durationHours: 1,
    cost: 18000,
    step: 4,
    status: 'IN_PROGRESS',
    managerId: 'mgr-1',
    volunteerHoursEarned: 4,
    report: {
      summary: '충남대병원 순환기내과 진료 완료. 심전도 및 혈압 정상 범위 내 유지 중이나, 아침 가슴 답답 증상 관련하여 경구 약 1종 추가 처방됨. 3개월 후 재진 예약 완료.',
      doctorAdvice: '아침 기상 후 급격한 보행 지양, 처방된 혈압 조절제 매일 아침 식후 30분에 규칙적으로 복용할 것.',
      pharmacyGuide: '새로 추가된 혈압약은 어지럼증이 나타날 수 있으므로 기상 직후 충분한 물과 함께 복용 지도 완료.',
      aiAudioSummary: '[AI 녹음 요약] 환자분 혈압 안정적임. 가슴 통증 빈도 모니터링 필요하며 차기 진료는 2027년 2월 24일 오전 10시 외래 예약됨.',
      isLockedDeepReport: true
    }
  },
  {
    id: 'RES-2026-102',
    patientName: '김순자',
    patientBirth: '1950-04-12',
    hospital: '대전을지대학교병원',
    department: '정형외과',
    date: '2026-11-05',
    time: '14:00',
    mobility: '거동 불편·부축 필요',
    pickupAddress: '대전광역시 서구 둔산로 123',
    transportType: 'OWN_CAR',
    transportLabel: '도보 / 자차',
    includePharmacy: true,
    messageToDoctor: '무릎 관절 주사 경과 확인차 내원합니다.',
    messageToManager: '병원 외래 센터 앞 키오스크 수납 대행 부탁드립니다.',
    durationHours: 1,
    cost: 21000,
    step: 5,
    status: 'COMPLETED',
    managerId: 'mgr-2',
    volunteerHoursEarned: 4,
    ratingGiven: 5,
    reviewText: '박준혁 의예과 학생님이 교수님 설명을 너무 명쾌하게 받아적어 주셔서 자녀 입장에서 정말 안심이 되었습니다! 강력 추천합니다.',
    report: {
      summary: '대전을지대병원 정형외과 외래 완료. 우측 무릎 관절염 염증 수치 현저히 완화됨. 물리치료 처방 및 소염진통제 2주분 수령 완료.',
      doctorAdvice: '계단 이용 줄이고 평지 위주로 하루 20분씩 가볍게 걷기 운동 권장.',
      pharmacyGuide: '소염진통제 1일 2회 식후 복용. 위장 장애 예방용 위보호제 병용.',
      aiAudioSummary: '[AI 녹음 요약] 염증 호전 확인. 무리한 등산이나 쪼그려 앉기 금지 지도.',
      isLockedDeepReport: false
    }
  }
];

// 브라우저 전역 노출
window.DEFAULT_PATIENT_PROFILE = DEFAULT_PATIENT_PROFILE;
window.DEFAULT_MANAGERS = DEFAULT_MANAGERS;
window.DEFAULT_HOSPITALS = DEFAULT_HOSPITALS;
window.DAEJEON_LOCATIONS = DAEJEON_LOCATIONS;
window.URGENT_REQUESTS = URGENT_REQUESTS;
window.MAJOR_INSIGHTS = MAJOR_INSIGHTS;
window.TRACKING_STEPS_META = TRACKING_STEPS_META;
window.DEFAULT_CHAT_HISTORY = DEFAULT_CHAT_HISTORY;
window.DEFAULT_RESERVATIONS = DEFAULT_RESERVATIONS;
