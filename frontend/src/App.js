import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Topbar from './components/Topbar/Topbar';
import { loadCSV } from './utils/loadCSV'; // Ensure path is correct

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);

  // State for managing the data and active filters
  const [originalData, setOriginalData] = useState([]); // All data from CSV
  const [activeFilters, setActiveFilters] = useState(['CNA', 'Reddit', 'Straits Times']); // Initial filters

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBottombar = () => {
    setIsBottombarOpen(!isBottombarOpen);
  };

  // Load the CSV data on component mount
  useEffect(() => {
    loadCSV('/data/mastersheet.csv', (parsedData) => {
      setOriginalData(parsedData);
    });
  }, []);

  // Callback to handle filter changes
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="app">
      <Mapbox originalData={originalData} activeFilters={activeFilters} /> {/* Pass filters */}
      <Topbar isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onFilterChange={handleFilterChange} // Pass filter change handler
        activeFilters={activeFilters} // Pass active filters
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
