// data.js - 위드케어(WithCare) 병원 동행서비스 데이터셋 v2.0

// ========================================================
// 1. 매니저 인재 검증 시스템 & 상세 프로필 데이터
// ========================================================
const DEFAULT_MANAGERS = [
  {
    id: 'mgr-1',
    name: '김서연',
    gender: '여성',
    age: 42,
    region: '서울 마포구/서대문구',
    baseArea: '마포구',
    hourlyRate: 25000,
    title: '시니어 전문 안심 케어 매니저',
    badge: '요양보호사 1급 · 간호조무사',
    avatar: 'https://images.unsplash.com/photo-1594824813637-bf7f6e07fd64?auto=format&fit=crop&q=80&w=300',
    rating: 4.98,
    reviewCount: 148,
    completedTrips: 215,
    phone: '010-8234-5678',
    hasDriverLicense: true,
    driverLicenseType: '1종 보통 (자차 동행 운행 가능)',
    certifications: ['요양보호사 1급', '간호조무사 자격', 'CPR 심폐소생술 전문'],
    experience: '종합병원 간호조무 5년, 노인주간보호센터 3년',
    intro: '어르신의 눈높이에서 편안하고 안전하게 병원 진료를 돕겠습니다. 의사 소견과 복약법을 꼼꼼하게 메모해 가족분께 전달해 드립니다.',
    verified: true,
    verificationDetails: {
      licenseChecked: true, // 자격증 전수 검증
      interviewPassed: true, // 심층 인성/상황 면접 통과
      trainingCompleted: true // 보건/안전 필수 교육 40시간 이수
    },
    isAiPick: true,
    aiPickReason: '거동 불편 및 순환기/내과 질환 케어 최적화 매니저'
  },
  {
    id: 'mgr-2',
    name: '최정민',
    gender: '남성',
    age: 38,
    region: '서울 서초구/강남구',
    baseArea: '서초구',
    hourlyRate: 28000,
    title: '휠체어·이동지원 전문 매니저',
    badge: '사회복지사 1급 · 요양보호사 1급',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    rating: 4.95,
    reviewCount: 112,
    completedTrips: 174,
    phone: '010-4521-9876',
    hasDriverLicense: true,
    driverLicenseType: '1종 보통 (SUV 자차 보유, 휠체어 적재 가능)',
    certifications: ['사회복지사 1급', '요양보호사 1급', '휠체어 이동지원 전문'],
    experience: '휠체어 및 거동불편 이동 지원 전문, 노인복지관 4년',
    intro: '내 부모님을 모시듯 정성껏 부축해 드리고 차량 승하차 및 진료실 이동까지 안전하게 케어합니다.',
    verified: true,
    verificationDetails: {
      licenseChecked: true,
      interviewPassed: true,
      trainingCompleted: true
    },
    isAiPick: true,
    aiPickReason: '휠체어 상하차 및 관절/척추 수술 후 재활 진료 이동 특화'
  },
  {
    id: 'mgr-3',
    name: '박미라',
    gender: '여성',
    age: 46,
    region: '서울 송파구/강동구',
    baseArea: '송파구',
    hourlyRate: 30000,
    title: '의료 동행 전문 간호 매니저',
    badge: '간호사 면허 · 요양보호사 1급',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    rating: 5.0,
    reviewCount: 89,
    completedTrips: 130,
    phone: '010-3392-1144',
    hasDriverLicense: false,
    driverLicenseType: '대중교통 / 택시 동행 전문',
    certifications: ['간호사 면허', '요양보호사 1급', '노인 전문간호 과정'],
    experience: '대학병원 병동 간호사 8년 근무',
    intro: '전문적인 임상 지식을 바탕으로 의사 상담 내용을 보호자 입장에서 명확하고 알기 쉽게 브리핑해 드립니다.',
    verified: true,
    verificationDetails: {
      licenseChecked: true,
      interviewPassed: true,
      trainingCompleted: true
    },
    isAiPick: false,
    aiPickReason: '대학병원 임상 간호 경험 기반 복합 만성질환 케어'
  },
  {
    id: 'mgr-4',
    name: '이성훈',
    gender: '남성',
    age: 35,
    region: '서울 영등포구/구로구',
    baseArea: '영등포구',
    hourlyRate: 25000,
    title: '안심 안전 동행 매니저',
    badge: '응급구조사 2급 · 요양보호사',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    rating: 4.92,
    reviewCount: 96,
    completedTrips: 142,
    phone: '010-7711-2358',
    hasDriverLicense: true,
    driverLicenseType: '1종 대형 / 보통',
    certifications: ['응급구조사 2급', '요양보호사 1급'],
    experience: '응급이송단 4년 근무, 응급처치 강사',
    intro: '비상 상황에서도 침착하고 신속하게 대응하며, 편안하고 든든한 동행을 약속드립니다.',
    verified: true,
    verificationDetails: {
      licenseChecked: true,
      interviewPassed: true,
      trainingCompleted: true
    },
    isAiPick: false,
    aiPickReason: '응급상황 대처 및 낙상 방지 안전 동행 특화'
  },
  {
    id: 'mgr-5',
    name: '정유진',
    gender: '여성',
    age: 39,
    region: '서울 종로구/중구',
    baseArea: '종로구',
    hourlyRate: 24000,
    title: '따뜻한 감성 동행 매니저',
    badge: '사회복지사 2급 · 요양보호사 1급',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    rating: 4.94,
    reviewCount: 78,
    completedTrips: 105,
    phone: '010-6644-1122',
    hasDriverLicense: true,
    driverLicenseType: '2종 보통 (자차 운행 가능)',
    certifications: ['사회복지사 2급', '요양보호사 1급', '노인 심리상담사'],
    experience: '치매안심센터 3년 근무',
    intro: '인지기능이 저하되거나 병원 가기를 두려워하시는 어르신을 따뜻한 대화로 안심시켜 드립니다.',
    verified: true,
    verificationDetails: {
      licenseChecked: true,
      interviewPassed: true,
      trainingCompleted: true
    },
    isAiPick: false,
    aiPickReason: '어르신 말벗 및 정서 케어 동행 특화'
  }
];

