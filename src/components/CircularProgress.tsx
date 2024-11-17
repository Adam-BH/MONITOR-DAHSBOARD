import React from 'react';
import { AlarmState } from '../types/process';

interface CircularProgressProps {
	percentage: number;
	size?: number;
	strokeWidth?: number;
	showControls?: boolean;
	status: AlarmState;
	onValueChange?: (value: number) => void;
}

export default function CircularProgress({
	percentage,
	size = 200,
	strokeWidth = 12,
	showControls = false,
	status,
	onValueChange,
	decimalPlaces = 0,
}: CircularProgressProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const progress = ((100 - percentage) / 100) * circumference;

	const statusColors = {
		normal: '#22c55e',
		warning: '#eab308',
		critical: '#f97316',
		emergency: '#ef4444',
	};

	const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
		if (!showControls || !onValueChange) return;

		const svg = e.currentTarget;
		const rect = svg.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
		let newPercentage = ((angle + Math.PI / 2) / (2 * Math.PI)) * 100;
		if (newPercentage < 0) newPercentage += 100;

		onValueChange(Number(newPercentage.toFixed(decimalPlaces)));
	};

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg
				width={size}
				height={size}
				className={showControls ? 'cursor-pointer' : ''}
				onClick={handleClick}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="#e5e7eb"
					strokeWidth={strokeWidth}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={statusColors[status]}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={progress}
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
					strokeLinecap="round"
				/>
			</svg>
			<div className="absolute text-2xl font-bold">
				{showControls ? (
					<input
						type="number"
						value={percentage.toFixed(decimalPlaces)}
						onChange={(e) => onValueChange?.(Number(e.target.value))}
						className="w-24 text-center bg-transparent"
						min="0"
						max="100"
						step="0.1"
					/>
				) : (
					`${percentage.toFixed(decimalPlaces)}%`
				)}
			</div>
		</div>
	);
}
