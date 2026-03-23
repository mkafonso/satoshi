'use client'

import { motion } from 'framer-motion'
import { creators, stats } from '../data/creators'
import { CreatorCard } from './creator-card'

export function BuiltForCreators() {
	return (
		<section className="py-20 md:py-36 bg-muted/40">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
					<div>
						<motion.h2
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="text-4xl font-bold mb-12"
						>
							Built for every creator.
						</motion.h2>

						<div className="space-y-6">
							{creators.map((creator, index) => (
								<motion.div
									key={creator.id}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.15 }}
								>
									<CreatorCard creator={creator} />
								</motion.div>
							))}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="bg-muted rounded-xl p-12 border border-border"
					>
						<div className="space-y-10">
							{stats.map((stat, index) => (
								<div key={index}>
									<div className={`text-5xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>

									<div className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
