import React, { useState } from 'react';
import './Normal.css';

const Normaljs = ({ isSidebarOpen }) => {
  const [view, setView] = useState('List View');

  const toggleView = () => {
    setView((prevView) => (prevView === 'List View' ? 'Grid View' : 'List View'));
  };

  return (
    <div 
      className={`normal ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="normal-content">
        <div className="toggle-container" onClick={toggleView}>
          <div className={`toggle-background ${view === 'Grid View' ? 'right' : ''}`} />
          <span className={view === 'List View' ? 'active' : ''}>Normal</span>
          <span className={view === 'Grid View' ? 'active' : ''}>Sentiment</span>
        </div>
      </div>
    </div>
  );
};

export default Normaljs;
