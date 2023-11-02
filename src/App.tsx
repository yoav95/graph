import React, { useState } from "react";
import Graph from "./components/Graph/Graph";
import styles from "./App.module.css";
import { data } from "./graphData";
import Control from "./components/Control/Control";
import NodeView from "./components/NodeView/NodeView";
const App = () => {
  const [nodes, setNodes] = useState(data.nodes);
  const [links, setLinks] = useState(data.links);
  const [selectedNode, setSelectedNode] = useState(null);
  const saveGraph = () => {
    console.log(links, nodes);
  };
  const addNode = (node: Node) => {
    setNodes((prev) => {
      const newNodes = [...prev];
      newNodes.push(node);
      return newNodes;
    });
  };
  const addLink = (link: Link) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.push(link);
      return newLinks;
    });
  };
  const showNode = (node) => {
    setSelectedNode(node);
  };
  const showModal = () => {
    alert("adding node");
  };
  return (
    <div className={styles.app}>
      <Graph nodes={nodes} links={links} showNodeHandler={showNode} />
      <div className={styles.control}>
        <button className={styles.btn}>add node</button>
        <button className={styles.btn}>add link</button>
        <button className={styles.btn}>save graph</button>
      </div>
    </div>
  );
};

export default App;
