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
		className: 'md:col-span-4 text-white',
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

export const checkoutFeature = {
	badge: 'Use Case Preview',
	title: 'The ultimate checkout experience.',
	description:
		"We've optimized every pixel of the payment flow to ensure your customers never abandon their carts. From Lightning support to clear confirmation statuses.",
	bullets: [
		'Optimized for Mobile Conversion',
		'Lightning & On-chain Automatic Detection',
		'Zero-Conf support for small payments',
	],
}

export const checkoutPreview = {
	product: {
		name: 'Satoshi Series One — Midnight',
		description: 'Limited Edition Mechanical Watch',
		status: 'In Stock',
		image: 'https://m.media-amazon.com/images/I/51YcmA4AciL._AC_SX679_.jpg',
	},
	payment: {
		amount: '0.00512 BTC',
		network: 'Bitcoin Mainnet',
		txid: '4a5e1e...9d8e',
	},
}
