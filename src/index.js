import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

import "./config/global.js";

import "antd/dist/antd.css";

var debugMode = false;

if (debugMode) {
  ReactDOM.render(
    global.debugTextContent,
    document.getElementById("debugText")
  );
}
ReactDOM.render(<Home />, document.getElementById("root"));
