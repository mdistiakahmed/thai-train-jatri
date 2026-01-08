'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1. Robust Fix for Marker Icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 2. Thailand GeoJSON URL (Reliable source for national border)
const THAILAND_BORDER_URL = "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/THA/ADM0/geoBoundaries-THA-ADM0.geojson";

// Data: Basic Railway Infrastructure
const stations = {
  'Krung Thep Aphiwat': { lat: 13.8059, lng: 100.5366 },
  'Chiang Mai': { lat: 18.7877, lng: 99.0031 },
  'Surat Thani': { lat: 9.1383, lng: 99.3215 },
  'Pattaya': { lat: 12.9200, lng: 100.9000 },
};

const routes = {
  'northern-line': {
    name: 'Northern Line (Bangkok - Chiang Mai)',
    coordinates: [[13.8059, 100.5366], [15.5, 100.1], [18.7877, 99.0031]] as [number, number][],
  },
  'southern-line': {
    name: 'Southern Line (Bangkok - Surat Thani)',
    coordinates: [[13.8059, 100.5366], [12.5, 99.9], [9.1383, 99.3215]] as [number, number][],
  },
  'eastern-line': {
    name: 'Eastern Line (Bangkok - Pattaya)',
    coordinates: [[13.8059, 100.5366], [13.6, 100.8], [12.9200, 100.9000]] as [number, number][],
  }
};

const MapComponent = () => {
  const { MapContainer, TileLayer, Polyline, Marker, Popup, GeoJSON, Tooltip } = require('react-leaflet');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch(THAILAND_BORDER_URL)
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      {/* 1. Route Selection Dropdown */}
      <div className="bg-white p-4 rounded shadow-sm border">
        <label className="block text-sm font-bold mb-2">Highlight Train Route:</label>
        <select 
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedRoute(e.target.value || null)}
          value={selectedRoute || ''}
        >
          <option value="">-- All Routes (Railroad View) --</option>
          {Object.entries(routes).map(([id, r]) => (
            <option key={id} value={id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="h-[700px] w-full border-2 border-gray-300 rounded-lg overflow-hidden relative">
        <MapContainer center={[13.7367, 100.5231]} zoom={6} style={{ height: '100%' }}>
          
          {/* TileLayer with English Labels */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />

          {/* 3. Thailand Boundary (Black Thick Line) */}
          {geoData && (
            <GeoJSON 
              data={geoData} 
              style={{ color: 'black', weight: 4, fillOpacity: 0.05, dashArray: '' }} 
            />
          )}

          {/* 2 & 3. Rail Routes with dynamic styling */}
          {Object.entries(routes).map(([id, route]) => {
            const isSelected = selectedRoute === id;
            return (
              <div key={id}>
                {/* Background Shadow/Base Line */}
                <Polyline 
                  positions={route.coordinates} 
                  pathOptions={{ 
                    color: isSelected ? 'red' : '#333', 
                    weight: isSelected ? 6 : 4,
                    opacity: isSelected ? 1 : 0.6
                  }} 
                />
                {/* Railroad Dash Array Effect (Only shown when NOT red-highlighted) */}
                {!isSelected && (
                  <Polyline 
                    positions={route.coordinates} 
                    pathOptions={{ color: 'white', weight: 2, dashArray: '10, 10', opacity: 1 }} 
                  />
                )}
              </div>
            );
          })}

          {/* 4. Markers and Highlighted Text */}
          {Object.entries(stations).map(([name, coords]) => (
            <Marker key={name} position={[coords.lat, coords.lng]} icon={DefaultIcon}>
              <Tooltip permanent direction="top" offset={[0, -35]}>
                <span className="font-bold text-xs text-blue-800">{name}</span>
              </Tooltip>
              <Popup>{name} Station</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });