import React, { useState } from 'react';
import './Source.css';
import { ReactComponent as CnaLogo } from '../../assets/sourceicon/channelnewsasialogo.svg';
import { ReactComponent as RedditLogo } from '../../assets/sourceicon/redditlogo.svg';
import { ReactComponent as StraitsTimesLogo } from '../../assets/sourceicon/straitstimeslogo.svg';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Source = () => {
  // Initialize with all buttons active
  const [activeButtons, setActiveButtons] = useState(['cna', 'reddit', 'straitstimes']);

  const handleButtonClick = (buttonId) => {
    if (activeButtons.includes(buttonId)) {
      // Remove the button if it's already active
      setActiveButtons(activeButtons.filter((id) => id !== buttonId));
    } else {
      // Add the button to the active list
      setActiveButtons([...activeButtons, buttonId]);
    }
  };

  return (
    <div className="source">
      <div className="source-header">
        <h3 className="source-title">
          <LabelIcon className="topic-icon" />
          Source
        </h3>
      </div>
      <div className="source-buttons">
        {/* CNA Button */}
        <button
          className={`source-button ${activeButtons.includes('cna') ? 'active' : ''}`}
          onClick={() => handleButtonClick('cna')}
        >
          <CnaLogo className="source-icon" />
          CNA
        </button>

        {/* Reddit Button */}
        <button
          className={`source-button ${activeButtons.includes('reddit') ? 'active' : ''}`}
          onClick={() => handleButtonClick('reddit')}
        >
          <RedditLogo className="source-icon" />
          Reddit
        </button>

        {/* Straits Times Button */}
        <button
          className={`source-button ${activeButtons.includes('straitstimes') ? 'active' : ''}`}
          onClick={() => handleButtonClick('straitstimes')}
        >
          <StraitsTimesLogo className="source-icon" />
          Straits Times
        </button>
      </div>
    </div>
  );
};

export default Source;
