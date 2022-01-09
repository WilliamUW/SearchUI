import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import signIn from "./Home";

import "./config/global.js";

import "antd/dist/antd.css";

var debugMode = false;

if (debugMode) {
  ReactDOM.render(
    global.debugTextContent,
    document.getElementById("debugText")
  );
}
// ReactDOM.render(<threeDots />, document.getElementById("loadingDiv"));

// ReactDOM.render(<Home />, document.getElementById("root"));

export function Login() {
  return (
    <>
      <button onClick={() => signIn()}>login</button>
    </>
  );
}

ReactDOM.render(<Home />, document.getElementById("root"));

// ReactDOM.render(<Login />, document.getElementById("loadingDiv"));

export function threeDots() {
  return (
    <>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </>
  );
}
