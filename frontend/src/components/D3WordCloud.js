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

    // List of words to exclude
    const excludedWords = new Set([
      'there',
      'their',
      'which',
      'about',
      'because',
      'other',
      'where',
      'should',
      'still',
      'those',
      'these',
      'another',
      "after",
      "without",
      "makes",
      "theres",
      "getting",
      "comes",
      "could",
      "while",
      'would',
      'being',
      'added',
      "years",
      "singapore",
      "people",
      "rules",
    ]);

    // Extract and process word frequencies
    const wordsFrequency = filteredData
      .flatMap((item) => (item.summarised_content || '').split(/\s+/))
      .reduce((acc, word) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (cleanWord.length > 4 && !excludedWords.has(cleanWord)) {
          acc[cleanWord] = (acc[cleanWord] || 0) + 1;
        }
        return acc;
      }, {});

    const topWords = Object.entries(wordsFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 150) // Show top 150 words
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
      .scaleExtent([0.5, 2]) // Restrict zoom scale (less sensitive zoom range)
      .translateExtent([[-width, -height], [2 * width, 2 * height]]) // Restrict panning boundaries
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom).on('dblclick.zoom', null); // Disable double-click zoom for better control

    // Scale for circle radius
    const radiusScale = d3
      .scaleLinear()
      .domain(d3.extent(topWords, (d) => d.count))
      .range([25, 120]);

    // Scale for font size
    const fontSizeScale = d3
      .scaleLinear()
      .domain(d3.extent(topWords, (d) => d.count))
      .range([8, 35]); // Minimum 8px, maximum 35px

    // Create a simulation for circle packing
    const simulation = d3
      .forceSimulation(topWords)
      .force('x', d3.forceX().strength(0.2).x(0))
      .force('y', d3.forceY().strength(0.2).y(0))
      .force('collision', d3.forceCollide((d) => radiusScale(d.count) + 3).strength(0.9))
      .stop();

        // Run the simulation
        for (let i = 0; i < 300; i++) {
        simulation.tick();
        }

    // Create a color scale for the gradient
    const colorScale = d3
    .scaleLinear()
    .domain([
        d3.min(topWords, (d) => d.count), // Smallest count
        d3.mean(topWords, (d) => d.count), // Average count
        d3.max(topWords, (d) => d.count), // Largest count
    ])
    .range([ '#415ED3','#F97A51','#39C970']); // Gradient colors
    
    // Add circles
    const nodes = g
      .selectAll('g')
      .data(topWords)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

      // Add circles
        nodes
        .append('circle')
        .attr('r', (d) => radiusScale(d.count))
        .attr('fill', (d) => colorScale(d.count)); // Assign gradient color based on count

        // Add word labels
        nodes
        .append('text')
        .text((d) => d.word)
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.1em')
        .style('font-size', (d) => `${fontSizeScale(d.count)}px`)
        .style('fill', '#fff');

        // Add count labels below the word in parentheses
        nodes
        .append('text')
        .text((d) => `${d.count}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '1.3em')
        .style('font-size', (d) => `${fontSizeScale(d.count)}px`)
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
