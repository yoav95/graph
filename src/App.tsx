import React, { useState } from "react";
import Graph from "./components/Graph/Graph";
import styles from "./App.module.css";
import { data } from "./graphData";
import { FaUserLarge, FaEllipsis, FaGear } from "react-icons/fa6";
import Control from "./components/Control/Control";
import NodeView from "./components/NodeView/NodeView";
import Modal from "./components/Modal/Modal";
import NodeMenu from "./components/NodeMenu/NodeMenu";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"node" | "link">("node");
  const [nodes, setNodes] = useState(data.nodes);
  const [links, setLinks] = useState(data.links);
  const [nodeMenuLocation, setNodeMenuLocation] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const showNode = (node: Node, clickLocation) => {
    setNodeMenuLocation(clickLocation);
    setSelectedNode(node);
  };
  const handleAddNode = (node: Node) => {
    setNodes((prev) => {
      const newNodes = [...prev];
      newNodes.push(node);
      return newNodes;
    });
    setShowModal(false);
  };

  const handleAddLink = (link: Link) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.push(link);
      return newLinks;
    });
    setShowModal(false);
  };

  const handleShowModal = (mode) => {
    setMode(mode);
    setShowModal(true);
  };

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <FaGear size={24} />
          </li>

          <li>
            <FaUserLarge size={24} />
          </li>
          <li>
            <FaEllipsis size={24} />{" "}
          </li>
        </ul>
      </nav>
      <Graph nodes={nodes} links={links} showNodeHandler={showNode} />
      <div className={styles.bottom}>
        <button onClick={() => handleShowModal("node")}>Add Node</button>
        <button onClick={() => handleShowModal("link")}>Add Link</button>
      </div>
      <NodeMenu nodeData={selectedNode} location={nodeMenuLocation} />
      <Modal show={showModal} onCloseModal={() => setShowModal(false)}>
        <Control
          mode={mode}
          onAddNode={handleAddNode}
          onAddLink={handleAddLink}
          numOfNodes={nodes.length}
        />
      </Modal>
    </div>
  );
};

export default App;