// ========================================================
// 2. 이동 수단 옵션 (구급차 제외 명시)
// ========================================================
const TRANSPORT_OPTIONS = [
  {
    id: 'TAXI_TRANSIT',
    name: '택시 / 대중교통 동행',
    costDesc: '교통비 환자(보호자) 실비 부담',
    icon: 'car',
    badge: '가장 대중적',
    desc: '카카오T/우티 택시 호출 또는 지하철/저상버스 탑승 시 매니저가 밀착 부축합니다.'
  },
  {
    id: 'PERSONAL_CAR',
    name: '매니저 자차 동행',
    costDesc: '유류비 지원금 +15,000원',
    icon: 'shield',
    badge: '도어 투 도어',
    desc: '운전면허 및 종합보험 검증 매니저의 차량으로 자택 앞에서 병원 로비까지 편안하게 모십니다.'
  },
  {
    id: 'WALK',
    name: '도보 동행 (인근 병원)',
    costDesc: '추가 교통비 없음 (0원)',
    icon: 'user',
    badge: '도보 10~15분 이내',
    desc: '자택 인근 동네 병원이나 도보 이동 가능한 거리의 의료기관 방문 시 적합합니다.'
  }
];

const AMBULANCE_NOTICE = "※ 구급차 지원 제외 안내: 응급 상황 시 119 구급차를 이용하셔야 하며, 본 서비스는 비응급 일반 외래 진료 동행 목적입니다.";

