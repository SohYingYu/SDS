import React from 'react';
import './Mapview.css';
import { ReactComponent as MapViewIcon } from '../../assets/topbaricon/mapview.svg';
import { ReactComponent as NetworkIcon } from '../../assets/topbaricon/network.svg';

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
    </div>
  );
};

export default Mapview;
