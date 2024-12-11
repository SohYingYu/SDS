import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';
import Topbar from './components/Topbar/Topbar'; // Import the new Topbar

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBottombarOpen, setIsBottombarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBottombar = () => {
    setIsBottombarOpen(!isBottombarOpen);
  };

  return (
    <div className="app">
      <Mapbox />
      <Topbar isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Bottombar 
        isSidebarOpen={isSidebarOpen} 
        isBottombarOpen={isBottombarOpen} 
        toggleBottombar={toggleBottombar} 
      />
    </div>
  );
};

export default App;
