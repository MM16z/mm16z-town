import "../../assets/sass/sass-components/user-panel-page/user-panel-page.scss";
import "../../assets/sass/sass-components/container-component/navbar-container.scss";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import NavbarContainer from "../container-components/navbar-container";
import BackgroundContainer from "../container-components/background-container";
import TextBoxContainer from "../container-components/text-box-container";
import getUserauth from "../../auth/getUserauth";
import hasJWT from "../../auth/hasJWT";

function UserPanelPage() {
  const [username, setUsername] = useState("");
  const [postcontext, setPostContext] = useState("");
  const [userpostdata, setUserPostData] = useState([]);
  const [usereditinput, setUserEditinput] = useState(false);
  const [preveditdata, setprevEditdata] = useState();
  const [userpostid, setPostid] = useState();

  const editdataRef = useRef();
  const postcontextRef = useRef();

  let navigate = useNavigate();

  const onEdithandleClick = (currentpostcontext, postid) => {
    setUserEditinput(true);
    setprevEditdata(currentpostcontext);
    setPostid(postid);
  };

  const routeAuth = () => {
    if (hasJWT()) {
      if (
        getUserauth().then((result) => {
          if (result.data.status === "error") {
            localStorage.clear();
            window.location = "/";
            console.log(result);
          } else {
            setUsername(result.data.decoded.username);
          }
        })
      );
    } else {
      navigate("404");
      alert("out of session");
    }
  };

  const getUserposts = () => {
    Axios.get("https://mm16z-town-crud.herokuapp.com/user_posts").then((response) => {
      setUserPostData(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = Axios.post(
      "https://mm16z-town-crud.herokuapp.com/createpost",
      JSON.stringify({
        postfromuser: username,
        userpostcontext: postcontext,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    Axios.interceptors.response.use(
      function (response) {
        if (response.data.status === "ok") {
        } else {
          alert("post failed");
        }
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    alert("Post success");
    window.location = "/";
    setPostContext("");
  };

  const onDelhandleSubmit = (postid) => {
    Axios.post(
      "https://mm16z-town-crud.herokuapp.com/user_post_delete",
      JSON.stringify({
        userpostid: postid,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        console.log("deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("delete success!");
    window.location = "/user/panel";
  };

  const onEdithandleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      "https://mm16z-town-crud.herokuapp.com/user_post_edit",
      JSON.stringify({
        postcontext: preveditdata,
        postid: userpostid,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        console.log("edited", res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("edit success!");
    window.location = "/user/panel";
  };

  let editinput = null;
  if (usereditinput === true) {
    editinput = (
      <form onSubmit={onEdithandleSubmit}>
        <div className="user-edit-panel-inputcontainer">
          <label htmlFor="post-text-input" id="post-text-input">
            Let's edit! :D
          </label>
          <textarea
            ref={editdataRef}
            onChange={(e) => {
              setprevEditdata(e.target.value);
            }}
            value={preveditdata}
            required
            className="post-edit-inputborder"
            id="post-edit-text-input"
            type="text"
          ></textarea>
          <input
            id="post-edit-submitbtn"
            type="submit"
            value="EditSubmit"
          ></input>
        </div>
      </form>
    );
  }

  useEffect(() => {
    routeAuth();
    getUserposts();
    postcontextRef.current.focus();
    window.addEventListener("popstate", function (event) {
      window.location.replace((this.window.location = "/"));
    });
  }, []);

  return (
    <div className="user-panel-container">
      <NavbarContainer navCurrentPath="/User-Panel" />
      <span id="username">HI! {username} </span>
      <form onSubmit={handleSubmit}>
        <div className="user-panel-inputcontainer">
          <label htmlFor="post-text-input">Write something nice :D</label>
          <textarea
            ref={postcontextRef}
            onChange={(e) => {
              setPostContext(e.target.value);
            }}
            value={postcontext}
            required
            className="post-inputborder"
            id="post-text-input"
            type="text"
          ></textarea>
          <input id="post-submitbtn" type="submit" value="Post"></input>
        </div>
      </form>
      <section className="user-posts">
        <span id="user-post-text">Your recent posts</span>
        <div className="user-posts-container">
          {userpostdata
            .filter((key) => key.post_from_user === username)
            .map((val) => {
              let postid = val.post_id;
              let currentpostcontext = val.user_post_context;
              return (
                <TextBoxContainer
                  key={postid}
                  username={val.post_from_user}
                  context={currentpostcontext}
                  date={val.user_post_created_date.slice(0, 10)}
                  onDelbtnclick={() => onDelhandleSubmit(postid)}
                  onEditbtnclick={() => {
                    onEdithandleClick(currentpostcontext, postid);
                  }}
                />
              );
            })}
        </div>
      </section>

      {usereditinput ? (
        <section className="usereditinput-container">
          <div
            id="exit-edit"
            onClick={() => {
              window.location = "/user/panel";
            }}
          >
            X
          </div>
        </section>
      ) : null}
      {editinput}
      <BackgroundContainer />
    </div>
  );
}

export default UserPanelPage;
