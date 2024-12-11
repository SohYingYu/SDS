import React from 'react';
import './Bottombar.css';

const BottomBar = ({ isSidebarOpen }) => {
  return (
    <div className={`bottombar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="bottombar-toggle-btn">
        <span />
      </div>
      <div className="bottombar-content">
        <p>Expanded Content</p>
      </div>
    </div>
  );
};

export default BottomBar;