// ========================================================
// 3. 증상별 AI 연관 병원 DB (외관 사진, GPS/거리, 소요시간)
// ========================================================
const RECOMMENDED_HOSPITALS = [
  {
    id: 'hosp-1',
    name: '신촌 세브란스병원',
    department: '정형외과 / 척추관절센터',
    category: '상급종합병원',
    rating: 4.9,
    reviewCount: 1820,
    distanceKm: '3.2km',
    driveTime: '자차 기준 약 12~15분 소요',
    address: '서울시 서대문구 연세로 50-1',
    phone: '1599-1004',
    doctorCount: 24,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=300',
    tags: ['보건복지부 상급종합', '위드케어 단독 제휴', '패스트트랙 접수'],
    isPartner: true,
    b2bBanner: '위드케어 제휴 혜택: 원내 외래 접수 패스트트랙 및 전용 대기석 지원'
  },
  {
    id: 'hosp-2',
    name: '서울성모병원',
    department: '정형외과 / 류마티스내과',
    category: '상급종합병원',
    rating: 4.85,
    reviewCount: 1450,
    distanceKm: '5.1km',
    driveTime: '자차 기준 약 18~22분 소요',
    address: '서울시 서초구 반포대로 222',
    phone: '1588-1511',
    doctorCount: 19,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    mapImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=300',
    tags: ['관절치료 우수기관', '휠체어 접근성 우수', '원내 무장애 시설'],
    isPartner: true,
    b2bBanner: '동행 매니저 전용 환자 픽업 존 운영 중'
  },
  {
    id: 'hosp-3',
    name: '바른세상병원',
    department: '정형외과 / 척추신경외과',
    category: '보건복지부 지정 관절·척추 전문병원',
    rating: 4.88,
    reviewCount: 960,
    distanceKm: '4.5km',
    driveTime: '자차 기준 약 15~18분 소요',
    address: '서울시 강남구 논현로 642',
    phone: '1577-5075',
    doctorCount: 14,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    mapImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=300',
    tags: ['전문병원 인증 마크', '당일 MRI 검사 연계', '원스톱 진료'],
    isPartner: true,
    b2bBanner: '제휴 혜택: 척추/관절 정밀진단 패키지 연계 할인'
  },
  {
    id: 'hosp-4',
    name: '서울아산병원',
    department: '순환기내과 / 심장병원',
    category: '상급종합병원',
    rating: 4.95,
    reviewCount: 2310,
    distanceKm: '8.4km',
    driveTime: '자차 기준 약 25~30분 소요',
    address: '서울시 송파구 올림픽로 43길 88',
    phone: '1688-7575',
    doctorCount: 32,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=300',
    tags: ['심혈관질환 전국 1위', '위드케어 우수 파트너'],
    isPartner: true,
    b2bBanner: '고령 심혈관 환자 맞춤 동행 서비스 연계'
  },
  {
    id: 'hosp-5',
    name: '김안과병원',
    department: '안과 (백내장·망막·녹내장)',
    category: '보건복지부 인증 안과전문병원',
    rating: 4.92,
    reviewCount: 1240,
    distanceKm: '6.2km',
    driveTime: '자차 기준 약 20분 소요',
    address: '서울시 영등포구 영신로 136',
    phone: '1577-2637',
    doctorCount: 28,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    mapImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=300',
    tags: ['안과 전문병원 1호', '산동 검사 후 귀가 케어'],
    isPartner: true,
    b2bBanner: '시력 회복 귀가 케어 공식 제휴처'
  }
];

