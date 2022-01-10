import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Layout, Menu, Avatar, Image } from 'antd';
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import Main from './App';
import { auth, logout } from "./firebase2";
import "./styles/additional.css";
import "./styles/Dashboard.css";

const { Header, Content, Footer } = Layout;
  
  
  export default function App() {
  
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);
  
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
    }, [user, loading]);
  
    return (
        <Layout className="layout">
        <Header>
          <a target="_blank" href="https://somm.ai" className="logo" ><img style={{
  float: "left",
  width: "120px",
  height: "30px",
  margin: "16px 24px 16px 0",
}} src="https://somm.ai/images/somm.png"/></a>
          <Menu theme="dark" mode="horizontal">
          <Menu.Item key={1}>Home</Menu.Item>
          <Menu.Item key={3} onClick={logout} >Logout</Menu.Item>
          <Menu.Item key="8" id="userPhoto" style={{ marginLeft: 'auto' }}>

            {user && user.photoURL ? <Avatar src={<Image src={user.photoURL} style={{ width: 32 }} />} />:
            <Avatar style={{ backgroundColor: '#87d068' }}>{user&&user.email&&user.email[0].toUpperCase()}</Avatar>}
          </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
        <Main />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Somm.ai ©2022</Footer>
      </Layout>
        
    );
  }
