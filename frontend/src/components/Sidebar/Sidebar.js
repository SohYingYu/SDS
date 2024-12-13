import React from 'react';
import './Sidebar.css';
import Topic from './Topic';
import SubTopics from './SubTopics';
import Source from './Source';
import Tag from './Tag';
import Settings from './Settings';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  onFilterChange,
  onTagFilterChange,
  onTopicFilterChange,
  tagFilter,
  activeFilters,
}) => {

  const handleReset = () => {
    onFilterChange(['CNA', 'Reddit', 'Straits Times']); // Reset Source to default
    onTagFilterChange(['culture', 'regulations', 'rules']); 
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
              <Tag activeFilters={tagFilter} onTagFilterChange={onTagFilterChange} />
              <Source activeFilters={activeFilters} onFilterChange={onFilterChange} />
              <Settings onReset={handleReset} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;


