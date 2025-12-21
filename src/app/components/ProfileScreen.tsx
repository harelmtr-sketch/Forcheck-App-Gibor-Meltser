import {
  User,
  TrendingUp,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Target,
  Brain,
  TrendingDown,
  Shield,
  BarChart3,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface ProfileScreenProps {
  onOpenSettings: () => void;
}

export function ProfileScreen({
  onOpenSettings,
}: ProfileScreenProps) {
  const achievements = [
    { name: "7 Day Streak", icon: "🔥", unlocked: true },
    { name: "First Analysis", icon: "🎯", unlocked: true },
    { name: "Perfect Form", icon: "⭐", unlocked: true },
    { name: "30 Workouts", icon: "💪", unlocked: false },
    { name: "Consistency King", icon: "👑", unlocked: false },
    { name: "Form Master", icon: "🏆", unlocked: false },
  ];

  // Form quality trend data (last 14 days)
  const formTrend = {
    direction: "up" as "up" | "down" | "stable",
    change: "+5",
    scores: [
      78, 80, 82, 79, 83, 85, 84, 87, 86, 88, 87, 89, 90, 87,
    ],
  };

  // User goal and level
  const userGoal = "Strength";
  const userLevel = "Intermediate";

  // AI calibration
  const videosAnalyzed = 12;
  const aiConfidence = "High";

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
        <Card className="p-6 bg-gradient-to-br from-white/15 to-gray-100/10 border-white/40 shadow-xl shadow-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center border-2 border-white/50 shadow-lg shadow-white/20">
              <User className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1">Alex Johnson</h2>
              <p className="text-sm text-muted-foreground font-medium">
                Member since Jan 2024
              </p>
            </div>
          </div>

          {/* Goal & Level Section */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-white/70" />
              <div>
                <p className="text-xs text-gray-400">Goal</p>
                <p className="text-sm font-bold text-white">
                  {userGoal}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-white/70" />
              <div>
                <p className="text-xs text-gray-400">Level</p>
                <p className="text-sm font-bold text-white">
                  {userLevel}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Trust / Calibration Card */}
        <Card className="p-4 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border-blue-400/30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-300">
                AI calibrated with {videosAnalyzed} videos
              </p>
              <p className="text-xs text-blue-400/80">
                Form confidence:{" "}
                <span className="font-bold text-blue-300">
                  {aiConfidence}
                </span>
              </p>
            </div>
          </div>
        </Card>

        {/* Form Quality Trend - Killer Feature */}
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            Form Score Trend
          </h3>
          <Card className="p-5 bg-gradient-to-br from-white/15 to-gray-100/10 border-white/40 shadow-xl shadow-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Last 14 Days
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {
                      formTrend.scores[
                        formTrend.scores.length - 1
                      ]
                    }
                  </span>
                  <span className="text-sm text-green-400 font-bold flex items-center gap-1">
                    {formTrend.direction === "up" ? (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        {formTrend.change}
                      </>
                    ) : formTrend.direction === "down" ? (
                      <>
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        {formTrend.change}
                      </>
                    ) : (
                      <span className="text-gray-400">
                        Stable
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Mini Graph */}
            <div className="flex items-end justify-between h-20 gap-1">
              {formTrend.scores.map((score, index) => {
                const maxScore = Math.max(...formTrend.scores);
                const minScore = Math.min(...formTrend.scores);
                const range = maxScore - minScore || 1;
                const heightPercent =
                  ((score - minScore) / range) * 100;

                return (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-white/40 to-white/20 rounded-t-sm hover:from-white/60 hover:to-white/40 transition-all border-t-2 border-white/60 shadow-md"
                    style={{
                      height: `${Math.max(heightPercent, 20)}%`,
                    }}
                    title={`Day ${index + 1}: ${score}`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-center text-gray-400 mt-3 font-medium">
              Your form is improving consistently! Keep it up.
            </p>
          </Card>
        </div>

        {/* Stats Grid */}
        <div>
          <h3 className="mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-sm text-muted-foreground font-medium">
                  Total Workouts
                </p>
              </div>
              <p className="text-2xl font-bold">28</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <p className="text-sm text-muted-foreground font-medium">
                  Avg Form Score
                </p>
              </div>
              <p className="text-2xl text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                87
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Current Streak
              </p>
              <p className="text-2xl font-bold">7 days</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Best Streak
              </p>
              <p className="text-2xl font-bold">14 days</p>
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
                    ? "bg-white/15 border border-white/40 shadow-lg shadow-white/5"
                    : "bg-secondary/50 border border-border opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">
                  {achievement.icon}
                </div>
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
              <span className="text-sm font-medium">
                Pull-ups
              </span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                15 reps
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                Push-ups
              </span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                50 reps
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Plank</span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                2:30 min
              </span>
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