import { User, TrendingUp, Award, Settings, ChevronRight, Target, Crown, Trophy, Flame, Users, BarChart3, Calendar, Edit2, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Exercise, MuscleStatus } from '../App';
import { useState } from 'react';

interface ProfileScreenProps {
  onOpenSettings: () => void;
  exercises: Exercise[];
  muscleStatus: MuscleStatus[];
}

export function ProfileScreen({ onOpenSettings, exercises, muscleStatus }: ProfileScreenProps) {
  const [weight, setWeight] = useState('185');
  const [goal, setGoal] = useState('Strength');
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

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
    <div className="flex flex-col h-full bg-gradient-to-b from-black to-gray-900">
      {/* Header - Enhanced with gradient */}
      <div className="px-6 py-8 flex items-center justify-between border-b border-white/10">
        <div>
          <h1 className="mb-2 font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Profile</h1>
          <p className="text-muted-foreground font-medium">@harelmeltser</p>
        </div>
        <Button
          onClick={onOpenSettings}
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* Profile Header Card - Redesigned */}
        <Card className="relative p-8 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/10 border-2 border-white/30 shadow-2xl shadow-blue-500/20 overflow-hidden">
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-500/5 animate-pulse" />
          
          <div className="relative">
            <div className="flex items-center gap-5 mb-6">
              {/* Enhanced profile picture */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white/40 shadow-2xl shadow-blue-500/40">
                  <User className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                </div>
                {/* Online status indicator */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-4 border-gray-900 rounded-full shadow-lg shadow-green-400/50" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl mb-2 font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                  Harel Meltser
                </h2>
                <div className="flex gap-6 mt-3">
                  {/* Weight - Editable */}
                  <div className="flex-1">
                    <p className="text-xs text-blue-200/70 mb-1 font-semibold uppercase tracking-wider">Weight</p>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                      {isEditingWeight ? (
                        <input
                          type="text"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="bg-transparent font-bold text-white text-lg outline-none w-16"
                          autoFocus
                        />
                      ) : (
                        <span className="font-bold text-white text-lg">{weight} lbs</span>
                      )}
                      <button
                        onClick={() => {
                          if (isEditingWeight) {
                            setIsEditingWeight(false);
                          } else {
                            setIsEditingWeight(true);
                          }
                        }}
                        className="ml-auto p-1 hover:bg-white/20 rounded transition-all"
                      >
                        {isEditingWeight ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Edit2 className="w-4 h-4 text-blue-300" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Goal - Editable */}
                  <div className="flex-1">
                    <p className="text-xs text-purple-200/70 mb-1 font-semibold uppercase tracking-wider">Goal</p>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                      {isEditingGoal ? (
                        <input
                          type="text"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          className="bg-transparent font-bold text-white text-lg outline-none w-24"
                          autoFocus
                        />
                      ) : (
                        <span className="font-bold text-white text-lg">{goal}</span>
                      )}
                      <button
                        onClick={() => {
                          if (isEditingGoal) {
                            setIsEditingGoal(false);
                          } else {
                            setIsEditingGoal(true);
                          }
                        }}
                        className="ml-auto p-1 hover:bg-white/20 rounded transition-all"
                      >
                        {isEditingGoal ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Edit2 className="w-4 h-4 text-purple-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/20">
              <div className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow-lg">28</p>
                <p className="text-xs text-white/60 mt-1">Workouts</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-2xl drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]">🔥</span>
                  <p className="text-2xl font-bold text-orange-300 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]">7</p>
                </div>
                <p className="text-xs text-orange-200/70 font-semibold">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.6)]">88</p>
                <p className="text-xs text-white/60 mt-1">Avg Score</p>
              </div>
            </div>
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
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/15 to-red-500/10 border border-orange-400/30">
                <p className="text-xs text-orange-200/70 mb-1">Current Streak</p>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
                  <p className="text-xl font-bold text-orange-300">7 days</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/15 to-amber-500/10 border border-yellow-400/30">
                <p className="text-xs text-yellow-200/70 mb-1">Best Streak</p>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <p className="text-xl font-bold text-yellow-300">14 days</p>
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
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/15 to-emerald-500/10 border border-green-400/30">
                <p className="text-xs text-green-200/70 mb-1">Improvement</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  <p className="font-bold text-green-300">+8%</p>
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