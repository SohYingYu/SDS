import React from 'react';

const InfoSection = ({ dataCount }) => {
  return (
    <div className="info-section">
      <h3>Total Data Points</h3>
      <p>{dataCount}</p>
    </div>
  );
};

export default InfoSection;
