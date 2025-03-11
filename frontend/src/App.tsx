import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ciphers from "./pages/Ciphers";
import About from "./pages/About";
import Crypto from "./pages/Cryptosystem";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";

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
        <Route path="/auth" element={<Authorization />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;
