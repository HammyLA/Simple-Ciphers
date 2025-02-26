import "../styles/Ciphers.css";
import { Link } from "react-router-dom";
import CipherList from "../components/CipherList";

function Ciphers() {
  const classicCiphers: any[] = CipherList.find(i => i.id === 0)?.cipher || [];
  const streamCiphers: any[] = CipherList.find(i => i.id === 1)?.cipher || [];
  const blockCiphers: any[] = CipherList.find(i => i.id === 2)?.cipher || [];

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Cipher Styles</h1>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <a style={{ fontSize: "24px" }} href="/Simple-Ciphers/ciphers#classic">Classical Ciphers</a>
          <a style={{ fontSize: "24px" }} href="/Simple-Ciphers/ciphers#stream">Stream Ciphers</a>
          <a style={{ fontSize: "24px" }} href="/Simple-Ciphers/ciphers#block">Block Ciphers</a>
        </div>
      </div>
      <h2 id="classic" style={{ textAlign: "center", padding: "30px" }}>
        Classical Ciphers
      </h2>
      <div className="ciphersection">
        {classicCiphers.map((cipher) => {
          return (
            <Link to={`/Simple-Ciphers/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div>
                <h3>{cipher.name}</h3>
                <p>{cipher.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <h2 id="stream" style={{ textAlign: "center", padding: "30px" }}>
        Stream Ciphers
      </h2>
      <div className="ciphersection">
        {streamCiphers.map((cipher) => {
          return (
            <Link to={`/Simple-Ciphers/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div>
                <h3>{cipher.name}</h3>
                <p>{cipher.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <h2 id="block" style={{ textAlign: "center", padding: "30px" }}>
        Block Ciphers
      </h2>
      <div className="ciphersection">
        {blockCiphers.map((cipher) => {
          return (
            <Link to={`/Simple-Ciphers/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div>
                <h3>{cipher.name}</h3>
                <p>{cipher.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Ciphers;
