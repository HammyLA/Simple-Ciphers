import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getError } from "./Helper";

/**
 * Component for navigating the site.
 * @returns Navbar component
 */
function Navbar() {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(
            import.meta.env.VITE_API_BASE + "/auth/authtoken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: user.sub, username: user.nickname }),
            }
          );
          const data = await response.json();
          localStorage.setItem('JWTauthToken', data)
        } catch (err) {
          getError(err);
        }
        try {
          const response = await fetch(
            import.meta.env.VITE_API_BASE + "/users",
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("JWTauthToken") as string,
              },
            }
          );
          const responseUsername = await response.json();
          setUsername(responseUsername);
        } catch (err) {
          getError(err);
        }
      }
    };
    getToken()
  }, [isAuthenticated, username]);

  if (isLoading) {
    return <div className="topnav">Loading...</div>;
  }

  return (
    <div className="topnav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ciphers">Ciphers</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/about">About</NavLink>
      <div className="topnavright">
        {isAuthenticated ? (
          <NavLink to="/profile">{username}</NavLink>
        ) : (
          <button id="auth" onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
