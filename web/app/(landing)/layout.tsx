import { Footer } from '@/modules/landing/footer/components/footer'
import NavigationBar from '@/modules/landing/header/components/navigation-bar'
import type { PropsWithChildren } from 'react'

export default function LandingLayout({ children }: PropsWithChildren) {
	return (
		<div className="h-full flex flex-col">
			<NavigationBar />

			{children}

			<Footer />
		</div>
	)
}
