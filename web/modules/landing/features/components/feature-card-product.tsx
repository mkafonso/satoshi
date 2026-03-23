'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Archive } from 'lucide-react'
import { FeatureCard } from './feature-card'

type FeatureCardProductProps = {
	title: string
	description: string
	cta: string
	className?: string
}

export function FeatureCardProduct(props: FeatureCardProductProps) {
	const { title, description, cta, className } = props

	return (
		<FeatureCard className={cn('md:col-span-8 bg-violet-500 text-white relative', className)}>
			<div className="absolute inset-0 bg-linear-to-r from-violet-500 to-violet-700 z-0" />

			<div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
				<div className="flex-1">
					<h3 className="text-3xl font-headline font-bold mb-6">{title}</h3>

					<p className="text-white/80 leading-relaxed mb-6">{description}</p>

					<Button>{cta}</Button>
				</div>

				<motion.div
					initial={{ rotate: 3 }}
					whileHover={{ rotate: 0 }}
					transition={{ duration: 0.4 }}
					className="w-full md:w-1/3 bg-white/10 backdrop-blur-md p-6 rounded-2xl"
				>
					<div className="h-32 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
						<span className="material-symbols-outlined text-4xl">
							<Archive className="size-5" />
						</span>
					</div>

					<div className="h-2 w-full bg-white/30 rounded-full mb-2" />
					<div className="h-2 w-2/3 bg-white/30 rounded-full" />
				</motion.div>
			</div>
		</FeatureCard>
	)
}
