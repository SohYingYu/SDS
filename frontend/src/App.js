import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Toptopbar from './components/Topbar/Toptopbar';
import { loadCSV } from './utils/loadCSV'; // Ensure path is correct

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']);
  const [tagFilter, setTagFilter] = useState(['culture', 'regulations', 'rules']);

  useEffect(() => {
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
    });
  }, []);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleTagFilterChange = (newTagFilter) => {
    setTagFilter(newTagFilter);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBottombar = () => {
    setIsBottombarOpen(!isBottombarOpen);
  };

  return (
    <div className="app">
      <Mapbox
        originalData={originalData}
        activeFilters={activeFilters}
        tagFilter={tagFilter}
      />
      <Toptopbar isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onFilterChange={handleFilterChange}
        onTagFilterChange={handleTagFilterChange}
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
