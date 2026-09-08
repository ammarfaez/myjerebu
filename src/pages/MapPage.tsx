import { useTranslation } from 'react-i18next'
import { useAllStations } from '../hooks/useStations'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import { getIpuColor } from '../utils/ipu'
import IpuLegend from '../components/ui/IpuLegend'
import MapPageSkeleton from '../components/ui/MapPageSkeleton'
import 'leaflet/dist/leaflet.css'

function createIcon(aqi: number): L.DivIcon {
  const color = getIpuColor(aqi)
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 36px; height: 36px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-weight: 700;
        font-size: 11px;
        color: white;
        cursor: pointer;
      ">${aqi}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  })
}

function MapPage() {
  const { t } = useTranslation()
  const { data: stations, isLoading } = useAllStations()

  if (isLoading) return <MapPageSkeleton />

  const center: [number, number] = [3.5, 109]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{t('map.title')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('map.subtitle')}</p>
      </div>

      <div className="mb-4">
        <IpuLegend />
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm" style={{ height: '65vh', minHeight: 400 }}>
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations?.map((station) => {
            const lat = station.station?.lat
            const lon = station.station?.lon
            if (!lat || !lon) return null

            return (
              <Marker
                key={station.station?.idx}
                position={[lat, lon]}
                icon={createIcon(station.aqi)}
              >
                <Popup>
                  <div className="text-center p-1">
                    <p className="font-bold text-sm">{station.station?.name || 'Station'}</p>
                    <p className="text-xs text-slate-500">{station.station?.state || 'Malaysia'}</p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: getIpuColor(station.aqi) }}
                      >
                        {station.aqi}
                      </span>
                    </div>
                    <Link
                      to={`/station/${station.station?.idx}`}
                      className="mt-2 inline-block text-xs text-teal-600 hover:text-teal-700 font-medium"
                    >
                      {t('map.tapToView')} →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}

export default MapPage