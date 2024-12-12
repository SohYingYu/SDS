import React, { useState, useEffect } from 'react';
import './Tag.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Tag = ({ tagFilter = [], onTagFilterChange }) => {
  const [activeTags, setActiveTags] = useState(tagFilter);

  // Synchronize local state with prop changes
  useEffect(() => {
    setActiveTags(tagFilter);
  }, [tagFilter]);

  const handleTagClick = (tag) => {
    const updatedTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag) // Remove tag if active
      : [...activeTags, tag]; // Add tag if inactive

    setActiveTags(updatedTags);
    onTagFilterChange(updatedTags); // Notify parent of tag changes
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
          className={`tag-button ${activeTags.includes('culture') ? 'active' : ''}`}
          onClick={() => handleTagClick('culture')}
        >
          Culture
        </button>
        <button
          className={`tag-button ${activeTags.includes('regulations') ? 'active' : ''}`}
          onClick={() => handleTagClick('regulations')}
        >
          Regulations
        </button>
        <button
          className={`tag-button ${activeTags.includes('rules') ? 'active' : ''}`}
          onClick={() => handleTagClick('rules')}
        >
          Rules
        </button>
      </div>
    </div>
  );
};

export default Tag;
