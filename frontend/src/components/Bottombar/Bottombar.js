import React from 'react';
import './Bottombar.css';
import InfoSection from './InfoSection';
import Graph from './Graph';
import PiChart from './PiChart';

const BottomBar = ({ 
  isSidebarOpen, 
  isBottombarOpen, 
  toggleBottombar, 
  filteredData 
}) => {
  return (
    <div
      className={`bottombar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${
        isBottombarOpen ? 'open' : 'closed'
      }`}
    >
      <div className="bottombar-toggle-btn" onClick={toggleBottombar}>
        <span />
      </div>

      {isBottombarOpen && (
        <div className="bottombar-content">
          <InfoSection dataCount={filteredData.length} />
          <Graph filteredData={filteredData} />
          <PiChart />
        </div>
      )}
    </div>
  );
};

export default BottomBar;
