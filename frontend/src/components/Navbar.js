import "../assets/css/Navbar.css"; // You can create a CSS file for styling
import Logo from "../images/Logo/logo_transparent.png";
import React, {  useEffect, useState } from "react";
// import './Navbar.css'; // You can create a CSS file for styling

function Navbar() {
  const handleLogout = (event) => {
		localStorage.removeItem('token');
    localStorage.removeItem('fname');
		window.location = "./login";
	}
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [status, setStatus] = useState("Login");

 

useEffect(() =>{
  const fname = localStorage.getItem('fname')
  if (fname == null){
    setStatus("Login")
  }else{
    setStatus("LogOut")
  }
},[setStatus])
//  if(status === "Login"){
//   const fname = localStorage.getItem('fname')
//   console.log("fname Login status",fname)
//  }else{
//   const fname = localStorage.getItem('fname')
//   console.log("fname Logout status",fname)
//  }
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div
        className={`menu-items ${menuOpen ? "open" : ""}`}
        style={{ fontSize: "50px" }}
      >
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home/#one">Features</a>
          </li>
          <li>
            <a style={{ marginRight: "900px" }} href="/calender">
              application
            </a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login" onClick={handleLogout}>{status}</a>
          </li>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
}

export default Navbar;
