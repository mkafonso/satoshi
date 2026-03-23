'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { motion } from 'motion/react'

type HeroCTAProps = {
	onPrimaryClick?: () => void
	onSecondaryClick?: () => void
}

export function HeroCTA(props: HeroCTAProps) {
	const { onPrimaryClick, onSecondaryClick } = props

	return (
		<div className="flex flex-col sm:flex-row gap-4 pt-4">
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
				<Button
					onClick={onPrimaryClick}
					size="lg"
					className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-600/20 w-full md:w-max"
				>
					Start Accepting Bitcoin
				</Button>
			</motion.div>

			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
				<Button
					variant="secondary"
					onClick={onSecondaryClick}
					size="lg"
					className="flex items-center gap-2 w-full md:w-max"
				>
					View Demo <ArrowRightIcon className="size-5" />
				</Button>
			</motion.div>
		</div>
	)
}
