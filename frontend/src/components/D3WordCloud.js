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
      'there', 'their', 'which', 'about', 'because', 'other', 'where', 'should',
      'still', 'those', 'these', 'another', 'after', 'without', 'makes', 'theres',
      'getting', 'comes', 'could', 'while', 'would', 'being', 'added', 'years',
      'singapore', 'people', 'rules',
    ]);

    // Extract and process word frequencies with associated summaries
    const wordSummaryMap = {};
    const wordsFrequency = filteredData
      .flatMap((item) => {
        const words = (item.summarised_content || '').split(/\s+/).map((word) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
          if (cleanWord.length > 4 && !excludedWords.has(cleanWord)) {
            if (!wordSummaryMap[cleanWord]) wordSummaryMap[cleanWord] = [];
            wordSummaryMap[cleanWord].push(item.summarised_content);
            return cleanWord;
          }
          return null;
        }).filter(Boolean);
        return words;
      })
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
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

    // Add a group for zoom and pan
    const zoomGroup = svg.append('g').attr('class', 'zoom-group');

    // Add zoom behavior
    const zoom = d3.zoom().scaleExtent([0.5, 3]).on('zoom', (event) => {
      zoomGroup.attr('transform', event.transform);
    });

    svg.call(zoom); // Attach zoom behavior to the SVG

    const g = zoomGroup
      .append('g')
      .attr('transform', `translate(${width / 2 + 130}, ${height / 2-50})`); // Add 100px to the x-coordinate

    const colorScale = d3
      .scaleLinear()
      .domain([
        d3.min(topWords, (d) => d.count), // Smallest count
        d3.mean(topWords, (d) => d.count), // Average count
        d3.max(topWords, (d) => d.count), // Largest count
      ])
      .range(['#415ED3', '#F97A51', '#39C970']); // Gradient colors

    // Scale for circle radius
    const radiusScale = d3
      .scaleLinear()
      .domain(d3.extent(topWords, (d) => d.count))
      .range([18, 100]);

    // Scale for font size
    const fontSizeScale = d3
      .scaleLinear()
      .domain(d3.extent(topWords, (d) => d.count))
      .range([7, 28]);

    // Create a simulation for circle packing
    const simulation = d3
      .forceSimulation(topWords)
      .force('x', d3.forceX().strength(0.2).x(0))
      .force('y', d3.forceY().strength(0.2).y(0))
      .force('collision', d3.forceCollide((d) => radiusScale(d.count) + 3).strength(0.9))
      .stop();

    for (let i = 0; i < 300; i++) simulation.tick();

    // Add circles and labels
    const nodes = g
      .selectAll('g')
      .data(topWords)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    nodes
      .append('circle')
      .attr('r', (d) => radiusScale(d.count))
      .attr('fill', (d) => colorScale(d.count))
      .attr('class', 'word-circle'); // Add a class for easier selection

    nodes
      .append('text')
      .text((d) => d.word)
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', (d) => `${fontSizeScale(d.count)}px`)
      .style('fill', '#fff')
      .attr('class', 'word-label'); // Add a class for easier selection

    nodes
      .append('text')
      .text((d) => `${d.count}`)
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('font-size', (d) => `${fontSizeScale(d.count)}px`)
      .style('fill', '#fff');

    nodes
      .on('mouseover', function (event, d) {
        const relatedSummaries = wordSummaryMap[d.word];
        const relatedWords = Object.entries(wordSummaryMap)
          .filter(([word, summaries]) => summaries.some((summary) => relatedSummaries.includes(summary)))
          .map(([word]) => word);

        d3.selectAll('.word-circle')
          .attr('fill', (node) => (relatedWords.includes(node.word) ? '#415ED3' : '#A9A9A9'));
      })
      .on('mouseout', () => {
        // Reset to the default gradient color based on count
        d3.selectAll('.word-circle').attr('fill', (node) => colorScale(node.count));
      });

    return () => {
      simulation.stop();
    };
  }, [originalData, topicFilter, tagFilter, activeFilters]);

  return <svg ref={cloudRef} style={{ width: '100%', height: '100%' }} />;
};

export default D3WordCloud;
