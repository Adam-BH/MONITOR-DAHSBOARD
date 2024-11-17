import React from 'react';
import { AlarmState } from '../types/process';
import { cn } from '../utils/cn';
import CircularProgress from './CircularProgress';
import { RefreshCw } from 'lucide-react';

interface RegenerationCardProps {
	title: string;
	percentage: number;
	status: AlarmState;
	showControls: boolean;
	onStatusChange: (status: AlarmState) => void;
	onPercentageChange: (value: number) => void;
}

export default function RegenerationCard({
	title,
	percentage,
	status,
	showControls,
	onStatusChange,
	onPercentageChange,
}: RegenerationCardProps) {
	const cardColors = {
		normal: 'border-green-100',
		warning: 'border-yellow-100',
		critical: 'border-orange-100',
		emergency: 'border-red-200',
	};

	const statusButtons: AlarmState[] = [
		'normal',
		'warning',
		'critical',
		'emergency',
	];

	return (
		<div
			className={cn(
				'bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300',
				cardColors[status]
			)}
		>
			<div className="flex items-center gap-3 mb-6">
				<RefreshCw className="h-6 w-6 text-gray-600" />
				<h3 className="text-xl font-semibold text-gray-800">{title}</h3>
			</div>

			<div className="flex items-center justify-center py-4">
				<CircularProgress
					percentage={percentage}
					status={status}
					showControls={showControls}
					onValueChange={onPercentageChange}
					size={160}
					strokeWidth={10}
				/>
			</div>

			{showControls && (
				<div className="grid grid-cols-2 gap-2 mt-6">
					{statusButtons.map((statusOption) => (
						<button
							key={statusOption}
							onClick={() => onStatusChange(statusOption)}
							className={cn(
								'px-2 py-1 rounded-md text-sm font-medium transition-colors',
								status === statusOption
									? [
											statusOption === 'normal' && 'bg-green-500 text-white',
											statusOption === 'warning' && 'bg-yellow-500 text-white',
											statusOption === 'critical' && 'bg-orange-500 text-white',
											statusOption === 'emergency' && 'bg-red-500 text-white',
									  ]
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
