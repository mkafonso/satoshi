import { FinalCTA } from '@/modules/landing/cta/components/final-cta'
import { FAQSection } from '@/modules/landing/faq/components/final-cta'
import { Features } from '@/modules/landing/features/components/bento-grid'
import { HeroSection } from '@/modules/landing/hero/components/hero-section'
import { HowItWorks } from '@/modules/landing/how-it-works/components/how-it-works'
import { BuiltForCreators } from '@/modules/landing/social-proof/components/built-for-creators'

export default function Page() {
	return (
		<div>
			<HeroSection />
			<HowItWorks />
			<Features />
			<BuiltForCreators />
			<FAQSection />
			<FinalCTA />
		</div>
	)
}
