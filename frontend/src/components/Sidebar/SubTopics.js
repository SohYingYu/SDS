import React from 'react';
import './SubTopics.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const SubTopics = ({ selectedTopic, subTopics, activeSubTopics, onSubTopicFilterChange }) => {
  const handleSubTopicClick = (subTopic) => {
    const updatedFilters = activeSubTopics.includes(subTopic)
      ? activeSubTopics.filter((topic) => topic !== subTopic) // Remove if already selected
      : [...activeSubTopics, subTopic]; // Add if not selected

    onSubTopicFilterChange(updatedFilters); // Notify parent
  };

  return (
    <div className="subtopics">
      <div className="subtopics-header">
        <h3 className="subtopics-title">
          <LabelIcon className="topic-icon" />
          Sub-Topics {selectedTopic && `: ${selectedTopic}`}
        </h3>
      </div>
      <div className="subtopics-container">
        {subTopics.length > 0 ? (
          subTopics.map((subTopic, index) => (
            <button
              key={index}
              className={`subtopic-item ${activeSubTopics.includes(subTopic) ? 'active' : ''}`}
              onClick={() => handleSubTopicClick(subTopic)}
            >
              {subTopic}
            </button>
          ))
        ) : (
          <div className="subtopic-placeholder">Please select a topic.</div>
        )}
      </div>
    </div>
  );
};

export default SubTopics;
