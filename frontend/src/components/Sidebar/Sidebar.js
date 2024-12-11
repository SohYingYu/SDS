import React, { useState } from 'react';
import './Sidebar.css';
import Topic from './Topic'; 
import SubTopics from './SubTopics'; 
import Source from './Source';
import Tag from './Tag';
import Settings from './Settings'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <span />
      </div>
      <div className="sidebar-content">
        {isOpen && (
          <>
            <Topic /> 
            <SubTopics />
            <Tag /> 
            <Source /> 
            {/* Add Reset and Export buttons */}
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
