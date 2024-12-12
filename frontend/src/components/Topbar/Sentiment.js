import React, { useState } from 'react';
import './Sentiment.css';
import { ReactComponent as SentimentIcon } from '../../assets/topbaricon/sentiment.svg';


const Sentiment = ({ isSidebarOpen }) => {
  const [view, setView] = useState('List View');

  const toggleView = () => {
    setView((prevView) => (prevView === 'List View' ? 'Grid View' : 'List View'));
  };

  return (
    <div 
      className={`sentiment ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="sentiment-content">
        <div className="toggle-container" onClick={toggleView}>
          <div className={`toggle-background ${view === 'Grid View' ? 'right' : ''}`} />
          <span className={view === 'List View' ? 'active' : ''}>Normal</span>
          <span className={view === 'Grid View' ? 'active' : ''}>
            <SentimentIcon className="sentiment-icon" />            
            Sentiment
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sentiment;
