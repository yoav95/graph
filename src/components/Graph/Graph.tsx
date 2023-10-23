import React, { useState, useEffect, useRef } from "react";
import {
  select,
  selectAll,
  forceSimulation,
  forceCenter,
  forceLink,
  forceManyBody,
  drag,
} from "d3";

const width = 1000;
const height = 500;

const Graph = ({ nodes, links, showNodeHandler }: GraphProps) => {
  const [simulation, setSimulation] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  useEffect(() => {
    const graphSimulation = forceSimulation()
      .nodes(nodes)
      .force("center", forceCenter(width / 2, height / 2))
      .force("charge", forceManyBody())
      .force("link", forceLink(links).distance(200));
    setSimulation(graphSimulation);
    setGraphData({
      nodes: [...graphSimulation.nodes()],
      links: graphSimulation.force("link").links(),
    });
  }, [nodes, links]);

  useEffect(() => {
    if (graphData === null) {
      return;
    } else {
      renderGraph();
    }
  }, [graphData]);

  const renderGraph = () => {
    const svg = select("#graph");
    const link = svg
      .select("#lines")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke", "var(--main-line-color)")
      .attr("stroke-width", "2px");
    const node = svg
      .select("#circles")
      .selectAll("circle")
      .data(graphData.nodes)
      .join("circle")
      .attr("r", 38)
      .attr("class", "circle")
      .attr("fill", "var(--main-node-color)")
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      )
      .on("mouseover", (event) => {
        event.srcElement.classList.toggle("selected");
      })
      .on("mouseout", (event) => {
        event.srcElement.classList.toggle("selected");
      });

    const title = svg
      .select("#text")
      .selectAll("text")
      .data(graphData.nodes)
      .join("text")
      .text((node, index) => node.title)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("class", "title");

    const index = svg
      .select("#index")
      .selectAll("text")
      .data(graphData.nodes)
      .join("text")
      .text((node, index) => `(${index})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("class", "title");

    simulation.on("tick", () => ticked(node, link, title, index));
  };

  const ticked = (node, link, title, index) => {
    node.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
    link
      .attr("x1", (link) => link.source.x)
      .attr("y1", (link) => link.source.y)
      .attr("x2", (link) => link.target.x)
      .attr("y2", (link) => link.target.y);
    title
      .attr("x", (node) => node.x)
      .attr("y", (node) => node.y)
      .attr("dy", "0em");
    index
      .attr("x", (node) => node.x)
      .attr("y", (node) => node.y)
      .attr("dy", "1em");
  };
  // function to start dragging
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  // function to drag
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  // function to end dragging
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    if (d.fixed == true) {
      d.fx = d.x;
      d.fy = d.y;
    } else {
      d.fx = null;
      d.fy = null;
    }
  }
  const handleGraphClick = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const element = simulation.find(x, y, 15);
    showNodeHandler(element);
  };
  return (
    <svg
      id="graph"
      style={{
        height: height,
        width: width,
        border: "2px solid var(--main-line-color)",
      }}
      onClick={handleGraphClick}
    >
      <g id="lines"></g>
      <g id="circles"></g>
      <g id="text"></g>
      <g id="index"></g>
    </svg>
  );
};

export default Graph;
