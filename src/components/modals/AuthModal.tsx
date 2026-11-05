import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIRD_LEVELS } from '../../data/birdLevels';
import { BirdAvatar } from '../common/BirdAvatar';
import { X, CheckCircle2, User, KeyRound, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentUser, switchUser, updateProfile } = useApp();
  const [tab, setTab] = useState<'switch' | 'edit' | 'signup'>('switch');

  // Form states
  const [editNickname, setEditNickname] = useState(currentUser.nickname);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editHandicap, setEditHandicap] = useState(String(currentUser.handicap));
  const [editLocation, setEditLocation] = useState(currentUser.location);

  if (!isAuthModalOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(
      editNickname.trim() || currentUser.nickname,
      editBio.trim(),
      parseFloat(editHandicap) || 18,
      editLocation.trim() || '서울'
    );
    setIsAuthModalOpen(false);
  };

  const demoAccounts = [
    { level: 1, label: '신규 골퍼 (병아리 입문)', desc: '도장 0개, 첫 발을 뗀 골린이' },
    { level: 4, label: '퍼팅 마스터 (펭귄)', desc: '도장 3개, 냉철한 원퍼트 골퍼' },
    { level: 8, label: '중급 골퍼 (까치 버디헌터)', desc: '도장 12개, 10대 명문 3개 정복' },
    { level: 14, label: '고수 골퍼 (백조 싱글플레이어)', desc: '도장 36개, 정교한 그린 공략' },
    { level: 21, label: '제왕 골퍼 (독수리)', desc: '도장 90개, 전국 명문 코스 정복자' },
    { level: 22, label: '전설의 신 (알바트로스)', desc: '100대 골프장 완파 신화' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">회원 계정 관리 &amp; 레벨 전환</h2>
            <p className="text-xs text-slate-300">22단계 새 캐릭터 레벨과 회원 상태를 테스트하세요</p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1">
          <button
            onClick={() => setTab('switch')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
              tab === 'switch' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            22레벨 계정 전환
          </button>
          <button
            onClick={() => setTab('edit')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
              tab === 'edit' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            프로필 수정
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
              tab === 'signup' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            신규 회원가입
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {tab === 'switch' && (
            <div>
              <p className="text-xs text-slate-500 mb-3">
                아래 프리셋 계정을 클릭하면 해당 레벨의 새 캐릭터, 스코어카드, 도장 개수 데이터로 즉시 전환됩니다.
              </p>

              <div className="space-y-2">
                {demoAccounts.map((acc) => {
                  const bird = BIRD_LEVELS.find((b) => b.level === acc.level)!;
                  const isCurrent = currentUser.level === acc.level;
                  return (
                    <div
                      key={acc.level}
                      onClick={() => {
                        switchUser(acc.level);
                        setIsAuthModalOpen(false);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BirdAvatar level={acc.level} size="md" showBadge={true} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900">{acc.label}</span>
                            <span
                              className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md"
                              style={{ backgroundColor: bird.bgColor, color: bird.themeColor }}
                            >
                              Lv.{bird.level} {bird.koreanName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{acc.desc}</p>
                        </div>
                      </div>

                      {isCurrent && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">22단계 전체 목록은 마이페이지 도감에서 확인 가능합니다.</span>
              </div>
            </div>
          )}

          {tab === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">골프 닉네임</label>
                <input
                  type="text"
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="닉네임 입력"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">핸디캡 (타수)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editHandicap}
                    onChange={(e) => setEditHandicap(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                    placeholder="18"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">활동 지역</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="서울 강남구"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">한 줄 소개</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="자신의 골프 스타일이나 목표를 입력하세요."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-colors shadow-xs"
              >
                프로필 저장
              </button>
            </form>
          )}

          {tab === 'signup' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  신규 회원가입 시 <strong>Lv.1 병아리</strong> 등급으로 시작하며, 첫 100대 골프장 도장 획득 및 라운드 기록 시 <strong>Lv.2 참새</strong>로 승급합니다!
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">이메일 계정</label>
                <div className="relative">
                  <input
                    type="email"
                    defaultValue="newgolfer@golgram.kr"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호</label>
                <div className="relative">
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  switchUser(1);
                  setIsAuthModalOpen(false);
                  alert('Lv.1 병아리 신규 계정으로 가입되었습니다! 즐거운 도장깨기를 시작하세요.');
                }}
                className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-colors shadow-xs"
              >
                Lv.1 병아리로 회원가입 완료
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
