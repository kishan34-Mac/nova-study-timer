import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focusDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

interface TimerState {
  mode: TimerMode;
  timeLeft: number; // in seconds
  isRunning: boolean;
  isComplete: boolean;
  currentSession: number;
  totalSessions: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartFocus: false,
};

export const useTimer = (initialSettings: Partial<TimerSettings> = {}) => {
  const [settings, setSettings] = useState<TimerSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    timeLeft: settings.focusDuration * 60,
    isRunning: false,
    isComplete: false,
    currentSession: 1,
    totalSessions: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement>();

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEeC');
    audioRef.current.volume = 0.3;
  }, []);

  const getDurationForMode = useCallback((mode: TimerMode): number => {
    switch (mode) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
    }
  }, [settings]);

  const getNextMode = useCallback((currentMode: TimerMode, session: number): TimerMode => {
    if (currentMode === 'focus') {
      return session % 4 === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'focus';
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon-192.png' });
    }
  }, []);

  const tick = useCallback(() => {
    setState(prev => {
      if (prev.timeLeft <= 1) {
        // Timer complete
        playSound();
        
        const nextMode = getNextMode(prev.mode, prev.currentSession);
        const nextSession = prev.mode === 'focus' ? prev.currentSession + 1 : prev.currentSession;
        const newTotalSessions = prev.mode === 'focus' ? prev.totalSessions + 1 : prev.totalSessions;
        
        // Show notification
        const modeNames = {
          focus: 'Focus Session',
          shortBreak: 'Short Break',
          longBreak: 'Long Break'
        };
        
        showNotification(
          `${modeNames[prev.mode]} Complete!`,
          `Time for a ${modeNames[nextMode].toLowerCase()}`
        );

        return {
          ...prev,
          mode: nextMode,
          timeLeft: getDurationForMode(nextMode),
          isRunning: settings.autoStartBreaks && nextMode !== 'focus' || 
                    settings.autoStartFocus && nextMode === 'focus',
          isComplete: true,
          currentSession: nextSession,
          totalSessions: newTotalSessions,
        };
      }

      return {
        ...prev,
        timeLeft: prev.timeLeft - 1,
        isComplete: false,
      };
    });
  }, [getDurationForMode, getNextMode, playSound, showNotification, settings]);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, tick]);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isComplete: false }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeLeft: getDurationForMode(prev.mode),
      isRunning: false,
      isComplete: false,
    }));
  }, [getDurationForMode]);

  const switchMode = useCallback((mode: TimerMode) => {
    setState(prev => ({
      ...prev,
      mode,
      timeLeft: getDurationForMode(mode),
      isRunning: false,
      isComplete: false,
    }));
  }, [getDurationForMode]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    state,
    settings,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
    progress: 1 - (state.timeLeft / getDurationForMode(state.mode)),
  };
};