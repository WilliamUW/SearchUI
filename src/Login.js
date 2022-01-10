import {Input, Button} from 'antd'
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailOnly, signInWithGoogle, confirmSignIn } from "./firebase2";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState(
    window.localStorage.getItem("emailForSignIn") || ""
  );
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    
    confirmSignIn(window.location.href);

    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="login">

      
      <img className="logo" src="https://somm.ai/images/somm.png"/>
      
      

      <div className="login__container" style={{maxWidth:"400px"}}>
      Somm.ai Retail is a BETA product that helps you keep 
      track of your and your competitors wine in email offers. 
      It is our first retail product. Check it out!
      <br/>
      <br/>
        <Input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your e-mail"
        />
        {/* <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /> */}
        <Button
          className="login__btn"
          onClick={() => signInWithEmailOnly(email)}
        >
          Login with Email
        </Button>
        <Button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </Button>
        {/* <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div> */}
      </div>
    </div>
  );
}

export default Login;