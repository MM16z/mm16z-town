import React from "react";
import { Link } from "react-router-dom";

function NotfoundPage() {
  return (
    <div
      style={{
        fontSize: "15vw",
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE2EB ",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "2vw",
          position: "absolute",
          marginBottom: "80vh",
          color: "black",
        }}
      > 
        GO OUR HOME?
      </Link>
      404 ,<span style={{ color: "red" }}>Not found</span>
    </div>
  );
}

export default NotfoundPage;
