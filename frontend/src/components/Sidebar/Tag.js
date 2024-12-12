import React, { useState } from 'react';
import './Tag.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Tag = ({ onTagFilterChange }) => {
  const [activeButtons, setActiveButtons] = useState(['culture', 'regulations', 'rules']); // Default: All selected

  const handleButtonClick = (buttonId) => {
    const updatedButtons = activeButtons.includes(buttonId)
      ? activeButtons.filter((id) => id !== buttonId) // Remove button if active
      : [...activeButtons, buttonId]; // Add button if inactive

    setActiveButtons(updatedButtons);
    onTagFilterChange(updatedButtons); // Notify App of the updated filters
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <h3 className="tag-title">
          <LabelIcon className="topic-icon" />
          Tags
        </h3>
      </div>
      <div className="tag-buttons">
        <button
          className={`tag-button ${activeButtons.includes('culture') ? 'active' : ''}`}
          onClick={() => handleButtonClick('culture')}
        >
          Culture
        </button>
        <button
          className={`tag-button ${activeButtons.includes('regulations') ? 'active' : ''}`}
          onClick={() => handleButtonClick('regulations')}
        >
          Regulations
        </button>
        <button
          className={`tag-button ${activeButtons.includes('rules') ? 'active' : ''}`}
          onClick={() => handleButtonClick('rules')}
        >
          Rules
        </button>
      </div>
    </div>
  );
};

export default Tag;
