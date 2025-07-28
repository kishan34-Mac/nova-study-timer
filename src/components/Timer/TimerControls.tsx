import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimerMode } from '@/hooks/useTimer';

interface TimerControlsProps {
  isRunning: boolean;
  mode: TimerMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onModeChange: (mode: TimerMode) => void;
  currentSession: number;
}

export const TimerControls = ({
  isRunning,
  mode,
  onStart,
  onPause,
  onReset,
  onModeChange,
  currentSession,
}: TimerControlsProps) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Mode Selection */}
      <div className="flex bg-secondary rounded-xl p-1 space-x-1">
        <Button
          variant={mode === 'focus' ? 'focus' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('focus')}
          className="rounded-lg"
        >
          Focus
        </Button>
        <Button
          variant={mode === 'shortBreak' ? 'break' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('shortBreak')}
          className="rounded-lg"
        >
          Short Break
        </Button>
        <Button
          variant={mode === 'longBreak' ? 'break' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('longBreak')}
          className="rounded-lg"
        >
          Long Break
        </Button>
      </div>

      {/* Main Controls */}
      <div className="flex items-center space-x-4">
        <Button
          variant="timer"
          size="xl"
          onClick={isRunning ? onPause : onStart}
          className="min-w-32"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="px-4"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Session Counter */}
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">#{currentSession}</div>
        <div className="text-small">Current Session</div>
      </div>
    </div>
  );
};