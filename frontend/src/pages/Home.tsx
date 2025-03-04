import "../styles/Home.css";
import { Link } from "react-router-dom";
import TextScramble from "../components/TextScramble";
import { useEffect } from "react";


function Home() {
  const apiUrl = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(apiUrl + '/', {
      method: 'GET',
    })
  }, [])


  return (
    <>
      <div className="center">
        <h1 id="title"><TextScramble text="Simple Ciphers" /></h1>
        <Link to="/ciphers">
          <button><TextScramble text="Get Started" speed={150} /></button>
        </Link>
      </div>
    </>
  );
}

export default Home;
