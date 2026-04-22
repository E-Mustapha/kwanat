import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const KwanDetails = ({ title, description, media, location }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{description}</p>
      {media && <img src={media} alt={title} className="w-full h-64 object-cover rounded-lg" />}
      {location && (
        <MapContainer center={location} zoom={13} className="h-64 w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={location} />
        </MapContainer>
      )}
    </div>
  );
};

export default KwanDetails;