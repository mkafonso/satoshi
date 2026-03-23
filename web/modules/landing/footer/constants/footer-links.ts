import { FooterColumn } from '../types/footer.types'

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '#' },
			{ label: 'API Docs', href: '#' },
			{ label: 'Status', href: '#' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'Twitter', href: '#' },
			{ label: 'GitHub', href: '#' },
			{ label: 'Privacy Policy', href: '#' },
		],
	},
	{
		title: 'Support',
		links: [
			{ label: 'Help Center', href: '#' },
			{ label: 'Terms of Service', href: '#' },
			{ label: 'Contact', href: '#' },
		],
	},
]
