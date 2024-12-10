import React, { useState } from 'react';
import './Source.css';
import CNA_Logo from '../../assets/sourceicon/channelnewsasialogo.svg';
import CNA_Logo_Clicked from '../../assets/sourceicon/CNAclicked.svg';
import Reddit_Logo from '../../assets/sourceicon/redditlogo.svg';
import Reddit_Logo_Clicked from '../../assets/sourceicon/Redditclicked.svg';
import Straits_Times_Logo from '../../assets/sourceicon/straitstimeslogo.svg';
import Straits_Times_Logo_Clicked from '../../assets/sourceicon/STclicked.svg';

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
        <h3 className="source-title">Source</h3>
      </div>
      <div className="source-buttons">
        {/* CNA Button */}
        <button
          className={`source-button ${activeButton === 'cna' ? 'active' : ''}`}
          onClick={() => handleButtonClick('cna')}
        >
          <div className={`icon-circle ${activeButton === 'cna' ? 'active-circle' : ''}`}>
            <img
              src={activeButton === 'cna' ? CNA_Logo_Clicked : CNA_Logo}
              alt="CNA Logo"
              className="source-icon"
            />
          </div>
          CNA
        </button>

        {/* Reddit Button */}
        <button
          className={`source-button ${activeButton === 'reddit' ? 'active' : ''}`}
          onClick={() => handleButtonClick('reddit')}
        >
          <div className={`icon-circle ${activeButton === 'reddit' ? 'active-circle' : ''}`}>
            <img
              src={activeButton === 'reddit' ? Reddit_Logo_Clicked : Reddit_Logo}
              alt="Reddit Logo"
              className="source-icon"
            />
          </div>
          Reddit
        </button>

        {/* Straits Times Button */}
        <button
          className={`source-button ${activeButton === 'straitstimes' ? 'active' : ''}`}
          onClick={() => handleButtonClick('straitstimes')}
        >
          <div className={`icon-circle ${activeButton === 'straitstimes' ? 'active-circle' : ''}`}>
            <img
              src={activeButton === 'straitstimes' ? Straits_Times_Logo_Clicked : Straits_Times_Logo}
              alt="Straits Times Logo"
              className="source-icon"
            />
          </div>
          Straits Times
        </button>
      </div>
    </div>
  );
};

export default Source;
