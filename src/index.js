import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./config/global.js";

global.foo = "debug_test";

var t0 = performance.now();
ReactDOM.render(<App />, document.getElementById("root"));
var t1 = performance.now();
console.log("App render took " + (t1 - t0) + " milliseconds.");

ReactDOM.render(global.foo, document.getElementById("debugText"));

export function displayRuntime() {
  ReactDOM.render(global.runtime, document.getElementById("runtimeText"));
}
