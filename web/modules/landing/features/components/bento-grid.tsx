import { features } from '../data/features'
import { FeatureCardMain } from './feature-card-main'
import { FeatureCardProduct } from './feature-card-product'
import { FeatureCardSide } from './feature-card-side'
import { FeatureCardSimple } from './feature-card-simple'

export function Features() {
	return (
		<div className="container mx-auto px-4 md:px-0 py-20 md:py-36">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{features.map((feature) => {
					switch (feature.type) {
						case 'main':
							return <FeatureCardMain key={feature.id} {...feature} />

						case 'side':
							return <FeatureCardSide key={feature.id} {...feature} />

						case 'simple':
							return <FeatureCardSimple key={feature.id} {...feature} />

						case 'complex':
							return <FeatureCardProduct key={feature.id} {...feature} />

						default:
							return null
					}
				})}
			</div>
		</div>
	)
}
