import firebase from "firebase/compat/app";
import animation from "../../assets/login-illustration.gif";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { auth, db } from "../../configs/Firebase";
import "./login.css";

const Login = () => {
  var separatedString;

  const nav = useNavigate();

  //   const { user } = useSelector((state) => ({ ...state }));
  var user;
  useEffect(() => {
    user = JSON.parse(window.localStorage.getItem("user"));
    if (user && user.name) {
      nav("/dashboard");
    }
  }, [user, nav]);
  //   let dispatch = useDispatch();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();

      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            separatedString = doc.data();
            console.log("already hee", separatedString);
            window.localStorage.setItem(
              "user",
              JSON.stringify(separatedString)
            );
          } else {
            await db
              .collection("users")
              .doc(user.email)
              .set({
                name: user.email.split("@")[0],
                url:
                  user.photoURL ??
                  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                email: user.email,
              })
              .then(() => {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify({
                    name: user.email.split("@")[0],
                    email: user.email,
                    url:
                      user.photoURL ??
                      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                    token: idTokenResult.token,
                    id: user.email,
                  })
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .then(() => {
          // window.location.reload();
          alert("successfully login");
        });
      //   await db
      //     .collection("users")
      //     .doc(user.email)
      //     .get()
      //     .then(async (doc) => {

      //     });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <div className="card">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Chat App</h1>
              <div className="social-container"></div>

              <button style={{ cursor: "pointer" }} onClick={signInWithGoogle}>
                Sign In with google
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div
                className="overlay-panel overlay-right"
                style={{ backgroundColor: "#3A4FAB" }}
              >
                <img
                  style={{
                    width: "100%",
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no - repeat",
                  }}
                  src={animation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
