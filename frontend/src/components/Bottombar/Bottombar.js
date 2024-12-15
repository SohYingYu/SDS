import React from 'react';
import './Bottombar.css';
import InfoSection from './InfoSection';
import Graph from './Graph';
import PiChart from './PiChart';

const BottomBar = ({ 
  isSidebarOpen, 
  isBottombarOpen, 
  toggleBottombar, 
  filteredData,
  originalData
}) => {

  const redditCount = originalData.filter(row => row.source === 'Reddit').length;
  const straitstimesCount = originalData.filter(row=>row.source === 'Straits Times').length;
  const cnaCount = originalData.filter(row=> row.source === 'CNA').length;

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
          <InfoSection 
            totalCount={originalData.length}
            dataCount={filteredData.length} 
            redditCount={redditCount}
            straitstimesCount={straitstimesCount}
            cnaCount={cnaCount}
          />
          <Graph filteredData={filteredData} />
          <PiChart filteredData={filteredData} />
        </div>
      )}
    </div>
  );
};

export default BottomBar;
