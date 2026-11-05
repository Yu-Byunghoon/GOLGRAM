import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getGolfCourseById } from '../../data/golfCourses';
import {
  X,
  MapPin,
  Phone,
  Globe,
  Trophy,
  Award,
  Sparkles,
  CheckCircle,
  Flag,
  DollarSign,
  Compass
} from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const {
    selectedCourseId,
    setSelectedCourseId,
    currentUser,
    addStamp,
    setCurrentMenu,
  } = useApp();

  const [scoreInput, setScoreInput] = useState<number>(88);
  const [reviewInput, setReviewInput] = useState<string>('');
  const [showStampForm, setShowStampForm] = useState(false);

  if (!selectedCourseId) return null;

  const course = getGolfCourseById(selectedCourseId);
  if (!course) return null;

  const isStamped = currentUser.conquestStamps.includes(course.id);

  const handleStampSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStamp(course.id, scoreInput, reviewInput);
    setShowStampForm(false);
  };

  const handleConsultAI = () => {
    setSelectedCourseId(null);
    setCurrentMenu('ai-caddie');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedCourseId(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div className={`p-6 text-white relative ${course.isTop10 ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900' : 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900'}`}>
          <button
            onClick={() => setSelectedCourseId(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white">
              {course.region}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white">
              {course.membershipType}
            </span>
            {course.isTop10 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                10대 명문
              </span>
            )}
            {course.isTop100 && !course.isTop10 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-400 text-emerald-950 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                100대 골프장
              </span>
            )}
          </div>

          <h2 className="text-2xl font-black tracking-tight">{course.name}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{course.englishName}</p>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Conquest Status Notice */}
          <div className={`p-3.5 rounded-2xl flex items-center justify-between ${
            isStamped ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-slate-100 border border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2.5">
              {isStamped ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Flag className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {isStamped ? '도장깨기 완료!' : '아직 도장을 찍지 않은 골프장입니다'}
                </div>
                <div className="text-[11px] opacity-80">
                  {isStamped ? '회원님의 도장 여권에 인증되었습니다.' : '라운딩 후 GPS 위치 또는 스코어카드로 도장을 획득하세요.'}
                </div>
              </div>
            </div>

            {!isStamped && !showStampForm && (
              <button
                onClick={() => setShowStampForm(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-2xs whitespace-nowrap shrink-0"
              >
                도장 찍기
              </button>
            )}
          </div>

          {/* Stamp input form */}
          {showStampForm && (
            <form onSubmit={handleStampSubmit} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-900">도장깨기 인증 등록</span>
                <button
                  type="button"
                  onClick={() => setShowStampForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  취소
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">내 라운딩 스코어 (타수)</label>
                <input
                  type="number"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(parseInt(e.target.value) || 88)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                  min={54}
                  max={144}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">한 줄 라운딩 소감</label>
                <input
                  type="text"
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  placeholder="예: 7번 홀 경관이 환상적이고 그린 스피드가 매우 빨랐습니다."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors shadow-2xs"
              >
                도장 인증 완료 (+{course.isTop10 ? '1000' : '500'} XP)
              </button>
            </form>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">코스 소개</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500">규모 / 기준타</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {course.holes}홀 · Par {course.par}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500">주중 / 주말 그린피</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {course.greenFeeWeekday}만 / {course.greenFeeWeekend}만
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500">코스 난이도</span>
              <div className="text-base font-bold font-mono text-emerald-800 mt-0.5">
                ★ {course.difficulty} / 5.0
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500">자연 경관</span>
              <div className="text-base font-bold font-mono text-amber-700 mt-0.5">
                ★ {course.scenery} / 5.0
              </div>
            </div>
          </div>

          {/* Signature Hole & Highlights */}
          <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="text-xs font-bold text-emerald-900 mb-1">시그니처 홀</div>
            <div className="text-sm font-semibold text-slate-900">{course.signatureHole}</div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {course.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-xs bg-white text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200/80"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{course.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{course.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={course.website} target="_blank" rel="noreferrer" className="text-emerald-700 underline truncate">
                {course.website}
              </a>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-200 flex gap-2">
            <button
              onClick={handleConsultAI}
              className="flex-1 py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-purple-200"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI 비서 코스 공략 &amp; 날씨 보기
            </button>
            <button
              onClick={() => setSelectedCourseId(null)}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
