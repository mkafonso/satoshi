import { PlusCircle, Share2, Wallet } from 'lucide-react'
import { Step } from '../types/step'

export const Steps: Step[] = [
	{
		id: 'create-payment',
		label: 'STEP 01',
		title: 'Create Payment',
		description:
			'Enter your product details and amount. We generate a unique Bitcoin address for every customer.',
		icon: PlusCircle,
		iconWrapper: 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground',
		stepColor: 'text-primary',
	},
	{
		id: 'share-link',
		label: 'STEP 02',
		title: 'Share Link',
		description:
			'Send the checkout link directly or embed it in your store. Works on any device or platform.',
		icon: Share2,
		iconWrapper: 'bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-amber-500-foreground',
		stepColor: 'text-amber-500',
	},
	{
		id: 'get-paid',
		label: 'STEP 03',
		title: 'Get Paid',
		description:
			'Payments settle directly into your wallet. We never touch your private keys or hold your funds.',
		icon: Wallet,
		iconWrapper: 'bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white',
		stepColor: 'text-emerald-500',
	},
]
