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
import React, { Component } from "react";
import "./additional.css";
import App from "./App";
import threeDots from "./index";
import ReactDOM from "react-dom";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

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

export function renderHome() {
  ReactDOM.render(<Home />, document.getElementById("root"));
  return true;
}

export function signIn() {
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

        renderHome();
        document.getElementById("userInfo").innerHTML = "Hello " + user.email;
        /*
        document.getElementById("signInStatus").innerHTML = signedInMessage;
        
        
        */
        if (document.getElementById("userPhoto")) {
          document.getElementById("userPhoto").src = user.photoURL;
        }
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
    alert("You are already signed in!");
  }
}

function siteSignOut() {
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

        renderHome();
        //document.getElementById("signInStatus").innerHTML = signedOutMessage;
        document.getElementById("userInfo").innerHTML = "You have signed out.";
        console.log("Sign out success");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });

    // document.getElementById("signOutButton").style.visibility = "hidden";
    //document.getElementById("appDiv").style.visibility = "hidden";
  } else {
    alert("You are already signed out!");
  }
}

class Home extends Component {
  render() {
    if (1) {
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
            <Menu.Item key="4">
              <a
                id="signInButton"
                href="#"
                onClick={() => signIn()}
                // disabled={signedIn === true}
              >
                Sign In
              </a>
            </Menu.Item>
            <Menu.Item key="5">
              <a
                id="signOutButton"
                href="#"
                onClick={() => siteSignOut()}
                // disabled={signedIn === false}
              >
                Sign Out
              </a>
            </Menu.Item>
            <Menu.Item key="6" id="signInStatus">
              {/* signedIn ? signedInMessage : signedOutMessage*/}
            </Menu.Item>
            <Menu.Item key="7" id="userInfo"></Menu.Item>
            <Menu.Item key="8" id="userPhoto">
              <img
                src={
                  currentUser
                    ? currentUser.photoURL
                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                }
                alt="userPhoto"
                width="30em"
                style={{ "border-radius": "50%" }}
              />
            </Menu.Item>
          </Menu>

          {signedIn ? <App /> : ""}
        </>
      );
    }
  }
}

export default Home;
