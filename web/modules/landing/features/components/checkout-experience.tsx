'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { checkoutFeature } from '../data/features'
import { CheckoutPreviewCard } from './checkout-preview-card'

export function CheckoutExperience() {
	return (
		<section className="py-24 bg-background overflow-hidden">
			<div className="flex flex-col lg:flex-row items-center gap-20">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex-1 space-y-8"
				>
					<Badge className="bg-emerald-600 text-white uppercase tracking-wider">
						{checkoutFeature.badge}
					</Badge>

					<h2 className="text-4xl md:text-5xl font-bold tracking-tight">{checkoutFeature.title}</h2>

					<p className="text-lg text-muted-foreground leading-relaxed">
						{checkoutFeature.description}
					</p>

					<ul className="space-y-4">
						{checkoutFeature.bullets.map((item, i) => (
							<li key={i} className="flex items-center gap-3 font-medium">
								<CheckCircle className="text-primary w-5 h-5" />
								{item}
							</li>
						))}
					</ul>
				</motion.div>

				<CheckoutPreviewCard />
			</div>
		</section>
	)
}
