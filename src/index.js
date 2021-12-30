import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./config/global.js";

import { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

var debugMode = false;

if (debugMode) {
  ReactDOM.render(
    global.debugTextContent,
    document.getElementById("debugText")
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
