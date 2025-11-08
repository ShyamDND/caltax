import React from 'react';
import Link from 'next/link';
import { Building2, User2 } from 'lucide-react';

type Props = {};

const settingsOptions = [
	{
		id: 'profile',
		title: 'Profile',
		description: 'Manage your personal information and account settings',
		href: '/dashboard/settings/profile',
		icon: User2,
		color: 'bg-zinc-100 dark:bg-zinc-900',
		iconColor: 'text-blue-600 dark:text-blue-400',
	},
	{
		id: 'company',
		title: 'Company Details',
		description:
			'Manage your company information for invoices and tax collection',
		href: '/dashboard/settings/company',
		icon: Building2,
		color: 'bg-gray-900 dark:bg-zinc-900',
		iconColor: 'text-green-600 dark:text-green-400',
	},
];

export default function SettingsPage({}: Props) {
	return (
		<div className="p-6 space-y-8">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
						Settings
					</h1>
					<p className="text-zinc-600 dark:text-zinc-400 mt-1">
						Manage your account and company settings
					</p>
				</div>
			</div>

			{/* Settings Options Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{settingsOptions.map((option) => (
					<Link
						key={option.id}
						href={option.href}
						className="block group"
					>
						<div className="bg-white dark:bg-zinc-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-6 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
							<div className="flex items-start space-x-4">
								<div
									className={`p-3 rounded-lg ${option.color}`}
								>
									<span
										className={`text-2xl ${option.iconColor}`}
									>
										{<option.icon />}
									</span>
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{option.title}
									</h3>
									<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
										{option.description}
									</p>
									<div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
										<span>Configure</span>
										<svg
											className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Additional Info Section */}
			<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
				<div className="flex items-start space-x-3">
					<div className="shrink-0">
						<svg
							className="w-6 h-6 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
							Future Features
						</h3>
						<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
							As CALTAX evolves into a comprehensive tax
							collection platform, additional settings options
							will be available here for tax configurations,
							compliance settings, and advanced business features.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
