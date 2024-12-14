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
  originalData
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
  };

  const resetFilters = () => {
    setActiveFilters(['CNA', 'Reddit', 'Straits Times']);
    setTagFilter(['culture', 'regulations', 'rules']);
    setTopicFilter([]); // Reset topics to default state
    setSelectedTopic(null); // Clear selected topic
    setSelectedTopics([]); // Clear selected topic
    setSubTopics([]); // Clear subtopics
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
              selectedTopicsProp={topicFilter} // Use topicFilter for the selected topics
              onTopicFilterChange={handleTopicFilterChange} // Use setTopicFilter to update state
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
            <SubTopics selectedTopic={selectedTopic} subTopics={subTopics} />
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
