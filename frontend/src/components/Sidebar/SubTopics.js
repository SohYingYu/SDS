import React from 'react';
import './SubTopics.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const SubTopics = () => {
  return (
    <div className="subtopics">
      <div className="subtopics-header">
        <h3 className="subtopics-title">
          <LabelIcon className="topic-icon" />
          Sub-Topics
        </h3>
      </div>
      <div className="subtopics-placeholder">
        {/* This is the grey box placeholder */}
      </div>
    </div>
  );
};

export default SubTopics;
