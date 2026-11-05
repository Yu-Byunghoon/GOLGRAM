import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  AppMenu,
  Scorecard,
  GolfClub,
  AlbumPhoto,
  CompanionPost,
  StampRecord,
  ClubRole
} from '../types';
import { calculateLevelFromActivity, getBirdLevel } from '../data/birdLevels';
import { GOLF_COURSES } from '../data/golfCourses';

interface AppContextType {
  currentUser: User;
  currentMenu: AppMenu;
  setCurrentMenu: (menu: AppMenu) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  stampRecords: StampRecord[];
  scorecards: Scorecard[];
  clubs: GolfClub[];
  albumPhotos: AlbumPhoto[];
  companionPosts: CompanionPost[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isStampSuccessModalOpen: boolean;
  setIsStampSuccessModalOpen: (open: boolean) => void;
  lastStampedCourseName: string;

  // Actions
  addStamp: (courseId: string, score: number, review: string) => void;
  addScorecard: (scorecard: Omit<Scorecard, 'id' | 'userId' | 'userNickname'>) => void;
  createClub: (newClub: Omit<GolfClub, 'id' | 'leaderId' | 'leaderNickname' | 'leaderLevel' | 'memberCount' | 'ranking' | 'createdAt' | 'members'>) => void;
  joinClub: (clubId: string) => void;
  leaveClub: (clubId: string) => void;
  updateMemberRole: (clubId: string, targetUserId: string, newRole: ClubRole) => void;
  uploadAlbumPhoto: (photo: Omit<AlbumPhoto, 'id' | 'uploaderId' | 'uploaderNickname' | 'uploaderLevel' | 'likes' | 'comments'>) => void;
  toggleLikePhoto: (photoId: string) => void;
  addPhotoComment: (photoId: string, text: string) => void;
  createCompanionPost: (post: Omit<CompanionPost, 'id' | 'creatorNickname' | 'creatorLevel' | 'status' | 'currentMembers'>) => void;
  applyCompanionPost: (postId: string) => void;
  switchUser: (targetLevel: number) => void;
  updateProfile: (nickname: string, bio: string, handicap: number, location: string) => void;
  simulateLevelUp: (targetLevel: number) => void;
}

const DEFAULT_USER: User = {
  id: 'user-001',
  nickname: '버디프렌즈',
  email: 'golfer@golgram.kr',
  level: 8, // 까치
  xp: 4500,
  handicap: 13.8,
  conquestStamps: [
    'anyang-cc',
    'jack-nicklaus-korea',
    'south-cape-owners-club',
    'bears-best-cheongna',
    'la-vie-est-belle-old',
    'sagewood-hongcheon',
    'seolhaewon-golden-beach',
    'pine-beach-links',
    'hwashan-cc',
    'blueone-sangju',
    'south-springs-cc',
    'seowon-valley-cc',
  ],
  top10Stamps: ['anyang-cc', 'jack-nicklaus-korea', 'south-cape-owners-club'],
  roundsCount: 42,
  averageScore: 85,
  bestScore: 78,
  bio: '대한민국 100대 골프장 도장깨기 도전 중! 주말 라운딩 좋아합니다.',
  gender: '남성',
  location: '서울 강남구',
  homeClubId: 'club-001',
  joinedDate: '2025-03-15',
};

const INITIAL_STAMP_RECORDS: StampRecord[] = [
  {
    id: 'stamp-1',
    courseId: 'anyang-cc',
    courseName: '안양컨트리클럽',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    userLevel: 8,
    stampedAt: '2026-04-12',
    score: 82,
    review: '한국 최고의 명문 코스! 100년 적송림과 유리판 그린에서의 감동적인 라운딩.',
    isTop10: true,
    gpsVerified: true,
  },
  {
    id: 'stamp-2',
    courseId: 'south-cape-owners-club',
    courseName: '사우스케이프 오너스클럽',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    userLevel: 8,
    stampedAt: '2026-06-20',
    score: 86,
    review: '남해 바다 절벽을 넘기는 16번 홀 티샷은 평생 잊지 못할 명장면이었습니다.',
    isTop10: true,
    gpsVerified: true,
  },
  {
    id: 'stamp-3',
    courseId: 'jack-nicklaus-korea',
    courseName: '잭니클라우스 골프클럽 코리아',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    userLevel: 8,
    stampedAt: '2026-08-05',
    score: 84,
    review: '송도 마천루를 배경으로 벤트그래스 위에서 펼쳐진 챔피언십 경험!',
    isTop10: true,
    gpsVerified: true,
  },
  {
    id: 'stamp-4',
    courseId: 'bears-best-cheongna',
    courseName: '베어즈베스트 청라 골프클럽',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    userLevel: 8,
    stampedAt: '2026-09-14',
    score: 87,
    review: '벙커가 많아 정교한 클럽 선택이 핵심이었던 도전적인 코스.',
    isTop10: false,
    gpsVerified: true,
  },
  {
    id: 'stamp-5',
    courseId: 'la-vie-est-belle-old',
    courseName: '라비에벨 컨트리클럽 (올드코스)',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    userLevel: 8,
    stampedAt: '2026-10-02',
    score: 83,
    review: '한옥 클럽하우스와 다랭이논 해저드가 어우러진 가을 춘천의 환상적인 풍경.',
    isTop10: false,
    gpsVerified: true,
  }
];

const INITIAL_SCORECARDS: Scorecard[] = [
  {
    id: 'score-1',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    courseId: 'anyang-cc',
    courseName: '안양컨트리클럽',
    date: '2026-04-12',
    teeTime: '07:30',
    totalScore: 82,
    outScore: 40,
    inScore: 42,
    totalPutts: 31,
    fairwayHitRate: 71,
    girRate: 61,
    notes: '드라이버 티샷이 안정되어 파세이브가 많았음. 그린스피드 3.3m로 매우 빠름.',
    weather: '맑음',
    companions: ['김프로', '박싱글', '이이글'],
    isVerified: true,
  },
  {
    id: 'score-2',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    courseId: 'south-cape-owners-club',
    courseName: '사우스케이프 오너스클럽',
    date: '2026-06-20',
    teeTime: '11:45',
    totalScore: 86,
    outScore: 44,
    inScore: 42,
    totalPutts: 34,
    fairwayHitRate: 64,
    girRate: 50,
    notes: '남해 해풍이 강하게 불어 클럽 2클럽 더 잡고 펀치샷 구사함.',
    weather: '바람강함',
    companions: ['최장타', '정알바', '윤버디'],
    isVerified: true,
  },
  {
    id: 'score-3',
    userId: 'user-001',
    userNickname: '버디프렌즈',
    courseId: 'la-vie-est-belle-old',
    courseName: '라비에벨 컨트리클럽 (올드코스)',
    date: '2026-10-02',
    teeTime: '08:12',
    totalScore: 83,
    outScore: 41,
    inScore: 42,
    totalPutts: 32,
    fairwayHitRate: 78,
    girRate: 67,
    notes: '다랭이논 해저드 피해 안전하게 3온 1펏 작전 성공!',
    weather: '맑음',
    companions: ['강나이스', '조페어웨이', '문벙커'],
    isVerified: true,
  }
];

const INITIAL_CLUBS: GolfClub[] = [
  {
    id: 'club-001',
    name: '백대명문 정복단',
    description: '대한민국 100대 골프장 완주를 목표로 매월 2회 정기 라운딩을 떠나는 진성 골퍼들의 모임입니다.',
    region: '수도권',
    isPrivate: false,
    memberCount: 28,
    maxMembers: 40,
    leaderId: 'user-001',
    leaderNickname: '버디프렌즈',
    leaderLevel: 8,
    regularDay: '매월 둘째/넷째 일요일',
    ranking: 1,
    notice: '이번 달 25일 춘천 라비에벨CC 올드코스 정기 라운딩 신청 접수 중입니다! 선착순 16명.',
    createdAt: '2025-04-10',
    tags: ['100대골프장', '도장깨기', '월2회정라', '수도권'],
    members: [
      {
        userId: 'user-001',
        nickname: '버디프렌즈',
        level: 8,
        role: '회장',
        joinedAt: '2025-04-10',
        roundsCount: 42,
        handicap: 13.8,
      },
      {
        userId: 'user-102',
        nickname: '알바트로스황',
        level: 21,
        role: '부회장',
        joinedAt: '2025-04-15',
        roundsCount: 120,
        handicap: 3.2,
      },
      {
        userId: 'user-103',
        nickname: '나이스온미녀',
        level: 14,
        role: '총무',
        joinedAt: '2025-04-18',
        roundsCount: 68,
        handicap: 11.5,
      },
      {
        userId: 'user-104',
        nickname: '티샷장타왕',
        level: 16,
        role: '운영진',
        joinedAt: '2025-05-01',
        roundsCount: 85,
        handicap: 7.9,
      },
      {
        userId: 'user-105',
        nickname: '새벽티오프',
        level: 5,
        role: '일반회원',
        joinedAt: '2025-06-12',
        roundsCount: 19,
        handicap: 22.0,
      }
    ]
  },
  {
    id: 'club-002',
    name: '10대 명문 프리미엄 패스',
    description: '안양CC, 웰링턴, 해슬리, 나인브릿지 등 대한민국 최고 권위의 10대 명문 골프장 탐방 전문 클럽입니다.',
    region: '전국',
    isPrivate: true,
    memberCount: 16,
    maxMembers: 20,
    leaderId: 'user-201',
    leaderNickname: '마스터골퍼',
    leaderLevel: 22,
    regularDay: '격주 수요일 주중 골프',
    ranking: 2,
    notice: '비공개 회원제 클럽으로, 기존 회원 1인 이상의 추천과 싱글 핸디캡 인증이 필요합니다.',
    createdAt: '2025-02-01',
    tags: ['10대명문', '프리미엄', '싱글골퍼', '회원제'],
    members: [
      {
        userId: 'user-201',
        nickname: '마스터골퍼',
        level: 22,
        role: '회장',
        joinedAt: '2025-02-01',
        roundsCount: 240,
        handicap: 1.1,
      },
      {
        userId: 'user-202',
        nickname: '핀크스사랑',
        level: 19,
        role: '부회장',
        joinedAt: '2025-02-10',
        roundsCount: 140,
        handicap: 4.8,
      }
    ]
  },
  {
    id: 'club-003',
    name: '골린이 탈출 참새클럽',
    description: 'Lv.1 병아리부터 Lv.5 꾀꼬리까지! 즐겁고 부담 없이 필드 레슨과 첫 100타 깨기를 함께하는 동호회입니다.',
    region: '수도권',
    isPrivate: false,
    memberCount: 52,
    maxMembers: 60,
    leaderId: 'user-301',
    leaderNickname: '친절한송프로',
    leaderLevel: 17,
    regularDay: '매주 토요일 오전',
    ranking: 3,
    notice: '스크린 모임 및 파3 쇼트게임장 번개가 활발하게 진행됩니다.',
    createdAt: '2025-05-20',
    tags: ['초보환영', '골린이', '필드레슨', '즐골'],
    members: [
      {
        userId: 'user-301',
        nickname: '친절한송프로',
        level: 17,
        role: '회장',
        joinedAt: '2025-05-20',
        roundsCount: 110,
        handicap: 5.0,
      }
    ]
  }
];

const INITIAL_ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    id: 'photo-1',
    title: '안양CC 100년 적송림과 가을 티샷',
    courseId: 'anyang-cc',
    courseName: '안양컨트리클럽',
    date: '2025-11-05', // Exact 1 year ago relative to current simulated time!
    uploaderId: 'user-001',
    uploaderNickname: '버디프렌즈',
    uploaderLevel: 8,
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    likes: 38,
    isLikedByUser: true,
    isOneYearAgo: true,
    companions: ['김프로', '박싱글', '이이글'],
    comments: [
      {
        id: 'c-1',
        nickname: '나이스온미녀',
        level: 14,
        text: '정말 그림 같은 적송림이네요! 안양CC 꼭 도장 찍으러 가보고 싶어요.',
        createdAt: '2025-11-06',
      },
      {
        id: 'c-2',
        nickname: '마스터골퍼',
        level: 22,
        text: '호암 회장의 정성이 깃든 7번 홀 전경이 멋집니다. 굿샷!',
        createdAt: '2025-11-07',
      }
    ]
  },
  {
    id: 'photo-2',
    title: '사우스케이프 16번 홀 절벽 바다 파3',
    courseId: 'south-cape-owners-club',
    courseName: '사우스케이프 오너스클럽',
    date: '2026-06-20',
    uploaderId: 'user-001',
    uploaderNickname: '버디프렌즈',
    uploaderLevel: 8,
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    likes: 45,
    isLikedByUser: false,
    companions: ['최장타', '정알바'],
    comments: [
      {
        id: 'c-3',
        nickname: '알바트로스황',
        level: 21,
        text: '바다 건너 핀에 정확히 꽂으셨나요? 사우스케이프 뷰는 국내 원탑이죠.',
        createdAt: '2026-06-21',
      }
    ]
  },
  {
    id: 'photo-3',
    title: '잭니클라우스 송도 마천루 선셋 라운딩',
    courseId: 'jack-nicklaus-korea',
    courseName: '잭니클라우스 골프클럽 코리아',
    date: '2026-08-05',
    uploaderId: 'user-001',
    uploaderNickname: '버디프렌즈',
    uploaderLevel: 8,
    imageUrl: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80',
    likes: 29,
    isLikedByUser: true,
    companions: ['조페어웨이'],
    comments: []
  },
  {
    id: 'photo-4',
    title: '라비에벨 올드코스 한옥 클럽하우스 앞 단체샷',
    courseId: 'la-vie-est-belle-old',
    courseName: '라비에벨 컨트리클럽 (올드코스)',
    date: '2026-10-02',
    uploaderId: 'user-103',
    uploaderNickname: '나이스온미녀',
    uploaderLevel: 14,
    imageUrl: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=1200&q=80',
    likes: 52,
    isLikedByUser: false,
    companions: ['버디프렌즈', '강나이스', '조페어웨이'],
    comments: []
  }
];

