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
  return (
    <div className={styles.app}>
      <Graph nodes={nodes} links={links} showNodeHandler={showNode} />

      <div className={styles.box}>
        <Control
          onAddNode={addNode}
          onAddLink={addLink}
          numOfNodes={nodes.length}
        />
        {selectedNode && <NodeView nodeData={selectedNode} />}
        <div>
          <button onClick={saveGraph}>Save Graph</button>
        </div>
      </div>
    </div>
  );
};

export default App;
