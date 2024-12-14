import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './D3Network.css';

const D3Network = ({ originalData, activeFilters, tagFilter, topicFilter }) => {
  const graphRef = useRef();

  useEffect(() => {
    // Filter data based on filters
    const filteredData = originalData.filter((row) => {
      const source = row.source?.trim();
      const searchTerm = row['search term']?.toLowerCase();
      const topic = row['topic']?.trim();

      const matchesSource =
        activeFilters.length === 0 || activeFilters.includes(source);
      const matchesTag =
        tagFilter.length === 0 ||
        tagFilter.some((tag) => searchTerm?.includes(tag.toLowerCase()));
      const matchesTopic =
        topicFilter.length === 0 || topicFilter.includes(topic);

      return matchesSource && matchesTag && matchesTopic;
    });

    // Construct graph data
    const graph = {
      nodes: [],
      links: [],
    };

    const terms = [...new Set(filteredData.map((d) => d['search term']))];
    const sources = [...new Set(filteredData.map((d) => d['source']))];
    const topics = [...new Set(filteredData.map((d) => d['topic']))];
    const subtopics = [...new Set(filteredData.map((d) => d['subtopic']))];

    terms.forEach((term) =>
      graph.nodes.push({ id: term, group: 'search term' })
    );
    sources.forEach((source) =>
      graph.nodes.push({ id: source, group: 'source' })
    );
    topics.forEach((topic) =>
      graph.nodes.push({ id: topic, group: 'topic' })
    );
    subtopics.forEach((subtopic) =>
      graph.nodes.push({ id: subtopic, group: 'subtopic' })
    );

    filteredData.forEach((d) => {
      if (d['search term'] && d['source'])
        graph.links.push({ source: d['search term'], target: d['source'], value: 1 });
      if (d['source'] && d['topic'])
        graph.links.push({ source: d['source'], target: d['topic'], value: 1 });
      if (d['topic'] && d['subtopic'])
        graph.links.push({ source: d['topic'], target: d['subtopic'], value: 1 });
    });

    // Create SVG and zoomable group
    const svg = d3.select(graphRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const width = graphRef.current.clientWidth;
    const height = graphRef.current.clientHeight;

    const zoomGroup = svg.append('g'); // Group for zooming and panning

    // Add zoom behavior
    const zoom = d3.zoom().scaleExtent([0.5, 5]).on('zoom', (event) => {
      zoomGroup.attr('transform', event.transform); // Apply zoom transform
    });

    svg.call(zoom); // Attach zoom behavior to the SVG

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        'link',
        d3
          .forceLink(graph.links)
          .id((d) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = zoomGroup
      .append('g')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))
      .attr('stroke', '#999');

    const nodeGroup = zoomGroup
      .append('g')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('g')
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    nodeGroup
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d) => {
        switch (d.group) {
          case 'search term':
            return '#F97A51'; // Tags
          case 'source':
            return '#39C970'; // Source
          case 'topic':
            return '#BA82E0'; // Topic
          case 'subtopic':
            return '#415ED3'; // Subtopic
          default:
            return '#ccc';
        }
      });

    nodeGroup
      .append('text')
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .text((d) => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [originalData, activeFilters, tagFilter, topicFilter]);

  return <svg ref={graphRef} className="d3-network"></svg>;
};

export default D3Network;
