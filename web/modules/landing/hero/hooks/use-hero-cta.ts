'use client'

import { useCallback } from 'react'

export function useHeroCTA() {
	const handlePrimaryCTA = useCallback(() => {
		console.log('Start Accepting Bitcoin')
	}, [])

	const handleSecondaryCTA = useCallback(() => {
		console.log('View Demo')
	}, [])

	return {
		handlePrimaryCTA,
		handleSecondaryCTA,
	}
}
