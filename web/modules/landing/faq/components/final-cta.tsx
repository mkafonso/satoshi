'use client'

import { motion } from 'framer-motion'

export function FAQSection() {
	const faqs = [
		{
			q: 'Is SatoshiPay non-custodial?',
			a: 'Yes. We never touch your private keys. You provide an xPub (Extended Public Key), and we use it to generate fresh receive addresses that only you can spend from.',
		},
		{
			q: 'How quickly do I receive funds?',
			a: "Funds go directly from your customer's wallet to your wallet. Settlement speed depends on the Bitcoin network congestion, but we detect transactions instantly.",
		},
		{
			q: 'Do you support the Lightning Network?',
			a: 'Absolutely. We support Lightning invoices for instant, near-zero fee payments, alongside traditional on-chain transactions.',
		},
	]

	return (
		<section className="bg-slate-100 dark:bg-slate-800 py-20 md:py-32">
			<div className="mx-auto max-w-3xl px-6">
				<h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

				<div className="space-y-4">
					{faqs.map((item, i) => (
						<motion.details
							key={i}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.05 }}
							className="group dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm"
							open={i === 0}
						>
							<summary className="flex justify-between items-center p-6 cursor-pointer list-none">
								<span className="font-bold">{item.q}</span>
								<span className="transition-transform group-open:rotate-180">▾</span>
							</summary>

							<div className="p-6 text-muted-foreground leading-relaxed border-t">{item.a}</div>
						</motion.details>
					))}
				</div>
			</div>
		</section>
	)
}
