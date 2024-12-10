import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Welcome to the App</h1>
        <p>Select an option from the sidebar to begin.</p>
      </div>
    </div>
  );
};

export default App;
