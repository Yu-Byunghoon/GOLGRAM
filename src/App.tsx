import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';

// 11 Main Views
import { HomeView } from './components/views/HomeView';
import { Top100ConquestView } from './components/views/Top100ConquestView';
import { Top10PrestigiousView } from './components/views/Top10PrestigiousView';
import { CourseExploreView } from './components/views/CourseExploreView';
import { AIAssistantView } from './components/views/AIAssistantView';
import { CompanionView } from './components/views/CompanionView';
import { ClubView } from './components/views/ClubView';
import { AlbumView } from './components/views/AlbumView';
import { ScorecardView } from './components/views/ScorecardView';
import { RankingView } from './components/views/RankingView';
import { MyPageView } from './components/views/MyPageView';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { StampCelebrateModal } from './components/modals/StampCelebrateModal';

const AppContent: React.FC = () => {
  const { currentMenu } = useApp();

  const renderActiveView = () => {
    switch (currentMenu) {
      case 'home':
        return <HomeView />;
      case 'top100':
        return <Top100ConquestView />;
      case 'top10':
        return <Top10PrestigiousView />;
      case 'explore':
        return <CourseExploreView />;
      case 'ai-caddie':
        return <AIAssistantView />;
      case 'companion':
        return <CompanionView />;
      case 'club':
        return <ClubView />;
      case 'album':
        return <AlbumView />;
      case 'scorecard':
        return <ScorecardView />;
      case 'ranking':
        return <RankingView />;
      case 'mypage':
        return <MyPageView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-20 lg:pb-12">
      {/* 3-Zone Top Bar Contract */}
      <Header />

      {/* Main Responsive Grid: Desktop Sidebar + Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar (Hidden on mobile, accessible via bottom drawer) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>

          {/* Main View Container */}
          <div className="lg:col-span-3 min-w-0">
            {renderActiveView()}
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <AuthModal />
      <CourseDetailModal />
      <StampCelebrateModal />

      {/* Mobile Bottom Navigation (Visible only on < lg) */}
      <MobileNav />

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-800">GOLGRAM</span>
            <span>·</span>
            <span>대한민국 100대 및 10대 명문 골프장 도장깨기 &amp; 커뮤니티</span>
          </div>
          <div className="text-slate-400">
            PWA &amp; Mobile Responsive · 22단계 레벨 시스템 · All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
