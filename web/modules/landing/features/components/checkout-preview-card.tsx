'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { checkoutPreview } from '../data/features'

export function CheckoutPreviewCard() {
	const { product, payment } = checkoutPreview

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
			whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="flex-1 relative"
		>
			<Card className="p-8 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-muted/40 border shadow-2xl">
				<div className="flex gap-6 items-start mb-8">
					<img
						src={product.image}
						alt={product.name}
						className="size-24 rounded-xl object-cover bg-muted"
					/>

					<div>
						<span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md uppercase">
							{product.status}
						</span>

						<h4 className="text-xl font-bold mt-2">{product.name}</h4>

						<p className="text-sm text-muted-foreground">{product.description}</p>
					</div>
				</div>

				<div className="bg-muted rounded-xl p-4 flex justify-between items-center mb-2">
					<div>
						<p className="text-xs text-muted-foreground font-medium">Total Amount</p>
						<p className="text-xl font-mono font-bold text-primary">{payment.amount}</p>
					</div>

					<div className="text-right">
						<p className="text-xs text-muted-foreground font-medium">Network</p>
						<p className="text-sm font-bold">{payment.network}</p>
					</div>
				</div>

				<div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200 mb-4">
					<div className="size-10 rounded-full bg-green-600 flex items-center justify-center text-white">
						✓
					</div>

					<div>
						<p className="text-sm font-bold text-green-800">Payment Confirmed</p>
						<p className="text-sm text-green-600 font-mono">TXID: {payment.txid}</p>
					</div>
				</div>

				<p className="text-center text-xs text-muted-foreground">
					Redirecting to payments in 5s...
				</p>
			</Card>

			<div className="absolute inset-0 -z-10 blur-[100px] bg-primary/20" />
		</motion.div>
	)
}
