import React, { useState } from 'react';
import './Settings.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Settings = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    if (activeButton === buttonId) {
      setActiveButton(null); // Unselect if the button is already active
    } else {
      setActiveButton(buttonId); // Select the clicked button
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h3 className="settings-title">
          <LabelIcon className="settings-icon" />
          Settings
        </h3>
      </div>
      <div className="settings-buttons">
        <button
          className={`reset-button ${activeButton === 'reset' ? 'active' : ''}`}
          onClick={() => handleButtonClick('reset')}
        >
          Reset
        </button>
        <button
          className={`export-button ${activeButton === 'export' ? 'active' : ''}`}
          onClick={() => handleButtonClick('export')}
        >
          Export View
        </button>
      </div>
    </div>
  );
};

export default Settings;
