import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

/**
 * Component for navigating the site.
 * @returns Navbar component
 */
function Navbar() {
  return (
    <div className='topnav'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ciphers">Ciphers</NavLink>
      <NavLink to="/about">About</NavLink>
      <div className='topnavright'>
        <NavLink id="auth" to="/auth">Sign Up</NavLink>
      </div>
    </div>
  )
}

export default Navbar
