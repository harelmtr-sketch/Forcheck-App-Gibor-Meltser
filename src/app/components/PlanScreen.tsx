import { useState } from 'react';
import { Calendar, TrendingUp, CheckCircle, Circle, Zap, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Workout {
  id: string;
  name: string;
  exercises: string[];
  completed: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  reason?: string;
  nextProgression?: string;
}

export function PlanScreen() {
  const [weeklyProgress] = useState(65);
  const [currentWeek] = useState(3);
  const [workouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Push Day',
      exercises: ['Push-ups: 3x12', 'Dips: 3x10', 'Pike Push-ups: 3x8'],
      completed: true,
      difficulty: 'Intermediate',
      reason: 'Good push recovery + strong form last session',
      nextProgression: 'Archer push-ups next week',
    },
    {
      id: '2',
      name: 'Pull Day',
      exercises: ['Pull-ups: 3x8', 'Australian Rows: 3x12', 'Chin-ups: 3x6'],
      completed: true,
      difficulty: 'Intermediate',
      reason: 'Shoulder stability improved 15% last analysis',
      nextProgression: 'Weighted pull-ups if today goes well',
    },
    {
      id: '3',
      name: 'Leg Day',
      exercises: ['Pistol Squats: 3x6', 'Jump Squats: 3x15', 'Lunges: 3x10'],
      completed: false,
      difficulty: 'Advanced',
      reason: 'Balance scores trending up, ready for progression',
      nextProgression: 'Jumping pistol squats',
    },
    {
      id: '4',
      name: 'Core & Cardio',
      exercises: ['L-sits: 3x20s', 'Plank: 3x60s', 'Burpees: 3x15'],
      completed: false,
      difficulty: 'Intermediate',
      reason: 'Core engagement strong in last 3 sessions',
      nextProgression: 'Dragon flags introduction',
    },
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="mb-2 font-bold">Workout Plan</h1>
        <p className="text-muted-foreground font-medium">
          Your personalized calisthenics program
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* Progress Card */}
        <Card className="p-6 bg-gradient-to-br from-white/15 to-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Week {currentWeek}</p>
              <h2>Weekly Progress</h2>
            </div>
            <div className="p-3 bg-background rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <TrendingUp className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Completion</span>
              <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">{weeklyProgress}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
          </div>
        </Card>

        {/* Adaptive Note */}
        <div className="bg-white/15 border border-white/30 rounded-xl p-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-white mt-0.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <p className="text-sm text-white/90 font-semibold">
              Your plan adapts based on form analysis. Keep uploading videos for optimized workouts!
            </p>
          </div>
        </div>

        {/* This Week's Workouts */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" />
            <h3>This Week's Workouts</h3>
          </div>
          <div className="space-y-3">
            {workouts.map((workout) => (
              <Card
                key={workout.id}
                className={`p-4 border transition-all ${
                  workout.completed
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {workout.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4>{workout.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {workout.difficulty}
                      </span>
                    </div>
                    
                    {/* Why this workout was chosen */}
                    {workout.reason && (
                      <div className="mb-3 p-2 bg-white/10 border border-white/20 rounded-lg">
                        <p className="text-xs text-white/80">
                          <span className="font-semibold text-white">Chosen because:</span> {workout.reason}
                        </p>
                      </div>
                    )}

                    <ul className="space-y-1 mb-3">
                      {workout.exercises.map((exercise, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {exercise}
                        </li>
                      ))}
                    </ul>

                    {/* Next progression preview */}
                    {workout.nextProgression && !workout.completed && (
                      <div className="mb-3 p-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-lg flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-white/70" />
                        <p className="text-xs text-white/80">
                          <span className="font-semibold">Next:</span> {workout.nextProgression}
                        </p>
                      </div>
                    )}

                    {!workout.completed && (
                      <Button className="w-full mt-3 h-9 bg-gradient-to-r from-white/80 to-white/70 hover:from-white/90 hover:to-white/80 text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]" size="sm">
                        Start Workout
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h3 className="mb-4">Monthly Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Workouts</p>
              <p className="text-2xl">12</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
              <p className="text-2xl">85</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Time</p>
              <p className="text-2xl">8.5h</p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Streak</p>
              <p className="text-2xl">7 days</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
