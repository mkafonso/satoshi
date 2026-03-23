'use client'

import { motion } from 'framer-motion'

export function FooterBottom() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay: 0.1 }}
			className="border-t pt-8 text-center"
		>
			<p className="text-sm text-muted-foreground">
				© {new Date().getFullYear()} Satoshi Payment Gateway. Built on Bitcoin.
			</p>
		</motion.div>
	)
}
