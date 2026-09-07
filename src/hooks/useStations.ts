import { useQuery } from '@tanstack/react-query'
import { getAllStations, getStationFeed } from '../services/api'
import { StationReading } from '../types'

export function useAllStations() {
  return useQuery<StationReading[], Error>({
    queryKey: ['all-stations'],
    queryFn: getAllStations,
    staleTime: 30 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  })
}

export function useStation(stationId: number | null) {
  return useQuery<StationReading, Error>({
    queryKey: ['station', stationId],
    queryFn: () => getStationFeed(stationId!),
    enabled: stationId !== null && stationId > 0,
    staleTime: 30 * 60 * 1000,
    refetchInterval: false,
  })
}

export function useHighestReading(stations?: StationReading[]) {
  if (!stations || stations.length === 0) return null
  return stations.reduce((max, s) => (s.aqi > max.aqi ? s : max), stations[0])
}

export function useLowestReading(stations?: StationReading[]) {
  if (!stations || stations.length === 0) return null
  return stations.reduce((min, s) => (s.aqi < min.aqi ? s : min), stations[0])
}