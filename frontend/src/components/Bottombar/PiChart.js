import React from 'react';
import { Cell, Legend, Pie, PieChart} from 'recharts';
import './PiChart.css'; // Link to the new CSS file

const PiChart = ({ filteredData }) => {
  // Calculate sentiment counts
  const sentimentCounts = filteredData.reduce(
    (acc, point) => {
      if (point.sentiment_analysis === '1') acc.positive += 1;
      if (point.sentiment_analysis === '0') acc.negative += 1;
      return acc;
    },
    { positive: 0, negative: 0 }
  );

  // Prepare data for the chart
  const chartData = [
    { name: 'Positive', value: sentimentCounts.positive },
    { name: 'Negative', value: sentimentCounts.negative },
  ];

  const COLORS = ['#39C970', '#F97A51']; // Colors for the pie chart

  return (
    <div className="pichart-section">
      <h3 className="pichart-title">Sentiment Analysis</h3>
      <PieChart width={300} height={190} className="pichart-container">
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default PiChart;

