import React, { useState } from 'react';
import './Tag.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Tag = () => {
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (tagId) => {
    if (activeTag === tagId) {
      setActiveTag(null); // Unselect if the tag is already active
    } else {
      setActiveTag(tagId); // Select the clicked tag
    }
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
          className={`tag-button ${activeTag === 'tag1' ? 'active' : ''}`}
          onClick={() => handleTagClick('tag1')}
        >
          Culture
        </button>
        <button
          className={`tag-button ${activeTag === 'tag2' ? 'active' : ''}`}
          onClick={() => handleTagClick('tag2')}
        >
          Regulations
        </button>
        <button
          className={`tag-button ${activeTag === 'tag3' ? 'active' : ''}`}
          onClick={() => handleTagClick('tag3')}
        >
          Rules
        </button>
      </div>
    </div>
  );
};

export default Tag;
