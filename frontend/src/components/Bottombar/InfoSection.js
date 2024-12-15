import React from 'react';
import './InfoSection.css';

const InfoSection = ({ totalCount, filteredCount, redditCount, straitstimesCount, cnaCount, dataCount }) => {
  return (
    <div className="data-summary">
      {/* Data Summary Section */}
      <div className="data-summary-section">
        <h3 className="data-summary-title">Data :</h3>
        <p className="data-summary-total">
          Total Data Points: <span className="data-summary-total-value">{totalCount}</span>
        </p>
        <p className="data-summary-filtered">
          Filtered Data Points: <span className="data-summary-filtered-value">{dataCount}</span>
        </p>
      </div>

      {/* Source Breakdown Section */}
      <div className="source-breakdown-section">
        <h3 className="source-breakdown-title">Source :</h3>
        <p className="source-breakdown-reddit">
          Reddit: <span className="source-breakdown-value">{redditCount}</span>
        </p>
        <p className="source-breakdown-straitstimes">
          Straits Times: <span className="source-breakdown-value">{straitstimesCount}</span>
        </p>
        <p className="source-breakdown-cna">
          CNA: <span className="source-breakdown-value">{cnaCount}</span>
        </p>
      </div>
    </div>
  );
};

export default InfoSection;
