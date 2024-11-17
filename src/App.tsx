import React, { useState } from 'react';
import {
	Thermometer,
	Gauge,
	FlaskConical,
	Droplet,
	Activity,
	BarChart3,
	Bell,
	Settings,
} from 'lucide-react';
import ProcessCard from './components/ProcessCard';
import WarningModal from './components/WarningModal';
import { ProcessVariable, AlarmState } from './types/process';
import RegenerationCard from './components/RegenerationCard';

function App() {
	const [showWarnings, setShowWarnings] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [processVariables, setProcessVariables] = useState<ProcessVariable[]>([
		{
			title: 'Temperature',
			value: 75.5,
			unit: '°C',
			icon: <Thermometer className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 70, max: 85 },
				critical: { min: 65, max: 90 },
				emergency: { min: 60, max: 95 },
			},
		},
		{
			title: 'Pressure',
			value: 2.4,
			unit: 'bar',
			icon: <Gauge className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 2.0, max: 3.0 },
				critical: { min: 1.8, max: 3.2 },
				emergency: { min: 1.5, max: 3.5 },
			},
		},
		{
			title: 'Concentration',
			value: 0.85,
			unit: 'mol/L',
			icon: <FlaskConical className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 0.7, max: 0.9 },
				critical: { min: 0.65, max: 0.95 },
				emergency: { min: 0.6, max: 1.0 },
			},
		},
		{
			title: 'Flow Rate',
			value: 12.3,
			unit: 'L/min',
			icon: <Droplet className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 10, max: 15 },
				critical: { min: 9, max: 16 },
				emergency: { min: 8, max: 17 },
			},
		},
		{
			title: 'pH Level',
			value: 7.2,
			unit: 'pH',
			icon: <Activity className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 6.5, max: 8.0 },
				critical: { min: 6.2, max: 8.3 },
				emergency: { min: 6.0, max: 8.5 },
			},
		},
		{
			title: 'Absorption Efficiency',
			value: 92.5,
			unit: '%',
			icon: <BarChart3 className="h-6 w-6" />,
			status: 'normal',
			thresholds: {
				warning: { min: 85, max: 95 },
				critical: { min: 82, max: 96 },
				emergency: { min: 80, max: 97 },
			},
		},
	]);

	const [regeneration, setRegeneration] = useState({
		title: 'Regeneration Rate',
		percentage: 85,
		status: 'normal' as AlarmState,
	});

	const updateProcessStatus = (index: number, status: AlarmState) => {
		setProcessVariables((prev) =>
			prev.map((variable, i) =>
				i === index ? { ...variable, status } : variable
			)
		);
	};

	const updateProcessValue = (index: number, newValue: number) => {
		setProcessVariables((prev) =>
			prev.map((variable, i) =>
				i === index ? { ...variable, value: newValue } : variable
			)
		);
	};

	const updateRegenerationStatus = (status: AlarmState) => {
		setRegeneration((prev) => ({ ...prev, status }));
	};

	const updateRegenerationPercentage = (percentage: number) => {
		setRegeneration((prev) => ({ ...prev, percentage }));
	};

	const getWarnings = () => {
		return processVariables
			.filter((variable) => variable.status !== 'normal')
			.map((variable) => ({
				message: `${variable.title}: ${variable.value.toFixed(2)} ${
					variable.unit
				} - ${
					variable.status === 'emergency'
						? '⚠️ IMMEDIATE ACTION REQUIRED'
						: variable.status === 'critical'
						? 'Critical threshold exceeded'
						: 'Outside normal range'
				}`,
				status: variable.status,
			}));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Process Monitor</h1>
					<div className="flex gap-4">
						<button
							onClick={() => setShowControls(!showControls)}
							className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
						>
							<Settings className="h-5 w-5" />
							{showControls ? 'Hide Controls' : 'Show Controls'}
						</button>
						<button
							onClick={() => setShowWarnings(true)}
							className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
						>
							<Bell className="h-5 w-5" />
							View Alerts
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{processVariables.map((variable, index) => (
							<ProcessCard
								key={index}
								{...variable}
								showControls={showControls}
								onStatusChange={(status) => updateProcessStatus(index, status)}
								onValueChange={(value) => updateProcessValue(index, value)}
							/>
						))}
					</div>
					<div className="h-fit">
						<RegenerationCard
							{...regeneration}
							showControls={showControls}
							onStatusChange={updateRegenerationStatus}
							onPercentageChange={updateRegenerationPercentage}
						/>
					</div>
				</div>

				<WarningModal
					isOpen={showWarnings}
					onClose={() => setShowWarnings(false)}
					warnings={getWarnings()}
				/>
			</div>
		</div>
	);
}

export default App;
