'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NavigationBar() {
	return (
		<motion.nav
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="fixed top-0 w-full z-50 bg-white/70 dark:bg-muted/40 backdrop-blur-xl shadow-2xl shadow-blue-500/5"
		>
			<div className="flex justify-between items-center container mx-auto px-4 xl:px-0 py-4">
				<Link
					href="#"
					className="text-2xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
				>
					SatoshiPay
				</Link>

				<div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-tight">
					<Link href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
						Features
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
						How it Works
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
						Use Cases
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
						Pricing
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						className="hidden md:inline-flex text-sm font-bold text-muted-foreground hover:bg-blue-50/50"
					>
						Sign In
					</Button>

					<Button className="px-6 py-2.5 text-sm font-bold bg-linear-to-r from-blue-600 to-violet-600 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform">
						Get Started
					</Button>
				</div>
			</div>
		</motion.nav>
	)
}
