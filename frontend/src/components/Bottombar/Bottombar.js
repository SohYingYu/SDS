import React from 'react';
import './Bottombar.css';
import WordCloud from './WordCloud';

const BottomBar = ({ isSidebarOpen, isBottombarOpen, toggleBottombar, originalData }) => {
  const wordFrequencies = originalData?.reduce((acc, row) => {
    const content = row?.summarised_content || ''; // Handle missing content gracefully
    content.split(/\s+/).forEach((word) => {
      const lowerWord = word.toLowerCase();
      if (lowerWord) {
        acc[lowerWord] = (acc[lowerWord] || 0) + 1;
      }
    });
    return acc;
  }, {});
  

  const topWords = Object.entries(wordFrequencies || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([text, value]) => ({ text, value }));

  return (
    <div
      className={`bottombar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${
        isBottombarOpen ? 'open' : 'closed'
      }`}
    >
      <div className="bottombar-toggle-btn" onClick={toggleBottombar}>
        <span />
      </div>

      {isBottombarOpen && (
        <div className="bottombar-content">
          <div className="wordcloud-container">
            <WordCloud words={topWords} />
          </div>
          <div className="expanded-content">
            <p>Expanded Content</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
