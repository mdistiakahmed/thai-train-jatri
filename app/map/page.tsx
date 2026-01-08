'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

/**
 * FIX 1: Leaflet Icons in Next.js
 * Default icons break in Next.js because of path issues. 
 * This code manually resets the default marker icons.
 */
const fixLeafletIcon = async () => {
  const L = (await import('leaflet')).default;
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// Data structures
const stations = {
  'Krung Thep Aphiwat': { lat: 13.8059, lng: 100.5366 },
  'Surat Thani': { lat: 9.1383, lng: 99.3215 },
  'Chiang Mai': { lat: 18.7877, lng: 99.0031 },
  'Hat Yai': { lat: 7.0056, lng: 100.4674 },
  'Nakhon Ratchasima': { lat: 14.9799, lng: 102.0976 },
};

const routes = {
  'bangkok-chiang-mai': {
    name: 'Krung Thep Aphiwat to Chiang Mai',
    coordinates: [[13.8059, 100.5366], [14.9799, 102.0976], [18.7877, 99.0031]] as [number, number][],
    color: '#3182ce'
  },
  'bangkok-surat-thani': {
    name: 'Krung Thep Aphiwat to Surat Thani',
    coordinates: [[13.8059, 100.5366], [13.2, 100.0], [9.1383, 99.3215]] as [number, number][],
    color: '#e53e3e'
  }
};

/**
 * FIX 2: Create a separate Inner component to use Leaflet Hooks
 */
const MapViewHandler = ({ selectedRoute }: { selectedRoute: string | null }) => {
  const { useMap } = require('react-leaflet');
  const map = useMap();

  useEffect(() => {
    if (selectedRoute && routes[selectedRoute as keyof typeof routes]) {
      const coords = routes[selectedRoute as keyof typeof routes].coordinates;
      map.fitBounds(coords, { padding: [50, 50] });
    }
  }, [selectedRoute, map]);

  return null;
};

/**
 * FIX 3: Wrap everything in a component that only runs on the client
 */
const MapComponent = () => {
  const { MapContainer, TileLayer, Polyline, Marker, Popup } = require('react-leaflet');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Thailand Railway Network</h1>
      
      <div className="mb-6">
        <select
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={selectedRoute || ''}
        >
          <option value="">-- Select a route --</option>
          {Object.entries(routes).map(([id, route]) => (
            <option key={id} value={id}>{route.name}</option>
          ))}
        </select>
      </div>

      <div className="h-[600px] w-full rounded-lg shadow-lg overflow-hidden relative">
        <MapContainer
          center={[13.7563, 100.5018]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          <MapViewHandler selectedRoute={selectedRoute} />

          {Object.entries(routes).map(([id, route]) => (
            <Polyline
              key={id}
              positions={route.coordinates}
              pathOptions={{
                color: selectedRoute === id ? route.color : '#a0aec0',
                weight: selectedRoute === id ? 5 : 2,
                opacity: selectedRoute === id ? 1 : 0.5
              }}
            />
          ))}

          {Object.entries(stations).map(([name, coords]) => (
            <Marker key={name} position={[coords.lat, coords.lng]}>
              <Popup><strong>{name}</strong></Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

// Final Export using Dynamic Import to disable SSR
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div>
});