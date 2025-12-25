import { useState } from 'react';
import { TrendingUp, TrendingDown, Dumbbell, Apple, Users, Share2, Lightbulb, Camera, ChevronRight, PlayCircle, Plus, Search, X, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Exercise, MuscleStatus } from '../App';

interface DailyScreenProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  muscleStatus: MuscleStatus[];
  setMuscleStatus: React.Dispatch<React.SetStateAction<MuscleStatus[]>>;
}

export function DailyScreen({ exercises, setExercises, muscleStatus, setMuscleStatus }: DailyScreenProps) {
  const [hasWorkedOut] = useState(true); // Change to false to see pre-workout state
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [score, setScore] = useState('85');

  // Exercise database with muscle targets
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

  const exerciseDatabase = Object.keys(exerciseMuscleMap);

  const filteredExercises = exerciseDatabase.filter(ex => 
    ex.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setSearchQuery('');
  };

  const handleConfirmExercise = () => {
    const newExercise = {
      name: selectedExercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      score: parseInt(score)
    };
    setExercises([...exercises, newExercise]);
    setShowAddExercise(false);
    setSearchQuery('');
    setSelectedExercise('');
    setSets('3');
    setReps('10');
    setScore('85');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // Sophisticated workout scoring algorithm
  const calculateWorkoutScore = () => {
    if (exercises.length === 0) return 0;

    // Step 1: Calculate muscle volume (sets per muscle)
    const muscleVolume: Record<string, number> = {};
    exercises.forEach(exercise => {
      const muscles = exerciseMuscleMap[exercise.name] || [];
      muscles.forEach(muscle => {
        muscleVolume[muscle] = (muscleVolume[muscle] || 0) + exercise.sets;
      });
    });

    // Step 2: Apply soreness penalties to each exercise
    const adjustedExerciseScores = exercises.map(exercise => {
      const muscles = exerciseMuscleMap[exercise.name] || [];
      let totalPenalty = 0;
      
      muscles.forEach(muscleKey => {
        const muscle = muscleStatus.find(m => m.key === muscleKey);
        if (muscle) {
          if (muscle.status === 'sore') {
            totalPenalty += 0.35; // 35% penalty per sore muscle
          } else if (muscle.status === 'recovering') {
            totalPenalty += 0.15; // 15% penalty per recovering muscle
          }
        }
      });

      // Cap penalty at 70% max (at least 30% credit)
      const penaltyMultiplier = Math.max(0.3, 1 - totalPenalty);
      return exercise.score * penaltyMultiplier;
    });

    // Step 3: Calculate average of adjusted scores
    const avgAdjustedScore = adjustedExerciseScores.reduce((sum, score) => sum + score, 0) / adjustedExerciseScores.length;

    // Step 4: Calculate number of muscles worked
    const musclesWorked = Object.keys(muscleVolume).length;

    // Step 5: Apply completeness penalty/bonus
    let completenessMult = 1.0;
    if (musclesWorked < 3) {
      // Undertrained: significant penalty
      completenessMult = 0.6 + (musclesWorked * 0.13); // 0.6 for 1 muscle, 0.73 for 2
    } else if (musclesWorked > 5) {
      // Overtrained: moderate penalty
      const excess = musclesWorked - 5;
      completenessMult = Math.max(0.7, 1.0 - (excess * 0.08)); // -8% per muscle over 5
    }
    // If 3-5 muscles: no penalty (1.0x)

    // Step 6: Apply volume penalties (check each muscle)
    let volumePenalty = 0;
    let musclesInOptimalRange = 0;
    Object.entries(muscleVolume).forEach(([muscle, sets]) => {
      if (sets < 3) {
        volumePenalty += 0.05; // Underworked muscle
      } else if (sets > 9) {
        volumePenalty += 0.08; // Overworked muscle
      } else {
        musclesInOptimalRange++;
      }
    });
    const volumeMultiplier = Math.max(0.6, 1 - volumePenalty);

    // Step 7: Calculate base score
    let finalScore = avgAdjustedScore * completenessMult * volumeMultiplier;

    // Step 8: Safety caps
    // Cap if form is generally poor (average raw score < 60)
    const avgRawScore = exercises.reduce((sum, ex) => sum + ex.score, 0) / exercises.length;
    if (avgRawScore < 60) {
      finalScore = Math.min(finalScore, 70);
    }

    // Cap if training extremely sore muscles heavily
    const soreMusclesWorked = Object.keys(muscleVolume).filter(muscleKey => {
      const muscle = muscleStatus.find(m => m.key === muscleKey);
      return muscle && muscle.status === 'sore';
    }).length;
    
    if (soreMusclesWorked >= 3) {
      finalScore = Math.min(finalScore, 75);
    }

    // Step 9: Convert to 0-100 scale (already is, but ensure bounds)
    return Math.max(0, Math.min(100, Math.round(finalScore)));
  };

  const workoutScore = calculateWorkoutScore();

  // Calculate diet score (average of meal scores)
  const meals = [
    { name: 'Breakfast', items: 'Eggs, Oatmeal, Banana', calories: 520, protein: 35, score: 88 },
    { name: 'Lunch', items: 'Grilled Chicken, Rice, Veggies', calories: 650, protein: 55, score: 92 },
    { name: 'Snack', items: 'Greek Yogurt, Almonds', calories: 280, protein: 25, score: 75 },
  ];

  const dietScore = Math.round(meals.reduce((sum, meal) => sum + meal.score, 0) / meals.length);

  // Calculate daily score (weighted average: 60% workout, 40% diet)
  const dailyScore = Math.round(workoutScore * 0.6 + dietScore * 0.4);

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-orange-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Macros
  const macros = {
    protein: { current: 115, target: 180 },
    calories: { current: 1450, target: 2400 },
    carbs: { current: 180, target: 250 },
    fats: { current: 48, target: 70 },
  };

  // Friends comparison
  const friends = [
    { name: 'Sarah M.', score: 91, rank: 1 },
    { name: 'You', score: 87, rank: 2 },
    { name: 'Mike T.', score: 84, rank: 3 },
    { name: 'Alex K.', score: 79, rank: 4 },
  ];

  // Pre-workout state (suggested workout)
  if (!hasWorkedOut) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-8">
          <h1 className="mb-2 font-bold">Today's Workout</h1>
          <p className="text-muted-foreground font-medium">
            Upper Body Strength • 45 min
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
          {/* Commit Button */}
          <Button className="w-full h-14 bg-gradient-to-r from-white/20 to-white/15 border border-white/40 hover:from-white/30 hover:to-white/20 shadow-xl shadow-white/10">
            <span className="font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Commit to Workout</span>
          </Button>

          {/* Exercise Checklist */}
          <div className="space-y-3">
            <h3 className="font-bold text-white">Exercises</h3>
            {['Pull-ups', 'Push-ups', 'Dips', 'Pike Push-ups', 'Rows'].map((exercise, index) => (
              <Card key={index} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{exercise}</h4>
                    <p className="text-sm text-muted-foreground">4 sets × 12 reps</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/30">
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Missing equipment?
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Post-workout state (daily summary)
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="mb-2 font-bold">Today's Summary</h1>
        <p className="text-muted-foreground font-medium">
          Wednesday, Dec 24, 2024
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* Daily Score */}
        <Card className="p-6 bg-gradient-to-br from-white/15 to-gray-100/10 border-white/40 shadow-xl shadow-white/10">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Daily Score</p>
            <div className={`text-7xl font-bold bg-gradient-to-r ${getScoreColor(dailyScore)} bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]`}>
              {dailyScore}
            </div>
            <div className="mt-4 h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getScoreColor(dailyScore)} shadow-lg`}
                style={{ width: `${dailyScore}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Workout Today */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              Workout
            </h3>
            <span className={`text-2xl font-bold ${getScoreTextColor(workoutScore)} drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]`}>
              {workoutScore}
            </span>
          </div>

          <Card className="p-4 bg-card border-border mb-3">
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="text-sm font-medium">View detailed breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Card>

          <div className="space-y-2">
            {exercises.map((exercise, index) => (
              <Card key={index} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                  <span className={`text-xl font-bold ${getScoreTextColor(exercise.score)}`}>
                    {exercise.score}
                  </span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 border-white/30">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Watch correct form
                </Button>
                <Button size="sm" variant="ghost" className="w-full mt-2 text-red-400" onClick={() => handleRemoveExercise(index)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Exercise
                </Button>
              </Card>
            ))}
            
            {/* Add Exercise Button */}
            <Button 
              variant="outline" 
              className="w-full h-12 border-dashed border-white/30 hover:bg-white/5 hover:border-white/50"
              onClick={() => setShowAddExercise(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise Manually
            </Button>
          </div>
        </div>

        {/* Diet Today */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Apple className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              Diet
            </h3>
            <span className={`text-2xl font-bold ${getScoreTextColor(dietScore)} drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]`}>
              {dietScore}
            </span>
          </div>

          {/* Macros */}
          <Card className="p-4 bg-card border-border mb-3">
            <div className="space-y-3">
              {Object.entries(macros).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold capitalize">{key}</span>
                    <span className="text-sm text-muted-foreground">
                      {value.current} / {value.target}{key === 'calories' ? '' : 'g'}
                    </span>
                  </div>
                  <Progress value={(value.current / value.target) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Meals */}
          <div className="space-y-2">
            {meals.map((meal, index) => (
              <Card key={index} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <p className="text-xs text-muted-foreground">{meal.items}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {meal.calories} cal • {meal.protein}g protein
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreTextColor(meal.score)}`}>
                    {meal.score}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Improvement Suggestion */}
        <Card className="p-4 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border-blue-400/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-300 mb-1">Today's Tip</h4>
              <p className="text-sm text-blue-200/80">
                Your dips form needs work. Focus on keeping elbows at 45° and control the descent.
              </p>
            </div>
          </div>
        </Card>

        {/* Friends Comparison */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              Friends Leaderboard
            </h3>
          </div>

          <Card className="divide-y divide-border bg-card border-border">
            {friends.map((friend, index) => (
              <div key={index} className={`p-4 flex items-center justify-between ${friend.name === 'You' ? 'bg-white/5' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">#{friend.rank}</span>
                  <span className="font-semibold">{friend.name}</span>
                </div>
                <span className={`text-xl font-bold ${getScoreTextColor(friend.score)}`}>
                  {friend.score}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* Share Button */}
        <Button className="w-full h-12 bg-gradient-to-r from-white/20 to-white/15 border border-white/40 hover:from-white/30 hover:to-white/20">
          <Share2 className="w-4 h-4 mr-2 text-white" />
          <span className="font-bold text-white">Share Today's Summary</span>
        </Button>
      </div>

      {/* Add Exercise Dialog */}
      <Dialog open={showAddExercise} onOpenChange={setShowAddExercise}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add Exercise</DialogTitle>
            <DialogDescription>
              {selectedExercise ? 'Enter exercise details.' : 'Search and select an exercise.'}
            </DialogDescription>
          </DialogHeader>
          
          {!selectedExercise ? (
            <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
              <Input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="space-y-2 flex-1 overflow-y-auto">
                {filteredExercises.map((exercise, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleAddExercise(exercise)}
                  >
                    {exercise}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
              <div className="space-y-4 flex-1 overflow-y-auto">
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Selected Exercise</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-white">{selectedExercise}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedExercise('');
                        setSearchQuery('');
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Sets</label>
                    <Input
                      type="number"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Reps</label>
                    <Input
                      type="number"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Score (0-100)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                className="w-full bg-white text-black hover:bg-white/90 font-bold flex-shrink-0 mt-4"
                onClick={handleConfirmExercise}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Workout
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}