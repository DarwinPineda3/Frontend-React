import { Tooltip } from '@mui/material';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

interface UnifiedNode {
  id: string;
  label?: string;
  properties: {
    ip?: string;
    name?: string;
    type?: string;
  };
}
interface Relationship {
  source: string;
  target: string;
  label: string;
}

interface Neo4jGraph {
  nodes: UnifiedNode[];
  edges: Relationship[];
}

interface NetworkGraphProps {
  data: Neo4jGraph;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0,
    d: null,
  });

  function normalizeNode(input: any): UnifiedNode {
    if ('properties' in input) {
      return {
        id: input.id,
        label: input.label,
        properties: input.properties,
      };
    } else if ('data' in input) {
      const { id, label, ip, ...rest } = input.data;
      return {
        id: id,
        label: label,
        properties: { ip, ...rest },
      };
    } else {
      throw new Error("Unsupported format");
    }
  }

  function normalizeEdge(input: any): Relationship {
    if ('data' in input) {
      return {
        source: input.data.source,
        target: input.data.target,
        label: input.data.label,
      };
    } else {
      return {
        source: input.source,
        target: input.target,
        label: input.label,
      };
    }
  }

  /**returns a column of key value pairs jsx element*/
  const objToListDeep = (obj: any) => {
    if (obj === null || obj === undefined) return null;
    //remove null or empty values
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === 'object') {
        return (
          <div key={key}>
            <strong>{key}:</strong>
            <div style={{ marginLeft: 10 }}>{objToListDeep(obj[key])}</div>
          </div>
        );
      }
      return (
        <div key={key}>
          <strong>{key}:</strong> {obj[key] ? obj[key] : 'N/A'}
        </div>
      );
    });
  }


  useEffect(() => {
    if (!data) return;
    interface CustomSimulationNodeDatum extends d3.SimulationNodeDatum {
      id: string;
      label?: string;
      ip?: string;
      name?: string;
    }

    const nodes: CustomSimulationNodeDatum[] = data.nodes.map((node) => {
      const normalized = normalizeNode(node);
      return {
        id: normalized.id,
        label: normalized.label,
        type: normalized.properties.type,
        properties: normalized.properties,
      }
    });

    const links = data.edges.map((link) => {
      const normalized = normalizeEdge(link);
      return {
        source: normalized.source,
        target: normalized.target,
        label: normalized.label,
      }
    });





    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width || 600;
    const height = svg.node()?.getBoundingClientRect().height || 400;

    // Clear previous graph
    svg.selectAll('*').remove();

    // Set up the simulation (forces: collision, link strength, and centering)
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Add links (lines) between nodes
    const link = svg
      .append('g')
      .attr('stroke', '#96b48b')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 3);

    // Add nodes (circles)
    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 35)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .style('cursor', (d) => { return d.type === 'port' ? 'pointer' : 'move' })
      .attr('fill', (d) => {
        // Example: Use variations of the colors from the image
        if (d.type === 'host') return '#FF578F';  // Deep Pink for routers
        if (d.type === 'port') return '#F66859';  // Coral Orange for devices
        if (d.type === 'service') return '#f99889';  // Deep Violet for services
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
            setTooltip({
              visible: false,
              content: '',
              x: 0,
              y: 0,
              d: null,
            });
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;

          })
      ).on('click', (event, d: CustomSimulationNodeDatum) => {
        if (d.type === 'port') {
          setTooltip({
            visible: true,
            content: d.properties,
            x: event.pageX,
            y: event.pageY,
            d
          });
        } else {
          setTooltip({
            visible: false,
            content: '',
            x: 0,
            y: 0,
            d: null,
          });
        }

      });

    // Add labels to the nodes
    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle') // Better vertical alignment
      .style('user-select', 'none')
      .style('pointer-events', 'none')
      .each(function (d) {
        const text = d3.select(this);
        const lines = [d.label].filter(l => l);

        // Create tspans for each line
        lines.forEach((line, i) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? '0em' : '1.2em')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-weight', 'bold')
            .attr('fill', d.type == 'port' ? 'white' : 'black')
            .text(line);
        });
      });

    const link_label = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      // change text color to white
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('user-select', 'none')
      .attr('font-weight', 'bold')
      .text((d) => d.label);


    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d as any).source.x)
        .attr('y1', (d) => (d as any).source.y)
        .attr('x2', (d) => (d as any).target.x)
        .attr('y2', (d) => (d as any).target.y);

      node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!);

      label
        .attr('transform', (d) => `translate(${d.x},${d.y})`);

      link_label
        .attr('x', (d) => (((d as any).source.x + (d as any).target.x) / 2))
        .attr('y', (d) => (((d as any).source.y + (d as any).target.y) / 2));

    });

    return () => {
      simulation.stop(); // Stop simulation when component unmounts
    };
  }, [data]);



  return <div>
    <svg ref={svgRef} width="100%" height="600"></svg>
    {tooltip.visible && (
      <Tooltip title={objToListDeep(tooltip.content)} open={tooltip.visible} arrow>
        <div style={{
          position: 'absolute',
          left: tooltip.x + 10,
          top: tooltip.y - 10,
        }}></div>

      </Tooltip>
    )}
  </div>;
};

export default NetworkGraph;
