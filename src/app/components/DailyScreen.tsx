import { useState } from 'react';
import { TrendingUp, TrendingDown, Dumbbell, Apple, Users, Share2, Lightbulb, Camera, ChevronRight, PlayCircle, Plus, Search, X, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Exercise, Meal, MuscleStatus } from '../App';

interface DailyScreenProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  muscleStatus: MuscleStatus[];
  setMuscleStatus: React.Dispatch<React.SetStateAction<MuscleStatus[]>>;
}

export function DailyScreen({ exercises, setExercises, meals, setMeals, muscleStatus, setMuscleStatus }: DailyScreenProps) {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [exerciseScore, setExerciseScore] = useState('85');
  const [isRecordingCustom, setIsRecordingCustom] = useState(false);
  
  // Meal form state
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [mealScore, setMealScore] = useState('85');

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
      score: parseInt(exerciseScore)
    };
    setExercises([...exercises, newExercise]);
    setShowAddExercise(false);
    setSearchQuery('');
    setSelectedExercise('');
    setSets('3');
    setReps('10');
    setExerciseScore('85');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // Calculate workout score based on hitting "ready" muscles
  const calculateWorkoutScore = () => {
    if (exercises.length === 0) return 0;

    // Step 1: Count how many muscles are labeled "ready"
    const readyMuscles = muscleStatus.filter(m => m.status === 'ready');
    const readyMuscleCount = readyMuscles.length;
    
    if (readyMuscleCount === 0) return 0; // No ready muscles = 0 score

    // Step 2: Determine which ready muscles were "hit"
    // Hit = exercise score > 50, at least 2 sets, at least 5 reps
    const hitReadyMuscles = new Set<string>();
    
    exercises.forEach(exercise => {
      // Check if this exercise qualifies (score > 50, 2+ sets, 5+ reps)
      if (exercise.score > 50 && exercise.sets >= 2 && exercise.reps >= 5) {
        const muscles = exerciseMuscleMap[exercise.name] || [];
        muscles.forEach(muscleKey => {
          // Only count if this muscle is "ready"
          const muscle = muscleStatus.find(m => m.key === muscleKey);
          if (muscle && muscle.status === 'ready') {
            hitReadyMuscles.add(muscleKey);
          }
        });
      }
    });

    const hitCount = hitReadyMuscles.size;

    // Step 3: Calculate C value based on ready muscle count and hit count
    let C = 0;
    
    if (readyMuscleCount >= 4) {
      // If 4+ ready muscles exist
      if (hitCount > 4) {
        const n = hitCount - 4;
        C = Math.max(0, 1 - 0.2 * n);
      } else if (hitCount === 4) {
        C = 1;
      } else if (hitCount === 3) {
        C = 0.8;
      } else if (hitCount === 2) {
        C = 0.6;
      } else if (hitCount === 1) {
        C = 0.3;
      } else {
        C = 0;
      }
    } else if (readyMuscleCount === 3) {
      // If exactly 3 ready muscles
      if (hitCount > 3) {
        const n = hitCount - 3;
        C = Math.max(0, 1 - 0.2 * n);
      } else if (hitCount === 3) {
        C = 1;
      } else if (hitCount === 2) {
        C = 0.7;
      } else if (hitCount === 1) {
        C = 0.4;
      } else {
        C = 0;
      }
    } else if (readyMuscleCount === 2) {
      // If exactly 2 ready muscles
      if (hitCount > 2) {
        const n = hitCount - 2;
        C = Math.max(0, 1 - 0.2 * n);
      } else if (hitCount === 2) {
        C = 1;
      } else if (hitCount === 1) {
        C = 0.6;
      } else {
        C = 0;
      }
    } else if (readyMuscleCount === 1) {
      // If exactly 1 ready muscle
      if (hitCount > 1) {
        const n = hitCount - 1;
        C = Math.max(0, 1 - 0.2 * n);
      } else if (hitCount === 1) {
        C = 1;
      } else {
        C = 0;
      }
    }

    // Step 4: Calculate average exercise score
    const avgScore = exercises.reduce((sum, ex) => sum + ex.score, 0) / exercises.length;

    // Step 5: Final score = average * C
    const finalScore = Math.abs(avgScore * C);

    return Math.round(finalScore);
  };

  const workoutScore = calculateWorkoutScore();

  // Calculate diet score (average of meal scores)
  const dietScore = meals.length > 0 ? Math.round(meals.reduce((sum, meal) => sum + meal.score, 0) / meals.length) : 0;

  // Calculate daily score (weighted average: 60% workout, 40% diet)
  const dailyScore = exercises.length === 0 && meals.length === 0 ? 0 : Math.round(workoutScore * 0.6 + dietScore * 0.4);

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

  // Calculate macros from logged meals
  const macros = {
    protein: { 
      current: meals.reduce((sum, m) => sum + m.protein, 0), 
      target: 180 
    },
    calories: { 
      current: meals.reduce((sum, m) => sum + m.calories, 0), 
      target: 2400 
    },
  };

  // Friends comparison
  const friends = [
    { name: 'Sarah M.', score: 91, rank: 1 },
    { name: 'You', score: dailyScore, rank: 2 },
    { name: 'Mike T.', score: 84, rank: 3 },
    { name: 'Alex K.', score: 79, rank: 4 },
  ];

  // Meal handlers
  const handleConfirmMeal = () => {
    const newMeal = {
      name: mealName,
      calories: parseInt(calories),
      protein: parseInt(protein),
      score: parseInt(mealScore)
    };
    setMeals([...meals, newMeal]);
    setShowAddMeal(false);
    setMealName('');
    setCalories('');
    setProtein('');
    setMealScore('85');
  };

  const handleRemoveMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  // Show empty state if no data logged
  if (exercises.length === 0 && meals.length === 0 && !isRecordingCustom) {
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
          <Button 
            className="w-full h-14 bg-gradient-to-r from-white/20 to-white/15 border border-white/40 hover:from-white/30 hover:to-white/20 shadow-xl shadow-white/10"
            onClick={() => {
              // Add pre-planned workout
              const prePlannedWorkout = [
                { name: 'Pull-ups', sets: 4, reps: 12, score: 85 },
                { name: 'Push-ups', sets: 4, reps: 20, score: 85 },
                { name: 'Dips', sets: 3, reps: 15, score: 85 },
                { name: 'Pike Push-ups', sets: 3, reps: 12, score: 85 },
                { name: 'Rows', sets: 4, reps: 12, score: 85 },
              ];
              setExercises(prePlannedWorkout);
            }}
          >
            <span className="font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Commit to Workout</span>
          </Button>

          {/* Record Custom Workout Button */}
          <Button 
            variant="outline"
            className="w-full h-14 border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
            onClick={() => setIsRecordingCustom(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-bold">Record Your Custom Workout</span>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {meal.calories} cal • {meal.protein}g protein
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreTextColor(meal.score)}`}>
                    {meal.score}
                  </span>
                </div>
                <Button size="sm" variant="ghost" className="w-full mt-2 text-red-400" onClick={() => handleRemoveMeal(index)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Meal
                </Button>
              </Card>
            ))}
            
            {/* Add Meal Button */}
            <Button 
              variant="outline" 
              className="w-full h-12 border-dashed border-white/30 hover:bg-white/5 hover:border-white/50"
              onClick={() => setShowAddMeal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Meal Manually
            </Button>
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
                    value={exerciseScore}
                    onChange={(e) => setExerciseScore(e.target.value)}
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

      {/* Add Meal Dialog */}
      <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add Meal</DialogTitle>
            <DialogDescription>
              Enter meal details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Meal Details</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">New Meal</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                  <Input
                    type="text"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Calories</label>
                  <Input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Protein (g)</label>
                  <Input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Score (0-100)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={mealScore}
                    onChange={(e) => setMealScore(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Button
              className="w-full bg-white text-black hover:bg-white/90 font-bold flex-shrink-0 mt-4"
              onClick={handleConfirmMeal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Meals
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}