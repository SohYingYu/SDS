import React, { useEffect, useState } from 'react';
import { Map, Source, Layer } from 'react-map-gl';
import Papa from 'papaparse'; // Library to parse CSV files

const Mapbox = () => {
  const mapboxToken = 'pk.eyJ1IjoieWFuZzE5MDAwMDAiLCJhIjoiY20zdzMxd3ExMHhoZTJqcXpwMG1ybGxrdCJ9.Xf9BgWMIUQ9_MGuc34knwg';
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Load and parse CSV data
    fetch('/data/mastersheet.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Parse CSV data
        const parsedData = Papa.parse(csvText, { header: true }).data;

        // Convert parsed CSV to GeoJSON
        const geoJson = {
          type: 'FeatureCollection',
          features: parsedData.map((row) => ({
            type: 'Feature',
            properties: {
              searchTerm: row['search term'],
              source: row['source'],
              topic: row['topic'],
              subtopic: row['subtopic'],
              timestamp: row['timestamp'],
              sentiment: row['sentiment_analysis'],
            },
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(row['long']), parseFloat(row['lat'])],
            },
          })),
        };

        setGeoJsonData(geoJson);
      });
  }, []);

  // Heatmap layer style
  const heatmapLayer = {
    id: 'heatmap-layer',
    type: 'heatmap',
    source: 'heatmap',
    maxzoom: 12, // Allow heatmap visibility up to zoom level 14
    paint: {
      'heatmap-weight': ['interpolate', ['linear'], ['get', 'sentiment'], -1, 0, 1, 1],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 14, 3], // Adjust intensity for smoother scaling
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)', // Transparent for low density
        0.2,
        'rgb(103,169,207)',
        0.4,
        'rgb(209,229,240)',
        0.6,
        'rgb(253,219,199)',
        0.8,
        'rgb(239,138,98)',
        1,
        'rgb(65, 94, 211)', // Deep blue for high density
      ],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 13, 20], // Gradual radius scaling
      'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 13, 0.8], // Smooth fade-out as zoom increases
    },
  };
  
  

  // Circle layer style
  const circleLayer = {
    id: 'circle-layer',
    type: 'circle',
    source: 'heatmap',
    minzoom: 12, // Visible from zoom level 12 onwards
    paint: {
      'circle-radius': 16, // Fixed radius
      'circle-color': 'rgba(65, 94, 211, 0.8)', // #415ED3 at 80% opacity
      'circle-stroke-color': 'white', // White border
      'circle-stroke-width': 0, // Border width
      'circle-opacity': 0.8, // Circle opacity
    },
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        initialViewState={{
          longitude: 103.755793,
          latitude: 1.301828,
          zoom: 10.7,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
      >
        {geoJsonData && (
          <Source id="heatmap" type="geojson" data={geoJsonData}>
            <Layer {...heatmapLayer} />
            <Layer {...circleLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default Mapbox;
