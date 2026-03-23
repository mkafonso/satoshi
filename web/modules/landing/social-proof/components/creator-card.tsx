'use client'

import { Card } from '@/components/ui/card'

type CreatorCardProps = {
	creator: {
		id: number
		title: string
		description: string
		icon: React.ElementType
		color: string
	}
}

export function CreatorCard(props: CreatorCardProps) {
	const { creator } = props
	const Icon = creator.icon

	return (
		<Card className="p-6 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition">
			<div className={`size-10 rounded-xl flex items-center justify-center ${creator.color}`}>
				<Icon className="size-5" />
			</div>

			<div>
				<h4 className="font-bold text-lg">{creator.title}</h4>
				<p className="text-muted-foreground">{creator.description}</p>
			</div>
		</Card>
	)
}
