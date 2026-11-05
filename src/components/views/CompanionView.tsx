import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from '../common/UserBadge';
import { GOLF_COURSES } from '../../data/golfCourses';
import {
  Users,
  Plus,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Filter,
  DollarSign,
  X
} from 'lucide-react';

export const CompanionView: React.FC = () => {
  const { companionPosts, createCompanionPost, applyCompanionPost, currentUser } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState<'전체' | '모집중' | '마감'>('전체');

  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newCourseName, setNewCourseName] = useState('안양컨트리클럽');
  const [newRegion, setNewRegion] = useState('수도권');
  const [newDate, setNewDate] = useState('2026-11-20');
  const [newTeeTime, setNewTeeTime] = useState('08:00');
  const [newTargetHandicap, setNewTargetHandicap] = useState('80~90타 매너골퍼');
  const [newMaxMembers, setNewMaxMembers] = useState(4);
  const [newCost, setNewCost] = useState('그린피 25만 + 카트/캐디 N분의1');
  const [newNotes, setNewNotes] = useState('매너 플레이와 즐거운 라운드 함께하실 분 환영합니다.');
  const [newGender, setNewGender] = useState<'무관' | '남성' | '여성' | '부부/커플'>('무관');

  const filteredPosts = companionPosts.filter((post) => {
    if (selectedRegion !== '전체' && post.region !== selectedRegion) return false;
    if (selectedStatus !== '전체' && post.status !== selectedStatus) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCompanionPost({
      title: newTitle.trim() || `[조인] ${newCourseName} ${newDate} 라운드`,
      courseName: newCourseName,
      region: newRegion,
      date: newDate,
      teeTime: newTeeTime,
      targetHandicap: newTargetHandicap,
      maxMembers: newMaxMembers,
      costEstimate: newCost,
      notes: newNotes,
      genderPreference: newGender,
    });
    setIsCreateModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              동반자 커뮤니티 &amp; 조인
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            원하는 골프장, 날짜, 핸디캡에 꼭 맞는 동반자를 찾고 함께 도장깨기를 떠나보세요!
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          동반자 모집글 등록
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {['전체', '수도권', '강원', '충청', '전라', '경상', '제주'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedRegion === reg
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {(['전체', '모집중', '마감'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    post.status === '모집중'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {post.status} ({post.currentMembers}/{post.maxMembers}명)
                </span>
                <span className="text-xs font-semibold text-slate-600">{post.region}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-indigo-700 font-semibold">{post.courseName}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">성별: {post.genderPreference}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{post.title}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.teeTime}</span>
                </div>
                <div className="text-slate-500 font-medium">희망 실력: {post.targetHandicap}</div>
                <div className="text-slate-500">비용: {post.costEstimate}</div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">{post.notes}</p>
            </div>

            {/* Creator & Apply Button */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <UserBadge
                nickname={post.creatorNickname}
                level={post.creatorLevel}
                size="sm"
              />

              <button
                onClick={() => applyCompanionPost(post.id)}
                disabled={post.status === '마감'}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                  post.status === '모집중'
                    ? 'bg-indigo-700 hover:bg-indigo-800 text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {post.status === '모집중' ? '조인 참가 신청' : '모집 완료'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCreateModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold text-slate-900">동반자 모집글 작성</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">제목</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: [도장깨기] 11/25 라비에벨CC 08시대 매너 1분 모십니다"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">골프장</label>
                  <select
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    {GOLF_COURSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">지역</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    {['수도권', '강원', '충청', '전라', '경상', '제주'].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">라운드 날짜</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">티오프 시간</label>
                  <input
                    type="time"
                    value={newTeeTime}
                    onChange={(e) => setNewTeeTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">희망 실력 / 핸디캡</label>
                  <input
                    type="text"
                    value={newTargetHandicap}
                    onChange={(e) => setNewTargetHandicap(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                    placeholder="80~90타"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">성별 조건</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    <option value="무관">무관</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                    <option value="부부/커플">부부/커플</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상세 안내 / 매너 수칙</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  placeholder="티오프 40분 전 집결, N분의 1 정산 등 안내사항"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-xs transition-colors"
              >
                모집글 등록 완료 (+200 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
