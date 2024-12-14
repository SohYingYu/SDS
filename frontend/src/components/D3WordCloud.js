import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3WordCloud = ({ originalData, topicFilter, tagFilter, activeFilters }) => {
  const cloudRef = useRef();

  useEffect(() => {
    // Apply filters
    const filteredData = originalData.filter((row) => {
      const matchesTopic = topicFilter.length === 0 || topicFilter.includes(row.topic);
      const matchesTag =
        tagFilter.length === 0 ||
        tagFilter.some((tag) => row['search term']?.toLowerCase().includes(tag.toLowerCase()));
      const matchesSource = activeFilters.length === 0 || activeFilters.includes(row.source);

      return matchesTopic && matchesTag && matchesSource;
    });

    // Extract and process word frequencies
    const wordsFrequency = filteredData
      .flatMap((item) => (item.summarised_content || '').split(/\s+/))
      .reduce((acc, word) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (cleanWord.length > 2) {
          acc[cleanWord] = (acc[cleanWord] || 0) + 1;
        }
        return acc;
      }, {});

    const topWords = Object.entries(wordsFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 50)
      .map(([word, count]) => ({ word, count }));

    // Dimensions
    const width = cloudRef.current.clientWidth;
    const height = cloudRef.current.clientHeight;

    // Clear the SVG
    d3.select(cloudRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3
      .select(cloudRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add a group to apply zoom/pan transformations
    const g = svg.append('g').attr('transform', `translate(${width / 2 + 200}, ${height / 2})`);

    // Set up zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5]) // Min and max zoom scale
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom); // Apply zoom to the SVG

    // Scale for circle radius
    const radiusScale = d3
      .scaleLinear()
      .domain(d3.extent(topWords, (d) => d.count))
      .range([30, 200]);

    // Create a simulation for circle packing
    const simulation = d3
      .forceSimulation(topWords)
      .force('x', d3.forceX().strength(0.2).x(0))
      .force('y', d3.forceY().strength(0.2).y(0))
      .force('collision', d3.forceCollide((d) => radiusScale(d.count) + 10).strength(0.7))
      .stop();

    // Run the simulation
    for (let i = 0; i < 300; i++) {
      simulation.tick();
    }

    // Add circles
    const nodes = g
      .selectAll('g')
      .data(topWords)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    nodes
      .append('circle')
      .attr('r', (d) => radiusScale(d.count))
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10]);

    // Add text labels
    nodes
      .append('text')
      .text((d) => d.word)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', (d) => `${Math.min(radiusScale(d.count) / 2, 20)}px`)
      .style('fill', '#fff');

    simulation.on('tick', () => {
      nodes.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [originalData, topicFilter, tagFilter, activeFilters]);

  return <svg ref={cloudRef} style={{ width: '100%', height: '100%' }} />;
};

export default D3WordCloud;
