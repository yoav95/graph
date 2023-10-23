import React from "react";
import styles from "./NodeView.module.css";
const NodeView = ({ nodeData }: NodeViewProps) => {
  return (
    <div className={styles.nodeview}>
      <p>title</p>
      <p>{nodeData.title}</p>
      <p>id</p>
      <p>{nodeData.id}</p>
    </div>
  );
};

export default NodeView;
