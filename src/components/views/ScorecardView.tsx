import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scorecard } from '../../types';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  ClipboardList,
  Plus,
  Calendar,
  Clock,
  Sun,
  Trophy,
  CheckCircle2,
  TrendingUp,
  X,
  Target
} from 'lucide-react';

export const ScorecardView: React.FC = () => {
  const { scorecards, addScorecard, currentUser } = useApp();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Score input form state
  const [courseName, setCourseName] = useState('안양컨트리클럽');
  const [date, setDate] = useState('2026-11-05');
  const [teeTime, setTeeTime] = useState('08:15');
  const [outScore, setOutScore] = useState(41);
  const [inScore, setInScore] = useState(42);
  const [totalPutts, setTotalPutts] = useState(32);
  const [firRate, setFirRate] = useState(70);
  const [girRate, setGirRate] = useState(60);
  const [weather, setWeather] = useState<'맑음' | '흐림' | '비' | '바람강함'>('맑음');
  const [notes, setNotes] = useState('아이언 샷이 안정되어 파세이브가 수월했던 라운드');
  const [companions, setCompanions] = useState('김프로, 박싱글, 이이글');

  const totalScore = outScore + inScore;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = GOLF_COURSES.find((c) => c.name === courseName) || GOLF_COURSES[0];

    addScorecard({
      courseId: course.id,
      courseName: course.name,
      date,
      teeTime,
      totalScore,
      outScore,
      inScore,
      totalPutts,
      fairwayHitRate: firRate,
      girRate,
      weather,
      notes,
      companions: companions.split(',').map((c) => c.trim()).filter(Boolean),
      isVerified: true,
    });

    setIsRecordModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              라운딩 및 스코어 기록
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            18홀 상세 스코어, 페어웨이 안착률(FIR), 그린 적중률(GIR), 퍼팅 수 분석 및 도장 자동 연동
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 라운딩 스코어 기록
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
          <span className="text-xs text-slate-500 font-medium">총 라운딩 횟수</span>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1">
            {currentUser.roundsCount}회
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
          <span className="text-xs text-slate-500 font-medium">평균 스코어</span>
          <div className="text-2xl font-black font-mono text-emerald-800 mt-1">
            {currentUser.averageScore}타
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
          <span className="text-xs text-slate-500 font-medium">라베 (Best Score)</span>
          <div className="text-2xl font-black font-mono text-amber-600 mt-1">
            {currentUser.bestScore}타
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
          <span className="text-xs text-slate-500 font-medium">공인 핸디캡</span>
          <div className="text-2xl font-black font-mono text-indigo-700 mt-1">
            {currentUser.handicap}
          </div>
        </div>
      </div>

      {/* Scorecards List */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
          최근 라운딩 스코어카드 ({scorecards.length})
        </span>

        {scorecards.map((card) => {
          const isStamped = currentUser.conquestStamps.includes(card.courseId);

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-3"
            >
              {/* Card Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900">{card.courseName}</span>
                  {isStamped && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      도장 인증
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.date}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.teeTime}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>{card.weather}</span>
                  </div>
                </div>
              </div>

              {/* Score breakdown metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 bg-slate-50 rounded-2xl text-center">
                <div className="col-span-2 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0">
                  <span className="text-[11px] text-slate-500 font-medium">최종 스코어</span>
                  <div className="text-2xl font-black font-mono text-emerald-900 mt-0.5">
                    {card.totalScore}
                    <span className="text-xs font-normal text-slate-500">타</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500">전반 (OUT)</span>
                  <div className="text-base font-bold font-mono text-slate-800 mt-0.5">
                    {card.outScore}타
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500">후반 (IN)</span>
                  <div className="text-base font-bold font-mono text-slate-800 mt-0.5">
                    {card.inScore}타
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500">총 퍼팅 수</span>
                  <div className="text-base font-bold font-mono text-slate-800 mt-0.5">
                    {card.totalPutts}펏
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500">페어웨이 / GIR</span>
                  <div className="text-base font-bold font-mono text-slate-800 mt-0.5">
                    {card.fairwayHitRate}% / {card.girRate}%
                  </div>
                </div>
              </div>

              {/* Notes & Companions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                <div className="italic text-slate-700">&ldquo;{card.notes}&rdquo;</div>
                <div className="text-slate-500 shrink-0">
                  동반자: {card.companions.join(', ')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Scorecard Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsRecordModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold text-slate-900">새 라운딩 스코어 등록</h2>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">골프장 선택</label>
                <select
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                >
                  {GOLF_COURSES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.region})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">라운드 날짜</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">티오프 시간</label>
                  <input
                    type="time"
                    value={teeTime}
                    onChange={(e) => setTeeTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Score Input */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block">스코어 및 세부 지표</span>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">전반 (OUT)</label>
                    <input
                      type="number"
                      value={outScore}
                      onChange={(e) => setOutScore(Number(e.target.value))}
                      className="w-full py-1.5 text-center rounded-xl border border-slate-300 text-base font-bold font-mono"
                      min={27}
                      max={72}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">후반 (IN)</label>
                    <input
                      type="number"
                      value={inScore}
                      onChange={(e) => setInScore(Number(e.target.value))}
                      className="w-full py-1.5 text-center rounded-xl border border-slate-300 text-base font-bold font-mono"
                      min={27}
                      max={72}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">최종 합계</label>
                    <div className="py-1.5 text-center rounded-xl bg-emerald-100 text-emerald-900 text-base font-black font-mono">
                      {totalScore}타
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">총 퍼팅수</label>
                    <input
                      type="number"
                      value={totalPutts}
                      onChange={(e) => setTotalPutts(Number(e.target.value))}
                      className="w-full py-1.5 text-center rounded-xl border border-slate-300 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">페어웨이 안착률(%)</label>
                    <input
                      type="number"
                      value={firRate}
                      onChange={(e) => setFirRate(Number(e.target.value))}
                      className="w-full py-1.5 text-center rounded-xl border border-slate-300 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">그린 적중률(%)</label>
                    <input
                      type="number"
                      value={girRate}
                      onChange={(e) => setGirRate(Number(e.target.value))}
                      className="w-full py-1.5 text-center rounded-xl border border-slate-300 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">동반자 (쉼표 구분)</label>
                <input
                  type="text"
                  value={companions}
                  onChange={(e) => setCompanions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  placeholder="김프로, 박싱글"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">라운딩 메모 및 코멘트</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  placeholder="오늘의 드라이버 샷, 숏게임 소감"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-xs transition-colors"
              >
                스코어카드 저장 및 도장 자동인증 (+300 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
