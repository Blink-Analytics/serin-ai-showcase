'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, GithubIcon, TwitterIcon } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'API', href: '/api' },
			{ title: 'Documentation', href: '/docs' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About', href: '/about' },
			{ title: 'Blog', href: '/blog' },
			{ title: 'Careers', href: '/careers' },
			{ title: 'Contact', href: '/contact' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Help Center', href: '/help' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
			{ title: 'Brand Guidelines', href: '/brand' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
			{ title: 'Twitter', href: '#', icon: TwitterIcon },
			{ title: 'GitHub', href: '#', icon: GithubIcon },
			{ title: 'YouTube', href: '#', icon: YoutubeIcon },
		],
	},
];

export function Footer() {
	return (
		<motion.footer 
			className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 py-12 lg:py-16"
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ 
				duration: 0.8, 
				ease: [0.25, 0.1, 0.25, 1] 
			}}
		>
			{/* Enhanced top border with animated gradient effect */}
			<motion.div 
				className="absolute top-0 right-1/2 left-1/2 h-px w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm"
				initial={{ scaleX: 0, opacity: 0 }}
				whileInView={{ scaleX: 1, opacity: 1 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
			/>

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8 relative z-10">
				<motion.div 
					className="space-y-4"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
				>
					{/* Shree AI Logo/Brand */}
					<motion.div 
						className="flex items-center space-x-3"
						initial={{ scale: 0.9, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-400/20 backdrop-blur-sm">
							<span className="text-blue-300 font-bold text-sm">S</span>
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
							Shree AI
						</span>
					</motion.div>
					<motion.p 
						className="text-blue-200/60 mt-8 text-sm md:mt-4 leading-relaxed max-w-md"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						Revolutionizing recruitment with AI-powered interviews that understand human potential beyond traditional screening methods.
					</motion.p>
					<motion.p 
						className="text-blue-300/50 text-xs"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
					>
						© {new Date().getFullYear()} Shree AI. All rights reserved.
					</motion.p>
				</motion.div>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.6 + index * 0.2}>
							<div className="mb-10 md:mb-0">
								<motion.h3 
									className="text-xs font-semibold text-blue-200/80 tracking-wider uppercase mb-4"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.6, delay: 0.8 + index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
								>
									{section.label}
								</motion.h3>
								<ul className="space-y-3 text-sm">
									{section.links.map((link, linkIndex) => (
										<motion.li 
											key={link.title}
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ 
												duration: 0.5, 
												delay: 1.0 + index * 0.2 + linkIndex * 0.1, 
												ease: [0.25, 0.1, 0.25, 1] 
											}}
										>
											<a
												href={link.href}
												className="text-blue-200/60 hover:text-blue-100 inline-flex items-center transition-all duration-500 hover:translate-x-1 group"
											>
												{link.icon && (
													<link.icon className="me-2 size-4 text-blue-400/50 group-hover:text-blue-300/70 transition-colors duration-300" />
												)}
												{link.title}
											</a>
										</motion.li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</motion.footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	);
}