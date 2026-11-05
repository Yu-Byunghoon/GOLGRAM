import { BirdLevel } from '../types';

export const BIRD_LEVELS: BirdLevel[] = [
  {
    level: 1,
    koreanName: '병아리',
    englishName: 'Chick',
    title: '골린이 입문',
    minXp: 0,
    requiredStamps: 0,
    description: '티잉 구역에 첫발을 디딘 귀여운 초보 골퍼! 규칙과 에티켓을 배우며 도장 깨기를 시작합니다.',
    themeColor: '#EAB308', // Yellow
    bgColor: '#FEFCE8',
    tagline: '삐약삐약 첫 라운딩 완료!'
  },
  {
    level: 2,
    koreanName: '참새',
    englishName: 'Sparrow',
    title: '필드 탐색가',
    minXp: 300,
    requiredStamps: 1,
    description: '부지런히 페어웨이를 누비며 잔디의 맛을 알아가는 활기찬 참새 골퍼입니다.',
    themeColor: '#D97706', // Amber
    bgColor: '#FFFBEB',
    tagline: '첫 도장을 찍고 필드로 출격!'
  },
  {
    level: 3,
    koreanName: '제비',
    englishName: 'Swallow',
    title: '경쾌한 스윙어',
    minXp: 700,
    requiredStamps: 2,
    description: '봄바람처럼 가볍고 경쾌한 리듬으로 드라이버 티샷을 날리는 민첩한 제비 골퍼.',
    themeColor: '#0284C7', // Sky Blue
    bgColor: '#F0F9FF',
    tagline: '바람을 가르는 날렵한 탄도'
  },
  {
    level: 4,
    koreanName: '펭귄',
    englishName: 'Penguin',
    title: '냉철한 퍼터',
    minXp: 1200,
    requiredStamps: 3,
    description: '그린 위에서 흐트러짐 없는 침착한 퍼팅 스트로크를 구사하는 신사적인 펭귄입니다.',
    themeColor: '#334155', // Slate
    bgColor: '#F8FAFC',
    tagline: '원펏으로 땡그랑 마무리'
  },
  {
    level: 5,
    koreanName: '꾀꼬리',
    englishName: 'Oriole',
    title: '명랑한 필드보이스',
    minXp: 1800,
    requiredStamps: 5,
    description: '동반자들에게 기분 좋은 나이스샷을 외쳐주며 라운드의 분위기 메이커 역할을 합니다.',
    themeColor: '#CA8A04', // Deep Yellow
    bgColor: '#FEF9C3',
    tagline: '아름다운 타구음과 멋진 굿샷'
  },
  {
    level: 6,
    koreanName: '뻐꾸기',
    englishName: 'Cuckoo',
    title: '정확한 템포러',
    minXp: 2500,
    requiredStamps: 7,
    description: '규칙적인 시계추처럼 일정하고 안정적인 백스윙 템포를 지켜내는 실력파 뻐꾸기.',
    themeColor: '#65A30D', // Lime Green
    bgColor: '#F7FEE7',
    tagline: '템포가 만들어내는 완벽한 임팩트'
  },
  {
    level: 7,
    koreanName: '비둘기',
    englishName: 'Pigeon',
    title: '평화의 플레이어',
    minXp: 3300,
    requiredStamps: 9,
    description: '어떤 트러블 샷에서도 동요하지 않고 평정심을 유지하는 매너 만점의 골퍼.',
    themeColor: '#64748B', // Cool Slate
    bgColor: '#F1F5F9',
    tagline: '동반자와 함께 웃는 젠틀 골프'
  },
  {
    level: 8,
    koreanName: '까치',
    englishName: 'Magpie',
    title: '행운의 버디헌터',
    minXp: 4200,
    requiredStamps: 12,
    description: '좋은 소식을 물어오듯 결정적인 순간 기적 같은 버디 찬스를 잡아내는 길조 까치!',
    themeColor: '#1E293B', // Magpie Navy
    bgColor: '#F8FAFC',
    tagline: '오늘도 나이스 버디 소식 전송'
  },
  {
    level: 9,
    koreanName: '딱따구리',
    englishName: 'Woodpecker',
    title: '정타의 장인',
    minXp: 5200,
    requiredStamps: 15,
    description: '클럽 페이스 정중앙 스윗스팟을 정확히 타격하는 파워풀한 정타 스트라이커입니다.',
    themeColor: '#DC2626', // Woodpecker Red
    bgColor: '#FEF2F2',
    tagline: '스윗스팟을 파고드는 짜릿한 손맛'
  },
  {
    level: 10,
    koreanName: '두루미',
    englishName: 'Red-crowned Crane',
    title: '품격의 싱글지망생',
    minXp: 6300,
    requiredStamps: 18,
    description: '우아한 피니시 자세와 품격을 자랑하며 두 자릿수 도장을 당당히 정복한 두루미.',
    themeColor: '#E11D48', // Rose / Red Crown
    bgColor: '#FFF1F2',
    tagline: '그림 같은 피니시와 하이 아크'
  },
  {
    level: 11,
    koreanName: '기러기',
    englishName: 'Wild Goose',
    title: '원정 라운드 리더',
    minXp: 7500,
    requiredStamps: 22,
    description: '계절 따라 전국 방방곡곡의 골프장을 찾아다니며 도장깨기 행렬을 이끄는 리더.',
    themeColor: '#0D9488', // Teal
    bgColor: '#F0FDFA',
    tagline: '바람을 뚫고 전국 원정 출격'
  },
  {
    level: 12,
    koreanName: '까투리',
    englishName: 'Pheasant',
    title: '한국 산악코스 달인',
    minXp: 8800,
    requiredStamps: 26,
    description: '한국 고유의 험준한 산악 언듈레이션을 완벽하게 읽어내는 노련한 토종 까투리.',
    themeColor: '#B45309', // Russet Brown
    bgColor: '#FEF3C7',
    tagline: '난코스 언듈레이션도 가뿐히 공략'
  },
  {
    level: 13,
    koreanName: '갈매기',
    englishName: 'Seagull',
    title: '링크스 코스 마스터',
    minXp: 10200,
    requiredStamps: 31,
    description: '해변 링크스 코스의 거센 바닷바람을 뚫고 정교한 저탄도 샷을 구사하는 갈매기.',
    themeColor: '#0369A1', // Ocean Blue
    bgColor: '#E0F2FE',
    tagline: '해풍을 뚫는 펀치샷의 절대강자'
  },
  {
    level: 14,
    koreanName: '백조',
    englishName: 'Swan',
    title: '호수 워터해저드 극복자',
    minXp: 11800,
    requiredStamps: 36,
    description: '수면 위의 우아함과 물밑의 치열한 계산으로 아일랜드 그린을 침착하게 올려놓는 백조.',
    themeColor: '#059669', // Emerald
    bgColor: '#ECFDF5',
    tagline: '아일랜드 홀도 핀 옆에 깃대 꽂기'
  },
  {
    level: 15,
    koreanName: '부엉이',
    englishName: 'Owl',
    title: '야간 라이트의 현자',
    minXp: 13500,
    requiredStamps: 42,
    description: '밤하늘 조명 아래에서도 날카로운 눈빛으로 잔디결과 그린 브레이크를 읽어내는 부엉이.',
    themeColor: '#7C3AED', // Violet Owl
    bgColor: '#F5F3FF',
    tagline: '야간 라운드의 숨은 지배자'
  },
  {
    level: 16,
    koreanName: '송골매',
    englishName: 'Falcon',
    title: '초고속 헤드스피더',
    minXp: 15400,
    requiredStamps: 48,
    description: '먹이를 낚아채듯 전광석화 같은 헤드스피드로 250m 이상의 호쾌한 장타를 뿜어내는 송골매.',
    themeColor: '#475569', // Steel Falcon
    bgColor: '#F1F5F9',
    tagline: '300야드를 가르는 매서운 비거리'
  },
  {
    level: 17,
    koreanName: '학',
    englishName: 'Crane',
    title: '필드의 선비',
    minXp: 17500,
    requiredStamps: 55,
    description: '고고한 자태와 완벽한 코스 매니지먼트로 싱글 디짓 핸디캡을 유지하는 고수 학.',
    themeColor: '#0F766E', // Noble Pine Green
    bgColor: '#CCFBF1',
    tagline: '고결한 샷과 빈틈없는 스코어 관리'
  },
  {
    level: 18,
    koreanName: '타조',
    englishName: 'Ostrich',
    title: '무한 체력의 36홀러',
    minXp: 19800,
    requiredStamps: 63,
    description: '하루 36홀 강행군도 지치지 않고 달리는 필드의 철인! 전국 골프장을 정복 중인 타조.',
    themeColor: '#C2410C', // Deep Orange
    bgColor: '#FFEDD5',
    tagline: '1박 2일 54홀도 거뜬한 필드 강철 체력'
  },
  {
    level: 19,
    koreanName: '펠리컨',
    englishName: 'Pelican',
    title: '벙커 세이브 스페셜리스트',
    minXp: 22300,
    requiredStamps: 72,
    description: '깊은 턱의 항아리 벙커에서도 흙모래를 듬뿍 퍼올려 홀컵 옆에 붙이는 벙커 샷의 명수.',
    themeColor: '#4338CA', // Indigo
    bgColor: '#EEF2FF',
    tagline: '어떤 트러블 벙커에서도 원퍼트 세이브'
  },
  {
    level: 20,
    koreanName: '플라밍고',
    englishName: 'Flamingo',
    title: '완벽한 밸런스 마스터',
    minXp: 25000,
    requiredStamps: 81,
    description: '어떤 악조건의 발끝 내리막/오르막 라이에서도 한 치의 흔들림 없는 밸런스를 뽐냅니다.',
    themeColor: '#DB2777', // Hot Pink
    bgColor: '#FCE7F3',
    tagline: '어떤 언듈레이션도 흔들림 없는 피니시'
  },
  {
    level: 21,
    koreanName: '독수리',
    englishName: 'Eagle',
    title: '명문 골프장 정복자',
    minXp: 28000,
    requiredStamps: 90,
    description: '대한민국 상위 1% 실력! 전국 90개 골프장 도장을 찍고 이글을 밥 먹듯 기록하는 제왕.',
    themeColor: '#9333EA', // Royal Purple
    bgColor: '#FAF5FF',
    tagline: '전설의 이글을 지배하는 필드의 제왕'
  },
  {
    level: 22,
    koreanName: '알바트로스',
    englishName: 'Albatross',
    title: '골프의 신 (신화적 전설)',
    minXp: 32000,
    requiredStamps: 100,
    description: '대한민국 100대 골프장과 10대 명문을 모두 완파한 전설의 골퍼! 2백만 분의 1의 기적을 품은 최종존재.',
    themeColor: '#D4AF37', // Divine Pure Gold
    bgColor: '#FEF9C3',
    tagline: '100대 골프장 완파! 신화가 된 알바트로스'
  }
];

export function getBirdLevel(levelNumber: number): BirdLevel {
  const found = BIRD_LEVELS.find((b) => b.level === levelNumber);
  return found || BIRD_LEVELS[0];
}

export function calculateLevelFromActivity(xp: number, stampsCount: number): BirdLevel {
  // Find highest level satisfied
  let candidate = BIRD_LEVELS[0];
  for (const b of BIRD_LEVELS) {
    if (xp >= b.minXp || stampsCount >= b.requiredStamps) {
      candidate = b;
    }
  }
  return candidate;
}
