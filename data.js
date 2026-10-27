// data.js - 위드케어(WithCare) 병원 동행서비스 데이터셋

const DEFAULT_MANAGERS = [
  {
    id: 'mgr-1',
    name: '김서연',
    title: '시니어 전문 동행 매니저',
    badge: '요양보호사 1급 · 간호조무사',
    avatar: 'https://images.unsplash.com/photo-1594824813637-bf7f6e07fd64?auto=format&fit=crop&q=80&w=300',
    rating: 4.98,
    reviewCount: 148,
    completedTrips: 215,
    phone: '010-8234-5678',
    certifications: ['요양보호사 1급', '간호조무사', 'CPR 심폐소생술 전문'],
    experience: '종합병원 간호조무 5년, 노인요양센터 3년',
    intro: '어르신의 눈높이에서 편안하고 안전하게 병원 진료를 돕겠습니다. 의사 소견과 복약법을 꼼꼼하게 메모해 가족분께 전달해 드립니다.',
    verified: true
  },
  {
    id: 'mgr-2',
    name: '최정민',
    title: '시니어 안심 매니저',
    badge: '사회복지사 · 요양보호사 1급',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    rating: 4.95,
    reviewCount: 112,
    completedTrips: 174,
    phone: '010-4521-9876',
    certifications: ['요양보호사 1급', '사회복지사 2급', '휠체어 이동지원 수료'],
    experience: '휠체어 및 거동불편 이동 지원 전문, 노인복지관 4년',
    intro: '내 부모님을 모시듯 정성껏 부축해 드리고 차량 승하차 및 진료실 이동까지 안전하게 케어합니다.',
    verified: true
  },
  {
    id: 'mgr-3',
    name: '박미라',
    title: '의료 동행 전문 매니저',
    badge: '간호사 면허 · 요양보호사 1급',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    rating: 5.0,
    reviewCount: 89,
    completedTrips: 130,
    phone: '010-3392-1144',
    certifications: ['간호사 면허', '요양보호사 1급', '노인케어 전문과정'],
    experience: '대학병원 병동 간호사 8년',
    intro: '전문적인 임상 지식을 바탕으로 의사 상담 내용을 보호자 입장에서 명확하고 쉽게 브리핑해 드립니다.',
    verified: true
  },
  {
    id: 'mgr-4',
    name: '이성훈',
    title: '안심 동행 매니저',
    badge: '응급구조사 2급 · 요양보호사',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    rating: 4.92,
    reviewCount: 96,
    completedTrips: 142,
    phone: '010-7711-2358',
    certifications: ['응급구조사 2급', '요양보호사 1급'],
    experience: '응급이송단 4년 근무',
    intro: '비상 상황에서도 침착하고 신속하게 대응하며, 편안하고 든든한 동행을 약속드립니다.',
    verified: true
  }
];

