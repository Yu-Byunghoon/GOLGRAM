import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTop10Courses } from '../../data/golfCourses';
import { Award, CheckCircle, Crown, Sparkles, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Top10PrestigiousView: React.FC = () => {
  const { currentUser, setSelectedCourseId, stampRecords, addStamp } = useApp();

  const top10Courses = getTop10Courses();
  const conqueredTop10Count = currentUser.top10Stamps.length;
  const isMasterOfTop10 = conqueredTop10Count >= 10;

  return (
    <div className="space-y-6">
      {/* Luxury Golden Header */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-amber-500/40 relative overflow-hidden">
        {/* Golden ambient background lighting */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-8 bottom-4 opacity-10 pointer-events-none hidden md:block">
          <Crown className="w-56 h-56 text-amber-200" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2 border border-amber-400/30">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                대한민국 최고 권위 10대 명문 골프장
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                10대 명문 골프장 도장 깨기
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
                한국 골프의 역사와 미학이 집약된 절대 명문 10곳. 오직 진정한 골퍼에게만 허락된 황금 도장의 주인공이 되세요.
              </p>
            </div>

            {/* Golden Seal Counter */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-amber-400/40 text-center min-w-[150px]">
              <div className="text-xs text-amber-300 font-medium">황금 인장 현황</div>
              <div className="text-3xl font-black font-mono text-amber-400 my-0.5">
                {conqueredTop10Count}
                <span className="text-sm font-normal text-white/80"> / 10개</span>
              </div>
              <div className="text-xs text-amber-200/80">
                {isMasterOfTop10 ? '👑 전 코스 완파 신화 달성!' : `${10 - conqueredTop10Count}개 코스 남음`}
              </div>
            </div>
          </div>

          {/* Golden Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden p-0.5 border border-amber-400/30">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${Math.max(5, (conqueredTop10Count / 10) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prestige Golden Stamp Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {top10Courses.map((course, index) => {
          const isStamped = currentUser.conquestStamps.includes(course.id);
          const stampRecord = stampRecords.find((s) => s.courseId === course.id);

          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isStamped
                  ? 'bg-amber-50/50 border-amber-400 shadow-md hover:shadow-lg'
                  : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs'
              }`}
            >
              {/* Card Index & Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-900 text-amber-200 text-xs font-mono font-bold flex items-center justify-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {course.region} · {course.membershipType}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    명문 No.{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-900">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-sans">{course.englishName}</p>

                <p className="text-xs text-slate-700 mt-3 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Stamp Seal */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                {isStamped ? (
                  <div className="flex items-center gap-2.5">
                    {/* Golden Wax Seal */}
                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-amber-600 bg-gradient-to-br from-amber-400 to-amber-600 text-white flex flex-col items-center justify-center shadow-md transform -rotate-12">
                      <Crown className="w-4 h-4 mb-0.5" />
                      <span className="text-[7px] font-black tracking-widest uppercase">CONQUERED</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-950">황금 도장 완료</div>
                      <div className="text-[11px] text-amber-800 font-mono">
                        {stampRecord?.stampedAt || '2026-04-12'} (스코어: {stampRecord?.score || 82}타)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-400/80" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">황금 도장 미도전</span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isStamped) {
                      addStamp(course.id, 82, `${course.name} 10대 명문 도장깨기 성공!`);
                    } else {
                      setSelectedCourseId(course.id);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs whitespace-nowrap ${
                    isStamped
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {isStamped ? '명문 스토리' : '황금 도장 찍기'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
