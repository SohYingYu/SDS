import React from 'react';
import './Summary.css';

const Summary = ({ data, coordinates }) => {
  if (!data) return null;

  // Check if the popup should appear above or below the circle
  const isUpperPart = coordinates.y > window.innerHeight / 2;
  const topPosition = isUpperPart
    ? `${coordinates.y - 130 - 100}px` // Position above the circle and move 100px higher
    : `${coordinates.y + 30}px`; // Position below the circle

  return (
    <div
      className={`summary-popup ${isUpperPart ? 'above' : 'below'}`}
      style={{
        '--left': `${coordinates.x}px`,
        '--top': topPosition,
      }}
    >
      <h3>What they said:</h3>
      <p>{data.summarised_content}</p>
      <div className="summary-row">
        <p>
          <strong>Tag:</strong>{' '}
          {data.searchTerm.charAt(0).toUpperCase() + data.searchTerm.slice(1)}
        </p>
        <p>
          <strong>Source:</strong> {data.source}
        </p>
      </div>
    </div>
  );
};

export default Summary;
