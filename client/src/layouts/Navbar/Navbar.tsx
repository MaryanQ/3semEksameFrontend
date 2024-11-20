import React from "react";
import "./Navbar.css"; // Link til CSS-filen

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Music Store</div>
      <ul className="navbar-links">
        <li>
          <a href="/home" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="/account">My Account</a>
        </li>
        <li>
          <a href="/stores">Stores</a>
        </li>
        <li>
          <a href="/Adminstraion">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
