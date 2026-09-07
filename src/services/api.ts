import axios from 'axios'
import { StationFeed, StationReading, WaqiStation, IpuCategory } from '../types'
import { getIpuCategory } from '../utils/ipu'
import { MY_STATIONS, MyStation } from '../utils/constants'

const BASE_URL = 'https://api.waqi.info'
const TOKEN = import.meta.env.VITE_WAQI_TOKEN || 'demo'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

function toReading(station: MyStation, st: any): StationReading {
  const waqiStation: WaqiStation = {
    idx: station.id,
    name: station.name,
    lat: station.lat,
    lon: station.lon,
    country: 'MY',
    state: station.state,
  }

  const category: IpuCategory = getIpuCategory(st.aqi)

  return {
    station: waqiStation,
    aqi: st.aqi,
    dominant_pollutant: st.dominentpol,
    polymeasures: {
      pm25: st.iaqi?.pm25?.v,
      pm10: st.iaqi?.pm10?.v,
      o3: st.iaqi?.o3?.v,
      no2: st.iaqi?.no2?.v,
      so2: st.iaqi?.so2?.v,
      co: st.iaqi?.co?.v,
    },
    time: st.time?.s || new Date().toISOString(),
    category,
  }
}

export async function getStationFeed(stationId: number): Promise<StationReading> {
  const station = MY_STATIONS.find((s) => s.id === stationId)
  if (!station) throw new Error(`Unknown station ${stationId}`)

  const { data } = await api.get<StationFeed>(`/feed/geo:${station.lat};${station.lon}/`, {
    params: { token: TOKEN },
  })

  if (data.status !== 'ok') {
    throw new Error(`Station ${station.name} failed`)
  }

  return toReading(station, data.data)
}

export async function getAllStations(): Promise<StationReading[]> {
  const requests = MY_STATIONS.map((s) =>
    getStationFeed(s.id).catch(() => null),
  )
  const results = await Promise.all(requests)

  const readings = results.filter((r): r is StationReading => r !== null)

  return readings.sort((a, b) => b.aqi - a.aqi)
}

export function fillCategory(reading: StationReading): StationReading {
  const category: IpuCategory = getIpuCategory(reading.aqi)
  return { ...reading, category }
}

export { api }