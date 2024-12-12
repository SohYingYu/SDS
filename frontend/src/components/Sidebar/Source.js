import React, { useState } from 'react';
import './Source.css';
import { ReactComponent as CnaLogo } from '../../assets/sourceicon/channelnewsasialogo.svg';
import { ReactComponent as RedditLogo } from '../../assets/sourceicon/redditlogo.svg';
import { ReactComponent as StraitsTimesLogo } from '../../assets/sourceicon/straitstimeslogo.svg';
import { ReactComponent as SourceIcon } from '../../assets/sidebaricon/source.svg';

const Source = ({ onFilterChange, originalData }) => {
  const [activeButtons, setActiveButtons] = useState(['CNA', 'Reddit', 'Straits Times']);

  const handleButtonClick = (buttonId) => {
    const updatedButtons = activeButtons.includes(buttonId)
      ? activeButtons.filter((id) => id !== buttonId) // Remove button if active
      : [...activeButtons, buttonId]; // Add button if inactive
  
    setActiveButtons(updatedButtons);
    onFilterChange(updatedButtons); // Notify App of the updated filters
  };
  

  return (
    <div className="source">
      <div className="source-header">
        <h3 className="source-title">
          <SourceIcon className="topic-icon" />
          Source
        </h3>
      </div>
      <div className="source-buttons">
        <button
          className={`source-button ${activeButtons.includes('CNA') ? 'active' : ''}`}
          onClick={() => handleButtonClick('CNA')}
        >
          <CnaLogo className="source-icon" />
          CNA
        </button>
        <button
          className={`source-button ${activeButtons.includes('Reddit') ? 'active' : ''}`}
          onClick={() => handleButtonClick('Reddit')}
        >
          <RedditLogo className="source-icon" />
          Reddit
        </button>
        <button
          className={`source-button ${activeButtons.includes('Straits Times') ? 'active' : ''}`}
          onClick={() => handleButtonClick('Straits Times')}
        >
          <StraitsTimesLogo className="source-icon" />
          Straits Times
        </button>
      </div>
    </div>
  );
};

export default Source;
