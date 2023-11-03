import React, { useState, useEffect, useRef } from "react";
import {
  select,
  selectAll,
  forceSimulation,
  forceCenter,
  forceLink,
  forceManyBody,
  drag,
  zoom as d3Zoom,
} from "d3";
import { shortenPathBetweenCircles, shortenSVGPath } from "../../utils";

const width = "100%";
const height = "100%";
const types = ["resolved", "suit", "licensing"];

const Graph = ({ nodes, links, showNodeHandler }: GraphProps) => {
  const [simulation, setSimulation] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  useEffect(() => {
    // each time component props change (nodes,links) this code runs
    // its generates a graphData object with nodes and links fields, that
    // has more data about the location of the nodes and links
    const graphSimulation = forceSimulation()
      .nodes(nodes)
      .force("center", forceCenter(500, 200))
      .force("charge", forceManyBody())
      .force("link", forceLink(links).distance(300));
    setSimulation(graphSimulation);
    setGraphData({
      nodes: [...graphSimulation.nodes()],
      links: graphSimulation.force("link").links(),
    });
  }, [nodes, links]);

  useEffect(() => {
    // runs each time graphData changes,
    // in case of a change in values, renderGraph function runs and "draw" the graph
    if (graphData === null) {
      return;
    } else {
      renderGraph();
    }
  }, [graphData]);

  const renderGraph = () => {
    // for rendering the graph to the screen on every change of graph data
    const svg = select("#graph");
    svg
      .append("svg:defs")
      .append("svg:marker")
      .attr("id", "end-arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8) // Adjust the position of the arrowhead on the line
      .attr("markerWidth", 8) // Adjust the size of the marker
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "var(--main-line-color)");

    const container = svg.select("#container");

    let zoom = d3Zoom().scaleExtent([0.1, 4]).on("zoom", handleZoom);
    const link = container
      .select("#lines")
      .selectAll("path")
      .data(graphData.links)
      .join("path")
      .attr("stroke", "var(--main-line-color)")
      .attr("stroke-width", "2px")
      .attr("marker-end", "url(#end-arrow)");
    const node = container
      .select("#circles")
      .selectAll("circle")
      .data(graphData.nodes)
      .join("circle")
      .attr("r", (node: Node) => node.radius)
      .attr("class", "circle")
      .attr("fill", (node) => node.color)
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      )
      .on("mouseover", (event) => {
        event.srcElement.classList.toggle("selected");
      })
      .on("mouseout", (event) => {
        event.srcElement.classList.toggle("selected");
      });

    const title = container
      .select("#text")
      .selectAll("text")
      .data(graphData.nodes)
      .join("text")
      .text((node, index) => node.title)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("class", "title");

    const index = container
      .select("#index")
      .selectAll("text")
      .data(graphData.nodes)
      .join("text")
      .text((node, index) => `(${index})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("class", "title");

    simulation.on("tick", () => ticked(node, link, title, index));
    svg.call(zoom);
  };
  const handleZoom = (e) => {
    select("#container").attr("transform", e.transform);
  };

  const ticked = (node, link, title, index) => {
    // this should be a constant function -> fix it so it wont be created on each rerender
    node.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
    link.attr("d", (d) => {
      // const dAttribute = `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`;

      const dAttribute = `M${d.source.x},${d.source.y} A0,0 0 0,1 ${d.target.x},${d.target.y}`;
      const c1 = {
        radius: d.source.radius,
        x: d.source.x,
        y: d.source.y,
      };
      const c2 = {
        radius: d.target.radius,
        x: d.target.x,
        y: d.target.y,
      };
      const newD = shortenSVGPath(dAttribute, c1, c2, 200);
      return newD;
    });
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
    // this should be a constant function -> fix it so it wont be created on each rerender
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  // function to drag
  function dragged(event, d) {
    // this should be a constant function -> fix it so it wont be created on each rerender
    d.fx = event.x;
    d.fy = event.y;
  }

  // function to end dragging
  function dragended(event, d) {
    // this should be a constant function -> fix it so it wont be created on each rerender
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
        overflow: "visible",
        cursor: "pointer",
      }}
      onClick={handleGraphClick}
    >
      <g id="container">
        <g id="lines"></g>
        <g id="circles"></g>
        <g id="text"></g>
        <g id="index"></g>
      </g>
    </svg>
  );
};

export default Graph;
