import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppMenu } from '../../types';
import { getBirdLevel } from '../../data/birdLevels';
import { BirdAvatar } from './BirdAvatar';
import {
  Home,
  Trophy,
  Award,
  Compass,
  Sparkles,
  Users,
  Shield,
  Image as ImageIcon,
  ClipboardList,
  BarChart3,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  onMenuSelect?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect }) => {
  const { currentUser, currentMenu, setCurrentMenu } = useApp();
  const bird = getBirdLevel(currentUser.level);

  const menuItems: { id: AppMenu; label: string; countBadge?: number; icon: React.ReactNode; color: string }[] = [
    { id: 'home', label: '홈', icon: <Home className="w-4 h-4" />, color: 'text-emerald-700' },
    { id: 'top100', label: '100대 골프장 도장 깨기', countBadge: currentUser.conquestStamps.length, icon: <Trophy className="w-4 h-4" />, color: 'text-emerald-600' },
    { id: 'top10', label: '10대 명문 골프장 도장 깨기', countBadge: currentUser.top10Stamps.length, icon: <Award className="w-4 h-4" />, color: 'text-amber-500' },
    { id: 'explore', label: '전국 골프장 탐색', icon: <Compass className="w-4 h-4" />, color: 'text-blue-500' },
    { id: 'ai-caddie', label: 'AI 골프 비서', icon: <Sparkles className="w-4 h-4" />, color: 'text-purple-600' },
    { id: 'companion', label: '동반자 커뮤니티', icon: <Users className="w-4 h-4" />, color: 'text-indigo-600' },
    { id: 'club', label: '골프 동호회', icon: <Shield className="w-4 h-4" />, color: 'text-teal-600' },
    { id: 'album', label: '추억 앨범', icon: <ImageIcon className="w-4 h-4" />, color: 'text-rose-500' },
    { id: 'scorecard', label: '라운딩 및 스코어 기록', countBadge: currentUser.roundsCount, icon: <ClipboardList className="w-4 h-4" />, color: 'text-emerald-700' },
    { id: 'ranking', label: '전국 골프 랭킹', icon: <BarChart3 className="w-4 h-4" />, color: 'text-amber-600' },
    { id: 'mypage', label: '마이페이지', icon: <UserCheck className="w-4 h-4" />, color: 'text-slate-700' },
  ];

  const handleSelect = (id: AppMenu) => {
    setCurrentMenu(id);
    if (onMenuSelect) onMenuSelect();
  };

  const nextBirdLevel = getBirdLevel(Math.min(22, currentUser.level + 1));
  const progressPercent = Math.min(
    100,
    Math.round(((currentUser.xp - bird.minXp) / Math.max(1, nextBirdLevel.minXp - bird.minXp)) * 100)
  );

  return (
    <aside className="w-full flex flex-col gap-6">
      {/* User Quick Status Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <BirdAvatar level={currentUser.level} size="lg" showBadge={true} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-slate-900 truncate text-base">
                {currentUser.nickname}
              </span>
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.2 rounded-md"
                style={{ backgroundColor: bird.bgColor, color: bird.themeColor }}
              >
                Lv.{currentUser.level} {bird.koreanName}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{bird.title}</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-500 font-medium">다음 레벨 ({nextBirdLevel.koreanName})까지</span>
            <span className="font-mono font-semibold text-emerald-800">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(5, progressPercent)}%`,
                backgroundColor: bird.themeColor,
              }}
            />
          </div>
        </div>

        {/* Stamp Conquest Mini Counters */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-center">
          <div
            onClick={() => handleSelect('top100')}
            className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 cursor-pointer hover:bg-emerald-100/70 transition-colors"
          >
            <div className="text-[11px] text-emerald-700 font-medium">100대 도장</div>
            <div className="text-lg font-black font-mono text-emerald-900">
              {currentUser.conquestStamps.length}
              <span className="text-xs font-normal text-emerald-700/80">/100</span>
            </div>
          </div>
          <div
            onClick={() => handleSelect('top10')}
            className="p-2 rounded-xl bg-amber-50/70 border border-amber-100 cursor-pointer hover:bg-amber-100/70 transition-colors"
          >
            <div className="text-[11px] text-amber-700 font-medium">10대 명문</div>
            <div className="text-lg font-black font-mono text-amber-900">
              {currentUser.top10Stamps.length}
              <span className="text-xs font-normal text-amber-700/80">/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 11 Main Navigation Menus */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs">
        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          GOLGRAM 메뉴
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, idx) => {
            const isActive = currentMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`${isActive ? 'text-white' : item.color}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">
                    <span className="font-mono text-xs opacity-60 mr-1.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    {item.label}
                  </span>
                </div>

                {item.countBadge !== undefined && (
                  <span
                    className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.countBadge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
