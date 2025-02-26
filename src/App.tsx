import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ciphers from "./pages/Ciphers";
import About from "./pages/About";
import Crypto from "./pages/Crypto";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Simple-Ciphers" element={<Home />} />
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
