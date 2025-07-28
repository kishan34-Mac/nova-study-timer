import { useState } from 'react';
import { Settings, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircularProgress } from './Timer/CircularProgress';
import { TimerControls } from './Timer/TimerControls';
import { ThemeToggle } from './ThemeToggle';
import { useTimer } from '@/hooks/useTimer';
import { useToast } from '@/hooks/use-toast';

export const StudyTimer = () => {
  const { state, start, pause, reset, switchMode, progress } = useTimer();
  const { toast } = useToast();
  const [todayGoal] = useState(4); // 4 hours daily goal
  const dailyProgress = (state.totalSessions * 25) / 60; // Convert sessions to hours

  const handleTimerComplete = () => {
    toast({
      title: "Session Complete! 🎉",
      description: `Great job! You've completed a ${state.mode} session.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
            StudyFlow
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-8">
            {/* Daily Goal Progress */}
            <Card className="w-full shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-subheading font-semibold">Daily Goal</h3>
                    <p className="text-small">
                      {dailyProgress.toFixed(1)} / {todayGoal} hours
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round((dailyProgress / todayGoal) * 100)}%
                    </div>
                    <div className="text-small">Complete</div>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-slow"
                    style={{ width: `${Math.min((dailyProgress / todayGoal) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Timer */}
            <Card className="w-full max-w-md shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-8">
                  <CircularProgress
                    progress={progress}
                    mode={state.mode}
                    timeLeft={state.timeLeft}
                    className="w-64 h-64"
                  />
                  
                  <TimerControls
                    isRunning={state.isRunning}
                    mode={state.mode}
                    onStart={start}
                    onPause={pause}
                    onReset={reset}
                    onModeChange={switchMode}
                    currentSession={state.currentSession}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Session Stats */}
            <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-subheading font-semibold mb-4">Today's Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-small">Sessions Completed</span>
                    <span className="font-semibold">{state.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small">Time Focused</span>
                    <span className="font-semibold">
                      {Math.floor(dailyProgress)}h {Math.round((dailyProgress % 1) * 60)}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small">Current Streak</span>
                    <span className="font-semibold">3 days 🔥</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tasks */}
            <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-subheading font-semibold mb-4">Quick Tasks</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-2 border-primary"
                    />
                    <span className="text-body">Review JavaScript concepts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-2 border-primary"
                      defaultChecked
                    />
                    <span className="text-body line-through text-muted-foreground">
                      Complete React project
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-2 border-primary"
                    />
                    <span className="text-body">Study algorithms</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-small">
                  + Add task
                </Button>
              </CardContent>
            </Card>

            {/* Motivational Quote (shown during breaks) */}
            {(state.mode === 'shortBreak' || state.mode === 'longBreak') && (
              <Card className="shadow-soft border-0 bg-gradient-break text-white">
                <CardContent className="p-6">
                  <h3 className="text-subheading font-semibold mb-3">Break Time Quote</h3>
                  <blockquote className="text-body italic">
                    "The secret of getting ahead is getting started."
                  </blockquote>
                  <cite className="text-small mt-2 block opacity-80">— Mark Twain</cite>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};