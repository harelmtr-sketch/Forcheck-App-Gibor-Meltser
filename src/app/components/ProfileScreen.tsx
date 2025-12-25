import { User, TrendingUp, Award, Settings, ChevronRight, Target, Crown, Trophy, Flame, Users, BarChart3, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Exercise, MuscleStatus } from '../App';

interface ProfileScreenProps {
  onOpenSettings: () => void;
  exercises: Exercise[];
  muscleStatus: MuscleStatus[];
}

export function ProfileScreen({ onOpenSettings, exercises, muscleStatus }: ProfileScreenProps) {
  const achievements = [
    { name: '7 Day Streak', icon: '🔥', unlocked: true },
    { name: 'First Score 90+', icon: '⭐', unlocked: true },
    { name: 'Perfect Form', icon: '🎯', unlocked: true },
    { name: '30 Workouts', icon: '💪', unlocked: false },
    { name: 'Consistency King', icon: '👑', unlocked: false },
    { name: 'Score Master', icon: '🏆', unlocked: false },
  ];

  // Score history (last 30 days)
  const dailyScores = [
    85, 88, 92, 78, 90, 87, 91, 84, 89, 93, 86, 88, 90, 85, 87,
    91, 89, 94, 86, 88, 90, 87, 85, 92, 89, 91, 88, 86, 90, 87
  ];

  const weeklyAverage = 88;
  const monthlyAverage = 87;

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Body heat map muscles - expanded list with workout tracking
  // Get muscles worked today from the actual exercises prop
  const exerciseMuscleMap: Record<string, string[]> = {
    'Pull-ups': ['back', 'biceps', 'forearms'],
    'Push-ups': ['chest', 'triceps', 'front-delts'],
    'Dips': ['chest', 'triceps', 'front-delts'],
    'Pistol Squats': ['quads', 'glutes', 'core'],
    'Squats': ['quads', 'glutes', 'hamstrings'],
    'Lunges': ['quads', 'glutes', 'hamstrings'],
    'Bench Press': ['chest', 'triceps', 'front-delts'],
    'Deadlifts': ['back', 'hamstrings', 'glutes', 'traps'],
    'Rows': ['back', 'biceps', 'rear-delts'],
    'Shoulder Press': ['front-delts', 'side-delts', 'triceps'],
    'Bicep Curls': ['biceps', 'forearms'],
    'Tricep Extensions': ['triceps'],
    'Plank': ['core'],
    'Leg Press': ['quads', 'glutes', 'hamstrings'],
    'Lat Pulldown': ['back', 'biceps'],
    'Pike Push-ups': ['front-delts', 'side-delts', 'triceps'],
    'Handstand Push-ups': ['front-delts', 'side-delts', 'triceps'],
    'Muscle-ups': ['back', 'chest', 'triceps', 'biceps'],
    'L-sits': ['core', 'forearms'],
    'Front Lever': ['back', 'core', 'biceps'],
    'Back Lever': ['back', 'biceps', 'core'],
    'Box Jumps': ['quads', 'glutes', 'calves'],
    'Burpees': ['chest', 'triceps', 'quads', 'core'],
    'Mountain Climbers': ['core', 'quads'],
    'Jumping Jacks': ['side-delts', 'calves'],
    'Jump Rope': ['calves', 'forearms'],
    'Face Pulls': ['rear-delts', 'traps'],
    'Shrugs': ['traps'],
    'Calf Raises': ['calves'],
    'Romanian Deadlifts': ['hamstrings', 'glutes', 'back'],
    'Lateral Raises': ['side-delts'],
    'Front Raises': ['front-delts'],
    'Reverse Flyes': ['rear-delts'],
  };

  // Get muscles worked today
  const musclesWorkedToday = new Set<string>();
  exercises.forEach(exercise => {
    const muscles = exerciseMuscleMap[exercise.name] || [];
    muscles.forEach(muscle => musclesWorkedToday.add(muscle));
  });

  const muscles = [
    { 
      name: 'Chest', 
      key: 'chest',
      status: musclesWorkedToday.has('chest') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('chest') ? 'Today' : '2 days ago' 
    },
    { 
      name: 'Back', 
      key: 'back',
      status: musclesWorkedToday.has('back') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('back') ? 'Today' : '3 days ago' 
    },
    { 
      name: 'Front Delts', 
      key: 'front-delts',
      status: musclesWorkedToday.has('front-delts') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('front-delts') ? 'Today' : '3 days ago' 
    },
    { 
      name: 'Side Delts', 
      key: 'side-delts',
      status: musclesWorkedToday.has('side-delts') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('side-delts') ? 'Today' : '5 days ago' 
    },
    { 
      name: 'Rear Delts', 
      key: 'rear-delts',
      status: musclesWorkedToday.has('rear-delts') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('rear-delts') ? 'Today' : '4 days ago' 
    },
    { 
      name: 'Triceps', 
      key: 'triceps',
      status: musclesWorkedToday.has('triceps') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('triceps') ? 'Today' : 'Yesterday' 
    },
    { 
      name: 'Biceps', 
      key: 'biceps',
      status: musclesWorkedToday.has('biceps') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('biceps') ? 'Today' : 'Yesterday' 
    },
    { 
      name: 'Core', 
      key: 'core',
      status: musclesWorkedToday.has('core') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('core') ? 'Today' : 'Yesterday' 
    },
    { 
      name: 'Forearms', 
      key: 'forearms',
      status: musclesWorkedToday.has('forearms') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('forearms') ? 'Today' : '2 days ago' 
    },
    { 
      name: 'Traps', 
      key: 'traps',
      status: musclesWorkedToday.has('traps') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('traps') ? 'Today' : '6 days ago' 
    },
    { 
      name: 'Quads', 
      key: 'quads',
      status: musclesWorkedToday.has('quads') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('quads') ? 'Today' : '4 days ago' 
    },
    { 
      name: 'Hamstrings', 
      key: 'hamstrings',
      status: musclesWorkedToday.has('hamstrings') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('hamstrings') ? 'Today' : '5 days ago' 
    },
    { 
      name: 'Glutes', 
      key: 'glutes',
      status: musclesWorkedToday.has('glutes') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('glutes') ? 'Today' : '4 days ago' 
    },
    { 
      name: 'Calves', 
      key: 'calves',
      status: musclesWorkedToday.has('calves') ? 'sore' : 'ready', 
      lastTrained: musclesWorkedToday.has('calves') ? 'Today' : '7 days ago' 
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-bold">Profile</h1>
          <p className="text-muted-foreground font-medium">@alexjohnson</p>
        </div>
        <Button
          onClick={onOpenSettings}
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* Profile Header Card */}
        <Card className="p-6 bg-gradient-to-br from-white/15 to-gray-100/10 border-white/40 shadow-xl shadow-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center border-2 border-white/50 shadow-lg shadow-white/20">
              <User className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1">Alex Johnson</h2>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-bold text-white">185 lbs</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Goal</p>
                  <p className="font-bold text-white">Strength</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/20">
            <p className="text-xs text-gray-400">Member since Jan 2024</p>
          </div>
        </Card>

        {/* Body Heat Map */}
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            Muscle Status
          </h3>
          <Card className="p-4 bg-card border-border">
            <div className="grid grid-cols-2 gap-2">
              {muscles.map((muscle, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    muscle.status === 'ready'
                      ? 'bg-green-500/15 border-green-500/30'
                      : muscle.status === 'sore'
                      ? 'bg-red-500/15 border-red-500/30'
                      : 'bg-yellow-500/15 border-yellow-500/30'
                  }`}
                >
                  <p className="font-semibold text-sm">{muscle.name}</p>
                  <p className="text-xs text-muted-foreground">{muscle.lastTrained}</p>
                  <p className={`text-xs font-bold mt-1 ${
                    muscle.status === 'ready' ? 'text-green-400' :
                    muscle.status === 'sore' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {muscle.status === 'ready' ? 'Ready' : muscle.status === 'sore' ? 'Sore' : 'Recovering'}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Score History */}
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            Score History
          </h3>
          
          {/* Averages */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/30">
              <p className="text-xs text-muted-foreground mb-1">Weekly Avg</p>
              <p className={`text-3xl font-bold ${getScoreTextColor(weeklyAverage)} drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]`}>
                {weeklyAverage}
              </p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/30">
              <p className="text-xs text-muted-foreground mb-1">Monthly Avg</p>
              <p className={`text-3xl font-bold ${getScoreTextColor(monthlyAverage)} drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]`}>
                {monthlyAverage}
              </p>
            </Card>
          </div>

          {/* Score Grid (Last 30 Days) */}
          <Card className="p-4 bg-card border-border">
            <div className="grid grid-cols-10 gap-1">
              {dailyScores.map((score, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${getScoreColor(score)} opacity-${Math.floor(score / 10)}0 hover:scale-110 transition-transform cursor-pointer`}
                  title={`Day ${index + 1}: ${score}`}
                />
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-3 text-xs">
              Show More
            </Button>
          </Card>
        </div>

        {/* Stats & Achievements */}
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            Stats & Achievements
          </h3>
          
          {/* Key Stats */}
          <Card className="p-4 bg-card border-border mb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  <p className="text-xl font-bold text-white">7 days</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Best Streak</p>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <p className="text-xl font-bold text-white">14 days</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Favorite Exercise</p>
                <p className="font-bold text-white">Pull-ups</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Best Exercise</p>
                <p className="font-bold text-white">Dips (96 avg)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Workouts</p>
                <p className="text-xl font-bold text-white">28</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Improvement</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <p className="font-bold text-green-400">+8%</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Top 5 PRs */}
          <Card className="divide-y divide-border bg-card border-border mb-3">
            <div className="p-3 bg-white/5">
              <h4 className="font-bold text-sm">Top 5 PRs</h4>
            </div>
            {[
              { exercise: 'Pull-ups', value: '15 reps' },
              { exercise: 'Push-ups', value: '50 reps' },
              { exercise: 'Dips', value: '30 reps' },
              { exercise: 'Plank', value: '2:30 min' },
              { exercise: 'Pistol Squats', value: '12 reps' },
            ].map((pr, index) => (
              <div key={index} className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium">{pr.exercise}</span>
                <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                  {pr.value}
                </span>
              </div>
            ))}
          </Card>

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center p-3 transition-all ${
                  achievement.unlocked
                    ? 'bg-white/15 border border-white/40 shadow-lg shadow-white/5'
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

        {/* Friends */}
        <Button
          variant="outline"
          className="w-full justify-between h-12 border-white/40 hover:bg-white/10 hover:border-white/60"
        >
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-3 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            <span className="font-semibold">Friends</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}