const INITIAL_RESERVATIONS = [
  {
    id: 'RES-2026-101',
    patientName: '김순자',
    patientAge: 76,
    patientGender: '여성',
    patientPhone: '010-3344-9988',
    guardianName: '김민수 (자녀)',
    guardianPhone: '010-9876-5432',
    mobility: 'ASSISTED',
    mobilityLabel: '거동 불편 · 부축 필요',
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
    notes: '최근 협심증 증세로 계단 오를 때 숨이 가쁘심. 진료실까지 천천히 동행 부탁드립니다.',
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
    patientAge: 81,
    patientGender: '남성',
    patientPhone: '010-4455-6677',
    guardianName: '박지혜 (자녀)',
    guardianPhone: '010-2233-4455',
    mobility: 'WHEELCHAIR',
    mobilityLabel: '휠체어 이용 필수',
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
    notes: '무릎 인공관절 수술 후 정기 재활 진료. 휠체어 차량 트렁크 적재 필요합니다.',
    cost: 75000,
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
    patientAge: 73,
    patientGender: '여성',
    patientPhone: '010-5566-7788',
    guardianName: '이수진 (자녀)',
    guardianPhone: '010-7788-9900',
    mobility: 'INDEPENDENT',
    mobilityLabel: '혼자 보행 가능',
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
    notes: '백내장 수술 후 정기 검진. 산동제 안약 투여로 진료 후 눈이 부실 수 있습니다.',
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

const RECOMMENDED_HOSPITALS = [
  {
    id: 'hosp-1',
    name: '신촌 세브란스병원',
    department: '정형외과 / 척추관절센터',
    category: '상급종합병원',
    rating: 4.9,
    reviewCount: 1820,
    distanceKm: '3.2km',
    address: '서울시 서대문구 연세로 50-1',
    phone: '1599-1004',
    doctorCount: 24,
    tags: ['보건복지부 상급종합', '위드케어 제휴병원', '전문 동행 패스트트랙'],
    isPartner: true,
    b2bBanner: '위드케어 단독: 원내 외래 접수 우선 안내 제휴'
  },
  {
    id: 'hosp-2',
    name: '서울성모병원',
    department: '정형외과 / 류마티스내과',
    category: '상급종합병원',
    rating: 4.85,
    reviewCount: 1450,
    distanceKm: '5.1km',
    address: '서울시 서초구 반포대로 222',
    phone: '1588-1511',
    doctorCount: 19,
    tags: ['관절치료 우수기관', '휠체어 접근성 우수', '위드케어 제휴병원'],
    isPartner: true,
    b2bBanner: '동행 매니저 전용 픽업 존 운영 중'
  },
  {
    id: 'hosp-3',
    name: '바른세상병원',
    department: '정형외과 / 신경외과',
    category: '관절·척추 전문병원',
    rating: 4.88,
    reviewCount: 960,
    distanceKm: '4.5km',
    address: '서울시 강남구 논현로 642',
    phone: '1577-5075',
    doctorCount: 14,
    tags: ['보건복지부 지정 전문병원', '당일 MRI 검사 연계', '위드케어 제휴'],
    isPartner: true,
    b2bBanner: '제휴 혜택: 척추/관절 정밀진단 패키지 연계'
  },
  {
    id: 'hosp-4',
    name: '서울아산병원',
    department: '순환기내과 / 심장병원',
    category: '상급종합병원',
    rating: 4.95,
    reviewCount: 2310,
    distanceKm: '8.4km',
    address: '서울시 송파구 올림픽로 43길 88',
    phone: '1688-7575',
    doctorCount: 32,
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
    address: '서울시 영등포구 영신로 136',
    phone: '1577-2637',
    doctorCount: 28,
    tags: ['안과 전문병원 1호', '산동 검사 후 안심 귀가 연계', '위드케어 제휴'],
    isPartner: true,
    b2bBanner: '시력 회복 귀가 케어 공식 제휴처'
  },
  {
    id: 'hosp-6',
    name: '분당서울대병원',
    department: '신경과 / 뇌신경센터',
    category: '상급종합병원',
    rating: 4.91,
    reviewCount: 1670,
    distanceKm: '12.8km',
    address: '경기도 성남시 분당구 구미로 173번길 82',
    phone: '1588-3369',
    doctorCount: 21,
    tags: ['치매·파킨슨 전문클리닉', '고령 친화 의료 인프라'],
    isPartner: true,
    b2bBanner: '뇌신경 장기 통원 케어 특화 병원'
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
    suggestedHospitalIds: ['hosp-6', 'hosp-1']
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
    title: '지자체 어르신 돌봄 통합지원 바우처 연계',
    desc: '초고령 사회 진입에 따른 보건복지부 및 서울시/지자체의 병원 안심동행 바우처 사업 공공 조달 파트너로 진입하여 공공 지원금을 연계합니다.',
    icon: 'shield',
    badge: '공공 바우처 조달'
  }
];
