import React, { useEffect, useState } from 'react';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';
import { ReactComponent as CommunityIcon } from '../../assets/topicicon/com.svg';
import { ReactComponent as CulturalIcon } from '../../assets/topicicon/cul.svg';
import { ReactComponent as EconomyIcon } from '../../assets/topicicon/eco.svg';
import { ReactComponent as EntertainmentIcon } from '../../assets/topicicon/ent.svg';
import { ReactComponent as EnvironmentIcon } from '../../assets/topicicon/env.svg';
import { ReactComponent as FoodIcon } from '../../assets/topicicon/foo.svg';
import { ReactComponent as HealthIcon } from '../../assets/topicicon/hea.svg';
import { ReactComponent as PoliticsIcon } from '../../assets/topicicon/pol.svg';
import { ReactComponent as RemoveIcon } from '../../assets/topicicon/remove.svg';
import { ReactComponent as SocialIcon } from '../../assets/topicicon/soc.svg';
import { ReactComponent as TechnologyIcon } from '../../assets/topicicon/tec.svg';
import { ReactComponent as TravelIcon } from '../../assets/topicicon/tra.svg';
import { ReactComponent as UrbanIcon } from '../../assets/topicicon/urb.svg';
import './Topic.css';

const Topic = ({
  onTopicFilterChange,
  selectedTopics,
  setSelectedTopics,
  setActiveSubTopics,
  setSubTopics,
}) => {
  const [currentTopic, setCurrentTopic] = useState(null);

  useEffect(() => {
    if (selectedTopics.length === 0) {
      setCurrentTopic(null);
    }
  }, [selectedTopics]);

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
    if (currentTopic === topicName) {
      // If already selected, do nothing
      return;
    }

    if (!selectedTopics.includes(topicName)) {
      const updatedTopics = [...selectedTopics, topicName];
      setSelectedTopics(updatedTopics);
      onTopicFilterChange(
        updatedTopics.map((t) => topics.find((topic) => topic.name === t)?.csvName)
      );
    }

    // Set the clicked topic as the current topic
    setCurrentTopic(topicName);
  };

  const handleAllTopicsClick = () => {
    if (selectedTopics.length > 0) {
      // Deselect all topics and reset subtopics
      setSelectedTopics([]);
      setCurrentTopic(null);
      onTopicFilterChange([]);
      setActiveSubTopics([]);
      setSubTopics([]);
    } else {
      // Select all topics
      const allTopics = topics.map((topic) => topic.name);
      const allTopicsCsvNames = topics.map((topic) => topic.csvName);

      setSelectedTopics(allTopics);
      setCurrentTopic(null);
      setSubTopics([]);
      onTopicFilterChange(allTopicsCsvNames);
      setActiveSubTopics([]);
    }
  };

  const removeCurrentTopic = () => {
    if (currentTopic) {
      const updatedTopics = selectedTopics.filter((t) => t !== currentTopic);
      setSelectedTopics(updatedTopics);

      // Set the current topic to the latest selected topic, or null if none are left
      setCurrentTopic(updatedTopics.length > 0 ? updatedTopics[updatedTopics.length - 1] : null);

      onTopicFilterChange(
        updatedTopics.map((t) => topics.find((topic) => topic.name === t)?.csvName)
      );
    }
  };

  const getTopicClass = (topicName) => {
    if (topicName === currentTopic) {
      return 'topic-selected'; // Highlight the current topic
    }

    if (selectedTopics.includes(topicName)) {
      return 'topic-highlight'; // Different style for other selected topics
    }

    return 'topic-default'; // Default style for unselected topics
  };

  const getIconClass = (topicName) => {
    if (topicName === currentTopic) {
      return 'icon-selected'; // Icon style for the selected topic
    }
  
    if (selectedTopics.includes(topicName)) {
      return 'icon-highlight'; // Icon style for highlighted topics
    }
  
    return 'icon-default'; // Default style for unselected icons
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
            currentTopic
              ? getTopicClass(currentTopic)
              : selectedTopics.length > 5
              ? 'topic-universal'
              : 'default'
          }`}
        >
          {currentTopic ? (
            <>
              <div className={`center-icon ${getIconClass(currentTopic)}`}>
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
              className={`topic-button ${getTopicClass(topic.name)}`}
              onClick={() => handleTopicClick(topic.name)}
            >
              <div className={`icon ${getIconClass(topic.name)}`}>
                {topic.icon}
              </div>
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
