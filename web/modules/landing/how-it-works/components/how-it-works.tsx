'use client'

import { motion } from 'framer-motion'
import { Steps } from '../data/steps'
import { StepCard } from './step-card'

export function HowItWorks() {
	return (
		<div className="container mx-auto px-4 md:px-0">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="text-center mb-20 space-y-4"
			>
				<h2 className="font-mono text-4xl font-bold tracking-tight">Three steps to sovereignty.</h2>

				<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
					Get up and running in minutes, not days. No credit checks or lengthy onboarding.
				</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{Steps.map((step, index) => (
					<motion.div
						key={step.id}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.15 }}
					>
						<StepCard step={step} />
					</motion.div>
				))}
			</div>
		</div>
	)
}
