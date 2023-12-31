import React, { useState } from "react";
import getRandomFruitsName from "random-fruits-name";
import { getRandomBrightColor } from "../../utils";
import styles from "./Control.module.css";
const NUM_OF_FRUITS = 10;
const Control = ({ onAddNode, onAddLink, numOfNodes, mode }) => {
  const handleLinkSubmit = (event) => {
    event.preventDefault();
    const from = event.target.querySelector("#from").value;
    const to = event.target.querySelector("#to").value;
    onAddLink({ source: Number(from), target: Number(to) });
  };
  const handleNodeSubmit = (event) => {
    event.preventDefault();
    const fruit: string = event.target[0].value;
    const randomColor = getRandomBrightColor();
    const node = {
      id: Math.random().toString(),
      title: fruit,
      radius: 38,
      color: randomColor,
    };
    onAddNode(node);
  };
  const fruits = [];
  for (let i = 0; i < NUM_OF_FRUITS; i++) {
    fruits.push(getRandomFruitsName());
  }
  const jsx =
    mode === "node" ? (
      <div
        className={styles.control}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleNodeSubmit}>
          <h2>{mode === "node" ? "Add Node" : "Add Link"}</h2>
          <label>fruit name</label>
          <select>
            {fruits.map((fruit) => (
              <option key={fruit + Math.random().toString()} value={fruit}>
                {fruit}
              </option>
            ))}
          </select>
          <button type="submit">add</button>
        </form>
      </div>
    ) : (
      <div
        className={styles.control}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleLinkSubmit}>
          <h2>{mode === "node" ? "Add Node" : "Add Link"}</h2>
          <label>from</label>
          <select id="from">
            {Array.from({ length: numOfNodes }, (_, index) => index).map(
              (num) => (
                <option key={Math.random().toString()} value={num}>
                  {num}
                </option>
              )
            )}
          </select>
          <label>to</label>
          <select id="to">
            {Array.from({ length: numOfNodes }, (_, index) => index).map(
              (num) => (
                <option key={Math.random().toString()} value={num}>
                  {num}
                </option>
              )
            )}
          </select>
          <button type="submit">add</button>
        </form>
      </div>
    );

  return <>{jsx}</>;
};

export default Control;
