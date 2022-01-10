import { firebaseConfig } from "./firebase";
import firebase from 'firebase';

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();

// passwordless signin
const signInWithEmailOnly = async (email) => {
  try {
    await auth.sendSignInLinkToEmail(email,  {
      // Your redirect URL
      url: 'http://localhost:3000', 
      handleCodeInApp: true,
    });
    alert("An authentication email has been sent to your email!");
    window.localStorage.setItem('emailForSignIn', email);
    
  } catch(err) {
    console.log(err.message);
  }
}

const confirmSignIn = async (url) => {
  try {
    if (auth.isSignInWithEmailLink(url)) {
      let email = window.localStorage.getItem('emailForSignIn');
      
      // if missing email, prompt user for it
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      // sign in user and remove email from local storage
      await auth.signInWithEmailLink(email, url)
        .then(async (res) => {
          // window.localStorage.removeItem('emailForSignIn');
          const query = await db
            .collection("users")
            .where("uid", "==", res.user.uid)
            .get();
          if (query.docs.length === 0) {
            await db.collection("users").add({
              uid: res.user.uid,
              authProvider: "email",
              email: res.user.email,
            });
          };
        })
      
    }
  } catch(err) {
    console.log(err.message);
  }
}


const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  signInWithEmailOnly,
  confirmSignIn,
};