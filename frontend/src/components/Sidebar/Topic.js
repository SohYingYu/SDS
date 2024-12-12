import React, { useState } from 'react';
import './Topic.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';
import { ReactComponent as EconomyIcon } from '../../assets/topicicon/eco.svg';
import { ReactComponent as RemoveIcon } from '../../assets/topicicon/remove.svg'; // Import the remove icon
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


const Topic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]); // Tracks selected topics
  const [currentTopic, setCurrentTopic] = useState(null); // Tracks the topic displayed in the big circle

  const topics = [
    { name: 'Community', icon: <CommunityIcon /> },
    { name: 'Cultural Trends', icon: <CulturalIcon /> },
    { name: 'Economy', icon: <EconomyIcon /> },
    { name: 'Entertainment', icon: <EntertainmentIcon /> },
    { name: 'Environment', icon: <EnvironmentIcon /> },
    { name: 'Food and Dining', icon: <FoodIcon /> },
    { name: 'Health', icon: <HealthIcon /> },
    { name: 'Politics', icon: <PoliticsIcon /> },
    { name: 'Social Issues', icon: <SocialIcon /> },
    { name: 'Technology', icon: <TechnologyIcon /> },
    { name: 'Travel & Tourism', icon: <TravelIcon /> },
    { name: 'Urban & Planning', icon: <UrbanIcon /> },
  ];

  const handleTopicClick = (topicName) => {
    if (selectedTopics.includes(topicName)) {
      // If already selected, just display it in the big circle
      setCurrentTopic(topicName);
    } else if (selectedTopics.length < 3) {
      // Add the topic to the selected list if less than 3 are selected
      setSelectedTopics((prev) => [...prev, topicName]);
      setCurrentTopic(topicName);
    }
  };

  const removeCurrentTopic = () => {
    if (currentTopic) {
      // Remove the topic from the selected list
      setSelectedTopics((prev) => prev.filter((t) => t !== currentTopic));
      // Update the big circle to display the earliest selected topic, or clear if no topics left
      setCurrentTopic((prev) => {
        const remainingTopics = selectedTopics.filter((t) => t !== prev);
        return remainingTopics.length > 0 ? remainingTopics[0] : null;
      });
    }
  };

  const getTopicClass = (topicName) => {
    const index = selectedTopics.indexOf(topicName);
    if (index === 0) return 'topic-blue';
    if (index === 1) return 'topic-orange';
    if (index === 2) return 'topic-green';
    return 'topic-default';
  };

  const currentTopicDetails = topics.find((topic) => topic.name === currentTopic);

  return (
    <div className="topic">
      <div className="topic-header">
        <h3 className="topic-title">
          <LabelIcon className="topic-icon" />
          Topics
        </h3>
      </div>
      <div className="topic-container">
        <div
          className={`center-circle ${currentTopic ? getTopicClass(currentTopic) : 'default'}`}
        >
          {currentTopicDetails ? (
            <>
              <div className="center-icon">{currentTopicDetails.icon}</div>
              <div className="center-text">{currentTopicDetails.name}</div>
              <button className="remove-button" onClick={removeCurrentTopic}>
                <RemoveIcon /> {/* Use the remove icon here */}
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
              disabled={selectedTopics.length >= 3 && !selectedTopics.includes(topic.name)}
            >
              <div className="icon">{topic.icon}</div>
            </button>
            <div className="topic-label">{topic.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topic;