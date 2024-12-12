import React from 'react';
import './Settings.css';
import { ReactComponent as ResetIcon } from '../../assets/settingsicon/reset.svg';
import { ReactComponent as SettingsIcon } from '../../assets/sidebaricon/settings.svg';
import { ReactComponent as ExportIcon } from '../../assets/settingsicon/export.svg';


const Settings = () => {
  return (
    <div className="settings">
      <div className="settings-header">
        <h3 className="settings-title">
          <SettingsIcon className="settings-icon" />
          Settings
        </h3>
      </div>
      <div className="settings-buttons">
        <button className="reset-button">
          <ResetIcon className="reset-button-icon" />
          Reset
        </button>
        <button className="export-button">
          <ExportIcon className="export-button-icon" />
          Export View
        </button>
      </div>
    </div>
  );
};

export default Settings;
