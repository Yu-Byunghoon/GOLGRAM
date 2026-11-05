import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppMenu } from '../../types';
import { Home, Trophy, Award, Sparkles, Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const MobileNav: React.FC = () => {
  const { currentMenu, setCurrentMenu } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const primaryTabs: { id: AppMenu; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '홈', icon: <Home className="w-5 h-5" /> },
    { id: 'top100', label: '100대 도장', icon: <Trophy className="w-5 h-5" /> },
    { id: 'top10', label: '10대 명문', icon: <Award className="w-5 h-5" /> },
    { id: 'ai-caddie', label: 'AI 비서', icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Bottom Sheet Drawer for All 11 Menus */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-slate-50 rounded-t-3xl border-t border-slate-200 overflow-y-auto p-4 shadow-2xl flex flex-col">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="font-bold text-slate-900 text-lg">전체 메뉴</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pb-8">
              <Sidebar onMenuSelect={() => setIsDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
          {primaryTabs.map((tab) => {
            const isActive = currentMenu === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentMenu(tab.id);
                  setIsDrawerOpen(false);
                }}
                className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors focus:outline-none ${
                  isActive ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`transition-transform ${isActive ? 'scale-110 text-emerald-700' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-1 truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* All Menus Drawer Trigger */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors focus:outline-none ${
              isDrawerOpen ? 'text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1 truncate">
              전체메뉴
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
