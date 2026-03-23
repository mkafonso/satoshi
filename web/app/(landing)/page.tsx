import { HeroSection } from '@/modules/landing/hero/components/hero-section'
import { HowItWorks } from '@/modules/landing/how-it-works/components/how-it-works'

export default function Page() {
	return (
		<div className="space-y-20 pb-40">
			<HeroSection />
			<HowItWorks />
		</div>
	)
}
