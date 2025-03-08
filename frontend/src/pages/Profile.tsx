import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import '../styles/Information.css'
import { copyToClip } from "../components/Helper"
import { ToastContainer } from "react-toastify"

interface Key {
    id: number,
    key: string,
    cipher: string,
    dateCreated: string,
}

function Profile() {
    const [username, setUsername] = useState('')
    const [keys, setKeys] = useState([])
    const [keysSize, setKeysSize] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            fetchUsername();
            fetchKeys();
        }
    }, [])

    const fetchUsername = (async () => {
        const response = await fetch(import.meta.env.VITE_API_BASE + '/users', {
            method: "GET",
            headers: { 'Authorization': localStorage.getItem('authToken') as string }
        })
        const responseUsername = await response.json()
        setUsername(responseUsername)
    })

    const fetchKeys = (async () => {
        const response = await fetch(import.meta.env.VITE_API_BASE + '/keys', {
            method: "GET",
            headers: { 'Authorization': localStorage.getItem('authToken') as string }
        })
        const responseKeys = await response.json()
        setKeys(responseKeys)
        setKeysSize(responseKeys.length)
    })

    const handleSignout = () => {
        localStorage.removeItem('authToken')
        window.location.reload()
    }

    if (!localStorage.getItem('authToken')) {
        return <Navigate to="*"></Navigate>
    }
    return (
        <>
            <ToastContainer />
            <h3 className="informationHead"> {"> Profile"}</h3>
            <div className="information">
                <div>
                    <button id="signout" style={{ position: "relative", alignSelf: "end", width: "150px", height: "50px", margin: "10px" }} onClick={handleSignout}>Sign Out</button>
                    <h1 className="offsetText">{username}</h1>
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
                                        <td>{Date.parse(key.dateCreated).toString()}</td>
                                        <td>
                                            <button id='copy' onClick={() => copyToClip(key.key)}>
                                            </button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}


export default Profile