// ========================================================
// 4. 배달의민족 스타일 실시간 위치 안내 (더미 시뮬레이션 단계)
// ========================================================
const TRACKING_STEPS_META = [
  {
    step: 1,
    label: '매칭 대기/수락',
    riderStatus: '매니저 배정 대기 중',
    locationText: '동행 요청이 접수되어 전담 매니저 매칭 중입니다.',
    percent: 15,
    eta: '매칭 완료 후 출발'
  },
  {
    step: 2,
    label: '매니저 출발 완료',
    riderStatus: '김서연 매니저님이 자택으로 이동 중입니다 🚗',
    locationText: '현재 위치: 마포역 인근 도로 주행 중 (약 1.2km 전방)',
    percent: 35,
    eta: '자택 도착까지 약 8분'
  },
  {
    step: 3,
    label: '자택 픽업 & 부축',
    riderStatus: '자택 앞 도착 및 어르신 건강 상태 확인 완료 🤝',
    locationText: '현재 위치: 서울시 마포구 독막로 12길 자택 앞 승차 완료',
    percent: 55,
    eta: '신촌 세브란스병원으로 출발'
  },
  {
    step: 4,
    label: '병원 도착 및 진료 동행',
    riderStatus: '병원 외래 진료실 대기 및 의사 상담 동행 중 🏥',
    locationText: '현재 위치: 신촌 세브란스병원 본관 3층 순환기내과 외래 진료실',
    percent: 80,
    eta: '진료 및 처방약 수령 중'
  },
  {
    step: 5,
    label: '안전 귀가 완료',
    riderStatus: '자택 거실까지 안전하게 모셔다드렸습니다 🏠',
    locationText: '자택 도착 완료 · 복약 지도 및 안심 리포트 작성 완료',
    percent: 100,
    eta: '동행 케어 종료'
  }
];

// ========================================================
// 5. 실시간 카카오톡 스타일 1:1 대화 내역 (더미 데이터)
// ========================================================
const DEFAULT_CHAT_HISTORY = {
  'RES-2026-101': [
    {
      id: 'c-1',
      sender: 'MANAGER',
      senderName: '김서연 매니저',
      avatar: 'https://images.unsplash.com/photo-1594824813637-bf7f6e07fd64?auto=format&fit=crop&q=80&w=300',
      time: '10:05',
      text: '안녕하세요, 보호자님! 오늘 어머님 병원 동행을 담당하게 된 김서연 매니저입니다. 예약 시간 10분 전에 자택 1층 로비로 도착하겠습니다 😊'
    },
    {
      id: 'c-2',
      sender: 'GUARDIAN',
      senderName: '김민수 (보호자)',
      avatar: null,
      time: '10:07',
      text: '네 매니저님, 감사합니다! 어머니께서 오늘 아침에 무릎이 조금 더 쑤신다고 하셔서 천천히 부축 부탁드립니다.'
    },
    {
      id: 'c-3',
      sender: 'MANAGER',
      senderName: '김서연 매니저',
      avatar: 'https://images.unsplash.com/photo-1594824813637-bf7f6e07fd64?auto=format&fit=crop&q=80&w=300',
      time: '10:08',
      text: '네, 확인했습니다! 무릎에 무리가 가지 않도록 엘리베이터 이동 및 진료실까지 천천히 보행 보조하겠습니다. 출발하실 때 다시 톡 드릴게요.'
    }
  ],
  'RES-2026-102': [
    {
      id: 'c-10',
      sender: 'MANAGER',
      senderName: '최정민 매니저',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
      time: '13:40',
      text: '보호자님, 아버님 모시고 서울성모병원 본관 도착하여 정형외과 외래 접수 마쳤습니다! 현재 진료 대기 3번째입니다.'
    },
    {
      id: 'c-11',
      sender: 'GUARDIAN',
      senderName: '박지혜 (보호자)',
      avatar: null,
      time: '13:42',
      text: '사진과 함께 실시간 공유 감사해요! 교수님께 지난주에 계단 내려갈 때 찌릿했던 증상 꼭 여쭤봐 주세요.'
    },
    {
      id: 'c-12',
      sender: 'MANAGER',
      senderName: '최정민 매니저',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
      time: '13:43',
      text: '네, 메모해 두었습니다! 의사 선생님 답변 상세히 받아적어서 리포트에 남겨드리겠습니다 👍'
    }
  ]
};

