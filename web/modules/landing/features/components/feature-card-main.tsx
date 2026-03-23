import { cn } from '@/lib/utils'
import { FeatureCard } from './feature-card'

type FeatureCardMainProps = {
	title: string
	description: string
	icon: React.ElementType
	badges?: string[]
	className?: string
}

export function FeatureCardMain(props: FeatureCardMainProps) {
	const { title, description, icon: Icon, badges, className } = props

	return (
		<FeatureCard
			className={cn('md:col-span-8 bg-slate-900 text-white flex flex-col justify-end', className)}
		>
			<div className="absolute top-0 right-0 w-2/3 h-2/3 bg-linear-to-bl from-primary/40 to-transparent blur-3xl opacity-50" />

			<div className="relative z-10 space-y-6">
				<span className="material-symbols-outlined text-4xl text-primary-fixed-dim">
					<Icon className="size-5 text-white" />
				</span>

				<h3 className="pt-4 text-4xl font-headline font-bold">{title}</h3>

				<p className="text-lg text-slate-300 max-w-md">{description}</p>

				<div className="pt-4 flex gap-4">
					{badges?.map((b: string) => (
						<span key={b} className="px-4 py-2 rounded-full bg-white/10 text-xs font-mono">
							{b}
						</span>
					))}
				</div>
			</div>
		</FeatureCard>
	)
}
