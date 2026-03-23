'use client'

import { motion } from 'framer-motion'

export function FooterBrand() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="space-y-4"
		>
			<div className="text-2xl font-bold font-headline bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
				SatoshiPay
			</div>

			<p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
				The premier gateway for non-custodial Bitcoin payments. Built on sound money.
			</p>
		</motion.div>
	)
}
