import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Topbar from './components/Topbar/Topbar';
import Searchbar from './components/Searchbar/Searchbar';
import { loadCSV } from './utils/loadCSV';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']);
  const [tagFilter, setTagFilter] = useState(['culture', 'regulations', 'rules']);
  const [topicFilter, setTopicFilter] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    // Load CSV data
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
      setFilteredData(parsedData); // Initially set filteredData to all data
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowSearchbar(window.innerWidth > 1350);
    };

    // Set initial state for showSearchbar
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const results = originalData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(lowerTerm)
    );
    setFilteredData(results);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBottombar = () => {
    setIsBottombarOpen(!isBottombarOpen);
  };

  return (
    <div className="app">
      {showSearchbar && <Searchbar onSearch={handleSearch} />}
      <Mapbox
        originalData={filteredData}
        activeFilters={activeFilters}
        tagFilter={tagFilter}
        topicFilter={topicFilter} // Pass topicFilter to Mapbox
      />
      <Topbar isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        originalData={originalData} // Pass the data to Sidebar
      />
      <Bottombar
        isSidebarOpen={isSidebarOpen}
        isBottombarOpen={isBottombarOpen}
        toggleBottombar={toggleBottombar}
      />
    </div>
  );
};

export default App;
