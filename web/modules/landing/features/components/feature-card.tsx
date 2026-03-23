'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type FeatureCardProps = {
	className?: string
	children: React.ReactNode
}

export function FeatureCard(props: FeatureCardProps) {
	const { className, children } = props

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className={cn('rounded-xl p-8 relative overflow-hidden', className)}
		>
			{children}
		</motion.div>
	)
}
