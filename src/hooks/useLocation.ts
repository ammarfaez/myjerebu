import { useState, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGeoFeed } from '../services/api'

export type GeoState =
  | { status: 'prompting' }
  | { status: 'loading' }
  | { status: 'success'; lat: number; lon: number }
  | { status: 'denied' }
  | { status: 'unsupported' }
  | { status: 'error'; message: string }

export function useGeolocation() {
  const [state, setState] = useState<GeoState>(() =>
    'geolocation' in navigator ? { status: 'prompting' } : { status: 'unsupported' },
  )

  const locate = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'success',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied' })
        } else {
          setState({ status: 'error', message: err.message })
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }, [])

  const requestLocation = useCallback(() => {
    setState({ status: 'prompting' })
    locate()
  }, [locate])

  useEffect(() => {
    locate()
  }, [locate])

  return { state, requestLocation }
}

export function useGeoReading(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['geo-reading', lat, lon],
    queryFn: () => getGeoFeed(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 30 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  })
}