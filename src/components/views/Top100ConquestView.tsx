import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GOLF_COURSES } from '../../data/golfCourses';
import { Trophy, CheckCircle, Award, Filter, Search, MapPin, Sparkles } from 'lucide-react';

export const Top100ConquestView: React.FC = () => {
  const { currentUser, setSelectedCourseId, stampRecords, addStamp } = useApp();

  const [regionFilter, setRegionFilter] = useState<string>('전체');
  const [statusFilter, setStatusFilter] = useState<'전체' | '도장획득' | '미정복'>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const top100Courses = GOLF_COURSES.filter((c) => c.isTop100);

  const regions = ['전체', '수도권', '강원', '충청', '전라', '경상', '제주'];

  const filteredCourses = top100Courses.filter((course) => {
    const isStamped = currentUser.conquestStamps.includes(course.id);

    if (regionFilter !== '전체' && course.region !== regionFilter) return false;
    if (statusFilter === '도장획득' && !isStamped) return false;
    if (statusFilter === '미정복' && isStamped) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(q) ||
        course.region.toLowerCase().includes(q) ||
        course.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const conqueredCount = top100Courses.filter((c) =>
    currentUser.conquestStamps.includes(c.id)
  ).length;

  const conquestPercentage = Math.round((conqueredCount / top100Courses.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header & Passport Progress Hero */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold mb-2">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                대한민국 100대 골프장 스탬프 랠리
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                100대 골프장 도장 깨기 여권
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-xl">
                한국 최고의 100대 명품 골프장을 직접 라운딩하고 실시간 GPS 인증 및 스코어카드로 도장을 획득하세요!
              </p>
            </div>

            {/* Passport Stamp Counter */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[140px]">
              <div className="text-xs text-emerald-300 font-medium">정복 현황</div>
              <div className="text-3xl font-black font-mono text-emerald-300 my-0.5">
                {currentUser.conquestStamps.length}
                <span className="text-sm font-normal text-white/80"> / 100</span>
              </div>
              <div className="text-xs text-emerald-200/80">달성률 {conquestPercentage}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(3, conquestPercentage)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="골프장 이름, 지역, 코스 검색..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        {/* Region & Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  regionFilter === reg
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Status Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            {(['전체', '도장획득', '미정복'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Passport Stamp Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => {
          const isStamped = currentUser.conquestStamps.includes(course.id);
          const stampRecord = stampRecords.find((s) => s.courseId === course.id);

          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`relative rounded-3xl p-5 border transition-all cursor-pointer group flex flex-col justify-between overflow-hidden ${
                isStamped
                  ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-400 hover:shadow-md'
                  : 'bg-white border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              {/* Top Row: Region & Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {course.region}
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] font-medium text-slate-600">
                      {course.membershipType}
                    </span>
                  </div>

                  {course.isTop10 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      10대 명문
                    </span>
                  )}
                </div>

                {/* Course Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{course.englishName}</p>

                {/* Signature Feature */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {course.signatureHole}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 font-mono">
                  <span>{course.holes}홀</span>
                  <span>·</span>
                  <span>Par {course.par}</span>
                  <span>·</span>
                  <span>그린피 {course.greenFeeWeekday}만~</span>
                </div>
              </div>

              {/* Bottom Stamp Seal Section */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {isStamped ? (
                  <div className="flex items-center gap-2">
                    {/* Conquered Stamp Seal */}
                    <div className="w-9 h-9 rounded-full border-2 border-dashed border-emerald-600 bg-emerald-100/80 flex items-center justify-center transform -rotate-12 shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-900">도장 완료</div>
                      <div className="text-[10px] text-emerald-700/80 font-mono">
                        {stampRecord?.stampedAt || '2026-04-12'} (스코어: {stampRecord?.score || 85}타)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400">
                    {/* Unstamped Placeholder */}
                    <div className="w-9 h-9 rounded-full border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center shrink-0">
                      <Trophy className="w-4 h-4 text-slate-300" />
                    </div>
                    <span className="text-xs text-slate-500">미도전</span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isStamped) {
                      addStamp(course.id, 86, `${course.name} 라운딩 완료!`);
                    } else {
                      setSelectedCourseId(course.id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs whitespace-nowrap ${
                    isStamped
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-emerald-800 text-white hover:bg-emerald-900'
                  }`}
                >
                  {isStamped ? '상세보기' : '도장 찍기'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
