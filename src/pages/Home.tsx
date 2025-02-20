import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import TextScramble from "../components/TextScramble";


function Home() {
  const randomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  return (
    <>
      <div className="center">
        <h1 id="title"><TextScramble text="Simple Ciphers" /></h1>
        <Link to="/ciphers">
          <button><TextScramble text="Get Started" speed={150}/></button>
        </Link>
      </div>
    </>
  );
}

export default Home;
