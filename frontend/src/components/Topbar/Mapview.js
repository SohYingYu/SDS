import React from 'react';
import './Mapview.css';

const Mapview = ({ isSidebarOpen, view, onToggleView }) => {
  const toggleView = () => {
    const newView = view === 'Map View' ? 'Network View' : 'Map View';
    onToggleView(newView); // Notify parent about the state change
  };

  return (
    <div 
      className={`mapview ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="mapview-content">
        <div className="toggle-container" onClick={toggleView}>
          <div className={`toggle-background ${view === 'Network View' ? 'right' : ''}`} />
          <span className={view === 'Map View' ? 'active' : ''}>Map View</span>
          <span className={view === 'Network View' ? 'active' : ''}>Network</span>
        </div>
      </div>
    </div>
  );
};

export default Mapview;
