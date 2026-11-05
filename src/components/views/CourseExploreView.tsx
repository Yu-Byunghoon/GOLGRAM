import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Phone,
  Globe,
  SlidersHorizontal,
  Trophy,
  Award,
  Sparkles,
  Map,
  List
} from 'lucide-react';

export const CourseExploreView: React.FC = () => {
  const { setSelectedCourseId, setCurrentMenu } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');
  const [maxGreenFee, setMaxGreenFee] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const regions = ['전체', '수도권', '강원', '충청', '전라', '경상', '제주'];
  const types = ['전체', '대중제', '회원제', '혼합제'];

  const filteredCourses = GOLF_COURSES.filter((course) => {
    if (selectedRegion !== '전체' && course.region !== selectedRegion) return false;
    if (selectedType !== '전체' && course.membershipType !== selectedType) return false;
    if (course.greenFeeWeekday > maxGreenFee) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(q) ||
        course.address.toLowerCase().includes(q) ||
        course.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              전국 골프장 탐색
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              위치, 난이도, 그린피, 시그니처 코스별 실시간 정보 검색
            </p>
          </div>

          {/* Grid vs Map Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              목록보기
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              지도보기
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="골프장 이름, 시/군/구, 특정 키워드(예: 잭니클라우스, 아일랜드홀) 검색"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Filter Rows */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 shrink-0 w-12">지역:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedRegion === reg
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 shrink-0 w-12">유형:</span>
              <div className="flex items-center gap-1.5">
                {types.map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setSelectedType(tp)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedType === tp
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>최대 주중 그린피:</span>
              <span className="font-mono font-bold text-emerald-800">{maxGreenFee}만원 이하</span>
              <input
                type="range"
                min="18"
                max="50"
                step="2"
                value={maxGreenFee}
                onChange={(e) => setMaxGreenFee(Number(e.target.value))}
                className="w-24 accent-emerald-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map Mode Visualization */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">대한민국 골프장 전국 지도 레이아웃</h3>
            </div>
            <span className="text-xs text-slate-500">검색 결과: {filteredCourses.length}개 코스</span>
          </div>

          {/* Interactive Geographic Canvas Simulator */}
          <div className="relative w-full h-96 bg-emerald-950/90 rounded-2xl overflow-hidden border border-emerald-800 p-4 text-white flex flex-col justify-between">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs border border-white/10">
                🧭 서울 시청 기준 반경 거리 표시
              </div>
              <div className="flex gap-2">
                <span className="text-[11px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-bold">● 10대 명문</span>
                <span className="text-[11px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-md font-bold">● 100대 코스</span>
              </div>
            </div>

            {/* Pins Representation */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto no-scrollbar p-1">
              {filteredCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`p-2.5 rounded-xl text-xs backdrop-blur-md border cursor-pointer hover:scale-102 transition-transform flex items-center justify-between ${
                    c.isTop10 ? 'bg-amber-950/60 border-amber-400 text-amber-200' : 'bg-slate-900/60 border-emerald-500 text-emerald-100'
                  }`}
                >
                  <div className="truncate mr-1">
                    <div className="font-bold truncate">{c.name}</div>
                    <div className="text-[10px] opacity-75">{c.region} · {c.holes}홀</div>
                  </div>
                  <MapPin className={`w-4 h-4 shrink-0 ${c.isTop10 ? 'text-amber-400' : 'text-emerald-400'}`} />
                </div>
              ))}
            </div>

            <div className="relative z-10 text-center text-xs text-emerald-200/70">
              핀을 클릭하면 코스 세부 정보 및 GPS 도장 찍기 창이 열립니다.
            </div>
          </div>
        </div>
      )}

      {/* Grid Mode: Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourseId(course.id)}
            className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">
                  {course.region} · {course.membershipType}
                </span>

                {course.isTop10 ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    10대 명문
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    100대 코스
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{course.englishName}</p>

              <div className="mt-3 text-xs text-slate-600 line-clamp-2">
                {course.description}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-700">
                <span>{course.holes}홀 (Par {course.par})</span>
                <span className="font-bold text-emerald-800">주중 {course.greenFeeWeekday}만 / 주말 {course.greenFeeWeekend}만</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate max-w-[170px]">
                {course.address.split(' ')[0]} {course.address.split(' ')[1]}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourseId(course.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-emerald-800 transition-colors shadow-2xs"
              >
                상세 정보
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
