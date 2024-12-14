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
  const [subTopicCounts, setSubTopicCounts] = useState({}); // Subtopic counts

  const handleTopicFilterChange = (newFilters) => {
    setTopicFilter(newFilters);
  
    if (newFilters.length > 0) {
      const filteredTopic = newFilters[newFilters.length - 1]; // Get the latest selected topic
      setSelectedTopic(filteredTopic);
  
      // Find unique subtopics and calculate their counts
      const filteredData = originalData.filter((row) => row.topic === filteredTopic);
      const uniqueSubTopics = Array.from(new Set(filteredData.map((row) => row.subtopic)));
      
      setSubTopics(uniqueSubTopics);
  
      const counts = uniqueSubTopics.reduce((acc, subTopic) => {
        acc[subTopic] = filteredData.filter((row) => row.subtopic === subTopic).length;
        return acc;
      }, {});
  
      counts['All'] = filteredData.length; // Total count for the "All" button
      setSubTopicCounts(counts);
  
      // **Set all subtopics as selected by default**
      setActiveSubTopics(uniqueSubTopics); 
    } else {
      setSelectedTopic(null);
      setSubTopics([]);
      setSubTopicCounts({});
      setActiveSubTopics([]); // Clear active subtopics when no topic is selected
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
