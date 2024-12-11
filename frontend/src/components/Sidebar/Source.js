import React, { useState } from 'react';
import './Source.css';
import { ReactComponent as CnaLogo } from '../../assets/sourceicon/channelnewsasialogo.svg';
import { ReactComponent as RedditLogo } from '../../assets/sourceicon/redditlogo.svg';
import { ReactComponent as StraitsTimesLogo } from '../../assets/sourceicon/straitstimeslogo.svg';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Source = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    if (activeButton === buttonId) {
      setActiveButton(null); // Unselect if the button is already active
    } else {
      setActiveButton(buttonId); // Select the clicked button
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
          className={`source-button ${activeButton === 'cna' ? 'active' : ''}`}
          onClick={() => handleButtonClick('cna')}
        >
          <div className={`icon-circle ${activeButton === 'cna' ? 'active-circle' : ''}`}>
            <CnaLogo className={`source-icon ${activeButton === 'cna' ? 'active-icon' : ''}`} />
          </div>
          CNA
        </button>

        {/* Reddit Button */}
        <button
          className={`source-button ${activeButton === 'reddit' ? 'active' : ''}`}
          onClick={() => handleButtonClick('reddit')}
        >
          <div className={`icon-circle ${activeButton === 'reddit' ? 'active-circle' : ''}`}>
            <RedditLogo className={`source-icon ${activeButton === 'reddit' ? 'active-icon' : ''}`} />
          </div>
          Reddit
        </button>

        {/* Straits Times Button */}
        <button
          className={`source-button ${activeButton === 'straitstimes' ? 'active' : ''}`}
          onClick={() => handleButtonClick('straitstimes')}
        >
          <div className={`icon-circle ${activeButton === 'straitstimes' ? 'active-circle' : ''}`}>
            <StraitsTimesLogo className={`source-icon ${activeButton === 'straitstimes' ? 'active-icon' : ''}`} />
          </div>
          Straits Times
        </button>
      </div>
    </div>
  );
};

export default Source;
