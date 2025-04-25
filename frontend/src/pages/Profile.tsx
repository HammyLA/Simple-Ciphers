import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/Information.css";
import { copyToClip, getError } from "../components/Helper";
import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

interface Key {
  id: number;
  key: string;
  cipher: string;
  dateCreated: string;
}

function Profile() {
  const [username, setUsername] = useState("");
  const [keys, setKeys] = useState([]);
  const [keysSize, setKeysSize] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [awake, setAwake] = useState();

  const { isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    // Checking to see if the server is awake/running before fetching data. If it's not running it won't get the data.
    const checkAwake = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE + "/", {
          method: "GET",
        });
        const awakeData = await response.json();
        setAwake(awakeData.message);
      } catch (err) {
        getError(err);
      }
    };
    checkAwake();
    if (isAuthenticated && awake) {
      fetchUsername();
      fetchKeys();
    }
  }, [isAuthenticated, awake]);

  // Fetching the username from the server to display in the profile page.
  const fetchUsername = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE + "/users", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("JWTauthToken") as string,
      },
    });
    const responseUsername = await response.json();
    setUsername(responseUsername);
  };

  // Fetching the list of keys from the server based on the user to display the user's keys.
  const fetchKeys = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE + "/keys", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("JWTauthToken") as string,
      },
    });
    const responseKeys = await response.json();
    setKeys(responseKeys);
    setKeysSize(responseKeys.length);
  };

  // Updates the username in the backend for when you change the username.
  const handleChangeUsername = async () => {
    // Usernames of less than 6 characters are not allowed.
    if (username.length < 6) {
      alert("Please enter a username at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + "/users", {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("JWTauthToken") as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })
      const responseUsername = await response.json();
      console.log(responseUsername)
      setUsername(responseUsername.username);

      setIsEditing(false);

      // Reload the page to show the updated username in the navbar, because the navbar doesn't update otherwise.
      window.location.reload();
    }
    catch (err) {
      getError(err);
    }
  }

  // It will navigate to the home page anyways because on reload it doesn't know its authenticated on first render :I 
  if (!isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }

  // Shows the user that they need to wait for the server to fetch information. They can do other stuff in the meantime probably.
  if (isLoading || (!awake || !username)) {
    return (
      <div className="connecting">
        <h1> Please Wait... </h1>
        <h3> Connecting to the Server... </h3>
      </div>
    );
  }

  // Everything is all good, now show the profile page for the user.
  return (
    <>
      <ToastContainer />
      <h3 className="informationHead"> {"> Profile"}</h3>
      <div className="information">
        <div className="shadow">
          <button
            id="signout"
            style={{
              position: "relative",
              alignSelf: "end",
              width: "150px",
              height: "50px",
              margin: "10px",
            }}
            onClick={() => {
              localStorage.removeItem("JWTauthToken");
              logout();
            }}
          >
            Sign Out
          </button>

          {/* Username container */}
          <div className="username">
            {isEditing ? (
              <form>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="username"
                />
                <button onClick={handleChangeUsername}>Confirm</button>
                <button className="cancel" onClick={() => {
                  setIsEditing(false)
                  fetchUsername()
                }}>Cancel</button>
              </form>)
              :
              (
                <>
                  <h1 id="user" className="offsetText">{username}</h1>
                  <button className="rename" onClick={() => setIsEditing(true)} />
                </>
              )
            }
          </div>
        </div>

        <p>{`${keysSize} keys found...`}</p>

        <div className="shadow">
          <table>

            {/* Table Headers */}
            <thead id="headerRow">
              <tr>
                <th>Cipher</th>
                <th>Key</th>
                <th>Creation Date</th>
              </tr>
            </thead>

            {/* This is the key body, using map makes a bunch of key rows from the key list */}
            <tbody>
              {keys.map((key: Key) => {
                return (
                  <tr key={key.id}>
                    <td>{key.cipher}</td>
                    <td>{key.key}</td>
                    <td>{new Date(key.dateCreated).toLocaleString()}</td>
                    <td>
                      <button
                        id="copy"
                        onClick={() => copyToClip(key.key)}
                      ></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
