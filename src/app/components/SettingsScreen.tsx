import { ArrowLeft, Moon, Sun, Bell, Shield, HelpCircle, Info, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { useState, useEffect } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [formTips, setFormTips] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground font-medium">
              Customize your experience
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
        {/* Appearance */}
        <div>
          <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60 font-bold">Appearance</h3>
          <Card className="divide-y divide-border bg-card border-border overflow-hidden">
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-400/30 rounded-lg">
                    <Moon className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                  </div>
                ) : (
                  <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-400/30 rounded-lg">
                    <Sun className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60 font-bold">Notifications</h3>
          <Card className="divide-y divide-border bg-card border-border overflow-hidden">
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                </div>
                <div>
                  <p className="font-semibold">Push Notifications</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Receive app notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex-1">
                <p className="font-semibold">Workout Reminders</p>
                <p className="text-sm text-muted-foreground font-medium">
                  Daily workout reminders
                </p>
              </div>
              <Switch
                checked={workoutReminders}
                onCheckedChange={setWorkoutReminders}
                disabled={!notifications}
              />
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex-1">
                <p className="font-semibold">Form Tips</p>
                <p className="text-sm text-muted-foreground font-medium">
                  Tips and technique suggestions
                </p>
              </div>
              <Switch
                checked={formTips}
                onCheckedChange={setFormTips}
                disabled={!notifications}
              />
            </div>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div>
          <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60 font-bold">Privacy & Security</h3>
          <Card className="divide-y divide-border bg-card border-border overflow-hidden">
            <button className="p-4 flex items-center justify-between w-full hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30 rounded-lg">
                  <Shield className="w-5 h-5 text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                </div>
                <div>
                  <p className="font-semibold">Privacy Policy</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    View our privacy policy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-4 flex items-center justify-between w-full hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30 rounded-lg">
                  <Shield className="w-5 h-5 text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                </div>
                <div>
                  <p className="font-semibold">Data Management</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Manage your data
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60 font-bold">Support</h3>
          <Card className="divide-y divide-border bg-card border-border overflow-hidden">
            <button className="p-4 flex items-center justify-between w-full hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-400/30 rounded-lg">
                  <HelpCircle className="w-5 h-5 text-orange-300 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
                </div>
                <div>
                  <p className="font-semibold">Help Center</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Get help and support
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-4 flex items-center justify-between w-full hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/15 rounded-lg border border-white/20">
                  <Info className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </div>
                <div>
                  <p className="font-semibold">About Forcheck</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Version 1.0.0
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* App Info */}
        <div className="pb-6">
          <Card className="p-4 bg-gradient-to-br from-white/10 to-white/5 border-white/20 text-center">
            <p className="text-sm text-white/70 font-medium">
              Made with ❤️ for calisthenics athletes
            </p>
            <p className="text-xs text-white/50 mt-1">
              © 2024 Forcheck. All rights reserved.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}