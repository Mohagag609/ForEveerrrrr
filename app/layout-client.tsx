'use client'

import { useEffect } from 'react'
import { reportWebVitals } from '@/lib/web-vitals'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed:', err))
    }

    // Report web vitals
    if (process.env.NODE_ENV === 'production') {
      reportWebVitals()
    }
  }, [])

  return <>{children}</>
}