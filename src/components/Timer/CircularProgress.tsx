import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TimerMode } from '@/hooks/useTimer';

interface CircularProgressProps {
  progress: number;
  mode: TimerMode;
  timeLeft: number;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getModeColor = (mode: TimerMode): { primary: string; background: string } => {
  switch (mode) {
    case 'focus':
      return { 
        primary: 'hsl(262, 83%, 58%)', 
        background: 'hsl(262, 83%, 95%)' 
      };
    case 'shortBreak':
      return { 
        primary: 'hsl(142, 76%, 36%)', 
        background: 'hsl(142, 76%, 95%)' 
      };
    case 'longBreak':
      return { 
        primary: 'hsl(221, 83%, 53%)', 
        background: 'hsl(221, 83%, 95%)' 
      };
  }
};

export const CircularProgress = ({ progress, mode, timeLeft, className }: CircularProgressProps) => {
  const colors = getModeColor(mode);
  
  return (
    <div className={`relative ${className}`}>
      <CircularProgressbar
        value={progress * 100}
        text={formatTime(timeLeft)}
        styles={buildStyles({
          textColor: 'hsl(var(--foreground))',
          pathColor: colors.primary,
          trailColor: colors.background,
          strokeLinecap: 'round',
          textSize: '16px',
          pathTransitionDuration: 0.5,
        })}
        strokeWidth={6}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-4xl font-bold font-mono text-foreground">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-muted-foreground mt-1 capitalize">
            {mode === 'shortBreak' ? 'Short Break' : 
             mode === 'longBreak' ? 'Long Break' : 'Focus Time'}
          </div>
        </div>
      </div>
    </div>
  );
};