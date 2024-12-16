import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label?: string;
  properties: {
    ip?: string;
    name?: string;
  };
}

interface Relationship {
  id: string;
  source: string;
  target: string;
  type: string;
}

interface Neo4jGraph {
  nodes: Node[];
  edges: Relationship[];
}

interface NetworkGraphProps {
  data: Neo4jGraph;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    interface CustomSimulationNodeDatum extends d3.SimulationNodeDatum {
      id: string;
      label?: string;
      ip?: string;
      name?: string;
    }

    const nodes: CustomSimulationNodeDatum[] = data.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      ...node.properties,
    }));

    const links = data.edges.map((link) => ({
      source: link.source,
      target: link.target,
      type: link.type,
    }));

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width || 600;
    const height = svg.node()?.getBoundingClientRect().height || 400;

    // Clear previous graph
    svg.selectAll('*').remove();

    // Set up the simulation (forces: collision, link strength, and centering)
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Add links (lines) between nodes
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    // Add nodes (circles)
    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d) => {
        // Example: Use variations of the colors from the image
        if (d.label === 'Router') return '#FF578F';  // Deep Pink for routers
        if (d.label === 'Device') return '#F66859';  // Coral Orange for devices
        if (d.label === 'Service') return '#f99889';  // Deep Violet for services
        return '#ff88b0'; // Default color (can replace with a variation if needed)
      })
      .call(
        d3
          .drag<SVGCircleElement, any>()
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

    // Add labels to the nodes
    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle') // Center the text horizontally
      .attr('x', 0) // Keep x at 0 for proper centering
      .attr('y', 0) // Slightly lower the y to position it below the node's center
      .text((d) => d.ip || d.name || '')
      .attr('fill', '#000')
      .attr('font-size', '12px')
      .style('user-select', 'none');
    // Update positions of the elements on each tick of the simulation
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d as any).source.x)
        .attr('y1', (d) => (d as any).source.y)
        .attr('x2', (d) => (d as any).target.x)
        .attr('y2', (d) => (d as any).target.y);

      node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!);

      label.attr('x', (d) => d.x!).attr('y', (d) => d.y!);
    });

    return () => {
      simulation.stop(); // Stop simulation when component unmounts
    };
  }, [data]);

  return <svg ref={svgRef} width="100%" height="600"></svg>;
};

export default NetworkGraph;
