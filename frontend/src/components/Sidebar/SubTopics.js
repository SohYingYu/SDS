import React from 'react';
import './SubTopics.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';
import DotIcon from '../../assets/sidebaricon/dot.svg';
import DotClickedIcon from '../../assets/sidebaricon/dotclicked.svg';

const SubTopics = ({
  selectedTopic,
  subTopics,
  subTopicCounts,
  activeSubTopics,
  onSubTopicFilterChange,
}) => {
  const handleSubTopicClick = (subTopic) => {
    const updatedFilters = activeSubTopics.includes(subTopic)
      ? activeSubTopics.filter((topic) => topic !== subTopic) // Remove if already selected
      : [...activeSubTopics, subTopic]; // Add if not selected

    // Default to all subtopics if no subtopics are selected
    if (updatedFilters.length === 0) {
      onSubTopicFilterChange(subTopics); // Reset to all subtopics
    } else {
      onSubTopicFilterChange(updatedFilters);
    }
  };

  const handleAllClick = () => {
    if (activeSubTopics.length === subTopics.length) {
      // Deselect all subtopics
      onSubTopicFilterChange([]);
    } else {
      // Select all subtopics currently displayed
      onSubTopicFilterChange([...subTopics]); // Set all subtopics as active
    }
  };
  
  

  return (
    <div className="subtopics">
      <div className="subtopics-header">
        <h3 className="subtopics-title">
          <LabelIcon className="topic-icon" />
          Sub-Topics {selectedTopic && `: ${selectedTopic}`}
        </h3>
      </div>
      <div className="subtopics-container">
  {selectedTopic ? (
    selectedTopic !== "All Topics" ? (
      <>
        <button
          className={`subtopic-item ${
            activeSubTopics.length === subTopics.length ? 'active' : ''
          }`}
          onClick={handleAllClick}
        >
          <img
            src={
              activeSubTopics.length === subTopics.length
                ? DotClickedIcon
                : DotIcon
            }
            alt="dot icon"
            className="subtopic-dot"
          />
          All {subTopicCounts['All'] && `(${subTopicCounts['All']})`}
        </button>
        {subTopics.map((subTopic, index) => (
          <button
            key={index}
            className={`subtopic-item ${
              activeSubTopics.includes(subTopic) ? 'active' : ''
            }`}
            onClick={() => handleSubTopicClick(subTopic)}
          >
            <img
              src={
                activeSubTopics.includes(subTopic)
                  ? DotClickedIcon
                  : DotIcon
              }
              alt="dot icon"
              className="subtopic-dot"
            />
            {subTopic} {subTopicCounts[subTopic] && `(${subTopicCounts[subTopic]})`}
          </button>
        ))}
      </>
    ) : (
      <div className="subtopic-placeholder">
        Subtopics are disabled for all topics.
      </div>
    )
  ) : (
    <div className="subtopic-placeholder">Please select a topic.</div>
  )}
</div>


    </div>
  );
};

export default SubTopics;
