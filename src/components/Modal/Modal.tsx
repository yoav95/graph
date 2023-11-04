import React from "react";
import styles from "./Modal.module.css";
const Modal = ({ children, show, onCloseModal }) => {
  if (!show) return <></>;
  return (
    <div className={styles.modal} onClick={onCloseModal}>
      {children}
    </div>
  );
};

export default Modal;
