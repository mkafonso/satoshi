'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function FinalCTA() {
	return (
		<section className="relative overflow-hidden py-20 md:py-32">
			<div className="absolute inset-0 -z-10 bg-slate-900" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,88,190,0.15),transparent_50%)]" />

			<div className="mx-auto max-w-4xl px-6 text-center text-white">
				<motion.h2
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8 text-5xl font-bold tracking-tight"
				>
					Start accepting Bitcoin today.
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="mx-auto mb-12 max-w-2xl text-xl text-slate-300 leading-relaxed"
				>
					Join thousands of businesses already scaling with the world’s most secure decentralized
					payment network.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2 }}
					className="flex flex-col sm:flex-row gap-6 justify-center"
				>
					<Button
						size="lg"
						className="px-6 font-bold bg-linear-to-r text-white from-blue-600 to-violet-600 shadow-xl hover:scale-105 transition"
					>
						Create your first payment
					</Button>

					<Button
						variant="outline"
						size="lg"
						className="px-6 font-bold bg-white/10 border-white/20 text-white hover:bg-white/20"
					>
						Contact Sales
					</Button>
				</motion.div>
			</div>
		</section>
	)
}
