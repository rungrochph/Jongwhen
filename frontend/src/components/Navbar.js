import '../assets/css/Navbar.css'; // You can create a CSS file for styling
import Logo from "../images/Logo/logo_transparent.png"
import React, { useState } from 'react';
// import './Navbar.css'; // You can create a CSS file for styling

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
        <ul>

          <li><a href='/home'>Home</a></li>
          <li><a  href="/home/#one">Features</a></li>
          <li><a style={{marginRight:"900px"} } href="/calender">application</a></li>
          <li><a  href="/register">Register</a></li>
          <li><a href="/login">Log in</a></li>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
}

export default Navbar;
