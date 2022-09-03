import "./assets/sass/sass-components/App/app.scss";

import { useState, useEffect } from "react";

import NavbarContainer from "./components/container-components/navbar-container";
import Mainsection from "./components/main-page-components/main-section";
import getUserauth from "./auth/getUserauth";
import hasJWT from "./auth/hasJWT";

function App() {
  const [username, setUsername] = useState(null);

  const routeAuth = () => {
    if (hasJWT()) {
      if (
        getUserauth().then((result) => {
          if (result.data.status === "error") {
            localStorage.clear();
            window.location = "/";
          } else {
            setUsername(result.data.decoded.username);
          }
        })
      );
    } else {
      setUsername("Anomymous");
    }
  };

  useEffect(() => {
    routeAuth();
    window.location = "/";
  }, []);
  return (
    <div className="app-container">
      <NavbarContainer navCurrentPath={`/Home Howdy! :D @User : ${username}`} />
      <Mainsection />
    </div>
  );
}

export default App;
