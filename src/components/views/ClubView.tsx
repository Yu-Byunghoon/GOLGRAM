import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GolfClub, ClubRole } from '../../types';
import { UserBadge } from '../common/UserBadge';
import { BirdAvatar } from '../common/BirdAvatar';
import { getBirdLevel } from '../../data/birdLevels';
import {
  Shield,
  Plus,
  Lock,
  Globe,
  Users,
  Calendar,
  Bell,
  Crown,
  UserCheck,
  UserX,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';

export const ClubView: React.FC = () => {
  const { clubs, createClub, joinClub, leaveClub, updateMemberRole, currentUser } = useApp();

  const [selectedClubId, setSelectedClubId] = useState<string>(clubs[0]?.id || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Club Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('수도권');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState(30);
  const [regularDay, setRegularDay] = useState('매월 둘째주 일요일');
  const [notice, setNotice] = useState('매너와 배려를 최우선으로 하는 모임입니다.');
  const [tagInput, setTagInput] = useState('100대도장, 주말골프, 매너');

  const selectedClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];
  const isMember = selectedClub?.members.some((m) => m.userId === currentUser.id);
  const myRoleInClub = selectedClub?.members.find((m) => m.userId === currentUser.id)?.role;
  const isLeader = myRoleInClub === '회장' || myRoleInClub === '부회장' || myRoleInClub === '운영진';

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createClub({
      name: name.trim(),
      description: description.trim(),
      region,
      isPrivate,
      maxMembers,
      regularDay,
      notice,
      tags: tagInput.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setIsCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  const roleColors: Record<ClubRole, string> = {
    회장: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    부회장: 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold',
    총무: 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
    운영진: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
    일반회원: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  // Sort members by level descending for the club ranking
  const sortedMembers = [...(selectedClub?.members || [])].sort((a, b) => b.level - a.level);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-teal-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              골프 동호회 (클럽)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            정기 라운딩, 동호회 내 회원 레벨 랭킹, 회장/총무/운영진 권한 관리
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          신규 동호회 개설
        </button>
      </div>

      {/* 2-Column Split: Club Selector List vs Active Club Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Club List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
            등록된 동호회 ({clubs.length})
          </span>

          {clubs.map((c) => {
            const isSelected = c.id === selectedClub?.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedClubId(c.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {c.isPrivate ? (
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-teal-600" />
                    )}
                    <span className="text-xs font-semibold text-slate-500">{c.region}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {c.memberCount}/{c.maxMembers}명
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-1 mt-1">{c.description}</p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>정라: {c.regularDay}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Club Details */}
        {selectedClub && (
          <div className="lg:col-span-2 space-y-6">
            {/* Club Main Hero Banner */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                      {selectedClub.region}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {selectedClub.isPrivate ? '비공개 승인제' : '공개 가입'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedClub.name}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">{selectedClub.description}</p>
                </div>

                {/* Membership Action */}
                <div>
                  {isMember ? (
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-xl border ${roleColors[myRoleInClub || '일반회원']}`}>
                        내 권한: {myRoleInClub}
                      </span>
                      <button
                        onClick={() => leaveClub(selectedClub.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1"
                        title="동호회 탈퇴"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        탈퇴
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => joinClub(selectedClub.id)}
                      className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      동호회 가입 신청
                    </button>
                  )}
                </div>
              </div>

              {/* Notice & Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-teal-900 text-xs font-bold">
                    <Bell className="w-4 h-4 text-teal-700" />
                    <span>공지사항</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedClub.notice}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>정기 라운딩 일정</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {selectedClub.regularDay}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    수도권 및 강원권 100대 명문 골프장 순회 정라
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedClub.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Club Member Level Ranking */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">동호회 회원 레벨 랭킹</h3>
                </div>
                <span className="text-xs text-slate-500">
                  총 {selectedClub.members.length}명의 회원
                </span>
              </div>

              <div className="space-y-2">
                {sortedMembers.map((member, idx) => {
                  const bird = getBirdLevel(member.level);
                  return (
                    <div
                      key={member.userId}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-mono font-black text-xs text-slate-400">
                          {idx + 1}
                        </span>
                        <UserBadge
                          nickname={member.nickname}
                          level={member.level}
                          size="sm"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Role tag */}
                        <span className={`text-[11px] px-2 py-0.5 rounded-md border ${roleColors[member.role]}`}>
                          {member.role}
                        </span>

                        {/* Leader can reassign roles */}
                        {isLeader && member.userId !== currentUser.id && (
                          <select
                            value={member.role}
                            onChange={(e) =>
                              updateMemberRole(selectedClub.id, member.userId, e.target.value as ClubRole)
                            }
                            className="text-[10px] bg-white border border-slate-200 rounded-lg px-1.5 py-1 text-slate-700 focus:outline-none"
                          >
                            <option value="일반회원">일반회원</option>
                            <option value="운영진">운영진</option>
                            <option value="총무">총무</option>
                            <option value="부회장">부회장</option>
                            <option value="회장">회장</option>
                          </select>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Club Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCreateModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold text-slate-900">골프 동호회 개설</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">동호회 이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 싱글로 가는 길 100대 도장단"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">동호회 소개</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="동호회 설립 목적과 활동 방향"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">활동 지역</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    {['전국', '수도권', '강원', '충청', '전라', '경상', '제주'].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">공개 여부</label>
                  <select
                    value={isPrivate ? 'private' : 'public'}
                    onChange={(e) => setIsPrivate(e.target.value === 'private')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  >
                    <option value="public">공개 동호회 (즉시 가입)</option>
                    <option value="private">비공개 동호회 (승인제)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">정기 라운딩 일정</label>
                  <input
                    type="text"
                    value={regularDay}
                    onChange={(e) => setRegularDay(e.target.value)}
                    placeholder="매월 둘째 일요일"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">최대 회원 수</label>
                  <input
                    type="number"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="100대골프장, 수도권, 친목"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-colors"
              >
                동호회 개설하기 (회장 권한 자동부여 · +400 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
