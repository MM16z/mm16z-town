import "../../assets/sass/sass-components/container-component/navbar-container.scss";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import hasJWT from "../../auth/hasJWT";

function NavbarContainer(probs) {
  const navigate = useNavigate();
  const [userloginpanel, setUserLoginpanel] = useState(
    !hasJWT() ? (
      <Link
        className={
          window.location.pathname === "/"
            ? "nav-text-id3"
            : window.location.pathname === "/login"
            ? "nav-text-id3"
            : window.location.pathname === "/register"
            ? "nav-text-id3"
            : window.location.pathname === "/user/panel"
            ? "nav-text-id3_user-panel"
            : ""
        }
        to="/login"
      >
        login
      </Link>
    ) : null
  );
  const [userregisterpanel, setUserRegisterpanel] = useState(
    !hasJWT() ? (
      <Link
        className={
          window.location.pathname === "/"
            ? "nav-text-id4"
            : window.location.pathname === "/login"
            ? "nav-text-id4"
            : window.location.pathname === "/register"
            ? "nav-text-id4"
            : window.location.pathname === "/user/panel"
            ? "nav-text-id4_user-panel"
            : ""
        }
        to="/register"
      >
        register
      </Link>
    ) : null
  );

  useEffect(() => {}, []);

  return (
    <nav
      className={
        window.location.pathname === "/"
          ? "nav-container"
          : window.location.pathname === "/login"
          ? "nav-container_login"
          : window.location.pathname === "/register"
          ? "nav-container_register"
          : window.location.pathname === "/user/panel"
          ? "nav-container_user-panel"
          : ""
      }
    >
      <img
        id="homebtn"
        src="/images/home.png"
        onClick={() => {
          window.location = "/";
        }}
      ></img>
      <div className="nav-texts">
        <div id="nav-text-id1">MM16z</div>
        <div id="nav-text-id2">Town</div>
        <div
          className={
            window.location.pathname === "/"
              ? "nav-text-id5"
              : window.location.pathname === "/login"
              ? "nav-text-id5_login-page"
              : window.location.pathname === "/register"
              ? "nav-text-id5_register-page"
              : window.location.pathname === "/user/panel"
              ? "nav-text-id5_user-panel-page"
              : ""
          }
          onClick={() => {
            navigate("/user/panel");
          }}
        >
          {probs.navCurrentPath}
        </div>
        {userloginpanel}
        {userregisterpanel}
        {hasJWT() ? (
          <button
            id="logoutbtn"
            onClick={() => {
              localStorage.removeItem("token");
              // navigate("/");
              alert("Logged out");
              window.location = "/";
            }}
          ></button>
        ) : null}
      </div>
    </nav>
  );
}

export default NavbarContainer;
