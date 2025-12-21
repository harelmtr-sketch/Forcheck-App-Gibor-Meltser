import { useState } from 'react';
import { Activity, Calendar, Apple, User, Flame } from 'lucide-react';
import { AnalyzeScreen } from './components/AnalyzeScreen';
import { PlanScreen } from './components/PlanScreen';
import { DietScreen } from './components/DietScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Tab = 'train' | 'plan' | 'diet' | 'profile';
type View = Tab | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('train');
  const [currentView, setCurrentView] = useState<View>('train');
  const [currentStreak, setCurrentStreak] = useState(7); // Streak counter

  const tabs = [
    { id: 'train' as Tab, label: 'Train', icon: Activity },
    { id: 'plan' as Tab, label: 'Plan', icon: Calendar },
    { id: 'diet' as Tab, label: 'Diet', icon: Apple },
    { id: 'profile' as Tab, label: 'Profile', icon: User },
  ];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const handleOpenSettings = () => {
    setCurrentView('settings');
  };

  const handleBackFromSettings = () => {
    setCurrentView(activeTab);
  };

  const renderScreen = () => {
    switch (currentView) {
      case 'train':
        return <AnalyzeScreen />;
      case 'plan':
        return <PlanScreen />;
      case 'diet':
        return <DietScreen />;
      case 'profile':
        return <ProfileScreen onOpenSettings={handleOpenSettings} />;
      case 'settings':
        return <SettingsScreen onBack={handleBackFromSettings} />;
      default:
        return <AnalyzeScreen />;
    }
  };

  return (
    <div className="dark h-screen w-full max-w-md mx-auto bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Brand Bar with Streak Counter */}
      {currentView !== 'settings' && (
        <div className="px-6 pt-6 pb-3 border-b border-border bg-gradient-to-r from-whitwhite/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-whitwhite/10 rounded-full blur-3xl" />
          <div className="relative flex items-center justify-between">
            <h1 className="text-2xl tracking-tight bg-gradient-to-r from-whitehite via-grawhit/910 to-gwhit/8ay20 bg-clip-text text-transparent font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Forcheck
            </h1>
            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-whitehite/20 to-grwhity/11 rounded-full border border-whitwhite/30 shadow-[0_0_20px_rg shadow-white/20ba(255,255,255,0.3)]">
              <Flame className="w-5 h-5 text-whitwhite drop-shad drop-shadow-[[0_0__10_8px_rgba(255,255,255,0.8)]px_rgba(255,255,255,0.8)]" />
              <div className="flex flex-col items-center leading-none">
                <span className="text-lg font-bold text-whitwhite drop-shad drop-shadow-[[0__0_8px_rgba(255,255,255,0.6)]_8px_rgba(255,255,255,0.6)]">{currentStreak}</span>
                <span className="text-[10px] text-grawhit20">day streak</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {currentView !== 'settings' && (
        <div className="border-t border-border bg-background">
          <nav className="flex items-center justify-around px-4 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-whitwhite drop-shad drop-shadow-[[0__0_10px_rgba(255,255,255,0.6)]_10px_rgba(255,255,255,0.6)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-xs font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}