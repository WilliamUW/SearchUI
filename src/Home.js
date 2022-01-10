// imports
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Menu } from "antd";
import "antd/dist/antd.css";
import React, { Component, useState } from "react";
import "./additional.css";
import App from "./App";
import threeDots from "./index";
import ReactDOM from "react-dom";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import { Form, Input, Button, Checkbox } from "antd";
import Modal from "antd/lib/modal/Modal";

const passwordMessage =
  "Please input your password! Must have at least 6 characters.";

const alreadySignedIn =
  "You are already signed in! Please sign out if you would like to register or sign in.";
const alreadySignedOut = "You are already signed out!";

const emailRules = [
  {
    required: true,
    message: "Please input your email!"
  }
];
const passwordRules = [
  {
    required: true,
    min: 6,
    message: passwordMessage
  }
];

const RegisterForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    var email = values.email;
    var password = values.password;
    createUser(email, password);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <button onClick={showModal}>Register Email</button>
      <Modal
        title="Register Email/Password Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input />
          </Form.Item>

          <Form.Item
            id="passwordInput"
            label="Password"
            name="password"
            rules={passwordRules}
          >
            <Input.Password />
          </Form.Item>
          {/*
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
             <Checkbox>Remember me</Checkbox> 
          </Form.Item>
*/}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const SignInForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    var email = values.email;
    var password = values.password;
    signInEmail(email, password);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <button onClick={showModal}>Sign In Email</button>
      <Modal
        title="Sign In Email/Password Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        onClick={showModal}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input />
          </Form.Item>

          <Form.Item
            id="passwordInput"
            label="Password"
            name="password"
            rules={passwordRules}
          >
            <Input.Password />
          </Form.Item>
          {/*
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Checkbox>Remember me</Checkbox> 
          </Form.Item>
*/}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// constants
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

var signedIn = false;
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();
var currentUser;

// sign in status messages
var signedInMessage = "You are currently signed in. ✅";
var signedOutMessage = "You are currently not signed in. ❌";
var currentlySigningInMessage = "Currently Signing In ⏳";
var currentlySigningOutMessage = "Currently Signing Out ⏳";

export function refreshHome() {
  if (currentUser) {
    // refresh signedIn status
    signedIn = true;
  } else {
    signedIn = false;
  }
  ReactDOM.render(<Home />, document.getElementById("root")); // render Home
  return true;
}

export function signInGoogle() {
  if (signedIn !== true) {
    /*
    document.getElementById(
      "signInStatus"
    ).innerHTML = currentlySigningInMessage;
    */

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Auth result");

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        currentUser = result.user;
        // console.log(credential);
        console.log(user);
        signedIn = true;
        // document.getElementById("appDiv").style.visibility = "visible";

        refreshHome();
        alert("Sign in successful.");
      })
      .catch((error) => {
        console.log("Auth error");
        // Handle Errors here.

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(error);
      });
    // getAuth();
    /*
    var google_provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((re) => console.log(re))
      .catch((err) => console.log(err));
*/

    // document.getElementById("signInButton").style.visibility = "hidden";
  } else {
    alert(alreadySignedIn);
  }
}

function accountSignOut() {
  if (signedIn !== false) {
    /*
    document.getElementById(
      "signInStatus"
    ).innerHTML = currentlySigningOutMessage;
*/
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        signedIn = false;
        currentUser = null;
        refreshHome();
        //document.getElementById("signInStatus").innerHTML = signedOutMessage;
        // document.getElementById("userInfo").innerHTML = "You have signed out.";
        console.log("Sign out success");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });

    // document.getElementById("signOutButton").style.visibility = "hidden";
    //document.getElementById("appDiv").style.visibility = "hidden";
  } else {
    alert(alreadySignedOut);
  }
}

function createUser(email, password) {
  console.log("create user called");
  if (!signedIn) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Registered success");
        // Signed in
        const user = userCredential.user;
        currentUser = user;
        // ...
        refreshHome();
        alert("You have registered using email successfully!");
      })
      .catch((error) => {
        console.log("Register error");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  } else {
    alert(alreadySignedIn);
  }
}

function signInEmail(email, password) {
  if (!signedIn) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign in email success");
        // Signed in
        const user = userCredential.user;
        currentUser = user;
        // ...
        refreshHome();
        alert("You have signed in using email!");
      })
      .catch((error) => {
        console.log("Sign in email error");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  } else {
    alert(alreadySignedIn);
  }
}

class Home extends Component {
  render() {
    console.log(currentUser);
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
                alt="somm.ai logo"
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
          <Menu.Item key="12">
            <RegisterForm />
          </Menu.Item>
          <Menu.Item key="11">
            <SignInForm />
          </Menu.Item>
          <Menu.Item key="4">
            <a
              id="signInButton"
              href="#"
              onClick={() => signInGoogle()}
              // disabled={signedIn === true}
            >
              Google Sign In
            </a>
          </Menu.Item>
          <Menu.Item key="5">
            <a
              id="signOutButton"
              href="#"
              onClick={() => accountSignOut()}
              // disabled={signedIn === false}
            >
              Sign Out
            </a>
          </Menu.Item>
          <Menu.Item key="7" id="userInfo">
            {currentUser
              ? "Signed in as: " + currentUser.email
              : "Please Sign In to access Retail Emails!"}
          </Menu.Item>
          <Menu.Item key="8" id="userPhoto">
            <img
              src={
                currentUser
                  ? currentUser.photoURL
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              // alt="userPhoto"
              width="30em"
              style={{ borderRadius: "50%" }}
            />
          </Menu.Item>
        </Menu>

        {signedIn ? <App /> : "Please Sign In to access Retail Emails!"}
      </>
    );
  }
}

export default Home;
