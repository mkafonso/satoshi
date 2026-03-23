import { cn } from '@/lib/utils'
import { FeatureCard } from './feature-card'

type FeatureCardSimpleProps = {
	title: string
	description: string
	icon: React.ElementType
	className?: string
}

export function FeatureCardSimple(props: FeatureCardSimpleProps) {
	const { title, description, icon: Icon, className } = props

	return (
		<FeatureCard
			className={cn(
				'md:col-span-4 bg-surface-container-high flex flex-col justify-between',
				className,
			)}
		>
			<span className="material-symbols-outlined text-4xl text-secondary">
				<Icon className="size-5 text-muted-foreground" />
			</span>

			<div>
				<h3 className="text-2xl font-headline font-bold mb-4">{title}</h3>

				<p className="text-on-surface-variant">{description}</p>
			</div>
		</FeatureCard>
	)
}
