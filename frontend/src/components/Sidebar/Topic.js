import React, { useState } from 'react';
import './Topic.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';
import { ReactComponent as TopicIcon1 } from '../../assets/topicicon/economy.svg';

const Topic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]); // Tracks selected topics
  const [currentTopic, setCurrentTopic] = useState(null); // Tracks the topic displayed in the big circle

  const topics = [
    { name: 'Economy', icon: <TopicIcon1 /> },
    { name: 'Education', icon: <TopicIcon1 /> },
    { name: 'Finance', icon: <TopicIcon1 /> },
    { name: 'Technology', icon: <TopicIcon1 /> },
    { name: 'Environment', icon: <TopicIcon1 /> },
    { name: 'Sports', icon: <TopicIcon1 /> },
    { name: 'Politics', icon: <TopicIcon1 /> },
    { name: 'Entertainment', icon: <TopicIcon1 /> },
    { name: 'Travel', icon: <TopicIcon1 /> },
    { name: 'Food', icon: <TopicIcon1 /> },
    { name: 'Science', icon: <TopicIcon1 /> },
    { name: 'Art', icon: <TopicIcon1 /> },
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
        <div className={`center-circle ${currentTopic ? getTopicClass(currentTopic) : ''}`}>
          {currentTopicDetails ? (
            <>
              <div className="center-icon">{currentTopicDetails.icon}</div>
              <div className="center-text">{currentTopicDetails.name}</div>
              <button className="remove-button" onClick={removeCurrentTopic}>
                remove
              </button>
            </>
          ) : (
            'Select'
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
        selectedTopics.length >= 3 && !selectedTopics.includes(topic.name) ? 'disabled' : ''
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
