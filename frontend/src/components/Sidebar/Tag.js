import React, { useState } from 'react';
import './Tag.css';
import { ReactComponent as TagsIcon } from '../../assets/sidebaricon/tags.svg';


const Tag = ({ onTagFilterChange }) => {
  const [activeFilters, setActiveButtons] = useState(['culture', 'regulations', 'rules']); // Default: All selected

  const handleButtonClick = (buttonId) => {
    const updatedButtons = activeFilters.includes(buttonId)
      ? activeFilters.filter((id) => id !== buttonId) // Remove button if active
      : [...activeFilters, buttonId]; // Add button if inactive

    setActiveButtons(updatedButtons);
    onTagFilterChange(updatedButtons); // Notify App of the updated filters
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <h3 className="tag-title">
          <TagsIcon className="topic-icon" />
          Tags
        </h3>
      </div>
      <div className="tag-buttons">
        <button
          className={`tag-button ${activeFilters.includes('culture') ? 'active' : ''}`}
          onClick={() => handleButtonClick('culture')}
        >
          Culture
        </button>
        <button
          className={`tag-button ${activeFilters.includes('regulations') ? 'active' : ''}`}
          onClick={() => handleButtonClick('regulations')}
        >
          Regulations
        </button>
        <button
          className={`tag-button ${activeFilters.includes('rules') ? 'active' : ''}`}
          onClick={() => handleButtonClick('rules')}
        >
          Rules
        </button>
      </div>
    </div>
  );
};

export default Tag;
