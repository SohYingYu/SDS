import React from 'react';
import './InfoSection.css';

const InfoSection = ({ totalCount, dataCount, redditCount, straitstimesCount, cnaCount }) => {
  return (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <p className="info-number">{totalCount}</p>
          <p className="info-label">Total data points</p>
        </div>
        <div className="info-item">
          <p className="info-number">{dataCount}</p> {/* Linked dataCount here */}
          <p className="info-label">Filtered Data Points</p>
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <p className="info-number">{redditCount}</p>
          <p className="info-label">Reddit</p>
        </div>
        <div className="info-item">
          <p className="info-number">{straitstimesCount}</p>
          <p className="info-label">Strait Times</p>
        </div>
        <div className="info-item">
          <p className="info-number">{cnaCount}</p>
          <p className="info-label">CNA</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
