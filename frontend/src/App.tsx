import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ciphers from "./pages/CipherList";
import About from "./pages/About";
import Crypto from "./pages/Cryptosystem";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ciphers" element={<Ciphers />} />
        <Route path="/about" element={<About />} />
        <Route path="/cryptosystem/:name" element={<Crypto />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
