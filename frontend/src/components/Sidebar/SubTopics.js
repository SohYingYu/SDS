import React, { useState } from 'react';
import './SubTopics.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const SubTopics = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="subtopics">
      <div className="subtopics-header">
        <h3 className="subtopics-title">
          <LabelIcon className="topic-icon" />
          Sub-Topics
        </h3>
      </div>
      <div className="subtopics-container">
        <button
          className={`add-button ${isSelected ? 'selected' : ''}`}
          onClick={handleButtonClick}
        >
          Add Subtopic
        </button>
      </div>
    </div>
  );
};

export default SubTopics;
