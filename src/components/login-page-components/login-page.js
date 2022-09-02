import "../../assets/sass/sass-components/login-page/login-page.scss";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import BackgroundContainer from "../container-components/background-container";
import NavbarContainer from "../container-components/navbar-container";
import hasJWT from "../../auth/hasJWT";
import getUserauth from "../../auth/getUserauth";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailRef = useRef();

  let navigate = useNavigate();

  const routeAuth = () => {
    if (hasJWT()) {
      if (
        getUserauth().then((result) => {
          if (result.data.status === "error") {
            localStorage.clear();
            window.location = "/";
          } else {
            navigate("/user/panel");
          }
        })
      );
      alert("already login");
      alert("dont broke my Pepehands code :(");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   Axios.post(
  //     "http://localhost:3001/login",
  //     JSON.stringify({ email: email, password: password }),
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   Axios.interceptors.response.use(
  //     function (response) {
  //       if (response.data.status === "ok") {
  //         alert("Login success");
  //         localStorage.setItem("token", response.data.token);
  //         window.location = "/user/panel";
  //       } else {
  //         alert("login failed");
  //       }
  //     },
  //     function (error) {
  //       return Promise.reject(error);
  //     }
  //   );
  //   setEmail("");
  //   setPassword("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Jsondata = {
      email: email,
      password: password,
    };
    fetch("https://mm16z-town-crud.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Login success");
          localStorage.setItem("token", data.token);
          window.location = "/user/panel";
        } else {
          alert("login failed");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    routeAuth();
    emailRef.current.focus();
  }, []);

  return (
    <div className="login-page-container">
      <NavbarContainer navCurrentPath="/Login" />
      <form method="post" onSubmit={handleSubmit}>
        <div className="login-inputcontainer">
          <label htmlFor="email-input">Enter your email :D</label>
          <input
            className="inputborder"
            id="email-input"
            type="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
          <label htmlFor="password-input">Enter your password :V</label>
          <input
            className="inputborder"
            id="password-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          <input id="login-submitbtn" type="submit" value="Login"></input>
        </div>
      </form>
      <BackgroundContainer />
    </div>
  );
}

export default LoginPage;
