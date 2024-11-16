import React from 'react';
import { AlarmState } from '../types/process';
import { cn } from '../utils/cn';

interface ProcessCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: AlarmState;
  showControls: boolean;
  onStatusChange: (status: AlarmState) => void;
  onValueChange: (value: number) => void;
}

export default function ProcessCard({ 
  title, 
  value, 
  unit, 
  icon, 
  status,
  showControls,
  onStatusChange,
  onValueChange 
}: ProcessCardProps) {
  const statusColors = {
    normal: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-orange-100 text-orange-800 border-orange-200',
    emergency: 'bg-red-100 text-red-800 border-red-200'
  };

  const cardColors = {
    normal: 'border-green-100',
    warning: 'border-yellow-100',
    critical: 'border-orange-100',
    emergency: 'border-red-200'
  };

  const statusButtons: AlarmState[] = ['normal', 'warning', 'critical', 'emergency'];

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300",
      cardColors[status]
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{icon}</div>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium border",
          statusColors[status]
        )}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      
      <div className="flex items-center gap-2 mb-4">
        {showControls ? (
          <input
            type="number"
            value={value}
            onChange={(e) => onValueChange(parseFloat(e.target.value))}
            className="w-24 px-2 py-1 border rounded-md"
            step="0.1"
          />
        ) : (
          <span className="text-xl font-medium">{value.toFixed(1)}</span>
        )}
        <span className="text-gray-500">{unit}</span>
      </div>

      {showControls && (
        <div className="grid grid-cols-2 gap-2">
          {statusButtons.map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => onStatusChange(statusOption)}
              className={cn(
                "px-2 py-1 rounded-md text-sm font-medium transition-colors",
                status === statusOption ? [
                  statusOption === 'normal' && 'bg-green-500 text-white',
                  statusOption === 'warning' && 'bg-yellow-500 text-white',
                  statusOption === 'critical' && 'bg-orange-500 text-white',
                  statusOption === 'emergency' && 'bg-red-500 text-white'
                ] : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}