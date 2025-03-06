import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import '../styles/Profile.css'

function Profile() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            const fetchData = (async () => {
                const response = await fetch(import.meta.env.VITE_API_BASE + '/users', {
                    method: "GET",
                    headers: { 'Authorization': localStorage.getItem('authToken') as string }
                })
                const responseUsername = await response.json()
                setUsername(responseUsername)
            })
            fetchData();
        }
    }, [localStorage.getItem('authToken')])

    if (!localStorage.getItem('authToken')) {
        return <Navigate to="*"></Navigate>
    }

    return (
        <>
            <h3 className="profileHead"> {"> Profile"}</h3>
            <div className="profile">
                <div>
                    <h1 className="offsetText">{username}</h1>
                </div>
            </div>
        </>

    )
}

export default Profile
