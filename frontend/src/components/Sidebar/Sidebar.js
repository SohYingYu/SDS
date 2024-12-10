import React, { useState } from 'react';
import './Sidebar.css';
import Topic from './Topic'; 
import SubTopics from './SubTopics'; 
import Source from './Source';
import Tag from './Tag';
import SaveView from './SaveView'; // Import SaveView component
import Export from './Export'; // Import Export component

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
            {/* Add SaveView and Export buttons */}
            <div className="action-buttons">
              <SaveView />
              <Export />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
