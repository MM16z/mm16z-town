import "../../assets/sass/sass-components/main-page/main-section/main-section.scss";

import React from "react";
import TextBoxContainer from "../container-components/text-box-container";
import BackgroundContainer from "../container-components/background-container";
import Axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hasJWT from "../../auth/hasJWT";

function Mainsection() {
  const [userpostdata, setUserData] = useState([]);

  const navigate = useNavigate();

  const getUserposts = () => {
    Axios.get("https://mm16-town.vercel.app/user_posts").then((response) => {
      setUserData(response.data);
    });
  };

  useEffect(() => {
    getUserposts();
    console.log();
  }, []);

  return (
    <div className="main-section-container">
      <section className="contents-header-section">
        <span id="contents-header-id1">Write something nice to me :D</span>
        {hasJWT() ? (
          <button
            id="i'm not lazy ;D, just keep it simple :P"
            style={{
              position: "absolute",
              width: "8vw",
              height: "3vw",
              minWidth: "60px",
              minHeight: "30px",
              marginLeft: "60vw",
              fontSize: "1vw",
              overflow: "hidden",
            }}
            onClick={() => {
              navigate("/user/panel");
            }}
          >
            Creat new post
          </button>
        ) : null}
      </section>
      <section className="contents-main-section">
        <article className="content-textbox-list">
          {userpostdata.map((val, key) => {
            return (
              <TextBoxContainer
                key={val.post_id}
                username={val.post_from_user}
                context={val.user_post_context}
                date={val.user_post_created_date.slice(0, 10)}
              />
            );
          })}
        </article>
      </section>
      <BackgroundContainer />
    </div>
  );
}

export default Mainsection;
