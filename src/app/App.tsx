import { useState } from 'react';
import { Camera, BarChart3, User } from 'lucide-react';
import { CameraScreen } from './components/CameraScreen';
import { DailyScreen } from './components/DailyScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Tab = 'camera' | 'daily' | 'profile';
type View = Tab | 'settings';

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  score: number;
}

export interface MuscleStatus {
  name: string;
  key: string;
  status: 'ready' | 'sore' | 'recovering';
  lastTrained: string;
  setsToday: number; // Track volume today
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [currentView, setCurrentView] = useState<View>('daily');
  
  // Lift exercises state up to App level so it persists across tab changes
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'Pull-ups', sets: 4, reps: 12, score: 94 },
    { name: 'Push-ups', sets: 4, reps: 20, score: 88 },
    { name: 'Dips', sets: 3, reps: 15, score: 45 },
    { name: 'Pistol Squats', sets: 3, reps: 10, score: 91 },
  ]);

  // Track muscle soreness status
  const [muscleStatus, setMuscleStatus] = useState<MuscleStatus[]>([
    { name: 'Chest', key: 'chest', status: 'ready', lastTrained: '2 days ago', setsToday: 0 },
    { name: 'Back', key: 'back', status: 'sore', lastTrained: 'Yesterday', setsToday: 0 },
    { name: 'Front Delts', key: 'front-delts', status: 'ready', lastTrained: '3 days ago', setsToday: 0 },
    { name: 'Side Delts', key: 'side-delts', status: 'ready', lastTrained: '5 days ago', setsToday: 0 },
    { name: 'Rear Delts', key: 'rear-delts', status: 'ready', lastTrained: '4 days ago', setsToday: 0 },
    { name: 'Triceps', key: 'triceps', status: 'recovering', lastTrained: 'Yesterday', setsToday: 0 },
    { name: 'Biceps', key: 'biceps', status: 'recovering', lastTrained: 'Yesterday', setsToday: 0 },
    { name: 'Core', key: 'core', status: 'ready', lastTrained: '3 days ago', setsToday: 0 },
    { name: 'Forearms', key: 'forearms', status: 'ready', lastTrained: '2 days ago', setsToday: 0 },
    { name: 'Traps', key: 'traps', status: 'ready', lastTrained: '6 days ago', setsToday: 0 },
    { name: 'Quads', key: 'quads', status: 'ready', lastTrained: '4 days ago', setsToday: 0 },
    { name: 'Hamstrings', key: 'hamstrings', status: 'ready', lastTrained: '5 days ago', setsToday: 0 },
    { name: 'Glutes', key: 'glutes', status: 'ready', lastTrained: '4 days ago', setsToday: 0 },
    { name: 'Calves', key: 'calves', status: 'ready', lastTrained: '7 days ago', setsToday: 0 },
  ]);

  const tabs = [
    { id: 'camera' as Tab, label: 'Camera', icon: Camera },
    { id: 'daily' as Tab, label: 'Daily', icon: BarChart3 },
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
      case 'camera':
        return <CameraScreen />;
      case 'daily':
        return <DailyScreen exercises={exercises} setExercises={setExercises} muscleStatus={muscleStatus} setMuscleStatus={setMuscleStatus} />;
      case 'profile':
        return <ProfileScreen onOpenSettings={handleOpenSettings} exercises={exercises} muscleStatus={muscleStatus} />;
      case 'settings':
        return <SettingsScreen onBack={handleBackFromSettings} />;
      default:
        return <DailyScreen exercises={exercises} setExercises={setExercises} muscleStatus={muscleStatus} setMuscleStatus={setMuscleStatus} />;
    }
  };

  return (
    <div className="dark h-screen w-full max-w-md mx-auto bg-background text-foreground flex flex-col overflow-hidden">
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
                      ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
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