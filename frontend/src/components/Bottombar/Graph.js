import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

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
        borderColor: '#415ED3',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Year' } },
      y: { title: { display: true, text: 'Number of Data Points' } },
    },
  };

  return (
    <div className="graph-section">
      <h3>Topic Trends Over Years</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Graph;
