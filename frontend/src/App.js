import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Searchbar from './components/Searchbar/Searchbar';
import D3Network from './components/D3Network'; // Import D3 network graph component
import Summary from './components/Summary'
import { loadCSV } from './utils/loadCSV';
import { ReactComponent as MapViewIcon } from './assets/topbaricon/mapview.svg';
import { ReactComponent as NetworkIcon } from './assets/topbaricon/network.svg';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);
  const [view, setView] = useState('Map View'); // Track the current view
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']);
  const [tagFilter, setTagFilter] = useState(['culture', 'regulations', 'rules']);
  const [topicFilter, setTopicFilter] = useState([]);
  const [summaryData, setSummaryData] = useState(null); // Manage selected data and position for summary
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
      setFilteredData(parsedData);
    });
  }, []);

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

  const toggleView = () => {
    setView((prevView) => (prevView === 'Map View' ? 'Network View' : 'Map View'));
  };

  const toggleBottombar = () => {
    setIsBottombarOpen((prev) => !prev); // Add this function to toggle bottom bar
  };

  const handleDataPointHover = (data) => {
    setSummaryData(data); // Update summary data and position
  };

  return (
    <div className="app">
      {showSearchbar && <Searchbar onSearch={handleSearch} />}
      <button
        className={`mapview ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div className="mapview-content">
          <div className="toggle-container" onClick={toggleView}>
            <div
              className={`toggle-background ${
                view === 'Network View' ? 'right' : ''
              }`}
            />
            <span className={view === 'Map View' ? 'active' : ''}>
              <MapViewIcon className="mapview-icon" />
              Map View
            </span>
            <span className={view === 'Network View' ? 'active' : ''}>
              <NetworkIcon className="network-icon" />
              Network
            </span>
          </div>
        </div>
      </button>

      {view === 'Map View' ? (
        <Mapbox
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
          onDataPointHover={handleDataPointHover}

        />
      ) : (
        <D3Network
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
