import React from 'react';
import { Map, Source, Layer } from 'react-map-gl';

const Mapbox = ({ originalData, activeFilters = [], tagFilter = [], topicFilter = [] }) => {
  const mapboxToken = 'pk.eyJ1IjoieWFuZzE5MDAwMDAiLCJhIjoiY20zdzMxd3ExMHhoZTJqcXpwMG1ybGxrdCJ9.Xf9BgWMIUQ9_MGuc34knwg'; // Replace with your token

  
  // Filter data based on activeFilters and tagFilter
  const filteredData = originalData.filter((row) => {
    const source = row.source?.trim();
    const searchTerm = row['search term']?.toLowerCase();
    const topic = row['topic']?.trim();
    const lat = parseFloat(row['lat']);
    const long = parseFloat(row['long']);

    // Ensure valid coordinates
    if (isNaN(lat) || isNaN(long)) return false;
    if (topicFilter.length === 0) return false;

    // Determine matches
    const matchesSource = activeFilters.length === 0 || activeFilters.includes(source);
    const matchesTag = tagFilter.length === 0 || tagFilter.some((tag) => searchTerm?.includes(tag.toLowerCase()));
    const matchesTopic = topicFilter.includes(topic);

    return matchesSource && matchesTag && matchesTopic;
  });

  // Construct GeoJSON data
  const geoJsonData = {
    type: 'FeatureCollection',
    features: filteredData.map((row) => ({
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

  const heatmapLayer = {
    id: 'heatmap-layer',
    type: 'heatmap',
    source: 'heatmap',
    maxzoom: 12,
    paint: {
      'heatmap-weight': ['interpolate', ['linear'], ['get', 'sentiment'], -1, 0, 1, 1],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 14, 3],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.2,
        'rgb(103,169,207)',
        0.4,
        'rgb(209,229,240)',
        0.6,
        'rgb(253,219,199)',
        0.8,
        'rgb(239,138,98)',
        1,
        'rgb(65, 94, 211)',
      ],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 13, 20],
      'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 13, 0.8],
    },
  };

  const circleLayer = {
    id: 'circle-layer',
    type: 'circle',
    source: 'heatmap',
    minzoom: 12,
    paint: {
      'circle-radius': 16,
      'circle-color': 'rgba(65, 94, 211, 0.8)',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 0,
      'circle-opacity': 0.8,
    },
  };

  // Singapore bounds (approximate)
  const singaporeBounds = [
    [103.000953, 0.770084], // Southwest corner
    [104.620471, 1.786387], // Northeast corner
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        initialViewState={{
          longitude: 103.755793,
          latitude: 1.301828,
          zoom: 10.7,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10" // Ensure 2D map style
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
        maxBounds={singaporeBounds} // Restrict the view to Singapore
        dragRotate={false} // Disable map rotation
        touchZoomRotate={false} // Disable pinch-to-rotate
      >
        {geoJsonData.features.length > 0 && (
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
