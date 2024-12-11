import React from 'react';
import './Topic.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Topic = () => {
  return (
    <div className="topic">
      <div className="topic-header">
        <h3 className="topic-title">
          <LabelIcon className="topic-icon" />
          Topics
        </h3>
      </div>
      <div className="topic-placeholder">
        {/* This is the grey box placeholder */}
      </div>
    </div>
  );
};

export default Topic;
