import "../styles/Ciphers.css";
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import CipherList from "../components/CipherList"


function Ciphers() {
  // There's separate cipher styles so we can group them together. It makes accessing each cipher a little clunky.
  const classicCiphers: any[] = CipherList.find(cipherStyle => cipherStyle.id === 0)?.cipher || [];
  const streamCiphers: any[] = CipherList.find(cipherStyle => cipherStyle.id === 1)?.cipher || [];
  const blockCiphers: any[] = CipherList.find(cipherStyle => cipherStyle.id === 2)?.cipher || [];

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
          <HashLink style={{ fontSize: "24px" }} to="#classic">Classical Ciphers</HashLink>
          <HashLink style={{ fontSize: "24px" }} to="#stream">Stream Ciphers</HashLink>
          <HashLink style={{ fontSize: "24px" }} to="#block">Block Ciphers</HashLink>
        </div>
      </div>

      {/* Classical Cipher Section */}
      <h2 id="classic" style={{ textAlign: "center", padding: "30px" }}>
        Classical Ciphers
      </h2>

      <div className="ciphersection">
        {classicCiphers.map((cipher) => {
          return (
            <Link to={`/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div className="grow">
                <h3>{cipher.name}</h3>
                <p>{cipher.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stream Cipher Section */}
      <h2 id="stream" style={{ textAlign: "center", padding: "30px" }}>
        Stream Ciphers
      </h2>

      <div className="ciphersection">
        {streamCiphers.map((cipher) => {
          return (
            <Link to={`/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div className="grow">
                <h3>{cipher.name}</h3>
                <p>{cipher.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Block Cipher Section */}
      <h2 id="block" style={{ textAlign: "center", padding: "30px" }}>
        Block Ciphers
      </h2>

      <div className="ciphersection">
        {blockCiphers.map((cipher) => {
          return (
            <Link to={`/cryptosystem/${cipher.path}`} state={{ cipher }} key={cipher.id}>
              <div className="grow">
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
