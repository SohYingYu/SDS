import React from 'react';
import './Settings.css';
import { ReactComponent as LabelIcon } from '../../assets/sourceicon/label.svg';

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings-header">
        <h3 className="settings-title">
          <LabelIcon className="settings-icon" />
          Settings
        </h3>
      </div>
      <div className="settings-buttons">
        <button className="reset-button">
          <LabelIcon className="button-icon" />
          Reset
        </button>
        <button className="export-button">
          <LabelIcon className="button-icon" />
          Export View
        </button>
      </div>
    </div>
  );
};

export default Settings;
