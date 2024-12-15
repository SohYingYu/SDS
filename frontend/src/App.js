import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Searchbar from './components/Searchbar/Searchbar';
import TimeSlider from './components/Timeslider';
import D3Network from './components/D3Network'; // Import D3 network graph component
import D3WordCloud from './components/D3WordCloud'; // Import D3 word cloud component
import { loadCSV } from './utils/loadCSV';
import { ReactComponent as MapViewIcon } from './assets/topbaricon/mapview.svg';
import { ReactComponent as NetworkIcon } from './assets/topbaricon/network.svg';
import Summary from './components/Summary';

const topics = [
  { name: 'Cultural', csvName: 'Cultural Trends' },
  { name: 'Community', csvName: 'Community Behavior' },
  { name: 'Dining', csvName: 'Food and Dining' },
  { name: 'Economy', csvName: 'Economy' },
  { name: 'Entertainment', csvName: 'Entertainment' },
  { name: 'Environment', csvName: 'Environment' },
  { name: 'Health', csvName: 'Health' },
  { name: 'Politics', csvName: 'Politics' },
  { name: 'Social Issues', csvName: 'Social Issues' },
  { name: 'Technology', csvName: 'Technology' },
  { name: 'Tourism', csvName: 'Travel and Tourism' },
  { name: 'Urban', csvName: 'Urban and Planning' },
];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);
  const [view, setView] = useState('Map View'); // Track the current view
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']);
  const [tagFilter, setTagFilter] = useState(['culture', 'regulations', 'rules']);
  const [topicFilter, setTopicFilter] = useState([]);
  const [activeSubTopics, setActiveSubTopics] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [summaryData, setSummaryData] = useState(null); // Manage selected data and position for summary


  useEffect(() => {
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
      setFilteredData(parsedData);
    });
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = originalData;
  
      // Filter by selected topics
      if (topicFilter.length > 0) {
        filtered = filtered.filter((item) => topicFilter.includes(item.topic));
      }
  
      // Filter by subtopics of the last selected topic
      if (activeSubTopics.length > 0) {
        filtered = filtered.filter((item) =>
            topicFilter.includes(item.topic) && activeSubTopics.includes(item.subtopic)
        );
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


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const toggleBottombar = () => {
    setIsBottombarOpen((prev) => !prev);
  };

  const handleDataPointHover = (data) => {
    setSummaryData(data); // Update summary data and position
  };

  return (
    <div className="app">
      {showSearchbar && <Searchbar onSearch={(term) => {
        const lowerTerm = term.toLowerCase();
        const results = originalData.filter((item) =>
          item.summarised_content?.toLowerCase().includes(lowerTerm)
        );
        setFilteredData(results);
      }} />}
      <button
        className={`mapview ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div className="mapview-content">
          <div className="toggle-container">
      <div
        className={`toggle-background ${
          view === 'Map View' ? 'left' : view === 'Network View' ? 'middle' : 'right'
        }`}
      />
      <span
        className={view === 'Map View' ? 'active' : ''}
        onClick={() => setView('Map View')}
      >
        <MapViewIcon className="mapview-icon" />
        Map View
      </span>
      <span
        className={view === 'Network View' ? 'active' : ''}
        onClick={() => setView('Network View')}
      >
        <NetworkIcon className="network-icon" />
        Network
      </span>
      <span
        className={view === 'Word Cloud' ? 'active' : ''}
        onClick={() => setView('Word Cloud')}
      >
        Word Cloud
      </span>
    </div>

        </div>
      </button>

      {view === 'Map View' && (
        <Mapbox
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
          onDataPointHover={handleDataPointHover}
        />
      )}
        <TimeSlider
        originalData={originalData}
        setFilteredData={setFilteredData}
        isBottombarOpen={isBottombarOpen} // Pass bottombar state
      />
      {view === 'Network View' && (
        <D3Network
          originalData={filteredData}
          activeFilters={activeFilters}
          tagFilter={tagFilter}
          topicFilter={topicFilter}
        />
      )}
      {view === 'Word Cloud' && (
        <D3WordCloud
        originalData={filteredData}
        topicFilter={topicFilter}
        tagFilter={tagFilter}
        activeFilters={activeFilters}
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
        activeSubTopics={activeSubTopics}
        setActiveSubTopics={setActiveSubTopics}
        originalData={originalData}
        topics={topics} // Pass topics as a prop
      />
      <Bottombar
        isSidebarOpen={isSidebarOpen}
        isBottombarOpen={isBottombarOpen}
        toggleBottombar={toggleBottombar}
        filteredData={filteredData} // Pass filtered data for live updates
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

