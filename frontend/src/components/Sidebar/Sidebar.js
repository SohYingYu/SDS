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
  topics,
}) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subTopics, setSubTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [subTopicCounts, setSubTopicCounts] = useState({}); // Subtopic counts

  const handleTopicFilterChange = (newFilters) => {
    setTopicFilter(newFilters);
  
    // Clear subtopics if "Select All" is clicked
    if (newFilters.length === 0 || newFilters.length === topics.length) {
      setSelectedTopic(null);
      setSubTopics([]); // Clear subtopics
      setSubTopicCounts({});
      setActiveSubTopics([]);
      return; // Exit early
    }
  
    // Preserve existing subtopics for already selected topics
    const existingSubTopics = activeSubTopics.filter((subTopic) =>
      originalData.some(
        (item) => newFilters.includes(item.topic) && item.subtopic === subTopic
      )
    );
  
    if (newFilters.length > 0) {
      const filteredTopic = newFilters[newFilters.length - 1]; // Get the latest selected topic
      setSelectedTopic(filteredTopic);
  
      const filteredData = originalData.filter((row) => row.topic === filteredTopic);
      const uniqueSubTopics = Array.from(new Set(filteredData.map((row) => row.subtopic)));
  
      setSubTopics(uniqueSubTopics);
  
      const counts = uniqueSubTopics.reduce((acc, subTopic) => {
        acc[subTopic] = filteredData.filter((row) => row.subtopic === subTopic).length;
        return acc;
      }, {});
      counts['All'] = filteredData.length;
      setSubTopicCounts(counts);
  
      // Combine new topic's subtopics with existing active subtopics
      setActiveSubTopics([...existingSubTopics, ...uniqueSubTopics]);
    } else {
      setSelectedTopic(null);
      setSubTopics([]);
      setSubTopicCounts({});
      setActiveSubTopics([]);
    }
  };
  

  

  const handleSubTopicFilterChange = (newFilters) => {
    setActiveSubTopics(newFilters); // Update active subtopics
  };

  const resetFilters = () => {
    setActiveFilters(['CNA', 'Reddit', 'Straits Times']);
    setTagFilter(['culture', 'regulations', 'rules']);
    setTopicFilter([]);
    setSelectedTopic(null);
    setSelectedTopics([]);
    setSubTopics([]);
    setSubTopicCounts({});
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
              setActiveSubTopics={setActiveSubTopics}
              setSubTopics={setSubTopics} // Pass setSubTopics here
            />
            <SubTopics
              selectedTopic={selectedTopic}
              subTopics={subTopics}
              subTopicCounts={subTopicCounts} // Pass counts to SubTopics
              activeSubTopics={activeSubTopics}
              onSubTopicFilterChange={handleSubTopicFilterChange}
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
