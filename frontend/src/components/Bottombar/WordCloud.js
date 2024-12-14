import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';
import './WordCloud.css';

const WordCloud = ({ words }) => {
  const wordCloudRef = useRef(null);

  useEffect(() => {
    if (!words.length) return;

    const container = wordCloudRef.current;
    const width = container.offsetWidth || 300; // Default to 300 if no width
    const height = container.offsetHeight || 300; // Default to 300 if no height

    const layout = d3Cloud()
      .size([width, height])
      .words(words.map((d) => ({ text: d.text, size: d.value })))
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("sans-serif")
      .fontSize((d) => Math.max(10, d.size * 2))
      .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select(container).selectAll("svg").remove(); // Remove previous SVG
      const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      svg.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }

    return () => {
      d3.select(container).selectAll("svg").remove(); // Cleanup
    };
  }, [words]);

  return (
    <div className="wordcloud" ref={wordCloudRef}></div>
  );
};

export default WordCloud;
