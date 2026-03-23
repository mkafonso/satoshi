import { Gauge, Key, Link } from 'lucide-react'
import { Feature } from '../types/feature'

export const features: Feature[] = [
	{
		id: 'realtime',
		type: 'main',
		title: 'Real-time Tracking',
		description:
			'Our nodes detect transactions the millisecond they hit the mempool. No more refreshing explorers.',
		icon: Gauge,
		badges: ['LIVE SYNC', '0.1s LATENCY'],
		className: 'md:col-span-8 bg-slate-900 text-white',
	},
	{
		id: 'non-custodial',
		type: 'side',
		title: 'Non-custodial',
		description:
			'Your keys, your coins. SatoshiPay generates addresses from your extended public key (xPub).',
		icon: Key,
		className: 'md:col-span-4 bg-primary-container text-white',
	},
	{
		id: 'payment-links',
		type: 'simple',
		title: 'Payment Links',
		description: 'Create reusable links for tips, donations, or recurring services in one click.',
		icon: Link,
		className: 'md:col-span-4 bg-muted',
	},
	{
		id: 'product',
		type: 'complex',
		title: 'Product & Inventory',
		description:
			'Built-in simple storefront capabilities. Set stock levels, variants, and automated emails upon confirmation.',
		cta: 'Explore Dashboard',
		className: 'md:col-span-8 bg-secondary text-white',
	},
]
