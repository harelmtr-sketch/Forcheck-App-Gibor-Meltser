import { Apple, TrendingUp, AlertTriangle, Sun } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface MacroData {
  name: string;
  current: number;
  target: number;
  color: string;
}

export function DietScreen() {
  const isTrainingDay = true; // Toggle for training vs rest day
  
  const macros: MacroData[] = [
    { name: 'Protein', current: 145, target: 180, color: 'bg-blue-500' },
    { name: 'Carbs', current: 220, target: 250, color: 'bg-green-500' },
    { name: 'Fats', current: 55, target: 70, color: 'bg-orange-500' },
  ];

  const todaysMeals = [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      items: ['Oatmeal with banana', 'Protein shake', '2 eggs'],
      calories: 520,
    },
    {
      name: 'Lunch',
      time: '1:00 PM',
      items: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables'],
      calories: 650,
    },
    {
      name: 'Snack',
      time: '4:00 PM',
      items: ['Greek yogurt', 'Almonds'],
      calories: 280,
    },
  ];

  const totalCalories = 1450;
  const targetCalories = 2400;
  const caloriesProgress = (totalCalories / targetCalories) * 100;
  
  // Calculate protein status for recovery warning
  const proteinMacro = macros.find(m => m.name === 'Protein');
  const proteinPercentage = proteinMacro ? (proteinMacro.current / proteinMacro.target) * 100 : 0;
  const lowProtein = proteinPercentage < 70;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="mb-2 font-bold">Nutrition</h1>
        <p className="text-muted-foreground font-medium">
          Track your macros and stay on target
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
        {/* Training Day Indicator */}
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          isTrainingDay 
            ? 'bg-white/15 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
            : 'bg-blue-500/15 border-blue-500/30'
        }`}>
          <Sun className={`w-5 h-5 ${isTrainingDay ? 'text-white' : 'text-blue-400'}`} />
          <p className={`text-sm font-semibold ${isTrainingDay ? 'text-white' : 'text-blue-400'}`}>
            Today is a {isTrainingDay ? 'training' : 'rest'} day
          </p>
        </div>

        {/* Training-linked tip */}
        {lowProtein && (
          <div className="bg-orange-500/15 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <h4 className="text-orange-400 mb-1 font-bold">Nutrition Alert</h4>
                <p className="text-sm text-orange-300/90">
                  Low protein today → recovery may be slower tomorrow. Consider adding a protein-rich meal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Calories Card */}
        <Card className="p-6 bg-gradient-to-br from-white/15 to-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Daily Calories</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  {totalCalories}
                </span>
                <span className="text-muted-foreground font-medium">/ {targetCalories}</span>
              </div>
            </div>
            <div className="p-3 bg-background rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Apple className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          <Progress value={caloriesProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            {targetCalories - totalCalories} calories remaining
          </p>
        </Card>

        {/* Macros */}
        <div>
          <h3 className="mb-4">Macronutrients</h3>
          <div className="space-y-3">
            {macros.map((macro) => {
              const percentage = (macro.current / macro.target) * 100;
              return (
                <Card key={macro.name} className="p-4 bg-card border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span>{macro.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {macro.current}g / {macro.target}g
                    </span>
                  </div>
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full ${macro.color} transition-all`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Today's Meals */}
        <div>
          <h3 className="mb-4">Today's Meals</h3>
          <div className="space-y-3">
            {todaysMeals.map((meal, index) => (
              <Card key={index} className="p-4 bg-card border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4>{meal.name}</h4>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary">{meal.calories}</p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </div>
                </div>
                <ul className="space-y-1 mt-3">
                  {meal.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-muted-foreground"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Hydration */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <h4>Hydration</h4>
            <span className="text-sm text-muted-foreground">6 / 8 glasses</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < 6 ? 'bg-blue-500' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Weekly Insights */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-500 mb-1">Great Progress!</h4>
              <p className="text-sm text-green-400/80">
                You're maintaining a consistent calorie intake. Keep it up for optimal recovery and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
