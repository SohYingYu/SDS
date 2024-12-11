import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Mapbox from './components/Mapbox';

const App = () => {
  return (
    <div className="app">
      <Mapbox />
      <Sidebar />
    </div>
  );
};

export default App;
