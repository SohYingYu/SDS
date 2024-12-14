import React from 'react';
import './Summary.css';

const Summary = ({ data, coordinates }) => {
  if (!data) return null;

  return (
    <div
      className="summary-popup"
      style={{
        '--left': `${coordinates.x}px`,
        '--top': `${coordinates.y + 30}px`, // 5px above the data point
      }}
    >
      <h3>Summary</h3>
      <p>{data.summarised_content}</p>
      <p><strong>Tags:</strong> {data.searchTerm.charAt(0).toUpperCase() + data.searchTerm.slice(1)}</p>
      <p><strong>Source:</strong> {data.source}</p>
    </div>
  );
};

export default Summary;
