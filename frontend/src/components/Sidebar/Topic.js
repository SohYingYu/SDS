import React from 'react';
import './Topic.css';

function Topic({ title, icon, onClick }) {
  return (
    <div className="topic" onClick={onClick}>
      <span className="topic-icon">{icon}</span>
      <span className="topic-title">{title}</span>
    </div>
  );
}

export default Topic;
