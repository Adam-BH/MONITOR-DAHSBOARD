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
				'bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 h-full flex flex-col',
				cardColors[status]
			)}
		>
			<div className="flex items-center gap-3">
				<RefreshCw className="h-6 w-6 text-gray-600" />
				<h3 className="text-xl font-semibold text-gray-800">{title}</h3>
			</div>

			<div className="flex-1 flex items-center justify-center py-8">
				<CircularProgress
					percentage={percentage}
					status={status}
					showControls={showControls}
					onValueChange={onPercentageChange}
					size={140}
					strokeWidth={10}
					decimalPlaces={1}
				/>
			</div>

			{showControls && (
				<div className="mt-auto pt-4">
					<input
						type="range"
						min="0"
						max="100"
						step="0.1"
						value={percentage}
						onChange={(e) => onPercentageChange(Number(e.target.value))}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
					/>
					<div className="text-center mt-2 text-sm text-gray-500">
						Drag to adjust regeneration rate
					</div>
					<div className="grid grid-cols-2 gap-2 mt-4">
						{statusButtons.map((statusOption) => (
							<button
								key={statusOption}
								onClick={() => onStatusChange(statusOption)}
								className={cn(
									'px-2 py-1 rounded-md text-sm font-medium transition-colors',
									status === statusOption
										? [
												statusOption === 'normal' && 'bg-green-500 text-white',
												statusOption === 'warning' &&
													'bg-yellow-500 text-white',
												statusOption === 'critical' &&
													'bg-orange-500 text-white',
												statusOption === 'emergency' && 'bg-red-500 text-white',
										  ]
										: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
								)}
							>
								{statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
