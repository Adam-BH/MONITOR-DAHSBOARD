import React from 'react';
import {
	BeakerIcon,
	Factory,
	Calendar,
	MessageSquareMore,
	BarChart2,
	Settings,
	LogOut,
	Search,
	Bell,
} from 'lucide-react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="w-64 bg-emerald-500 text-white flex flex-col">
				{/* Logo */}
				<div className="p-6">
					<h1 className="text-2xl font-bold">GreenShift</h1>
				</div>

				{/* Navigation */}
				<nav className="flex-1">
					<div className="space-y-1 px-3">
						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg bg-emerald-400/20">
							<BeakerIcon className="h-5 w-5 mr-3" />
							Amine Process Monitor
						</button>

						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
							<Factory className="h-5 w-5 mr-3" />
							CO2 Process Monitor
						</button>

						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
							<Calendar className="h-5 w-5 mr-3" />
							Calendar
						</button>

						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
							<MessageSquareMore className="h-5 w-5 mr-3" />
							Assistant
						</button>

						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
							<BarChart2 className="h-5 w-5 mr-3" />
							Statistics
						</button>

						<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
							<Settings className="h-5 w-5 mr-3" />
							Settings
						</button>
					</div>
				</nav>

				{/* Logout button */}
				<div className="p-4">
					<button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-emerald-400/20">
						<LogOut className="h-5 w-5 mr-3" />
						Log out
					</button>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Top bar */}
				<div className="h-16 bg-white border-b flex items-center justify-between px-6">
					<h2 className="text-xl text-emerald-500 font-medium">
						Dashboard Page
					</h2>
					<div className="flex items-center space-x-4">
						<button className="p-2 hover:bg-gray-100 rounded-lg">
							<Search className="h-5 w-5 text-gray-500" />
						</button>
					</div>
				</div>

				{/* Page content */}
				<div className="flex-1 overflow-auto p-6">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
