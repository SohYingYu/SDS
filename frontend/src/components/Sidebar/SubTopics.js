import React from 'react';
import './SubTopics.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const SubTopics = ({ selectedTopic, subTopics }) => {
  return (
    <div className="subtopics">
      <div className="subtopics-header">
        <h3 className="subtopics-title">
          <LabelIcon className="topic-icon" />
          Sub-Topics for {selectedTopic || "Select a Topic"}
        </h3>
      </div>
      <div className="subtopics-container">
        {subTopics.length > 0 ? (
          subTopics.map((subTopic, index) => (
            <div key={index} className="subtopic-item">
              {subTopic}
            </div>
          ))
        ) : (
          <div className="subtopic-placeholder">No Sub-Topics Available</div>
        )}
      </div>
    </div>
  );
};

export default SubTopics;
