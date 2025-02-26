import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <h1>About Simple Ciphers</h1>
      <div style={{ margin: "50px" }}>
        <p>
          Hello, thank you for taking the time to check out{" "}
          <span>Simple Ciphers</span>.{" "}
        </p>
        <p>
          This site provides a quick and easy way to encrypt and decrypt
          messages using various ciphers. Simply select a cipher, enter a
          message and a key, and encrypt or decrypt it with a click. Feeling
          lazy? No problem — a key can be automatically generated for you.{" "}
          <span>Happy encrypting</span>!
        </p>
        <p>
          This project was an idea that came up while creating simple
          implementations of ciphers for an <span>Information Security</span>{" "}
          course that I've been taking this semester in college. This site was
          primarily built for my own educational puposes to understand the
          underlying structures of these ciphers. It was also built for the
          purpose of having fun, creating little secret messages to share to
          friends as if we were international spies.
        </p>
        <p>
          The ciphers included on this site as well as reference for
          implementation are taken from{" "}
          <span>Information Security: Principles and Practices (3rd Ed.)</span>{" "}
          by <span>Mark Stamp</span>. The book provides a great introduction to
          cybersecurity and cryptography, covering both historical and modern
          encryption techniques.
        </p>
        <p>
          If you'd like to contribute to this project or explore the source
          code, check out the {" "}
          <a href="/">
            <span>GitHub Repository</span>
          </a>
          . You can also find more projects on my {" "}
          <a href="https://github.com/HammyLA">
            <span>GitHub Account</span>
          </a>
          .
        </p>
        <p>
          Thanks for stopping by, I hope you enjoy <span>Simple Ciphers</span>.
        </p>
        <p>
          <span>-- HammyLA</span>
        </p>
      </div>
    </div>
  );
}

export default About;
