import React from "react";
import styles from "./NodeMenu.module.css";
const NodeMenu = ({ nodeData, location }) => {
  console.log(location);
  if (!nodeData || !location) return null;
  return (
    <div
      className={styles.nodemenu}
      style={{ left: `${location.x}px`, top: `${location.y - 100}px` }}
    >
      <nav>
        <p>show node</p>
        <p>node visual setting</p>
        <p>remove</p>
      </nav>
    </div>
  );
};

export default NodeMenu;