// ========================================================
// 6. AI 음성 녹음 요약 시뮬레이션 & 리포트 등급별 잠금
// ========================================================
const SAMPLE_AI_VOICE_SUMMARY = {
  audioDuration: '14분 32초 (외래 진료 대화 전수 녹음)',
  sttAccuracy: '98.4%',
  transcriptPreview: [
    { speaker: '의사', text: '어르신, 지난달 처방해 드린 혈압약 드시면서 어지럽거나 속 쓰린 건 없으셨어요?' },
    { speaker: '환자', text: '속은 괜찮은데 아침에 일어날 때 가끔 핑 돌 때가 있어요.' },
    { speaker: '매니저', text: '선생님, 보호자분께서 어르신 기립 시 어지럼증 횟수가 주 2~3회 정도 있었다고 전해주셨습니다.' },
    { speaker: '의사', text: '아, 그렇다면 혈압 강하제 용량을 살짝 조절하겠습니다. 아침 약에서 이뇨제 성분을 반 알 줄여볼게요.' }
  ],
  keyBulletPoints: [
    '혈압약 성분 중 이뇨제 성분 50% 감량 처방 (기립성 어지럼증 예방 목적)',
    '무릎 관절 연골 마모 소견: 주 3회 30분 평지 걷기 및 온찜질 권고',
    '다음 재진일: 4주 뒤 수요일(11월 25일) 오전 10시로 확정'
  ]
};

