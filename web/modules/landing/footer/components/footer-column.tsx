'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FooterColumn as FooterColumnType } from '../types/footer.types'

type FooterColumnProps = {
	column: FooterColumnType
}

export function FooterColumn(props: FooterColumnProps) {
	const { column } = props

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
		>
			<h5 className="font-semibold mb-4 text-foreground">{column.title}</h5>

			<ul className="space-y-2 text-sm text-muted-foreground">
				{column.links.map((link) => (
					<li key={link.label}>
						<Link href={link.href} className="hover:text-primary transition-colors">
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</motion.div>
	)
}
