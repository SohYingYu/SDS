import React, { useState } from 'react';
import './Topic.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';
import { ReactComponent as EconomyIcon } from '../../assets/topicicon/eco.svg';
import { ReactComponent as RemoveIcon } from '../../assets/topicicon/remove.svg';
import { ReactComponent as CommunityIcon } from '../../assets/topicicon/com.svg';
import { ReactComponent as CulturalIcon } from '../../assets/topicicon/cul.svg';
import { ReactComponent as EntertainmentIcon } from '../../assets/topicicon/ent.svg';
import { ReactComponent as EnvironmentIcon } from '../../assets/topicicon/env.svg';
import { ReactComponent as FoodIcon } from '../../assets/topicicon/foo.svg';
import { ReactComponent as HealthIcon } from '../../assets/topicicon/hea.svg';
import { ReactComponent as PoliticsIcon } from '../../assets/topicicon/pol.svg';
import { ReactComponent as SocialIcon } from '../../assets/topicicon/soc.svg';
import { ReactComponent as TechnologyIcon } from '../../assets/topicicon/tec.svg';
import { ReactComponent as TravelIcon } from '../../assets/topicicon/tra.svg';
import { ReactComponent as UrbanIcon } from '../../assets/topicicon/urb.svg';

const Topic = ({ onTopicFilterChange }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);

  const topics = [
    { name: 'Cultural', csvName: 'Cultural Trends', icon: <CulturalIcon /> },
    { name: 'Community', csvName: 'Community Behavior', icon: <CommunityIcon /> },
    { name: 'Dining', csvName: 'Food and Dining', icon: <FoodIcon /> },
    { name: 'Economy', csvName: 'Economy', icon: <EconomyIcon /> },
    { name: 'Entertainment', csvName: 'Entertainment', icon: <EntertainmentIcon /> },
    { name: 'Environment', csvName: 'Environment', icon: <EnvironmentIcon /> },
    { name: 'Health', csvName: 'Health', icon: <HealthIcon /> },
    { name: 'Politics', csvName: 'Politics', icon: <PoliticsIcon /> },
    { name: 'Social Issues', csvName: 'Social Issues', icon: <SocialIcon /> },
    { name: 'Technology', csvName: 'Technology', icon: <TechnologyIcon /> },
    { name: 'Tourism', csvName: 'Travel and Tourism', icon: <TravelIcon /> },
    { name: 'Urban', csvName: 'Urban and Planning', icon: <UrbanIcon /> },
  ];

  const handleTopicClick = (topicName) => {
    if (selectedTopics.includes(topicName)) {
      setCurrentTopic(topicName);
    } else {
      const updatedTopics = [...selectedTopics, topicName];
      setSelectedTopics(updatedTopics);
      setCurrentTopic(topicName);
      onTopicFilterChange(updatedTopics.map((t) => topics.find((topic) => topic.name === t)?.csvName));
    }
  };

  const handleAllTopicsClick = () => {
    if (selectedTopics.length > 0) {
      // If any topics are selected, deselect all
      setSelectedTopics([]);
      setCurrentTopic(null);
      onTopicFilterChange([]);
    } else {
      // Otherwise, select all topics
      const allTopics = topics.map((topic) => topic.name);
      setSelectedTopics(allTopics);
      setCurrentTopic('All Topics');
      onTopicFilterChange(topics.map((topic) => topic.csvName));
    }
  };

  const removeCurrentTopic = () => {
    if (currentTopic) {
      const updatedTopics = selectedTopics.filter((t) => t !== currentTopic);
      setSelectedTopics(updatedTopics);
      setCurrentTopic(updatedTopics.length > 0 ? updatedTopics[0] : null);
      onTopicFilterChange(updatedTopics.map((t) => topics.find((topic) => topic.name === t)?.csvName));
    }
  };

  const getTopicClass = (topicName) => {
    if (selectedTopics.length > 5 || currentTopic === 'All Topics') {
      // All selected topics and the big circle have the same color when "Select All" is pressed
      return selectedTopics.includes(topicName) ? 'topic-universal' : 'topic-default';
    }

    // Individual colors when 5 or fewer topics are selected
    const index = selectedTopics.indexOf(topicName);
    if (index === 0) return 'topic-blue';
    if (index === 1) return 'topic-orange';
    if (index === 2) return 'topic-green';
    if (index === 3) return 'topic-purple';
    if (index === 4) return 'topic-yellow';

    return 'topic-default';
  };

  return (
    <div className="topic">
      <div className="topic-header">
        <h3 className="topic-title">
          <LabelIcon className="topic-icon" />
          Topics
        </h3>
        <button
          className={`all-topics-button ${
            selectedTopics.length > 0 ? 'deselect-all' : 'select-all'
          }`}
          onClick={handleAllTopicsClick}
        >
          {selectedTopics.length > 0 ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="topic-container">
        <div
          className={`center-circle ${
            currentTopic === 'All Topics' || selectedTopics.length > 5 ? 'topic-universal' : currentTopic ? getTopicClass(currentTopic) : 'default'
          }`}
        >
          {currentTopic && currentTopic !== 'All Topics' ? (
            <>
              <div className="center-icon">
                {topics.find((topic) => topic.name === currentTopic)?.icon}
              </div>
              <div className="center-text">{currentTopic}</div>
              <button className="remove-button" onClick={removeCurrentTopic}>
                <RemoveIcon />
              </button>
            </>
          ) : (
            'Select a topic'
          )}
        </div>

        {topics.map((topic, index) => (
          <div
            key={topic.name}
            className="topic-button-wrapper"
            style={{
              transform: `rotate(${(360 / topics.length) * index}deg) translate(95px) rotate(-${(360 / topics.length) * index}deg)`,
            }}
          >
            <button
              className={`topic-button ${getTopicClass(topic.name)} ${
                selectedTopics.includes(topic.name) ? 'selected' : ''
              }`}
              onClick={() => handleTopicClick(topic.name)}
            >
              <div className="icon">{topic.icon}</div>
            </button>
            <div
              className="topic-label"
              style={{
                transform: `rotate(${(360 / topics.length) * index}deg) translate(35px) rotate(-${(360 / topics.length) * index}deg)`,
              }}
            >
              {topic.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topic;
