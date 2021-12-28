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
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
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
var t0 = performance.now();
ReactDOM.render(<App />, document.getElementById("root"));
var t1 = performance.now();
console.log("App render took " + (t1 - t0) + " milliseconds.");

updateRuntime(t0, t1);
displayRuntime();

ReactDOM.render(<ModalApp />, document.getElementById("debugText"));

export function updateRuntime(t0, t1) {
  global.runtime = t1 - t0;
  displayRuntime();
}

export function lastRuntime(t0, t1) {
  if (debugMode) {
    ReactDOM.render(
      "Last function run time: " + (t1 - t0) + "ms",
      document.getElementById("debugText")
    );
  }
}

export function displayRuntime() {
  if (debugMode) {
    ReactDOM.render(
      "App render time: " + global.runtime + "ms",
      document.getElementById("runtimeText")
    );
  }
}
