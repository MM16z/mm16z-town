import "../../assets/sass/sass-components/register-page/register-page.scss";

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarContainer from "../container-components/navbar-container";
import BackgroundContainer from "../container-components/background-container";

import hasJWT from "../../auth/hasJWT";
import getUserauth from "../../auth/getUserauth";

function RegisterPage() {
  const emailRef = useRef();
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const Jsondata = {
      username: username,
      email: email,
      password: password,
    };
    fetch("https://mm16z-town-crud.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Register Success");
          window.location = "/";
        } else {
          alert("Register failed");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setUsername("");
    setEmail("");
    setPassword("");
    setSuccess(true);
  };

  useEffect(() => {
    routeAuth();
    emailRef.current.focus();
  }, []);

  return (
    <div className="register-page-container">
      <NavbarContainer navCurrentPath="/Register" />
      <form method="post" onSubmit={handleSubmit}>
        <div className="register-inputcontainer">
          <label htmlFor="email-input">Enter your email</label>
          <input
            className="inputborder"
            id="email-input"
            type="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
          <label htmlFor="password-input">Enter your password</label>
          <input
            className="inputborder"
            id="password-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          <label htmlFor="username-input" id="username-input-label">
            Enter your Username
          </label>
          <input
            className="inputborder"
            id="username-input"
            type="text"
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          ></input>
          <input id="register-submitbtn" type="submit" value="Register"></input>
        </div>
      </form>
      <BackgroundContainer />
    </div>
  );
}

export default RegisterPage;
