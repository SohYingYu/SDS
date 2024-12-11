import React, { useState } from 'react';
import './Topbar.css';

const Topbar = ({ isSidebarOpen }) => {
  const [view, setView] = useState('Map View');

  const toggleView = () => {
    setView((prevView) => (prevView === 'Map View' ? 'Network View' : 'Map View'));
  };

  return (
    <div 
      className={`topbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="topbar-content">
        <div className="toggle-container" onClick={toggleView}>
          <div className={`toggle-background ${view === 'Network View' ? 'right' : ''}`} />
          <span className={view === 'Map View' ? 'active' : ''}>Map View</span>
          <span className={view === 'Network View' ? 'active' : ''}>Network</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
