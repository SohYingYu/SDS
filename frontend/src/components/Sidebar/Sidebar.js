import React, { useState } from 'react';
import Settings from './Settings';
import './Sidebar.css';
import Source from './Source';
import SubTopics from './SubTopics';
import Tag from './Tag';
import Topic from './Topic';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeFilters,
  setActiveFilters,
  tagFilter,
  setTagFilter,
  topicFilter,
  setTopicFilter,
  activeSubTopics,
  setActiveSubTopics,
  originalData,
}) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subTopics, setSubTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicFilterChange = (newFilters) => {
    setTopicFilter(newFilters);
    if (newFilters.length > 0) {
      const filteredTopic = newFilters[newFilters.length - 1]; // Get the latest selected topic
      setSelectedTopic(filteredTopic);

      // Find unique subtopics for the selected topic
      const uniqueSubTopics = Array.from(
        new Set(
          originalData
            .filter((row) => row.topic === filteredTopic)
            .map((row) => row.subtopic)
        )
      );

      setSubTopics(uniqueSubTopics);
    } else {
      setSelectedTopic(null);
      setSubTopics([]);
    }
    setActiveSubTopics([]); // Reset subtopics when topics change
  };

  const handleSubTopicFilterChange = (newFilters) => {
    setActiveSubTopics(newFilters); // Notify parent
  };

  const resetFilters = () => {
    setActiveFilters(['CNA', 'Reddit', 'Straits Times']);
    setTagFilter(['culture', 'regulations', 'rules']);
    setTopicFilter([]);
    setSelectedTopic(null);
    setSelectedTopics([]);
    setSubTopics([]);
    setActiveSubTopics([]);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <span />
      </div>
      <div className="sidebar-content">
        {isOpen && (
          <>
            <Topic
              selectedTopicsProp={topicFilter}
              onTopicFilterChange={handleTopicFilterChange}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
            <SubTopics
              selectedTopic={selectedTopic}
              subTopics={subTopics}
              activeSubTopics={activeSubTopics}
              onSubTopicFilterChange={handleSubTopicFilterChange} // Handle subtopic changes
            />
            <div className="grouped-container">
              <Tag activeFilters={tagFilter} onTagFilterChange={setTagFilter} />
              <Source activeFilters={activeFilters} onFilterChange={setActiveFilters} />
              <Settings onReset={resetFilters} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
