import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import Login from "./Login";


/**
 * Component for navigating the site.
 * @returns Navbar component
 */
function Navbar() {
  return (
    <div className="topnav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ciphers">Ciphers</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/about">About</NavLink>
      <div className="topnavright">
        <Login />
      </div>
    </div>
  );
}

export default Navbar;