const INITIAL_COMPANION_POSTS: CompanionPost[] = [
  {
    id: 'post-1',
    title: '[조인] 11/15(토) 라비에벨CC 올드코스 08시 1분 모십니다 (명문도장깨기)',
    courseName: '라비에벨 컨트리클럽 (올드코스)',
    region: '강원',
    date: '2026-11-15',
    teeTime: '08:14',
    targetHandicap: '80대~90대 초반 매너골퍼',
    currentMembers: 3,
    maxMembers: 4,
    creatorNickname: '버디프렌즈',
    creatorLevel: 8,
    costEstimate: '그린피 24만 + 카트/캐디 N분의1',
    notes: '동반자 3명 확정이고 마지막 1분 모십니다. 100대 골프장 도장 찍으실 분 환영해요!',
    status: '모집중',
    genderPreference: '무관',
  },
  {
    id: 'post-2',
    title: '[10대명문] 11/22(일) 우정힐스CC 07시대 2인 조인 초대',
    courseName: '우정힐스 컨트리클럽',
    region: '충청',
    date: '2026-11-22',
    teeTime: '07:45',
    targetHandicap: '싱글 또는 보기플레이어',
    currentMembers: 2,
    maxMembers: 4,
    creatorNickname: '알바트로스황',
    creatorLevel: 21,
    costEstimate: '회원동반 혜택가 적용',
    notes: '코오롱 한국오픈 개최 코스입니다. 빠른 그린 적응 잘하시는 2분 함께해요.',
    status: '모집중',
    genderPreference: '무관',
  },
  {
    id: 'post-3',
    title: '[주말부부/커플] 11/29(일) 베어즈베스트 청라 12시 1팀 모집 완료',
    courseName: '베어즈베스트 청라 골프클럽',
    region: '수도권',
    date: '2026-11-29',
    teeTime: '12:05',
    targetHandicap: '즐겁게 플레이하실 분',
    currentMembers: 4,
    maxMembers: 4,
    creatorNickname: '나이스온미녀',
    creatorLevel: 14,
    costEstimate: '엔빵 (식사 포함)',
    notes: '정원 마감되었습니다. 다음 라운드에 또 모시겠습니다!',
    status: '마감',
    genderPreference: '부부/커플',
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('golgram_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [currentMenu, setCurrentMenu] = useState<AppMenu>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [stampRecords, setStampRecords] = useState<StampRecord[]>(() => {
    const saved = localStorage.getItem('golgram_stamps');
    return saved ? JSON.parse(saved) : INITIAL_STAMP_RECORDS;
  });

  const [scorecards, setScorecards] = useState<Scorecard[]>(() => {
    const saved = localStorage.getItem('golgram_scores');
    return saved ? JSON.parse(saved) : INITIAL_SCORECARDS;
  });

  const [clubs, setClubs] = useState<GolfClub[]>(() => {
    const saved = localStorage.getItem('golgram_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhoto[]>(() => {
    const saved = localStorage.getItem('golgram_albums');
    return saved ? JSON.parse(saved) : INITIAL_ALBUM_PHOTOS;
  });

  const [companionPosts, setCompanionPosts] = useState<CompanionPost[]>(() => {
    const saved = localStorage.getItem('golgram_companions');
    return saved ? JSON.parse(saved) : INITIAL_COMPANION_POSTS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isStampSuccessModalOpen, setIsStampSuccessModalOpen] = useState(false);
  const [lastStampedCourseName, setLastStampedCourseName] = useState('');

  // Local storage sync
  useEffect(() => {
    localStorage.setItem('golgram_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('golgram_stamps', JSON.stringify(stampRecords));
  }, [stampRecords]);

  useEffect(() => {
    localStorage.setItem('golgram_scores', JSON.stringify(scorecards));
  }, [scorecards]);

  useEffect(() => {
    localStorage.setItem('golgram_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('golgram_albums', JSON.stringify(albumPhotos));
  }, [albumPhotos]);

  useEffect(() => {
    localStorage.setItem('golgram_companions', JSON.stringify(companionPosts));
  }, [companionPosts]);

  // Recalculate level based on stamps and activity XP
  const refreshUserLevel = (updatedUser: User) => {
    const determinedBird = calculateLevelFromActivity(
      updatedUser.xp,
      updatedUser.conquestStamps.length
    );
    return {
      ...updatedUser,
      level: determinedBird.level,
    };
  };

  // Add Stamp Action
  const addStamp = (courseId: string, score: number, review: string) => {
    const course = GOLF_COURSES.find((c) => c.id === courseId);
    if (!course) return;

    if (currentUser.conquestStamps.includes(courseId)) {
      alert(`이미 '${course.name}' 도장을 획득하셨습니다!`);
      return;
    }

    const newRecord: StampRecord = {
      id: `stamp-${Date.now()}`,
      courseId,
      courseName: course.name,
      userId: currentUser.id,
      userNickname: currentUser.nickname,
      userLevel: currentUser.level,
      stampedAt: new Date().toISOString().split('T')[0],
      score,
      review: review || `${course.name} 정복 완료! 즐거운 라운딩이었습니다.`,
      isTop10: course.isTop10,
      gpsVerified: true,
    };

    setStampRecords((prev) => [newRecord, ...prev]);

    // Update user stats and stamps
    setCurrentUser((prev) => {
      const updatedStamps = [...prev.conquestStamps, courseId];
      const updatedTop10 = course.isTop10
        ? [...prev.top10Stamps, courseId]
        : prev.top10Stamps;
      const gainedXp = course.isTop10 ? 1000 : 500;
      const updatedUser = {
        ...prev,
        conquestStamps: updatedStamps,
        top10Stamps: updatedTop10,
        xp: prev.xp + gainedXp,
        roundsCount: prev.roundsCount + 1,
      };
      return refreshUserLevel(updatedUser);
    });

    setLastStampedCourseName(course.name);
    setIsStampSuccessModalOpen(true);
  };

  // Add Scorecard Action
  const addScorecard = (card: Omit<Scorecard, 'id' | 'userId' | 'userNickname'>) => {
    const newCard: Scorecard = {
      ...card,
      id: `score-${Date.now()}`,
      userId: currentUser.id,
      userNickname: currentUser.nickname,
    };

    setScorecards((prev) => [newCard, ...prev]);

    // Also auto-stamp the course if not stamped yet
    if (!currentUser.conquestStamps.includes(card.courseId)) {
      addStamp(card.courseId, card.totalScore, card.notes);
    } else {
      // Still give XP for round recording
      setCurrentUser((prev) => {
        const updated = {
          ...prev,
          xp: prev.xp + 300,
          roundsCount: prev.roundsCount + 1,
          averageScore: Math.round(
            (prev.averageScore * prev.roundsCount + card.totalScore) /
              (prev.roundsCount + 1)
          ),
          bestScore: Math.min(prev.bestScore, card.totalScore),
        };
        return refreshUserLevel(updated);
      });
    }
  };

  // Clubs Actions
  const createClub = (
    newClubData: Omit<
      GolfClub,
      | 'id'
      | 'leaderId'
      | 'leaderNickname'
      | 'leaderLevel'
      | 'memberCount'
      | 'ranking'
      | 'createdAt'
      | 'members'
    >
  ) => {
    const newClub: GolfClub = {
      ...newClubData,
      id: `club-${Date.now()}`,
      leaderId: currentUser.id,
      leaderNickname: currentUser.nickname,
      leaderLevel: currentUser.level,
      memberCount: 1,
      ranking: clubs.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
      members: [
        {
          userId: currentUser.id,
          nickname: currentUser.nickname,
          level: currentUser.level,
          role: '회장',
          joinedAt: new Date().toISOString().split('T')[0],
          roundsCount: currentUser.roundsCount,
          handicap: currentUser.handicap,
        },
      ],
    };

    setClubs((prev) => [newClub, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      homeClubId: newClub.id,
      xp: prev.xp + 400,
    }));
  };

  const joinClub = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          if (c.members.some((m) => m.userId === currentUser.id)) {
            return c;
          }
          const newMember = {
            userId: currentUser.id,
            nickname: currentUser.nickname,
            level: currentUser.level,
            role: '일반회원' as ClubRole,
            joinedAt: new Date().toISOString().split('T')[0],
            roundsCount: currentUser.roundsCount,
            handicap: currentUser.handicap,
          };
          return {
            ...c,
            memberCount: c.memberCount + 1,
            members: [...c.members, newMember],
          };
        }
        return c;
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      homeClubId: clubId,
      xp: prev.xp + 200,
    }));
  };

  const leaveClub = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          return {
            ...c,
            memberCount: Math.max(1, c.memberCount - 1),
            members: c.members.filter((m) => m.userId !== currentUser.id),
          };
        }
        return c;
      })
    );

    if (currentUser.homeClubId === clubId) {
      setCurrentUser((prev) => ({
        ...prev,
        homeClubId: undefined,
      }));
    }
  };

  const updateMemberRole = (clubId: string, targetUserId: string, newRole: ClubRole) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          return {
            ...c,
            members: c.members.map((m) =>
              m.userId === targetUserId ? { ...m, role: newRole } : m
            ),
          };
        }
        return c;
      })
    );
  };

  // Album actions
  const uploadAlbumPhoto = (
    photoData: Omit<
      AlbumPhoto,
      | 'id'
      | 'uploaderId'
      | 'uploaderNickname'
      | 'uploaderLevel'
      | 'likes'
      | 'comments'
    >
  ) => {
    const newPhoto: AlbumPhoto = {
      ...photoData,
      id: `photo-${Date.now()}`,
      uploaderId: currentUser.id,
      uploaderNickname: currentUser.nickname,
      uploaderLevel: currentUser.level,
      likes: 0,
      comments: [],
    };

    setAlbumPhotos((prev) => [newPhoto, ...prev]);
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        xp: prev.xp + 150,
      };
      return refreshUserLevel(updated);
    });
  };

  const toggleLikePhoto = (photoId: string) => {
    setAlbumPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          const isLiked = p.isLikedByUser;
          return {
            ...p,
            isLikedByUser: !isLiked,
            likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const addPhotoComment = (photoId: string, text: string) => {
    if (!text.trim()) return;
    setAlbumPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          const newComment = {
            id: `c-${Date.now()}`,
            nickname: currentUser.nickname,
            level: currentUser.level,
            text,
            createdAt: new Date().toISOString().split('T')[0],
          };
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
  };

  // Companion actions
  const createCompanionPost = (
    postData: Omit<
      CompanionPost,
      'id' | 'creatorNickname' | 'creatorLevel' | 'status' | 'currentMembers'
    >
  ) => {
    const newPost: CompanionPost = {
      ...postData,
      id: `post-${Date.now()}`,
      creatorNickname: currentUser.nickname,
      creatorLevel: currentUser.level,
      status: '모집중',
      currentMembers: 1,
    };
    setCompanionPosts((prev) => [newPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      xp: prev.xp + 200,
    }));
  };

  const applyCompanionPost = (postId: string) => {
    setCompanionPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          if (p.currentMembers >= p.maxMembers) {
            alert('이미 모집 마감된 라운딩입니다.');
            return p;
          }
          const nextCount = p.currentMembers + 1;
          return {
            ...p,
            currentMembers: nextCount,
            status: nextCount >= p.maxMembers ? '마감' : '모집중',
          };
        }
        return p;
      })
    );
    alert('동반자 조인 신청이 완료되었습니다! 주최자에게 알림이 전송되었습니다.');
  };

  // Switch demo account for testing all 22 bird levels
  const switchUser = (targetLevel: number) => {
    const bird = getBirdLevel(targetLevel);
    const mockUser: User = {
      id: `user-lvl-${targetLevel}`,
      nickname: `${bird.koreanName}골퍼`,
      email: `${bird.englishName.toLowerCase()}@golgram.kr`,
      level: targetLevel,
      xp: bird.minXp + 50,
      handicap: Math.max(1, 30 - targetLevel * 1.3),
      conquestStamps: GOLF_COURSES.slice(0, Math.min(GOLF_COURSES.length, bird.requiredStamps)).map(
        (c) => c.id
      ),
      top10Stamps: GOLF_COURSES.filter((c) => c.isTop10)
        .slice(0, Math.min(10, Math.floor(targetLevel / 2.2)))
        .map((c) => c.id),
      roundsCount: targetLevel * 5 + 4,
      averageScore: Math.max(70, 108 - targetLevel * 1.6),
      bestScore: Math.max(68, 98 - targetLevel * 1.4),
      bio: `Lv.${bird.level} ${bird.koreanName} (${bird.title}) 등급으로 활동 중인 골퍼입니다.`,
      gender: targetLevel % 2 === 0 ? '여성' : '남성',
      location: '서울 강남구',
      joinedDate: '2025-01-10',
    };
    setCurrentUser(mockUser);
  };

  const simulateLevelUp = (targetLevel: number) => {
    const clamped = Math.min(22, Math.max(1, targetLevel));
    const bird = getBirdLevel(clamped);
    setCurrentUser((prev) => ({
      ...prev,
      level: clamped,
      xp: bird.minXp,
    }));
  };

  const updateProfile = (nickname: string, bio: string, handicap: number, location: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      nickname,
      bio,
      handicap,
      location,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentMenu,
        setCurrentMenu,
        selectedCourseId,
        setSelectedCourseId,
        stampRecords,
        scorecards,
        clubs,
        albumPhotos,
        companionPosts,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isStampSuccessModalOpen,
        setIsStampSuccessModalOpen,
        lastStampedCourseName,
        addStamp,
        addScorecard,
        createClub,
        joinClub,
        leaveClub,
        updateMemberRole,
        uploadAlbumPhoto,
        toggleLikePhoto,
        addPhotoComment,
        createCompanionPost,
        applyCompanionPost,
        switchUser,
        updateProfile,
        simulateLevelUp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
