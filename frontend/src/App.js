import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Searchbar from './components/Searchbar/Searchbar';
import D3Network from './components/D3Network';
import D3WordCloud from './components/D3WordCloud'; // Import D3 word cloud component
import Summary from './components/Summary';
import { loadCSV } from './utils/loadCSV';
import { ReactComponent as MapViewIcon } from './assets/topbaricon/mapview.svg';
import { ReactComponent as NetworkIcon } from './assets/topbaricon/network.svg';
import { ReactComponent as WordCloudIcon } from './assets/topbaricon/network.svg'; // Add a word cloud icon

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);
  const [view, setView] = useState('Map View'); // Track the current view
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']);
  const [tagFilter, setTagFilter] = useState(['culture', 'regulations', 'rules']);
  const [topicFilter, setTopicFilter] = useState([]);
  const [activeSubTopics, setActiveSubTopics] = useState([]); // New state for active subtopics
  const [summaryData, setSummaryData] = useState(null); // Manage selected data and position for summary
  const [showSearchbar, setShowSearchbar] = useState(false);

  // Load initial data
  useEffect(() => {
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
      setFilteredData(parsedData); // Initially set filteredData to all data
    });
  }, []);

  // Filter data based on topics and subtopics
  useEffect(() => {
    const applyFilters = () => {
      let filtered = originalData;

      if (topicFilter.length > 0) {
        filtered = filtered.filter((item) => topicFilter.includes(item.topic));
      }

      if (activeSubTopics.length > 0) {
        filtered = filtered.filter((item) => activeSubTopics.includes(item.subtopic));
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [topicFilter, activeSubTopics, originalData]);

  useEffect(() => {
    const handleResize = () => {
      setShowSearchbar(window.innerWidth > 1350);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const results = originalData.filter((item) =>
      item.summarised_content?.toLowerCase().includes(lowerTerm)
    );
    setFilteredData(results);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleView = (newView) => {
    setView(newView); // Update the current view
  };

  const toggleBottombar = () => {
    setIsBottombarOpen((prev) => !prev);

  const handleDataPointHover = (data) => {
    setSummaryData(data); // Update summary data and position
  };

  return (
    <div className="app">
      {showSearchbar && <Searchbar onSearch={handleSearch} />}
      <div
        className={`mapview ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div className="mapview-content">
          <div className="toggle-container">
            <div
              className={`toggle-background ${
                view === 'Map View' ? '' : view === 'Network View' ? 'middle' : 'right'
              }`}
            />
            <span
              className={view === 'Map View' ? 'active' : ''}
              onClick={() => toggleView('Map View')}
            >
              <MapViewIcon className="mapview-icon" />
              Map View
            </span>
            <span
              className={view === 'Network View' ? 'active' : ''}
              onClick={() => toggleView('Network View')}
            >
              <NetworkIcon className="network-icon" />
              Network
            </span>
            <span
              className={view === 'Word Cloud' ? 'active' : ''}
              onClick={() => toggleView('Word Cloud')}
            >
              <WordCloudIcon className="network-icon" />
              Word Cloud
            </span>
          </div>
        </div>
      </div>

      {view === 'Map View' ? (
        <Mapbox
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
          onDataPointHover={handleDataPointHover}
        />
      ) : view === 'Network View' ? (
        <D3Network
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
        />
      ) : (
        <D3WordCloud
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        activeSubTopics={activeSubTopics} // Pass activeSubTopics
        setActiveSubTopics={setActiveSubTopics} // Pass setter for activeSubTopics
        originalData={originalData}
      />
      <Bottombar
        isSidebarOpen={isSidebarOpen}
        isBottombarOpen={isBottombarOpen}
        toggleBottombar={toggleBottombar}
        originalData={originalData}
      />
      {summaryData && (
        <Summary
          data={summaryData.properties}
          coordinates={{
            x: summaryData.screenCoords.x,
            y: summaryData.screenCoords.y,
          }}
        />
      )}
    </div>
  );
};

export default App;
