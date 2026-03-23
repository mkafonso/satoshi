'use client'

import { ZapIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { HeroCheckoutPreview } from './hero-checkout-preview'
import { HeroCTA } from './hero-cta'

export function HeroSection() {
	return (
		<section className="relative py-20 overflow-hidden">
			<div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-br from-blue-600/5 to-violet-600/10 blur-3xl opacity-50 rounded-full translate-x-1/3 -translate-y-1/4" />
			<div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-500/5 to-blue-500/10 blur-3xl opacity-30 rounded-full -translate-x-1/4 translate-y-1/4" />

			<div className="container mx-auto px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div className="space-y-8">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest"
					>
						<ZapIcon className="size-4" /> Lightning Network Enabled
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="font-mono text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
					>
						Accept Bitcoin Payments{' '}
						<span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
							Instantly
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-xl text-muted-foreground max-w-lg"
					>
						Non-custodial. No intermediaries. Built for modern businesses that demand financial
						sovereignty and global scale.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<HeroCTA />
					</motion.div>
				</div>

				<div className="relative">
					<HeroCheckoutPreview />
				</div>
			</div>
		</section>
	)
}
