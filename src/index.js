import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import myInitObject from "./config/myInitObject";

import "./config/global.js";

global.foo = "foo_changed";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(global.foo, document.getElementById("debugText"));

export function displayRuntime() {
  ReactDOM.render(global.runtime, document.getElementById("runtimeText"));
}
