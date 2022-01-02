import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Menu } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./additional.css";
import App from "./App";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class Home extends Component {
  render() {
    return (
      <>
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="3">
            <a
              href="https://somm.ai"
              title="somm.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ zoom: 0.5 }}
                src="https://somm.ai/images/somm.png"
              ></img>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a
              href="/"
              title="Somm.ai Email Search Home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email Search Home
            </a>
          </Menu.Item>
        </Menu>

        <App />
      </>
    );
  }
}

export default Home;
