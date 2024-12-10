import React, { useState } from 'react';
import './Sidebar.css';
import Topic from './Topic';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const topics = [
    { id: 1, title: 'Home', icon: '🏠' },
    { id: 2, title: 'About', icon: 'ℹ️' },
    { id: 3, title: 'Services', icon: '🛠️' },
    { id: 4, title: 'Contact', icon: '📞' },
  ];

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
            <h2>YING YUUUUUUU</h2>
            <div className="topics">
              {topics.map((topic) => (
                <Topic key={topic.id} title={topic.title} icon={topic.icon} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
