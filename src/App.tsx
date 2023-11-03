import React, { useState } from "react";
import Graph from "./components/Graph/Graph";
import styles from "./App.module.css";
import { data } from "./graphData";
import Control from "./components/Control/Control";
import NodeView from "./components/NodeView/NodeView";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [nodes, setNodes] = useState(data.nodes);
  const [links, setLinks] = useState(data.links);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const showNode = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className={styles.app}>
      <Graph nodes={nodes} links={links} showNodeHandler={showNode} />
    </div>
  );
};

export default App;
