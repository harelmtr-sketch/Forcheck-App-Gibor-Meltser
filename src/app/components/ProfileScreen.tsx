import { User, TrendingUp, Award, Settings, LogOut, ChevronRight, Target, Shield, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ProfileScreenProps {
  onOpenSettings: () => void;
}

export function ProfileScreen({ onOpenSettings }: ProfileScreenProps) {
  const achievements = [
    { name: '7 Day Streak', icon: '🔥', unlocked: true },
    { name: 'First Analysis', icon: '🎯', unlocked: true },
    { name: 'Perfect Form', icon: '⭐', unlocked: true },
    { name: '30 Workouts', icon: '💪', unlocked: false },
    { name: 'Consistency King', icon: '👑', unlocked: false },
    { name: 'Form Master', icon: '🏆', unlocked: false },
  ];

  // Mock form trend data (last 14 days)
  const formTrend = {
    direction: 'up' as 'up' | 'down' | 'stable',
    change: '+5',
    current: 87,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="mb-2 font-bold">Profile</h1>
        <p className="text-muted-foreground font-medium">
          Track your progress and achievements
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* User Info Card */}
        <Card className="p-6 bg-gradient-to-br from-white/15 to-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <User className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1">Alex Johnson</h2>
              <p className="text-sm text-muted-foreground font-medium">Member since Jan 2024</p>
            </div>
          </div>
        </Card>

        {/* Goal & Level - MUST ADD */}
        <Card className="p-5 bg-gradient-to-br from-white/10 to-white/5 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <span className="text-sm text-white/80 font-medium">Goal</span>
              </div>
              <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-sm font-bold text-white">
                Strength
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <span className="text-sm text-white/80 font-medium">Level</span>
              </div>
              <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-sm font-bold text-white">
                Intermediate
              </span>
            </div>
          </div>
        </Card>

        {/* AI Trust / Calibration - MUST ADD */}
        <Card className="p-4 bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-400/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-400">AI calibrated with 12 videos</p>
              <p className="text-xs text-green-300/80">Form confidence: High</p>
            </div>
          </div>
        </Card>

        {/* Form Quality Trend - KILLER FEATURE */}
        <Card className="p-5 bg-gradient-to-br from-white/15 to-white/10 border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Form Score Trend</h3>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{formTrend.current}</span>
              </div>
              <p className="text-xs text-green-400 font-semibold">{formTrend.change} pts</p>
            </div>
          </div>
          
          {/* Simple mini graph visualization */}
          <div className="flex items-end gap-1 h-16">
            {[72, 75, 73, 78, 80, 79, 82, 85, 83, 86, 84, 88, 86, 87].map((score, index) => {
              const height = (score / 100) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-white/60 to-white/80 rounded-t shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </Card>

        {/* Stats Grid */}
        <div>
          <h3 className="mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Total Workouts</p>
              </div>
              <p className="text-2xl">28</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <p className="text-sm text-muted-foreground font-medium">Avg Form Score</p>
              </div>
              <p className="text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">87</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
              <p className="text-2xl">7 days</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2">Best Streak</p>
              <p className="text-2xl">14 days</p>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center p-3 transition-all ${
                  achievement.unlocked
                    ? 'bg-white/15 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-secondary/50 border border-border opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs text-center leading-tight font-semibold">
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Records */}
        <div>
          <h3 className="mb-4">Personal Records</h3>
          <Card className="divide-y divide-border bg-card border-border">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Pull-ups</span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">15 reps</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Push-ups</span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">50 reps</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Plank</span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">2:30 min</span>
            </div>
          </Card>
        </div>

        {/* Settings Options */}
        <div className="space-y-2">
          <Button
            onClick={onOpenSettings}
            variant="outline"
            className="w-full justify-between h-12 border-white/40 hover:bg-white/10 hover:border-white/60"
          >
            <div className="flex items-center">
              <Settings className="w-4 h-4 mr-3 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="font-semibold">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-12 text-destructive-foreground hover:text-destructive-foreground hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
