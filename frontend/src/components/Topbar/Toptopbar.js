import React from 'react';
import Topbar from './Topbar';
import Normal from './Normaljs';
import Render from './Render';
import './Toptopbar.css';

const Toptopbar = ({ isSidebarOpen }) => {
  return (
    <div className="toptopbar">
      <Topbar isSidebarOpen={isSidebarOpen} />
      <Normal isSidebarOpen={isSidebarOpen} />
      <Render isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Toptopbar;
