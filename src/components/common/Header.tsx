import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserBadge } from './UserBadge';
import { AppMenu } from '../../types';
import { Trophy, Compass, Sparkles, Users, Award } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, currentMenu, setCurrentMenu, setIsAuthModalOpen } = useApp();

  const primaryNavItems: { id: AppMenu; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '홈', icon: null },
    { id: 'top100', label: '100대 도장', icon: <Trophy className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'top10', label: '10대 명문', icon: <Award className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'explore', label: '골프장 탐색', icon: <Compass className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'ai-caddie', label: 'AI 비서', icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'companion', label: '동반자', icon: <Users className="w-3.5 h-3.5 text-indigo-500" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <button
          onClick={() => setCurrentMenu('home')}
          className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-900 transition-colors">
            {/* Minimalist golf flag & green insignia */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
              <path d="M19.38 6.81L14 3.75V2a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0v-6.25l5.38-3.06a1 1 0 0 0 0-1.75z" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            GOL<span className="text-emerald-700">GRAM</span>
          </span>
        </button>

        {/* Zone 2: 4–6 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryNavItems.map((item) => {
            const isActive = currentMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentMenu(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action - User Profile and Level Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setCurrentMenu('mypage')}
            className="p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 transition-all flex items-center focus:outline-none"
            title="마이페이지 & 레벨 도감"
          >
            <UserBadge
              nickname={currentUser.nickname}
              level={currentUser.level}
              size="sm"
              showBirdName={true}
            />
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            계정전환
          </button>
        </div>
      </div>
    </header>
  );
};
