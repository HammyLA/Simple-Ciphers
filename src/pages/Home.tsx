import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="center">
        <h1 id="title">Simple Ciphers</h1>
        <Link to="/ciphers">
          <button>Get Started</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
