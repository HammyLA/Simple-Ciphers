import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='topnav'>
      <NavLink to="/Simple-Ciphers/">Home</NavLink>
      <NavLink to="/Simple-Ciphers/ciphers">Ciphers</NavLink>
      <NavLink to="/Simple-Ciphers/about">About</NavLink>
    </div>
  )
}

export default Navbar
