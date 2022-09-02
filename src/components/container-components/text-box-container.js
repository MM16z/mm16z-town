import "../../assets/sass/sass-components/container-component/text-box-container.scss";

import React from "react";

function TextBoxContainer(probs) {
  const { username, context, date, onDelbtnclick, onEditbtnclick } = probs;
  return (
    <div className="text-box-container text-box-container">
      <span
        id={
          window.location.pathname === "/"
            ? "text-box-from"
            : window.location.pathname === "/user/panel"
            ? "text-box-from_user-panel-page"
            : ""
        }
      >
        <div className="usertext"> From : {username}</div>
      </span>
      <input
        id={
          window.location.pathname === "/"
            ? "post-edit-btn_null"
            : window.location.pathname === "/user/panel"
            ? "post-edit-btn"
            : ""
        }
        type="button"
        value="EDIT"
        onClick={onEditbtnclick}
      ></input>
      <span
        id={
          window.location.pathname === "/"
            ? "text-box-message"
            : window.location.pathname === "/user/panel"
            ? "text-box-message_user-panel-page"
            : ""
        }
      >
        {context}
      </span>
      <span
        id={
          window.location.pathname === "/"
            ? "text-box-date"
            : window.location.pathname === "/user/panel"
            ? "text-box-date_user-panel-page"
            : ""
        }
      >
        Date : {date}
      </span>
      <div
        className={
          window.location.pathname === "/"
            ? "text-box-border"
            : window.location.pathname === "/user/panel"
            ? "text-box-border_user-panel-page"
            : ""
        }
      ></div>
      <input
        id={
          window.location.pathname === "/"
            ? "post-delete-btn_null"
            : window.location.pathname === "/user/panel"
            ? "post-delete-btn"
            : ""
        }
        type="button"
        value="DELETE"
        onClick={onDelbtnclick}
      ></input>
    </div>
  );
}

export default TextBoxContainer;
