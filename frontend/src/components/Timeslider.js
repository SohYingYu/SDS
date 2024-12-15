import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material'; // Import Material-UI Slider
import './Timeslider.css';

const TimeSlider = ({ originalData, setFilteredData, isBottombarOpen, isSidebarOpen }) => {
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
    <div
      className={`time-slider-container ${isBottombarOpen ? 'shift-up' : 'shift-down'} ${
        isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
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
            '& .MuiSlider-rail': {
              height: 10, // Thickness of the unselected part of the track
              backgroundColor: 'CCCCCC', // Color of the rail
            },
            '& .MuiSlider-track': {
              height: 6, // Thickness of the selected part of the track
              backgroundColor: '#415ed3', // Color of the track
            },
            '& .MuiSlider-thumb': {
              width: 23, // Size of the thumb (slider handle)
              height: 23, // Size of the thumb (slider handle)
              backgroundColor: '#fff', // Thumb color
              border: '4px solid #415ed3', // Border around the thumb
            },
            '& .MuiSlider-mark': {
              backgroundColor: 'transparent', // Change dot color
              height: 10, // Set the height of the dot
              width: 10, // Set the width of the dot
              borderRadius: '50%', // Make it round
              transform: 'translateX(-50%)', // Center the dot
            },
            '& .MuiSlider-markActive': {
              backgroundColor: 'transparent', // Active dot color
            },
            '& .MuiSlider-markLabel': {
              fontSize: '12ppx', // Label font size
              color: '#333', // Label text color
              fontWeight: 'bold',
            },
            '& .MuiSlider-valueLabel': {
            backgroundColor: '#fff', // White background for the popup
            color: '#575757', // Font color
            borderRadius: '8px', // Rounded corners
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)', // Add shadow for better visibility
            padding: '6px 10px', // Add padding for better appearance
            fontWeight: 'bold',

          },
          }}
        />


      <div className="time-slider-labels">
        <span className="start-year-label">{years[0]}</span> {/* Oldest year */}
        <span className="end-year-label">{years[years.length - 1]}</span> {/* Latest year */}
      </div>

        </div>
      ) : (
        <p>No valid timestamps available</p>
      )}
    </div>
  );
};

export default TimeSlider;
