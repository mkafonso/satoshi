import { Pencil, ShoppingBag, User } from 'lucide-react'

export const creators = [
	{
		id: 1,
		title: 'Freelancers',
		description: 'Receive global payments without bank delays or 3% platform fees.',
		icon: User,
		color: 'bg-blue-50 text-primary dark:text-black',
	},
	{
		id: 2,
		title: 'E-commerce',
		description: 'Seamlessly integrate Bitcoin into your existing checkout flow.',
		icon: ShoppingBag,
		color: 'bg-violet-50 text-violet-800',
	},
	{
		id: 3,
		title: 'Digital Creators',
		description: 'Sell assets, courses, or early access directly with Lightning.',
		icon: Pencil,
		color: 'bg-emerald-50 text-emerald-800',
	},
]

export const stats = [
	{
		value: '10,000+',
		label: 'Payments Processed',
		color: 'text-primary',
	},
	{
		value: '99.9%',
		label: 'Uptime Guaranteed',
		color: 'text-violet-800',
	},
	{
		value: '0%',
		label: 'Middleman Fees',
		color: 'text-emerald-800',
	},
]
