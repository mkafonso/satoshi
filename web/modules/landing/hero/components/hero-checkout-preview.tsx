'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'motion/react'

export function HeroCheckoutPreview() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="relative flex justify-center w-full"
		>
			<div className="relative z-10 max-w-sm w-full">
				<Card className="p-6 rounded-xl bg-white/70 dark:bg-muted/40 backdrop-blur-xl shadow-2xl max-w-md">
					<CardContent className="p-0">
						<div className="flex justify-between items-start mb-8">
							<div>
								<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
									Payment Request
								</p>
								<h3 className="text-xl font-bold">Checkout</h3>
							</div>

							<div className="size-8 rounded-full bg-black flex items-center justify-center text-white">
								₿
							</div>
						</div>

						<div className="bg-muted p-6 rounded-xl mb-8 flex flex-col items-center shadow-inner">
							<div className="w-48 h-48 mb-6 relative bg-white rounded-lg flex items-center justify-center">
								<span className="text-xs text-muted-foreground">QR CODE</span>

								<span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full animate-pulse" />
							</div>

							<p className="font-mono text-sm text-muted-foreground break-all text-center">
								bc1q...x7p9
							</p>

							<div className="text-2xl font-bold my-2">0.0024 BTC</div>
							<div className="text-sm text-muted-foreground">≈ $145.20 USD</div>
						</div>

						<div className="space-y-4">
							<div className="flex justify-between items-center p-2 rounded-lg bg-muted">
								<span className="text-xs text-muted-foreground">Network Fee</span>
								<span className="text-xs font-mono font-bold text-blue-600">Sats only</span>
							</div>

							<div className="flex justify-between items-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
								<span className="text-xs text-green-700">Status</span>

								<span className="flex items-center gap-2 text-xs font-bold text-green-700">
									<span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
									Waiting for Payment
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="absolute -bottom-6 -right-6 w-full h-full bg-violet-500/10 blur-2xl rounded-[2rem]" />
		</motion.div>
	)
}
