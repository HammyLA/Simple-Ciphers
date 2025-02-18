import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ciphers from "./pages/Ciphers";
import About from "./pages/About";
import Crypto from "./pages/Crypto";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ciphers" element={<Ciphers />} />
        <Route path="/about" element={<About />} />
        <Route path="/crypto" element={<Crypto />} />
      </Routes>
    </>
  );
}

export default App;
