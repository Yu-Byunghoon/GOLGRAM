import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIRD_LEVELS, getBirdLevel } from '../../data/birdLevels';
import { BirdAvatar } from '../common/BirdAvatar';
import { UserBadge } from '../common/UserBadge';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  UserCheck,
  Trophy,
  Award,
  BookOpen,
  Sparkles,
  Download,
  Smartphone,
  Edit3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

export const MyPageView: React.FC = () => {
  const {
    currentUser,
    stampRecords,
    scorecards,
    setIsAuthModalOpen,
    simulateLevelUp,
    setSelectedCourseId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'stamps' | 'scores' | 'settings'>('encyclopedia');
  const [selectedBirdLevel, setSelectedBirdLevel] = useState<number>(currentUser.level);

  const currentBird = getBirdLevel(currentUser.level);
  const inspectingBird = getBirdLevel(selectedBirdLevel);

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <BirdAvatar
              level={currentUser.level}
              size="2xl"
              showBadge={true}
              className="ring-4 ring-emerald-600/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.nickname}
                </h1>
                <span
                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border shadow-2xs"
                  style={{
                    backgroundColor: currentBird.bgColor,
                    color: currentBird.themeColor,
                    borderColor: `${currentBird.themeColor}33`,
                  }}
                >
                  Lv.{currentBird.level} {currentBird.koreanName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentBird.title} · {currentUser.bio}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-mono">
                <span>활동 지역: {currentUser.location}</span>
                <span>·</span>
                <span>가입일: {currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              프로필 / 계정전환
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[11px] text-slate-500">100대 도장</span>
            <div className="text-xl font-black font-mono text-emerald-800 mt-0.5">
              {currentUser.conquestStamps.length}개
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[11px] text-slate-500">10대 명문 도장</span>
            <div className="text-xl font-black font-mono text-amber-600 mt-0.5">
              {currentUser.top10Stamps.length}개
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[11px] text-slate-500">누적 활동 XP</span>
            <div className="text-xl font-black font-mono text-indigo-700 mt-0.5">
              {currentUser.xp.toLocaleString()} XP
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[11px] text-slate-500">평균 / 베스트 타수</span>
            <div className="text-xl font-black font-mono text-slate-800 mt-0.5">
              {currentUser.averageScore} / {currentUser.bestScore}타
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white p-2 rounded-2xl">
        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'encyclopedia'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>22단계 새 캐릭터 도감</span>
        </button>

        <button
          onClick={() => setActiveTab('stamps')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'stamps'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>내 도장깨기 여권 ({currentUser.conquestStamps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scores')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'scores'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>스코어 기록함 ({scorecards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'settings'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>PWA 앱 설치 &amp; 설정</span>
        </button>
      </div>

      {/* Tab 1: Full 22 Bird Levels Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="space-y-6">
          {/* Selected Bird Level Showcase Feature */}
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm transition-all"
            style={{
              backgroundColor: inspectingBird.bgColor,
              borderColor: `${inspectingBird.themeColor}40`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <BirdAvatar
                level={inspectingBird.level}
                size="2xl"
                showBadge={true}
                className="shadow-md"
              />

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span
                    className="font-mono text-sm font-black px-2.5 py-0.5 rounded-lg text-white"
                    style={{ backgroundColor: inspectingBird.themeColor }}
                  >
                    Lv.{inspectingBird.level}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    {inspectingBird.koreanName}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    ({inspectingBird.englishName})
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-md border border-black/5">
                    {inspectingBird.title}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
                  {inspectingBird.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                  <span className="text-slate-600">
                    필요 기준 도장: <strong>{inspectingBird.requiredStamps}개 이상</strong>
                  </span>
                  <span className="text-slate-600">
                    필요 경험치: <strong>{inspectingBird.minXp.toLocaleString()} XP</strong>
                  </span>
                  <span className="italic text-slate-500 font-sans">
                    &ldquo;{inspectingBird.tagline}&rdquo;
                  </span>
                </div>

                {/* Level Up Simulator Quick Action */}
                <div className="pt-3 flex items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={() => simulateLevelUp(inspectingBird.level)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-xs"
                    style={{ backgroundColor: inspectingBird.themeColor }}
                  >
                    내 레벨을 Lv.{inspectingBird.level} {inspectingBird.koreanName}으로 변경
                  </button>
                  {currentUser.level === inspectingBird.level && (
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      현재 나의 레벨
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 22 Bird Grid */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">22단계 전체 새 캐릭터 목록</h3>
                <p className="text-xs text-slate-500">
                  각 카드를 클릭하여 레벨별 캐릭터 정보와 달성 조건을 확인하세요.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">총 22종 캐릭터 완비</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {BIRD_LEVELS.map((bird) => {
                const isSelected = inspectingBird.level === bird.level;
                const isMyCurrent = currentUser.level === bird.level;

                return (
                  <div
                    key={bird.level}
                    onClick={() => setSelectedBirdLevel(bird.level)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isMyCurrent && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-emerald-800 text-white text-[9px] font-bold">
                        MY
                      </span>
                    )}

                    <BirdAvatar level={bird.level} size="md" />

                    <div className="mt-2 w-full">
                      <div className="text-xs font-mono font-bold text-slate-500">
                        Lv.{bird.level}
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {bird.koreanName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Stamped Passport */}
      {activeTab === 'stamps' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">내 도장깨기 인증 기록</h3>
              <p className="text-xs text-slate-500">
                총 {currentUser.conquestStamps.length}개의 골프장 도장이 획득되었습니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentUser.conquestStamps.map((courseId) => {
              const course = GOLF_COURSES.find((c) => c.id === courseId);
              const record = stampRecords.find((s) => s.courseId === courseId);

              if (!course) return null;

              return (
                <div
                  key={courseId}
                  onClick={() => setSelectedCourseId(course.id)}
                  className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-emerald-600 bg-emerald-100 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900">{course.name}</span>
                        {course.isTop10 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                            10대 명문
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {record?.stampedAt || '2026-04-12'} 인증 · {course.region}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-emerald-800 font-bold shrink-0">
                    도장 완료
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: My Scorecards */}
      {activeTab === 'scores' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900">내 라운딩 스코어 내역</h3>
          <div className="space-y-2">
            {scorecards.map((sc) => (
              <div
                key={sc.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm">{sc.courseName}</div>
                  <div className="text-slate-500 font-mono mt-0.5">
                    {sc.date} {sc.teeTime} · 동반: {sc.companions.join(', ')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-black text-base text-emerald-800">
                    {sc.totalScore}타
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    OUT {sc.outScore} / IN {sc.inScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: PWA App Installation & Android Ready */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold">PWA 스마트폰 앱으로 바로 설치하기</h3>
            </div>
            <p className="text-xs text-emerald-200 leading-relaxed">
              GOLGRAM은 PWA(Progressive Web App)를 완벽하게 지원합니다. 사파리/크롬 브라우저에서 [홈 화면에 추가]를 누르시면 앱스토어 설치 없이 스마트폰 홈 화면에서 네이티브 앱처럼 동작합니다.
            </p>
            <div className="pt-1">
              <button
                onClick={() =>
                  alert(
                    '스마트폰 브라우저 메뉴에서 [홈 화면에 추가] 또는 [앱 설치]를 선택하시면 즉시 스마트폰 아이콘으로 생성됩니다!'
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
              >
                PWA 홈 화면 추가 안내
              </button>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 text-sm">환경 및 시스템 안내</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Firebase Authentication &amp; Cloud Firestore 데이터 연동 지원</li>
              <li>GPS 지리 위치 기반 실시간 골프장 자동 도장 인증</li>
              <li>안드로이드(Android APK/AAB) 패키징 호환 설계 완료</li>
              <li>현재 버전: GOLGRAM v1.0.0 (대한민국 100대 골프장 공식 도장깨기)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
