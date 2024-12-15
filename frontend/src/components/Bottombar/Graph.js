import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import './Graph.css';

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const Graph = ({ filteredData }) => {
  const yearTopicCounts = filteredData.reduce((acc, item) => {
    const year = new Date(item.timestamp).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(yearTopicCounts),
    datasets: [
      {
        label: 'Data Points per Year',
        data: Object.values(yearTopicCounts),
        borderColor: '#415ED3', // Line color
        borderWidth: 5, // Make the trend line thicker
        pointRadius: 2, // Adjust the dot size
        pointBackgroundColor: '#EEEEEE', // Set the dot color
        tension: 0.1, // Keep the curve smooth
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Remove the legend
      tooltip: { enabled: true }, // Keep tooltips enabled
    },
    scales: {
      x: {
        grid: {
          color:'transparent', // Set grid color
          lineWidth: 1, // Set grid line width
        },
        ticks: {
          stepSize: 2, // Adjust the width of grid cells by controlling the tick interval
        },
      },
      y: {
        title: { display: true, text: 'n of data points' },
        grid: {
          color:'transparent', // Set grid color
          lineWidth: 1, // Set grid line width
        },
        ticks: {
          stepSize: 30, // Adjust the height of grid cells by controlling the tick interval
        },
      },
    },
  };

  return (
    <div className="graph-section">
      <h3>Topic Trends Over Years</h3>
      <Line data={chartData} options={chartOptions} width={400} height={200} />
    </div>
  );
};

export default Graph;
