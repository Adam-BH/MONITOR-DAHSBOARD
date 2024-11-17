import React from 'react';
import { cn } from '../utils/cn';
import { AlertTriangle } from 'lucide-react';

interface AlertBannerProps {
	warnings: { message: string }[];
}

export default function AlertBanner({ warnings }: AlertBannerProps) {
	if (warnings.length === 0) return null;

	return (
		<div className="mb-6 space-y-2">
			{warnings.map((warning, index) => (
				<div
					key={index}
					className="bg-red-50 border-l-4 border-red-400 p-4 flex items-center"
				>
					<AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
					<p className="text-red-700">{warning.message}</p>
				</div>
			))}
		</div>
	);
}
