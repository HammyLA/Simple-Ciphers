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

  const handleChangeUsername = async () => {
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
    }
    catch (err) {
      getError(err);
    }
    setIsEditing(false);
    window.location.reload();
  }

  if (!isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }
  if (isLoading || (!awake && !username)) {
    return (
      <div className="connecting">
        <h1> Please Wait... </h1>
        <h3> Connecting to the Server... </h3>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <h3 className="informationHead"> {"> Profile"}</h3>
      <div className="information">
        <div>
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
        <div>
          <table>
            <thead id="headerRow">
              <tr>
                <th>Cipher</th>
                <th>Key</th>
                <th>Creation Date</th>
              </tr>
            </thead>
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