// ========================================================
// 7. 초기 시연 예약 데이터셋
// ========================================================
const INITIAL_RESERVATIONS = [
  {
    id: 'RES-2026-101',
    patientName: '김순자',
    patientBirth: '1950-04-12',
    patientAge: 76,
    patientGender: '여성',
    patientPhone: '010-3344-9988',
    patientRegion: '서울 마포구',
    guardianName: '김민수 (자녀)',
    guardianBirth: '1982-08-25',
    guardianPhone: '010-9876-5432',
    guardianPassword: 'demo',
    mobility: 'ASSISTED',
    mobilityLabel: '거동 불편 · 부축 필요',
    useWheelchair: false,
    currentMedications: '혈압약(아침 1정), 고지혈증약(저녁 1정), 관절영양제',
    symptomsDescription: '계단 오르내릴 때 오른쪽 무릎에 시큰거리는 통증이 심하고 10분 이상 연속 보행이 어려우심.',
    messageToDoctor: '최근 아침 기립 시 어지럼증이 잦아 혈압약 용량 조절이 필요한지 확인 부탁드립니다.',
    messageToManager: '귀가 조금 어두우시니 진료실에서 선생님 말씀을 크게 복약 안내문에 적어주세요.',
    transportOption: 'TAXI_TRANSIT',
    transportLabel: '택시/대중교통 (환자 부담)',
    agreePrivacy: true,
    hospital: '신촌 세브란스병원',
    department: '순환기내과',
    doctor: '이진우 교수',
    date: '2026-10-28',
    time: '10:30',
    pickupAddress: '서울시 마포구 독막로 12길 15, 102동 402호',
    options: {
      pharmacy: true,
      paymentAssist: true,
      wheelchairRental: false
    },
    serviceDuration: '2시간 기본',
    cost: 55000,
    status: 'REQUESTED', // [예약 대기중] - 매니저 모드에서 수락 시연 가능!
    step: 1, // 1: 예약완료, 2: 매니저배정, 3: 자택픽업, 4: 병원진료중, 5: 귀가완료
    managerId: null,
    report: null,
    review: null,
    createdAt: '2026-10-27 10:15'
  },
  {
    id: 'RES-2026-102',
    patientName: '박영철',
    patientBirth: '1945-11-03',
    patientAge: 81,
    patientGender: '남성',
    patientPhone: '010-4455-6677',
    patientRegion: '서울 서초구',
    guardianName: '박지혜 (자녀)',
    guardianBirth: '1985-02-14',
    guardianPhone: '010-2233-4455',
    guardianPassword: 'demo',
    mobility: 'WHEELCHAIR',
    mobilityLabel: '휠체어 이용 필수',
    useWheelchair: true,
    currentMedications: '당뇨약, 관절소염진통제, 혈액순환개선제',
    symptomsDescription: '고관절 인공관절 수술 후 6개월 정기 검진. 단독 기립 불가능하여 휠체어 이동 필수.',
    messageToDoctor: '수술 부위 주변에 가끔 뻐근한 느낌이 든다고 하십니다.',
    messageToManager: '휠체어 차량 트렁크 적재 및 차량 승하차 시 낙상 주의 부탁드립니다.',
    transportOption: 'PERSONAL_CAR',
    transportLabel: '매니저 자차 동행 (SUV 휠체어 적재)',
    agreePrivacy: true,
    hospital: '서울성모병원',
    department: '정형외과',
    doctor: '김태호 과장',
    date: '2026-10-27',
    time: '14:00',
    pickupAddress: '서울시 서초구 반포대로 201, 303동 1102호',
    options: {
      pharmacy: true,
      paymentAssist: true,
      wheelchairRental: true
    },
    serviceDuration: '3시간 심층',
    cost: 85000,
    status: 'IN_PROGRESS', // [매칭 완료] -> 4단계 병원 진료 중
    step: 4,
    managerId: 'mgr-2',
    report: null,
    review: null,
    createdAt: '2026-10-26 15:30'
  },
  {
    id: 'RES-2026-103',
    patientName: '이옥순',
    patientBirth: '1953-06-20',
    patientAge: 73,
    patientGender: '여성',
    patientPhone: '010-5566-7788',
    patientRegion: '서울 송파구',
    guardianName: '이수진 (자녀)',
    guardianBirth: '1988-12-05',
    guardianPhone: '010-7788-9900',
    guardianPassword: 'demo',
    mobility: 'INDEPENDENT',
    mobilityLabel: '혼자 보행 가능',
    useWheelchair: false,
    currentMedications: '백내장 수술 후 소염 안약, 인공눈물',
    symptomsDescription: '백내장 수술 후 3개월 경과 정기 시력 및 안압 검사.',
    messageToDoctor: '야간에 불빛 번짐 증상이 여전히 조금 남아있습니다.',
    messageToManager: '산동제 안약 투여로 진료 후 눈이 많이 부실 수 있으니 부축 부탁드립니다.',
    transportOption: 'TAXI_TRANSIT',
    transportLabel: '택시/대중교통 (환자 부담)',
    agreePrivacy: true,
    hospital: '서울아산병원',
    department: '안과',
    doctor: '정우석 교수',
    date: '2026-10-25',
    time: '09:30',
    pickupAddress: '서울시 송파구 올림픽로 300, 105동 801호',
    options: {
      pharmacy: true,
      paymentAssist: true,
      wheelchairRental: false
    },
    serviceDuration: '2시간 기본',
    cost: 45000,
    status: 'COMPLETED', // [동행 완료] - 리포트 및 리뷰 완료
    step: 5,
    managerId: 'mgr-1',
    report: {
      completedAt: '2026-10-25 12:40',
      medicalSummary: '안과 백내장 수술 후 3개월 경과 정기 검진 완료. 양안 교정시력 0.9로 수술 경과 매우 양호하며 각막 및 안압(우안 14, 좌안 15) 모두 정상 수치 확인되었습니다.',
      nextAppointment: '2027-01-20 (수) 10:00 (6개월 정기 검진 예약 완료)',
      prescriptions: '인공눈물(히알루론산 점안액 0.15%) 3박스 처방 및 원내 1층 약국에서 수령 완료. 취침 전 및 건조할 때 1방울씩 점안 지도 완료.',
      patientCondition: '진료 중 산동제 점안으로 귀가 시 약간 눈부심 호소하셨으나 준비해간 보호 선글라스 착용 후 자택 침실까지 안전하게 부축해 드렸습니다.',
      managerMessage: '어머님께서 진료 내내 마음 편히 웃으시며 즐겁게 다녀오셨습니다. 다음 진료 때도 믿고 맡겨주세요!',
      aiVoiceSummary: SAMPLE_AI_VOICE_SUMMARY,
      premiumReportUnlocked: false,
      timeline: [
        { time: '09:00', title: '자택 픽업 완료', desc: '송파구 자택 도착 후 어르신 컨디션 확인 및 차량 탑승' },
        { time: '09:25', title: '서울아산병원 도착 및 접수', desc: '신관 안과 외래 접수 및 안압/시력 기초 검사 동행' },
        { time: '10:15', title: '정우석 교수 진료실 동행', desc: '의사 소견 경청 및 메모, 보호자 대신 수술 경과 질문' },
        { time: '11:10', title: '원내 수납 및 처방약 수령', desc: '무인 수납기 대행 및 1층 문전약국에서 복약지도 대행' },
        { time: '12:15', title: '안전 귀가 완료', desc: '자택 거실까지 부축 후 복약 설명서 냉장고 부착' }
      ],
      photos: [
        { label: '처방전 및 복약안내문', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
        { label: '병원 진료비 영수증', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400' },
        { label: '어르신 안심 귀가 확인', url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400' }
      ]
    },
    review: {
      rating: 5,
      tags: ['친절하고 따뜻해요', '의사 소견을 상세히 전해줘요', '시간 약속을 철저히 지켜요'],
      comment: '직장 출근 때문에 어머니 백내장 검진에 못 가 마음이 너무 무거웠는데, 김서연 매니저님이 의사 소견부터 약 복용법까지 사진과 함께 꼼꼼히 보내주셔서 너무 안심되었습니다! 다음 진료도 꼭 예약할게요.',
      createdAt: '2026-10-25 14:10'
    },
    createdAt: '2026-10-24 11:20'
  }
];

const SYMPTOM_ANALYSIS_PRESETS = [
  {
    id: 'sym-1',
    chipText: '다리 저림 & 보행 곤란',
    fullQuery: '어머니가 자꾸 다리가 저리고 10분 이상 걷기 힘들어하셔',
    department: '정형외과 / 척추신경외과',
    analysisSummary: '척추관협착증(Spinal Stenosis) 또는 요추 신경 압박 질환의 전형적인 증상입니다. 보행 시 저림과 당김이 동반되는 경우 척추·관절 전문의 진료가 시급합니다.',
    suggestedHospitalIds: ['hosp-1', 'hosp-3', 'hosp-2']
  },
  {
    id: 'sym-2',
    chipText: '가슴 답답 & 계단 오를 때 숨참',
    fullQuery: '계단을 오를 때 가슴이 뻐근하게 조여오고 숨이 턱 끝까지 차올라요',
    department: '순환기내과 (심장내과)',
    analysisSummary: '노년기 협심증 또는 심부전증 초기 징후일 가능성이 있습니다. 계단이나 경사로 이동 시 증상이 심화되면 심전도 및 심장 초음파 정밀 검사가 필요합니다.',
    suggestedHospitalIds: ['hosp-4', 'hosp-1']
  },
  {
    id: 'sym-3',
    chipText: '눈 침침 & 안개 낀 듯 뿌연 시야',
    fullQuery: '글씨가 이중으로 겹쳐 보이고 눈앞에 얇은 막이 낀 것처럼 뿌옇게 보여요',
    department: '안과 (백내장·노안클리닉)',
    analysisSummary: '수정체 혼탁으로 인한 노년성 백내장 또는 망막 질환 의심 소견입니다. 동공 확대(산동) 정밀 검진 후 수술 필요 여부를 확인하는 것이 좋습니다.',
    suggestedHospitalIds: ['hosp-5', 'hosp-1']
  },
  {
    id: 'sym-4',
    chipText: '무릎 관절 시큰 & 쑤심',
    fullQuery: '무릎에서 소리가 나고 계단 내려갈 때 찌르는 듯한 통증이 심해요',
    department: '정형외과 (관절센터)',
    analysisSummary: '퇴행성 무릎 관절염 2~3기 의심 소견입니다. 연골 손상도 확인을 위한 X-ray 및 관절강 주사 치료 상담이 권장됩니다.',
    suggestedHospitalIds: ['hosp-2', 'hosp-3', 'hosp-1']
  },
  {
    id: 'sym-5',
    chipText: '자주 깜빡 & 어지럼증',
    fullQuery: '약속 날짜를 자꾸 잊으시고 최근 부쩍 중심 잡기 어려워 휘청거리셔요',
    department: '신경과 / 뇌신경센터',
    analysisSummary: '혈관성 어지럼증 또는 경도인지장애(MCI) 선별 검사가 권장됩니다. 뇌혈류 검사 및 신경인지기능 검사 동행이 필요합니다.',
    suggestedHospitalIds: ['hosp-1', 'hosp-4']
  }
];

const GUARDIAN_TESTIMONIALS = [
  {
    id: 't-1',
    author: '이영훈 님 (판교 IT기업 근무)',
    relation: '78세 모친 동행 신청',
    rating: 5,
    tag: '직장인 자녀 필수 앱',
    text: '연차를 못 내는 날마다 홀로 병원에 가시는 어머니 때문에 늘 가슴이 졸였는데, 김서연 매니저님이 자택 앞에서 픽업부터 약국 수령까지 가족보다 더 세심하게 챙겨주셔서 울컥했습니다. 다음 정기 검진도 무조건 위드케어입니다.',
    hospital: '신촌 세브란스병원 순환기내과'
  },
  {
    id: 't-2',
    author: '박정민 님 (서울 마포 거주)',
    relation: '82세 부친 휠체어 동행',
    rating: 5,
    tag: '휠체어 차량 완벽 지원',
    text: '아버지가 휠체어를 타셔서 이동이 큰 부담이었는데 최정민 매니저님이 능숙하게 부축해 주시고, 진료실에서 교수님이 하신 말씀과 다음 재진 일정을 하나도 안 빠뜨리고 리포트로 남겨주셔서 감동했습니다.',
    hospital: '서울성모병원 정형외과'
  },
  {
    id: 't-3',
    author: '정혜원 님 (경기 분당 거주)',
    relation: '74세 시부모님 안과 수술 동행',
    rating: 5,
    tag: '의사 소견 안심 리포트 최고',
    text: '수술 후 안약 넣는 법이 복잡해서 걱정이었는데 매니저님이 복약 시간표를 깔끔하게 적어 냉장고에 붙여주셨어요. 부모님도 매니저님 너무 친절하시다고 칭찬이 자자하십니다.',
    hospital: '서울아산병원 안과'
  }
];

const B2B_MODEL_POINTS = [
  {
    title: '병원 타겟 광고 및 프리미엄 프로필 노출',
    desc: '환자의 증상 및 지역 데이터 기반으로 전문 병원을 정밀 매칭하고, 제휴 병원 우선 추천 슬롯 및 상세 진료 정보 배너를 통해 안정적인 B2B 광고 수익을 창출합니다.',
    icon: 'target',
    badge: '광고 & 마케팅 수익'
  },
  {
    title: '병원-동행 서비스 공식 파트너십 (패스트트랙)',
    desc: '대형 병원 및 전문 병원과의 원내 전담 창구 협약을 통해, 동행 매니저 전용 접수/수납 패스트트랙을 구축하고 병원으로부터 환자 유치 및 편의 증대 수수료를 수취합니다.',
    icon: 'hospital',
    badge: 'B2B 제휴 수수료'
  },
  {
    title: '시니어 헬스케어 & 기업 복지 B2B 정기 구독',
    desc: '대기업 및 중견기업 임직원을 위한 "부모님 효도 동행 복지 패키지"를 법인 구독 모델로 제공하여 안정적인 B2B 정기 매출을 확보합니다.',
    icon: 'corporate',
    badge: '기업 복지 구독'
  },
  {
    title: '리포트 등급별 잠금 프리미엄 B2C/B2B 모델',
    desc: '기본 진료 요약은 무료 제공하되, AI 혈압/혈당 추세 분석 및 식이/재활 전문 가이드가 포함된 "심층 건강 리포트"는 월정액 프리미엄 구독으로 유료화합니다.',
    icon: 'shield',
    badge: '프리미엄 모델'
  }
];
