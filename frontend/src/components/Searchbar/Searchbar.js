import React, { useState } from 'react';
import './Searchbar.css';
import searchIcon from '../../assets/searchicon/search.svg'; // Update the path as necessary

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="searchbar">
      <img src={searchIcon} alt="Search Icon" className="searchbar-icon" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search a keyword"
        className="searchbar-input"
      />
      <button onClick={handleSearch} className="searchbar-button">
        Display
      </button>
    </div>
  );
};

export default Searchbar;
