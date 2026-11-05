export interface User {
  id: string;
  nickname: string;
  email: string;
  level: number; // 1 to 22
  xp: number;
  handicap: number;
  conquestStamps: string[]; // array of course IDs
  top10Stamps: string[]; // array of top 10 course IDs
  roundsCount: number;
  averageScore: number;
  bestScore: number;
  bio: string;
  gender: '남성' | '여성';
  location: string;
  homeClubId?: string;
  joinedDate: string;
}

export interface BirdLevel {
  level: number; // 1 to 22
  koreanName: string; // e.g. 병아리
  englishName: string; // Chick
  title: string;
  minXp: number;
  requiredStamps: number;
  description: string;
  themeColor: string;
  bgColor: string;
  tagline: string;
}

export interface GolfCourse {
  id: string;
  name: string;
  englishName: string;
  region: '수도권' | '강원' | '충청' | '전라' | '경상' | '제주';
  isTop100: boolean;
  isTop10: boolean;
  holes: number;
  par: number;
  greenFeeWeekday: number; // KRW in 10,000s
  greenFeeWeekend: number;
  membershipType: '대중제' | '회원제' | '혼합제';
  address: string;
  phone: string;
  website: string;
  difficulty: number; // 1 to 5
  scenery: number; // 1 to 5
  caddieFee: number;
  cartFee: number;
  description: string;
  highlights: string[];
  signatureHole: string;
  lat: number;
  lng: number;
  imageUrl?: string;
}

export interface StampRecord {
  id: string;
  courseId: string;
  courseName: string;
  userId: string;
  userNickname: string;
  userLevel: number;
  stampedAt: string;
  score: number;
  review: string;
  isTop10: boolean;
  gpsVerified: boolean;
  photoUrl?: string;
}

export interface ScorecardHole {
  holeNumber: number;
  par: number;
  score: number;
  putts: number;
  fairwayHit: boolean;
  gir: boolean;
}

export interface Scorecard {
  id: string;
  userId: string;
  userNickname: string;
  courseId: string;
  courseName: string;
  date: string;
  teeTime: string;
  totalScore: number;
  outScore: number;
  inScore: number;
  totalPutts: number;
  fairwayHitRate: number; // percentage
  girRate: number; // percentage
  notes: string;
  weather: '맑음' | '흐림' | '비' | '바람강함';
  companions: string[];
  isVerified: boolean;
}

export type ClubRole = '회장' | '부회장' | '총무' | '운영진' | '일반회원';

export interface ClubMember {
  userId: string;
  nickname: string;
  level: number;
  role: ClubRole;
  joinedAt: string;
  roundsCount: number;
  handicap: number;
}

export interface GolfClub {
  id: string;
  name: string;
  description: string;
  region: string;
  isPrivate: boolean;
  memberCount: number;
  maxMembers: number;
  leaderId: string;
  leaderNickname: string;
  leaderLevel: number;
  regularDay: string;
  ranking: number;
  notice: string;
  createdAt: string;
  tags: string[];
  members: ClubMember[];
}

export interface AlbumPhoto {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  date: string;
  uploaderId: string;
  uploaderNickname: string;
  uploaderLevel: number;
  imageUrl: string;
  likes: number;
  isLikedByUser?: boolean;
  comments: {
    id: string;
    nickname: string;
    level: number;
    text: string;
    createdAt: string;
  }[];
  companions: string[];
  isOneYearAgo?: boolean;
}

export interface CompanionPost {
  id: string;
  title: string;
  courseName: string;
  region: string;
  date: string;
  teeTime: string;
  targetHandicap: string;
  currentMembers: number;
  maxMembers: number;
  creatorNickname: string;
  creatorLevel: number;
  costEstimate: string;
  notes: string;
  status: '모집중' | '마감';
  genderPreference: '무관' | '남성' | '여성' | '부부/커플';
}

export type AppMenu =
  | 'home'
  | 'top100'
  | 'top10'
  | 'explore'
  | 'ai-caddie'
  | 'companion'
  | 'club'
  | 'album'
  | 'scorecard'
  | 'ranking'
  | 'mypage';
