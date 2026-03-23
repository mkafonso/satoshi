import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Step } from '../types/step'

type StepCardProps = {
	step: Step
}

export function StepCard(props: StepCardProps) {
	const { step } = props

	return (
		<Card className="group p-8 rounded-xl  h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
			<CardContent className="p-0 h-full">
				<div
					className={cn(
						'size-12 rounded-lg flex items-center justify-center mb-6 transition-colors',
						step.iconWrapper,
					)}
				>
					<step.icon className="size-6" />
				</div>

				<div className={cn('text-xs font-bold mb-2', step.stepColor)}>{step.label}</div>

				<h3 className="text-xl font-bold mb-4">{step.title}</h3>

				<p className="text-muted-foreground leading-relaxed">{step.description}</p>
			</CardContent>
		</Card>
	)
}
