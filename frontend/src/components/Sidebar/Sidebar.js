import React from 'react';
import './Sidebar.css';
import Topic from './Topic'; 
import SubTopics from './SubTopics'; 
import Source from './Source';
import Tag from './Tag';
import Settings from './Settings'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <span />
      </div>
      <div className="sidebar-content">
        {isOpen && (
          <>
            <Topic /> 
            <SubTopics />
            <Tag /> 
            <Source /> 
            <div className="action-buttons">
              <Settings />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
