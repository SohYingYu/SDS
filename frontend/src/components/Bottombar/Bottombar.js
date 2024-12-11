import React from 'react';
import './Bottombar.css';

const BottomBar = ({ isSidebarOpen, isBottombarOpen, toggleBottombar }) => {
  return (
    <div 
      className={`bottombar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${isBottombarOpen ? 'open' : 'closed'}`}
    >
      <div className="bottombar-toggle-btn" onClick={toggleBottombar}>
        <span />
      </div>
      {isBottombarOpen && (
        <div className="bottombar-content">
          <p>Expanded Content</p>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
