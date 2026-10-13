import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's broken default icon path in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom amber icon for destination
const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Auto-fit map to show both markers
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length >= 2) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, positions]);
  return null;
}

export default function TripMap({ origin, destination, originCoords, destCoords, highlights = [] }) {
  // Fallback coordinates for common cities if not provided
  const CITY_COORDS = {
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'visakhapatnam': { lat: 17.6868, lng: 83.2185 },
    'vizag': { lat: 17.6868, lng: 83.2185 },
    'araku valley': { lat: 18.3273, lng: 82.8775 },
    'tirupati': { lat: 13.6288, lng: 79.4192 },
    'vijayawada': { lat: 16.5062, lng: 80.6480 },
    'gandikota': { lat: 14.8143, lng: 78.2865 },
    'warangal': { lat: 17.9689, lng: 79.5941 },
    'goa': { lat: 15.2993, lng: 74.1240 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
  };

  const getCoords = (name, fallback) => {
    if (fallback && fallback.lat) return [fallback.lat, fallback.lng];
    const key = name?.toLowerCase();
    for (const [city, coords] of Object.entries(CITY_COORDS)) {
      if (key?.includes(city) || city.includes(key)) return [coords.lat, coords.lng];
    }
    return [17.3850, 78.4867]; // AP center fallback
  };

  const originPos = getCoords(origin, originCoords);
  const destPos = getCoords(destination, destCoords);
  const center = [(originPos[0] + destPos[0]) / 2, (originPos[1] + destPos[1]) / 2];

  const routeLine = [originPos, destPos];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '320px' }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={routeLine} />

        {/* Origin marker */}
        <Marker position={originPos}>
          <Popup>
            <div className="text-xs font-semibold">
              <p className="text-slate-500">Departing from</p>
              <p className="text-slate-900 font-bold">{origin}</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination marker (amber) */}
        <Marker position={destPos} icon={destIcon}>
          <Popup>
            <div className="text-xs">
              <p className="text-amber-700 font-bold text-sm">{destination}</p>
              {highlights.slice(0, 2).map((h, i) => (
                <p key={i} className="text-slate-600 mt-0.5">• {h}</p>
              ))}
            </div>
          </Popup>
        </Marker>

        {/* Route line */}
        <Polyline
          positions={routeLine}
          pathOptions={{ color: '#f59e0b', weight: 2.5, dashArray: '8 6', opacity: 0.85 }}
        />
      </MapContainer>
    </div>
  );
}
