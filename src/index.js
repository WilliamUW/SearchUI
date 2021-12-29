import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./config/global.js";

import { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

const ModalApp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Test Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Content 1</p>
        <p>This is a test.</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

var debugMode = false;

if (debugMode) {
  ReactDOM.render(
    global.debugTextContent,
    document.getElementById("debugText")
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(<ModalApp />, document.getElementById("debugText"));
