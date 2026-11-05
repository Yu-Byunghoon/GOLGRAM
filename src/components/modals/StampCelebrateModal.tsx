import React from 'react';
import { useApp } from '../../context/AppContext';
import { BirdAvatar } from '../common/BirdAvatar';
import { getBirdLevel } from '../../data/birdLevels';
import { Trophy, Check, Share2 } from 'lucide-react';

export const StampCelebrateModal: React.FC = () => {
  const { isStampSuccessModalOpen, setIsStampSuccessModalOpen, lastStampedCourseName, currentUser } = useApp();

  if (!isStampSuccessModalOpen) return null;

  const bird = getBirdLevel(currentUser.level);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '골프장 도장깨기 성공!',
        text: `[GOLGRAM] ${lastStampedCourseName} 도장을 획득했습니다! (현재 Lv.${currentUser.level} ${bird.koreanName})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`[도장깨기 인증 공유]\n${lastStampedCourseName} 정복 완료!\n내 등급: Lv.${currentUser.level} ${bird.koreanName}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsStampSuccessModalOpen(false)}
      />

      {/* Modal Dialog with celebratory animation */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center border-2 border-amber-400 overflow-hidden transform animate-in fade-in zoom-in duration-300">
        {/* Decorative Golden Rays */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Stamp Seal */}
        <div className="relative mx-auto my-3 w-28 h-28 flex items-center justify-center">
          {/* Golden Circle Stamp Seal */}
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-amber-600 bg-amber-50/80 flex flex-col items-center justify-center p-2 shadow-inner transform -rotate-6">
            <Trophy className="w-8 h-8 text-amber-600 mb-0.5" />
            <span className="text-[10px] font-black tracking-widest text-amber-800 uppercase">
              CONQUERED
            </span>
            <span className="text-[8px] font-bold text-amber-700">도장깨기 완료</span>
          </div>

          {/* User bird avatar overlay */}
          <div className="absolute -bottom-1 -right-1 ring-2 ring-white rounded-full">
            <BirdAvatar level={currentUser.level} size="sm" showBadge={true} />
          </div>
        </div>

        {/* Text */}
        <div className="mt-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            CONQUEST CERTIFIED
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            {lastStampedCourseName}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            골프장 도장을 성공적으로 찍었습니다!
          </p>
        </div>

        {/* Rewards Box */}
        <div className="mt-4 p-3 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-around text-center">
          <div>
            <div className="text-[10px] text-amber-800 font-medium">활동 경험치</div>
            <div className="text-base font-black font-mono text-amber-900">+500 XP</div>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div>
            <div className="text-[10px] text-amber-800 font-medium">총 도장 수</div>
            <div className="text-base font-black font-mono text-emerald-800">
              {currentUser.conquestStamps.length}개
            </div>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div>
            <div className="text-[10px] text-amber-800 font-medium">현재 등급</div>
            <div className="text-sm font-bold text-slate-800">
              Lv.{bird.level} {bird.koreanName}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            인증 공유
          </button>
          <button
            onClick={() => setIsStampSuccessModalOpen(false)}
            className="flex-1 py-3 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
