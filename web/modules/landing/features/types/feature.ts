export type FeatureType = 'main' | 'side' | 'simple' | 'complex'

interface BaseFeature {
	id: string
	title: string
	description: string
	className?: string
}

export interface MainFeature extends BaseFeature {
	type: 'main'
	icon: React.ElementType
	badges: string[]
}

export interface SideFeature extends BaseFeature {
	type: 'side'
	icon: React.ElementType
}

export interface SimpleFeature extends BaseFeature {
	type: 'simple'
	icon: React.ElementType
}

export interface ComplexFeature extends BaseFeature {
	type: 'complex'
	cta: string
}

export type Feature = MainFeature | SideFeature | SimpleFeature | ComplexFeature
