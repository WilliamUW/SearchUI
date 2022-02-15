import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Layout, Menu, Avatar, Image } from 'antd';
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import Main from './App';
import { auth, logout } from "./firebase2";
import "./styles/additional.css";
import "./styles/Dashboard.css";
import firebase from 'firebase'; 

const { Header, Content, Footer } = Layout;
  
  
  export default function App(props) {
  
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);
    const [isPro, setIsPro] = useState();
  
    useEffect(() => {
      if (loading) return;
      if (!user) return history.replace("/");
      firebase
        .database()
        .ref(`/users/${user.uid}/pro-membership/active`)
        .once("value")
        .then(snapshot => {
          setIsPro(snapshot.val());
      });
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
        <Content style={{ padding: '0 50px',filter: isPro?"none":'blur(4px)', pointerEvents: isPro?'auto':'none'}}>
          <Main />
        </Content>
        {isPro?null:
        <Content>
          <div className="free">
            <p className="free-text">Make a Somm.ai Pro account to see results!</p>
            <div>
              <a href="https://pro.somm.ai/meetings/davidxmkong" target="_blank" className="button schedule">
                <span> Schedule a Demo </span>
              </a>
              <div onClick={() => window.Intercom("show")} className="button chat">
                <span> Chat with Us </span>
              </div>
            </div>
          </div>
        </Content>}
        <Footer style={{ textAlign: 'center' }}>Somm.ai ©2022</Footer>
      </Layout>
        
    );
  }
