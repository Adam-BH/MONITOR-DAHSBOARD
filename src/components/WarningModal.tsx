import React from 'react';
import { XCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { AlarmState } from '../types/process';
import { cn } from '../utils/cn';

interface WarningModalProps {
	isOpen: boolean;
	onClose: () => void;
	warnings: {
		message: string;
		status: 'warning' | 'critical' | 'emergency';
	}[];
}

export default function WarningModal({
	isOpen,
	onClose,
	warnings,
}: WarningModalProps) {
	if (!isOpen) return null;

	const statusConfig = {
		warning: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-700',
			icon: <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />,
		},
		critical: {
			bg: 'bg-orange-50',
			text: 'text-orange-700',
			icon: <AlertOctagon className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />,
		},
		emergency: {
			bg: 'bg-red-50',
			text: 'text-red-700',
			icon: <AlertOctagon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />,
		},
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center">
						<AlertTriangle className="h-8 w-8 mr-3 text-yellow-500" />
						<h2 className="text-2xl font-bold text-gray-900">Process Alerts</h2>
					</div>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<XCircle className="h-6 w-6" />
					</button>
				</div>

				{warnings.length === 0 ? (
					<p className="text-gray-600">No active alerts</p>
				) : (
					<div className="space-y-4">
						{warnings.map(
							(warning, index) =>
								warning.status !== 'normal' && (
									<div
										key={index}
										className={cn(
											'flex items-start p-4 rounded-lg',
											statusConfig[warning.status].bg
										)}
									>
										{statusConfig[warning.status].icon}
										<p className={statusConfig[warning.status].text}>
											{warning.message}
										</p>
									</div>
								)
						)}
					</div>
				)}

				<button
					onClick={onClose}
					className="mt-6 w-full py-2 px-4 rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors"
				>
					Close
				</button>
			</div>
		</div>
	);
}
