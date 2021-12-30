import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./config/global.js";

import "antd/dist/antd.css";

var debugMode = false;

if (debugMode) {
  ReactDOM.render(
    global.debugTextContent,
    document.getElementById("debugText")
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
