import React from 'react';
import { Map } from 'react-map-gl';

const Mapbox = () => {
  const mapboxToken = 'pk.eyJ1IjoieWFuZzE5MDAwMDAiLCJhIjoiY20zdzMxd3ExMHhoZTJqcXpwMG1ybGxrdCJ9.Xf9BgWMIUQ9_MGuc34knwg'; // Replace with your Mapbox access token

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        initialViewState={{
          longitude: 103.851959, // Replace with your desired longitude
          latitude: 1.29027, // Replace with your desired latitude
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10" // Map style
        mapboxAccessToken={mapboxToken}
      />
    </div>
  );
};

export default Mapbox;
