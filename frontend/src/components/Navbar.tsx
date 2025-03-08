import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import { useEffect, useState } from 'react'

/**
 * Component for navigating the site.
 * @returns Navbar component
 */
function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setLoggedIn(true)
      const fetchNameWithToken = (async () => {
        try {
          const response = await fetch(import.meta.env.VITE_API_BASE + '/users', {
            method: "GET",
            headers: { 'Authorization': localStorage.getItem('authToken') as string }
          })
          const responseUsername = await response.json()
          setUsername(responseUsername)
        }
        catch (err: any) {
          console.log(err.message)
          localStorage.removeItem('authToken')
        }

      })
      fetchNameWithToken();
    }
  })


  return (
    <div className='topnav'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ciphers">Ciphers</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/about">About</NavLink>
      <div className='topnavright'>
        {loggedIn ? <NavLink id="auth" to="/profile">{username}</NavLink> : <NavLink id="auth" to="/auth">Login</NavLink>}
      </div>
    </div>
  )
}

export default Navbar
