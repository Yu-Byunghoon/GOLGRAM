import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from '../common/UserBadge';
import { BirdAvatar } from '../common/BirdAvatar';
import { getBirdLevel } from '../../data/birdLevels';
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Users,
  TrendingUp,
  Target
} from 'lucide-react';

interface RankUser {
  rank: number;
  id: string;
  nickname: string;
  level: number;
  stampsCount: number;
  top10Count: number;
  avgScore: number;
  handicap: number;
  xp: number;
  homeClub: string;
}

export const RankingView: React.FC = () => {
  const { currentUser, clubs } = useApp();

  const [rankingCategory, setRankingCategory] = useState<'stamps' | 'level' | 'handicap' | 'club'>('stamps');

  // National mock golfers ranking dataset
  const nationalRankers: RankUser[] = [
    {
      rank: 1,
      id: 'r-1',
      nickname: '전설의알바트로스',
      level: 22,
      stampsCount: 100,
      top10Count: 10,
      avgScore: 71.2,
      handicap: 0.8,
      xp: 34500,
      homeClub: '10대 명문 프리미엄 패스',
    },
    {
      rank: 2,
      id: 'r-2',
      nickname: '홀인원김프로',
      level: 21,
      stampsCount: 94,
      top10Count: 9,
      avgScore: 72.8,
      handicap: 1.5,
      xp: 29800,
      homeClub: '백대명문 정복단',
    },
    {
      rank: 3,
      id: 'r-3',
      nickname: '남해의사우스',
      level: 20,
      stampsCount: 85,
      top10Count: 8,
      avgScore: 74.1,
      handicap: 2.9,
      xp: 26200,
      homeClub: '백대명문 정복단',
    },
    {
      rank: 4,
      id: 'r-4',
      nickname: '안양적송림',
      level: 19,
      stampsCount: 76,
      top10Count: 8,
      avgScore: 75.3,
      handicap: 3.8,
      xp: 23100,
      homeClub: '10대 명문 프리미엄 패스',
    },
    {
      rank: 5,
      id: 'r-5',
      nickname: '이글헌터박',
      level: 17,
      stampsCount: 58,
      top10Count: 6,
      avgScore: 78.2,
      handicap: 5.5,
      xp: 18400,
      homeClub: '골린이 탈출 참새클럽',
    },
    {
      rank: 6,
      id: 'r-6',
      nickname: '송골매드라이버',
      level: 16,
      stampsCount: 51,
      top10Count: 5,
      avgScore: 80.1,
      handicap: 7.2,
      xp: 16000,
      homeClub: '백대명문 정복단',
    },
    {
      rank: 7,
      id: 'r-7',
      nickname: '싱글백조',
      level: 14,
      stampsCount: 39,
      top10Count: 4,
      avgScore: 81.5,
      handicap: 9.1,
      xp: 12500,
      homeClub: '백대명문 정복단',
    },
    {
      rank: 8,
      id: currentUser.id,
      nickname: currentUser.nickname,
      level: currentUser.level,
      stampsCount: currentUser.conquestStamps.length,
      top10Count: currentUser.top10Stamps.length,
      avgScore: currentUser.averageScore,
      handicap: currentUser.handicap,
      xp: currentUser.xp,
      homeClub: '백대명문 정복단',
    },
    {
      rank: 9,
      id: 'r-9',
      nickname: '딱따구리정타',
      level: 9,
      stampsCount: 16,
      top10Count: 2,
      avgScore: 88.0,
      handicap: 15.0,
      xp: 5600,
      homeClub: '골린이 탈출 참새클럽',
    },
    {
      rank: 10,
      id: 'r-10',
      nickname: '필드참새',
      level: 2,
      stampsCount: 3,
      top10Count: 0,
      avgScore: 98.4,
      handicap: 24.0,
      xp: 500,
      homeClub: '골린이 탈출 참새클럽',
    }
  ];

  // Sort based on category
  const sortedRankers = [...nationalRankers].sort((a, b) => {
    if (rankingCategory === 'stamps') return b.stampsCount - a.stampsCount;
    if (rankingCategory === 'level') return b.level - a.level || b.xp - a.xp;
    if (rankingCategory === 'handicap') return a.handicap - b.handicap;
    return b.stampsCount - a.stampsCount;
  }).map((u, i) => ({ ...u, rank: i + 1 }));

  const top3 = sortedRankers.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-bold mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              대한민국 공식 골프 랭킹
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">전국 골프 랭킹</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              100대 골프장 도장깨기 완주 현황, 22단계 레벨 활동, 핸디캡 기준 전국 명예의 전당
            </p>
          </div>

          {/* Current User Standings Mini Card */}
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[140px]">
            <div className="text-[11px] text-amber-300 font-medium">내 현재 전국 랭킹</div>
            <div className="text-2xl font-black font-mono text-white my-0.5">
              8위
            </div>
            <div className="text-[11px] text-emerald-300 font-mono">
              상위 1.2% 골퍼
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto no-scrollbar">
        {[
          { id: 'stamps', label: '100대 도장깨기 랭킹', icon: <Trophy className="w-4 h-4 text-emerald-600" /> },
          { id: 'level', label: '22단계 레벨 랭킹', icon: <Crown className="w-4 h-4 text-amber-500" /> },
          { id: 'handicap', label: '핸디캡 / 실력 랭킹', icon: <Target className="w-4 h-4 text-indigo-600" /> },
          { id: 'club', label: '동호회 대항전 랭킹', icon: <Users className="w-4 h-4 text-teal-600" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setRankingCategory(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
              rankingCategory === tab.id
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Podium for Top 3 (if not club view) */}
      {rankingCategory !== 'club' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
          {/* Silver #2 */}
          {top3[1] && (
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-300 shadow-xs text-center order-2 md:order-1 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-black font-mono text-sm flex items-center justify-center mb-2">
                2
              </div>
              <BirdAvatar level={top3[1].level} size="lg" showBadge={true} />
              <h3 className="font-bold text-sm text-slate-900 mt-2">{top3[1].nickname}</h3>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-0.5">
                도장 {top3[1].stampsCount}개 · 핸디 {top3[1].handicap}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{top3[1].homeClub}</div>
            </div>
          )}

          {/* Gold #1 */}
          {top3[0] && (
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-400 shadow-lg text-center order-1 md:order-2 flex flex-col items-center relative -mt-4">
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                <Crown className="w-3.5 h-3.5" />
                전국 1위 챔피언
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-400 text-amber-950 font-black font-mono text-base flex items-center justify-center mb-2 mt-2">
                1
              </div>
              <BirdAvatar level={top3[0].level} size="xl" showBadge={true} />
              <h3 className="font-black text-base text-slate-900 mt-2">{top3[0].nickname}</h3>
              <div className="text-sm font-mono font-bold text-amber-700 mt-0.5">
                도장 {top3[0].stampsCount}개 완파! · 핸디 {top3[0].handicap}
              </div>
              <div className="text-xs text-slate-500 mt-1">{top3[0].homeClub}</div>
            </div>
          )}

          {/* Bronze #3 */}
          {top3[2] && (
            <div className="bg-white rounded-3xl p-5 border-2 border-amber-600/30 shadow-xs text-center order-3 md:order-3 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black font-mono text-sm flex items-center justify-center mb-2">
                3
              </div>
              <BirdAvatar level={top3[2].level} size="lg" showBadge={true} />
              <h3 className="font-bold text-sm text-slate-900 mt-2">{top3[2].nickname}</h3>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-0.5">
                도장 {top3[2].stampsCount}개 · 핸디 {top3[2].handicap}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{top3[2].homeClub}</div>
            </div>
          )}
        </div>
      )}

      {/* Ranking List Table */}
      {rankingCategory !== 'club' ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>순위 &amp; 골퍼</span>
            <div className="flex gap-8">
              <span>도장 수</span>
              <span>10대 명문</span>
              <span>핸디캡</span>
            </div>
          </div>

          <div className="space-y-2">
            {sortedRankers.map((user) => {
              const isMe = user.id === currentUser.id;
              return (
                <div
                  key={user.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isMe
                      ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50/50 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 text-center font-mono font-black text-sm text-slate-500">
                      {user.rank}
                    </span>

                    <UserBadge
                      nickname={user.nickname}
                      level={user.level}
                      size="sm"
                    />

                    {isMe && (
                      <span className="text-[10px] bg-emerald-800 text-white font-bold px-1.5 py-0.2 rounded-md">
                        나
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs font-bold shrink-0">
                    <span className="text-emerald-800 w-12 text-right">
                      {user.stampsCount}개
                    </span>
                    <span className="text-amber-700 w-12 text-right">
                      {user.top10Count}개
                    </span>
                    <span className="text-slate-700 w-12 text-right">
                      {user.handicap}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Club Leaderboard */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>동호회 순위</span>
            <div className="flex gap-8">
              <span>회원 수</span>
              <span>합산 도장</span>
            </div>
          </div>

          <div className="space-y-2">
            {clubs.map((c, i) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono font-black text-sm text-slate-600">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                    <span className="text-xs text-slate-500">{c.region} · 리더: {c.leaderNickname}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 font-mono text-xs font-bold shrink-0">
                  <span className="text-slate-600">{c.memberCount}명</span>
                  <span className="text-emerald-800 font-black text-sm">
                    {c.memberCount * 14 + (3 - i) * 12}개
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
