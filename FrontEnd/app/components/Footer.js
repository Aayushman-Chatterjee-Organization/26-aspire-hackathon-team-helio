"use client";

import Link from "next/link";
import {
	Mail,
	Phone,
	Linkedin,
	Instagram,
	Facebook,
	Youtube,
	AtSign,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
	const pathname = usePathname();
	const currentYear = new Date().getFullYear();

	// Don't show footer on login/signup pages
	if (pathname === "/login" || pathname === "/signup") {
		return null;
	}

	// Footer link sections matching PS structure
	const footerSections = [
		{
			links: [
				{ name: "Accessibility", href: "/accessibility" },
				{ name: "Cookie Settings", href: "/cookie-settings" },
				{ name: "Locations", href: "/locations" },
				{ name: "Solutions", href: "/solutions" },
			],
		},
		{
			links: [
				{ name: "Careers", href: "/careers" },
				{ name: "DBT GPT", href: "/dbt-gpt" },
				{ name: "Media", href: "/media" },
				{ name: "SPEED Approach", href: "/speed-approach" },
			],
		},
		{
			links: [
				{ name: "Client Stories", href: "/client-stories" },
				{ name: "Industries", href: "/industries" },
				{ name: "Privacy Policy", href: "/privacy-policy" },
				{ name: "Subscription Center", href: "/subscription-center" },
			],
		},
		{
			links: [
				{ name: "Company Overview", href: "/company-overview" },
				{ name: "Insights", href: "/insights" },
				{ name: "Sapient AI", href: "/sapient-ai" },
				{ name: "Terms", href: "/terms" },
			],
		},
		{
			links: [
				{ name: "Cookie Policy", href: "/cookie-policy" },
				{ name: "Legal", href: "/legal" },
				{ name: "Sitemap", href: "/sitemap" },
			],
		},
	];

	const socialLinks = [
		{
			name: "LinkedIn",
			icon: Linkedin,
			href: "https://linkedin.com/company/publicissapient",
		},
		{
			name: "Instagram",
			icon: Instagram,
			href: "https://instagram.com/publicissapient",
		},
		{
			name: "Facebook",
			icon: Facebook,
			href: "https://facebook.com/publicissapient",
		},
		{
			name: "YouTube",
			icon: Youtube,
			href: "https://youtube.com/publicissapient",
		},
	];

	return (
		<footer className="bg-black text-white">
			{/* Bottom Bar */}
			<div className="bg-black border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						{/* Copyright */}
						<div className="text-sm text-gray-400">
							© {currentYear} Publicis Sapient. All rights reserved. A Publicis
							Groupe Company.
						</div>

						{/* Social Links */}
						<div className="flex items-center space-x-4">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<a
										key={social.name}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors"
										aria-label={social.name}>
										<Icon className="w-5 h-5" />
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
