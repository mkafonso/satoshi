import { Features } from '@/modules/landing/features/components/bento-grid'
import { HeroSection } from '@/modules/landing/hero/components/hero-section'
import { HowItWorks } from '@/modules/landing/how-it-works/components/how-it-works'

export default function Page() {
	return (
		<div className="pb-40">
			<HeroSection />
			<HowItWorks />
			<Features />
		</div>
	)
}
