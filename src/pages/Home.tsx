import "../styles/Home.css";
import { Link } from "react-router-dom";
import TextScramble from "../components/TextScramble";


function Home() {
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
