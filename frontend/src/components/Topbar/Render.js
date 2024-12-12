import React, { useState } from 'react';
import './Render.css'; // Reuse the same CSS
import { ReactComponent as TwoDIcon } from '../../assets/topbaricon/2d.svg';
import { ReactComponent as ThreeDIcon } from '../../assets/topbaricon/3d.svg';

const Render = ({ isSidebarOpen }) => {
  const [view, setView] = useState('3D View');

  const toggleView = () => {
    setView((prevView) => (prevView === '3D View' ? '2D View' : '3D View'));
  };

  return (
    <div 
      className={`render-component ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="render-content">
        <div className="render-toggle-container" onClick={toggleView}>
          <div className={`render-toggle-background ${view === '2D View' ? 'right' : ''}`} />
          <span className={view === '3D View' ? 'active' : ''}>
            <ThreeDIcon className="threed-icon" />            
            3D
          </span>
          <span className={view === '2D View' ? 'active' : ''}>
            <TwoDIcon className="twod-icon" />            
            2D
          </span>
        </div>
      </div>
    </div>
  );
};

export default Render;
