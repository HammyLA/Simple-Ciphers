import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='topnav'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ciphers">Ciphers</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  )
}

export default Navbar
