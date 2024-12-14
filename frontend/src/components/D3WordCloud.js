import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './D3WordCloud.css';

const D3WordCloud = ({ originalData, activeFilters, tagFilter, topicFilter }) => {
  const graphRef = useRef();

  useEffect(() => {
    // Filter data based on sidebar filters
    const filteredData = originalData.filter((row) => {
      const source = row.source?.trim();
      const topic = row['topic']?.trim();

      const matchesSource =
        activeFilters.length === 0 || activeFilters.includes(source);
      const matchesTag =
        tagFilter.length === 0 || tagFilter.some((tag) => row.summarised_content?.toLowerCase().includes(tag.toLowerCase()));
      const matchesTopic =
        topicFilter.length === 0 || topicFilter.includes(topic);

      return matchesSource && matchesTag && matchesTopic;
    });

    // Process words in summarised_content
    const wordCounts = {};
    filteredData.forEach((row) => {
      const words = row.summarised_content
        ?.toLowerCase()
        .replace(/[^a-z\s]/g, '') // Remove punctuation
        .split(/\s+/) || []; // Split by whitespace
      words.forEach((word) => {
        if (word.length > 2) { // Ignore very short words
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });

    // Get the top 50 unique words by frequency
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([word, count]) => ({ word, count }));

    const width = graphRef.current.clientWidth;
    const height = graphRef.current.clientHeight;

    const svg = d3
      .select(graphRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const maxCount = d3.max(topWords, (d) => d.count); // Get the maximum frequency
    const radiusScale = d3.scaleSqrt().domain([0, maxCount]).range([10, 40]); // Scale radius between 10 and 40

    const simulation = d3
      .forceSimulation(topWords)
      .force(
        'charge',
        d3.forceManyBody().strength(-10) // Reduce repulsion to bring circles closer
      )
      .force(
        'center',
        d3.forceCenter(width / 2, height / 2) // Center the word cloud
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => radiusScale(d.count) + 1) // Reduce padding for tighter circles
      );

    const circles = svg
      .selectAll('circle')
      .data(topWords)
      .enter()
      .append('circle')
      .attr('r', (d) => radiusScale(d.count)) // Circle radius scaled to count
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10]) // Use a color palette
      .attr('stroke', '#000')
      .attr('stroke-width', 0);

    const labels = svg
      .selectAll('text')
      .data(topWords)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', (d) => `${radiusScale(d.count) / 3}px`) // Font size proportional to circle size
      .style('fill', '#fff') // White text for visibility
      .text((d) => d.word);

    simulation.on('tick', () => {
      circles
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);

      labels
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);
    });

    return () => {
      d3.select(graphRef.current).selectAll('*').remove(); // Clean up on unmount
    };
  }, [originalData, activeFilters, tagFilter, topicFilter]);

  return <div ref={graphRef} className="d3-wordcloud"></div>;
};

export default D3WordCloud;
