import { cn } from '@/lib/utils'
import { FeatureCard } from './feature-card'

type FeatureCardSideProps = {
	title: string
	description: string
	icon: React.ElementType
	className?: string
}

export function FeatureCardSide(props: FeatureCardSideProps) {
	const { title, description, icon: Icon, className } = props

	return (
		<FeatureCard
			className={cn(
				'md:col-span-4 bg-blue-500! text-white flex flex-col justify-between',
				className,
			)}
		>
			<span className="material-symbols-outlined text-4xl">
				<Icon className="size-5 text-white" />
			</span>

			<div>
				<h3 className="text-2xl font-headline font-bold mb-4">{title}</h3>

				<p className="text-primary-fixed opacity-90">{description}</p>
			</div>
		</FeatureCard>
	)
}
