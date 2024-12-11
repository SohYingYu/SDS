import React, { useState } from 'react';
import './Bottombar.css';

const BottomBar = ({ isSidebarOpen }) => {
  const [isBottomBarOpen, setIsBottomBarOpen] = useState(false);

  const toggleBottomBar = () => {
    setIsBottomBarOpen(!isBottomBarOpen);
  };

  return (
    <div className={`bottom-bar ${isBottomBarOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleBottomBar}>
        <span />
      </div>
      <div className="bottom-bar-content">
        {isBottomBarOpen && (
          <>
            <div className="content-section">
              <p>Bottom Bar Expanded Content</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
