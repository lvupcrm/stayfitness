'use client'

import { useEffect } from 'react'
import { useCMSStore } from '@/hooks/useCMSStore'

export function CMSInitializer() {
  const { loadInitialData } = useCMSStore()

  useEffect(() => {
    // Load initial data when CMS is mounted
    loadInitialData()
  }, [loadInitialData])

  return null
}