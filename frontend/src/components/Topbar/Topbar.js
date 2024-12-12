import React, { useState } from 'react';
import Mapview from './Mapview';
import Sentiment from './Sentiment';
import Render from './Render';
import './Topbar.css';

const Topbar = ({ isSidebarOpen }) => {
  const [view, setView] = useState('Map View'); // Manage the view state in Topbar

  const handleViewToggle = (newView) => {
    setView(newView); // Update the state based on Mapview's toggle
  };

  return (
    <div className="topbar">
      <Mapview isSidebarOpen={isSidebarOpen} view={view} onToggleView={handleViewToggle} />
      <Sentiment isSidebarOpen={isSidebarOpen} />
      {view === 'Map View' && <Render isSidebarOpen={isSidebarOpen} />} {/* Conditional rendering */}
    </div>
  );
};

export default Topbar;
