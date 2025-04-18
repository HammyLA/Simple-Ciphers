import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import "../styles/Navbar.css";
import { getError } from "./Helper";
import { NavLink } from "react-router-dom";

function Login() {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    const [username, setUsername] = useState();

    useEffect(() => {

        // Login happens through the navbar, maybe i should put this in its own component :/
        // If the user is authenticated they get a token so they don't need to re-sign in again.
        const getToken = async () => {

            // Generate an authtoken if they are authenticated and exist through Auth0 and the database.
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

                // Get their username to show in the navbar
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

    return (
        <>
            {isAuthenticated ? (
                <NavLink to="/profile">{username}</NavLink>
            ) : (
                <button id="auth" onClick={() => loginWithRedirect()}>
                    Login
                </button>
            )}
        </>
    )
}

export default Login
