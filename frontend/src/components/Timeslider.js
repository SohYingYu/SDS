import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material'; // Import Material-UI Slider
import './Timeslider.css';

const TimeSlider = ({ originalData, setFilteredData, isBottombarOpen }) => {
  const [years, setYears] = useState([]);
  const [selectedRange, setSelectedRange] = useState([null, null]);

  // Utility function to standardize timestamps
  const standardizeTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date)) {
        throw new Error('Invalid date');
      }
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch (error) {
      console.error('Invalid timestamp:', timestamp);
      return null;
    }
  };

  // Extract unique years from original data
  useEffect(() => {
    const parseAndExtractYears = () => {
      const uniqueYears = new Set();

      originalData.forEach((item) => {
        const standardizedDate = standardizeTimestamp(item.timestamp);
        if (standardizedDate) {
          item.timestamp = standardizedDate; // Update item with standardized format
          const year = new Date(standardizedDate).getFullYear();
          uniqueYears.add(year);
        }
      });

      const sortedYears = [...uniqueYears].sort((a, b) => a - b); // Sort years
      setYears(sortedYears);
      setSelectedRange([sortedYears[0], sortedYears[sortedYears.length - 1]]); // Default range
    };

    parseAndExtractYears();
  }, [originalData]);

  // Filter data based on selected range
  useEffect(() => {
    if (selectedRange[0] !== null && selectedRange[1] !== null) {
      const [startYear, endYear] = selectedRange;
      const filtered = originalData.filter((item) => {
        const itemYear = new Date(item.timestamp).getFullYear();
        return itemYear >= startYear && itemYear <= endYear;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(originalData); // Show all data when range is invalid
    }
  }, [selectedRange, originalData, setFilteredData]);

  const handleSliderChange = (event, newValue) => {
    setSelectedRange(newValue);
  };

  return (
    <div className={`time-slider-container ${isBottombarOpen ? 'shift-up' : 'shift-down'}`}>
      <h4>Filter by Year</h4>
      {years.length > 0 ? (
        <div className="time-slider-wrapper">
            <Slider
                value={selectedRange}
                onChange={handleSliderChange}
                min={years[0]}
                max={years[years.length - 1]}
                valueLabelDisplay="auto"
                marks
                sx={{
                width: '100%',
                color: '#415ed3',
                }}
            />
            <div className="time-slider-labels">
                <span className="start-year-label">Start Year: {selectedRange[0]}</span>
                <span className="end-year-label">End Year: {selectedRange[1]}</span>
            </div>
            </div>
      ) : (
        <p>No valid timestamps available</p>
      )}
    </div>
  );
};

export default TimeSlider;
