import React, { useRef, useEffect } from 'react';
import { Map, Source, Layer } from 'react-map-gl';


const Mapbox = ({
  originalData,
  activeFilters = [],
  tagFilter = [],
  topicFilter = [],
  onDataPointHover,
  mapMode,
  mapViewMode, // Add mapViewMode prop
}) => {
  const mapboxToken = 'pk.eyJ1IjoieWFuZzE5MDAwMDAiLCJhIjoiY20zdzMxd3ExMHhoZTJqcXpwMG1ybGxrdCJ9.Xf9BgWMIUQ9_MGuc34knwg';
  const mapRef = useRef(null); // Reference to the map instance

  // Filter data based on activeFilters, tagFilter, and topicFilter
  const filteredData = originalData.filter((row) => {
    const source = row.source?.trim();
    const searchTerm = row['search term']?.toLowerCase();
    const topic = row['topic']?.trim();
    const lat = parseFloat(row['lat']);
    const long = parseFloat(row['long']);

    // Ensure valid coordinates
    if (isNaN(lat) || isNaN(long)) return false;
    if (topicFilter.length === 0) return false;

    const matchesSource = activeFilters.length === 0 || activeFilters.includes(source);
    const matchesTag = tagFilter.length === 0 || tagFilter.some((tag) => searchTerm?.includes(tag.toLowerCase()));
    const matchesTopic = topicFilter.includes(topic);

    return matchesSource && matchesTag && matchesTopic;
  });

  const geoJsonData = {
    type: 'FeatureCollection',
    features: filteredData.map((row) => {
      const sentimentScore = row.sentiment_analysis === '1' ? 1 : 0;
      return {
        type: 'Feature',
        properties: {
          searchTerm: row['search term'],
          source: row['source'],
          topic: row['topic'],
          subtopic: row['subtopic'],
          timestamp: row['timestamp'],
          sentiment: sentimentScore, // Use sentiment_analysis for coloring
          summarised_content: row['summarised_content'],
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(row['long']), parseFloat(row['lat'])],
        },
      };
    }),
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
    'circle-color': [
      'case',
      ['==', mapMode, 'Sentiment'],
      // Sentiment mode: green if more 1s, red otherwise
      [
        'step',
        ['get', 'sentiment'],
        'rgba(249, 122, 91, 0.8)', // Red (more 0s)
        0.5,
        'rgba(57, 201, 112, 0.6)', // Green (more 1s)
      ],
      // Default mode: fixed color
      'rgba(65, 94, 211, 0.8)', // Default circle color
    ],
    'circle-stroke-color': 'white',
    'circle-stroke-width': 0,
    'circle-opacity': 0.8,

    // New properties for ground alignment in 3D view
    'circle-pitch-alignment': 'map', // Align circles to the map surface
    'circle-pitch-scale': 'viewport', // Keep circle size consistent with viewport scaling
  },
};

  
useEffect(() => {
  const mapInstance = mapRef.current?.getMap();
  if (mapInstance) {
    if (mapViewMode === '3D') {
      const currentZoom = mapInstance.getZoom();

      mapInstance.easeTo({
        pitch: 60, // Enable tilt for 3D view
        bearing: -17.6, // Adjust bearing
        zoom: currentZoom < 15.5 ? 15.5 : currentZoom, // Only zoom in if the current zoom is below 15
        duration: 1000, // Smooth transition duration in milliseconds
      });

      if (!mapInstance.getLayer('3d-buildings')) {
        mapInstance.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
          },
        });
      }
    } else {
      mapInstance.easeTo({
        pitch: 0, // Reset tilt for 2D view
        bearing: 0, // Reset bearing
        zoom: mapInstance.getZoom(), // Keep the current zoom level in 2D
        duration: 1000, // Smooth transition duration in milliseconds
      });

      if (mapInstance.getLayer('3d-buildings')) {
        mapInstance.removeLayer('3d-buildings');
      }
    }
  }
}, [mapViewMode]);


  useEffect(() => {
    const mapInstance = mapRef.current?.getMap();

    if (mapInstance) {
      const handleMouseMove = (event) => {
        const features = mapInstance.queryRenderedFeatures(event.point, {
          layers: ['circle-layer'],
        });

        if (features.length > 0) {
          const feature = features[0];
          const screenCoords = mapInstance.project(feature.geometry.coordinates); // Get screen position
          onDataPointHover({
            properties: feature.properties,
            screenCoords,
          }); // Pass data and screen position to parent
        } else {
          onDataPointHover(null);
        }
      };

      const handleMouseLeave = () => {
        onDataPointHover(null);
      };

      mapInstance.on('mousemove', handleMouseMove);
      mapInstance.on('mouseleave', 'circle-layer', handleMouseLeave);

      return () => {
        mapInstance.off('mousemove', handleMouseMove);
        mapInstance.off('mouseleave', 'circle-layer', handleMouseLeave);
      };
    }
  }, [onDataPointHover]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 103.755793,
          latitude: 1.301828,
          zoom: 10.7,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10"s
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
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
