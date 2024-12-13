import React from 'react';
import './Sidebar.css';
import Topic from './Topic';
import SubTopics from './SubTopics';
import Source from './Source';
import Tag from './Tag';
import Settings from './Settings';

const Sidebar = ({ isOpen, toggleSidebar, onFilterChange, onTagFilterChange, onTopicFilterChange }) => {
  // Handle tag filter changes and pass them to the parent
  const handleTagFilterChange = (tagFilter) => {
    onTagFilterChange(tagFilter); // Pass the tag filter to the parent (App.js)
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <span />
      </div>
      <div className="sidebar-content">
        {isOpen && (
          <>
            <Topic onTopicFilterChange={onTopicFilterChange} />
            <SubTopics />
            <div className="grouped-container">
              {/* Pass handleTagFilterChange to the Tag component */}
              <Tag onTagFilterChange={handleTagFilterChange} />
              {/* Pass onFilterChange directly to the Source component */}
              <Source onFilterChange={onFilterChange} />
              <Settings />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
