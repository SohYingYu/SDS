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

    const subtopicCounts = {};
    subtopics.forEach((subtopic) => {
      subtopicCounts[subtopic] = filteredData.filter(
        (d) => d['subtopic'] === subtopic
      ).length;
    });

    const topicSubtopicCounts = {};
    topics.forEach((topic) => {
      const uniqueSubtopics = new Set(
        filteredData
          .filter((d) => d['topic'] === topic && d['subtopic'])
          .map((d) => d['subtopic'])
      );
      topicSubtopicCounts[topic] = uniqueSubtopics.size;
    });

    terms.forEach((term) =>
      graph.nodes.push({ id: term, group: 'search term', count: 0 })
    );
    sources.forEach((source) =>
      graph.nodes.push({ id: source, group: 'source', count: 0 })
    );
    topics.forEach((topic) =>
      graph.nodes.push({
        id: topic,
        group: 'topic',
        count: topicSubtopicCounts[topic] || 0,
      })
    );
    subtopics.forEach((subtopic) =>
      graph.nodes.push({
        id: subtopic,
        group: 'subtopic',
        count: subtopicCounts[subtopic] || 0,
      })
    );

    filteredData.forEach((d) => {
      if (d['search term'] && d['topic'])
        graph.links.push({ source: d['search term'], target: d['topic'], value: 1 }); // Connect search terms to topics
      if (d['topic'] && d['source'])
        graph.links.push({ source: d['topic'], target: d['source'], value: 1 }); // Connect topics to sources
      if (d['topic'] && d['subtopic'])
        graph.links.push({ source: d['topic'], target: d['subtopic'], value: 1, type: 'topic-subtopic' });
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
      .attr('stroke', (d) => (d.type === 'topic-subtopic' ? '#9FADE8' : '#A6A6A6')); // Change topic-subtopic link color

    const radiusScale = d3
      .scaleLinear()
      .domain([0, d3.max(graph.nodes, (d) => d.count)])
      .range([12, 42]); // Radius range for subtopics

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

    nodeGroup.each(function (d) {
      const group = d3.select(this);

      if (d.group === 'source') {
        group
          .append('circle')
          .attr('r', 25)
          .attr('fill', '#39C970'); // Color for source
        group
          .append('text')
          .text(d.id)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .style('font-size', '8px')
          .style('fill', '#fff');
      } else if (d.group === 'search term') {
        group
          .append('circle')
          .attr('r', 25)
          .attr('fill', '#F97A51'); // Color for search term
        group
          .append('text')
          .text(d.id)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .style('font-size', '8px')
          .style('fill', '#fff');
      } else {
        group
          .append('circle')
          .attr('r', (d) =>
            d.group === 'subtopic'
              ? radiusScale(d.count)
              : d.group === 'topic'
              ? 15
              : 12
          )
          .attr('fill', (d) => {
            switch (d.group) {
              case 'topic':
                return '#BA82E0';
              case 'subtopic':
                return '#415ED3';
              default:
                return '#ccc';
            }
          });
      }
    });

    nodeGroup
      .filter((d) => d.group === 'subtopic' || d.group === 'topic')
      .append('text')
      .text((d) => d.count)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('fill', '#fff');

    nodeGroup
      .filter((d) => d.group === 'topic' || d.group === 'subtopic')
      .append('text')
      .attr('dy', (d) =>
        d.group === 'subtopic' ? radiusScale(d.count) + 10 : '2em'
      )
      .style('font-size', '12px')
      .style('text-anchor', 'middle')
      .text((d) => d.id);

    // Map links for hover interactions
    const linksMap = {};
    graph.links.forEach((link) => {
      if (!linksMap[link.source.id]) linksMap[link.source.id] = [];
      linksMap[link.source.id].push(link.target.id);
      if (!linksMap[link.target.id]) linksMap[link.target.id] = [];
      linksMap[link.target.id].push(link.source.id);
    });

    nodeGroup
      .on('mouseover', function (event, d) {
        const relatedNodes = new Set(linksMap[d.id] || []);
        nodeGroup.selectAll('circle').attr('fill', (node) =>
          relatedNodes.has(node.id) || node.id === d.id ? '#415ED3' : '#A9A9A9'
        );
        link.attr('stroke', (l) =>
          l.source.id === d.id || l.target.id === d.id ? '#415ED3' : '#A6A6A6'
        );
      })
      .on('mouseout', () => {
        nodeGroup.selectAll('circle').attr('fill', (node) => {
          switch (node.group) {
            case 'source':
              return '#39C970';
            case 'search term':
              return '#F97A51';
            case 'topic':
              return '#BA82E0';
            case 'subtopic':
              return '#415ED3';
            default:
              return '#ccc';
          }
        });
        link.attr('stroke', (l) =>
          l.type === 'topic-subtopic' ? '#9FADE8' : '#A6A6A6'
        );
      });

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
