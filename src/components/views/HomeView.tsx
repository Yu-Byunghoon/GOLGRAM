import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from '../common/UserBadge';
import { BirdAvatar } from '../common/BirdAvatar';
import { getBirdLevel } from '../../data/birdLevels';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  Trophy,
  Award,
  Sparkles,
  ClipboardList,
  Compass,
  ArrowRight,
  Sun,
  Wind,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    currentUser,
    setCurrentMenu,
    setSelectedCourseId,
    companionPosts,
    albumPhotos,
    scorecards,
    setIsAuthModalOpen
  } = useApp();

  const bird = getBirdLevel(currentUser.level);
  const nextBird = getBirdLevel(Math.min(22, currentUser.level + 1));

  // Find top recommendations (courses not stamped yet)
  const unstampedCourses = GOLF_COURSES.filter(
    (c) => !currentUser.conquestStamps.includes(c.id)
  );
  const recommendedCourses = unstampedCourses.slice(0, 3);

  // Top 10 Prestigious courses conquest rate
  const top10Rate = Math.round((currentUser.top10Stamps.length / 10) * 100);
  const top100Rate = Math.round((currentUser.conquestStamps.length / 100) * 100);

  const oneYearAgoPhoto = albumPhotos.find((p) => p.isOneYearAgo) || albumPhotos[0];

  return (
    <div className="space-y-6">
      {/* Hero Banner: Premium Golf Conquest Dashboard */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        {/* Subtle background fairway pattern */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 opacity-10 pointer-events-none hidden md:block">
          <Trophy className="w-56 h-56 text-white" />
        </div>

        <div className="relative z-10">
          {/* Header Row: User Identity Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-800/60">
            <div className="flex items-center gap-3">
              <BirdAvatar
                level={currentUser.level}
                size="xl"
                showBadge={true}
                className="ring-4 ring-white/20 shadow-md cursor-pointer"
                onClick={() => setCurrentMenu('mypage')}
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {currentUser.nickname}
                  </h1>
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded-md shadow-xs"
                    style={{ backgroundColor: bird.bgColor, color: bird.themeColor }}
                  >
                    Lv.{bird.level} {bird.koreanName}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 mt-1">
                  {bird.title} · &quot;{bird.tagline}&quot;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMenu('mypage')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 transition-colors backdrop-blur-xs border border-white/10"
              >
                레벨 도감 &amp; 통계
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-xs font-bold text-white transition-colors shadow-2xs"
              >
                계정 전환
              </button>
            </div>
          </div>

          {/* Level Progress & Stamp Stats Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {/* 100대 도장 달성률 */}
            <div
              onClick={() => setCurrentMenu('top100')}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all cursor-pointer border border-white/10 backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-200">100대 골프장 도장깨기</span>
                <Trophy className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-2">
                <div className="text-3xl font-black font-mono tracking-tight">
                  {currentUser.conquestStamps.length}
                  <span className="text-sm font-normal text-emerald-300/80"> / 100개</span>
                </div>
                <div className="text-xs text-emerald-200/80 mt-0.5">완주율 {top100Rate}%</div>
              </div>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(4, top100Rate)}%` }}
                />
              </div>
            </div>

            {/* 10대 명문 도장 달성률 */}
            <div
              onClick={() => setCurrentMenu('top10')}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all cursor-pointer border border-white/10 backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-amber-200">10대 명문 골프장 도장</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="my-2">
                <div className="text-3xl font-black font-mono tracking-tight text-amber-300">
                  {currentUser.top10Stamps.length}
                  <span className="text-sm font-normal text-amber-200/80"> / 10개</span>
                </div>
                <div className="text-xs text-amber-200/80 mt-0.5">명문 정복율 {top10Rate}%</div>
              </div>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(4, top10Rate)}%` }}
                />
              </div>
            </div>

            {/* Next Level Target */}
            <div
              onClick={() => setCurrentMenu('mypage')}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all cursor-pointer border border-white/10 backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-200">다음 목표 레벨</span>
                <span className="text-[11px] font-mono font-bold text-emerald-300">
                  Lv.{nextBird.level}
                </span>
              </div>
              <div className="my-2 flex items-center gap-2.5">
                <BirdAvatar level={nextBird.level} size="sm" />
                <div>
                  <div className="text-lg font-bold text-white leading-tight">
                    {nextBird.koreanName}
                  </div>
                  <div className="text-xs text-emerald-200/80">
                    필요 도장 {nextBird.requiredStamps}개 (현재 {currentUser.conquestStamps.length}개)
                  </div>
                </div>
              </div>
              <div className="text-xs text-emerald-300/80 flex items-center gap-1">
                <span>{nextBird.title} 달성하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Navigation Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setCurrentMenu('top100')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">100대 도장깨기</div>
          <div className="text-xs text-slate-500 mt-0.5">전국 100개 명코스 여권</div>
        </button>

        <button
          onClick={() => setCurrentMenu('top10')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">10대 명문 도장</div>
          <div className="text-xs text-slate-500 mt-0.5">황금 인장 정복 챌린지</div>
        </button>

        <button
          onClick={() => setCurrentMenu('ai-caddie')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">AI 골프 비서</div>
          <div className="text-xs text-slate-500 mt-0.5">실시간 날씨 &amp; 코스 공략</div>
        </button>

        <button
          onClick={() => setCurrentMenu('scorecard')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">스코어 기록</div>
          <div className="text-xs text-slate-500 mt-0.5">18홀 기록 &amp; 도장 자동인증</div>
        </button>
      </section>

      {/* Main 2-Column Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recommended Courses & 1-Year Memory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Next Courses to Conquer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">다음 도장깨기 추천 골프장</h2>
                <p className="text-xs text-slate-500">아직 방문하지 않은 대한민국 명품 코스</p>
              </div>
              <button
                onClick={() => setCurrentMenu('explore')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
              >
                전체보기
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                        {c.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {c.region} · {c.membershipType}
                      </span>
                      {c.isTop10 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                          10대 명문
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {c.signatureHole}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono font-semibold text-slate-700">
                      그린피 {c.greenFeeWeekday}만~
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourseId(c.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-2xs whitespace-nowrap"
                    >
                      도장 정보
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: 1-Year Ago Memory Spotlight */}
          {oneYearAgoPhoto && (
            <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl p-6 border border-amber-200/60 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                    1년 전 오늘의 추억
                  </span>
                </div>
                <button
                  onClick={() => setCurrentMenu('album')}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  앨범 전체보기
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src={oneYearAgoPhoto.imageUrl}
                    alt={oneYearAgoPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{oneYearAgoPhoto.courseName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{oneYearAgoPhoto.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {oneYearAgoPhoto.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    동반자: {oneYearAgoPhoto.companions.join(', ')}
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => setCurrentMenu('album')}
                      className="text-xs font-bold text-emerald-800 hover:underline"
                    >
                      댓글 {oneYearAgoPhoto.comments.length}개 · 좋아요 {oneYearAgoPhoto.likes}개
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Weather Widget & Live Join Posts */}
        <div className="space-y-6">
          {/* Real-time Field Weather Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                오늘의 골프 필드 날씨
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">경기 이천 기준</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-black font-mono text-slate-900">18°C</div>
                  <div className="text-xs text-slate-500">맑음 · 최적 라운딩 기온</div>
                </div>
              </div>

              <div className="text-right text-xs space-y-0.5">
                <div className="flex items-center justify-end gap-1 text-slate-600">
                  <Wind className="w-3.5 h-3.5 text-blue-500" />
                  <span>풍속 1.8m/s (미풍)</span>
                </div>
                <div className="text-slate-500">습도 45% · 강수확률 0%</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
              💡 <strong>AI 캐디 한마디:</strong> 오전 이슬이 마른 11시 이후 그린 스피드가 빨라집니다. 클럽 거리를 정타 기준 5m 길게 잡으세요!
            </div>
          </div>

          {/* Live Companion Recruiting */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">실시간 조인 &amp; 동반자</h3>
              </div>
              <button
                onClick={() => setCurrentMenu('companion')}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-800"
              >
                더보기
              </button>
            </div>

            <div className="space-y-2.5">
              {companionPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setCurrentMenu('companion')}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">{post.courseName}</span>
                    <span className={`px-1.5 py-0.2 rounded-md font-bold ${
                      post.status === '모집중' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {post.status} ({post.currentMembers}/{post.maxMembers})
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {post.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{post.date} {post.teeTime}</span>
                    <span className="text-indigo-600 font-semibold">{post.targetHandicap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
