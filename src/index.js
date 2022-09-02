import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login-page-components/login-page";
import RegisterPage from "./components/register-page-components/register-page";
import NotfoundPage from "./components/notfound-page-components/notfound-page";
import UserPanelPage from "./components/user-panel-page-components/user-panel-page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  //   <React.StrictMode>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="login" element={<LoginPage />} />
  //       <Route path="register" element={<RegisterPage />} />
  //       <Route path="user/panel" element={<UserPanelPage />} />
  //       <Route path="*" element={<NotfoundPage />} />
  //     </Routes>
  //   </React.StrictMode>
  // </BrowserRouter>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="user/panel" element={<UserPanelPage />} />
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
