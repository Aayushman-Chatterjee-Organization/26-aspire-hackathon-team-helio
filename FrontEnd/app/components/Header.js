"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	Users,
	BarChart3,
	Settings,
	Menu,
	Brain,
	X,
	LogOut,
	User,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user, logout } = useAuth();

	// Don't show header on login/signup pages
	if (pathname === "/login" || pathname === "/signup") {
		return null;
	}

	const navigation = [
		{ name: "Dashboard", href: "/", icon: Home },
		{ name: "AI Quiz", href: "/quiz", icon: Sparkles },
		{ name: "Matches", href: "/matches", icon: Users },
		// { name: "AI Insights", href: "/insights", icon: Brain },
		// { name: "Analytics", href: "/analytics", icon: BarChart3 },
		// { name: "Settings", href: "/settings", icon: Settings },
	];

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and Brand */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-3">
							<div className="h-8 w-8 rounded-lg flex items-center justify-center">
								<Image
									src="/assets/Group.webp"
									alt="PS Icon"
									width={120}
									height={120}
								/>
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">TalentFlow</h1>
								<p className="text-xs text-gray-500">
									Powered by Publicis Sapient
								</p>
							</div>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex md:space-x-8" role="navigation">
						{navigation.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
										isActive
											? "border-blue-500 text-gray-900"
											: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
									}`}
									aria-current={isActive ? "page" : undefined}>
									<Icon className="w-4 h-4 mr-2" />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* User Menu and PS AI Tools */}
					<div className="hidden lg:flex items-center space-x-6">
						<div className="text-sm text-gray-600">
							<span className="font-medium">AI Tools:</span>
							<span className="ml-2 font-semibold text-blue-600">Bodhi</span>
							<span className="mx-1">•</span>
							<span className="font-semibold text-purple-600">Slingshot</span>
						</div>

						{/* User Dropdown */}
						{user && (
							<div className="flex items-center space-x-3">
								<div className="flex items-center space-x-2">
									<User className="w-5 h-5 text-gray-600" />
									<span className="text-sm font-medium text-gray-700">
										{user.username}
									</span>
								</div>
								<button
									onClick={logout}
									className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
									<LogOut className="w-4 h-4" />
									<span>Logout</span>
								</button>
							</div>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex md:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-expanded={mobileMenuOpen}>
							<span className="sr-only">Open main menu</span>
							{mobileMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileMenuOpen && (
					<div className="md:hidden">
						<div className="space-y-1 pb-3 pt-2">
							{navigation.map((item) => {
								const Icon = item.icon;
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
											isActive
												? "bg-blue-50 border-blue-500 text-blue-700"
												: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
										}`}
										onClick={() => setMobileMenuOpen(false)}>
										<div className="flex items-center">
											<Icon className="w-5 h-5 mr-3" />
											{item.name}
										</div>
									</Link>
								);
							})}
						</div>
						<div className="border-t border-gray-200 pb-3 pt-3">
							<div className="px-4 space-y-3">
								{user && (
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<User className="w-5 h-5 text-gray-600" />
											<span className="text-sm font-medium text-gray-700">
												{user.username}
											</span>
										</div>
										<button
											onClick={logout}
											className="flex items-center space-x-1 text-sm text-gray-600">
											<LogOut className="w-4 h-4" />
											<span>Logout</span>
										</button>
									</div>
								)}
								<p className="text-sm text-gray-600">
									<span className="font-medium">AI Tools:</span>
									<span className="ml-2 font-semibold text-blue-600">
										Bodhi
									</span>
									<span className="mx-1">•</span>
									<span className="font-semibold text-purple-600">
										Slingshot
									</span>
								</p>
							</div>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
