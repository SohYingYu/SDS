import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';
import Bottombar from './components/Bottombar/Bottombar';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Mapbox />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Bottombar isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default App;
