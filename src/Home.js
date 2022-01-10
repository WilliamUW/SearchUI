// imports
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "antd/dist/antd.css";
import React from "react";
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./Container";
import Login from "./Login";
import "./styles/additional.css";
import './styles/App.css';

class App2 extends Component {
  render() {
    console.log("test")
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={Reset} /> */}
            <Route exact path="/dashboard" component={App} />
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App2;
