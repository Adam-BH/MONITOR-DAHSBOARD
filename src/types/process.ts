export type AlarmState = 'normal' | 'warning' | 'critical' | 'emergency';

export interface ProcessVariable {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: AlarmState;
  thresholds: {
    warning: { min: number; max: number };
    critical: { min: number; max: number };
    emergency: { min: number; max: number };
  };
}