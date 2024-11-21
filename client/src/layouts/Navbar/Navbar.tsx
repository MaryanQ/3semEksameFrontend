import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
interface NavbarProps {
  isAuthenticated: boolean;
  roles: string[];
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  roles,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(false); // Toggle login options

  const handleLogout = () => {
    onLogout();
    navigate("/home");
  };

  const handleLogin = (role: string) => {
    navigate(`/login?role=${role}`); // Pass role as a query parameter
  };

  const hasRole = (role: string) => roles.includes(role);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            {hasRole("CUSTOMER") && (
              <li>
                <Link to="/reservations">My Reservations</Link>
              </li>
            )}
            {hasRole("ADMIN") && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={() => setShowLoginOptions(!showLoginOptions)}
                className="login-button"
              >
                Login
              </button>
              {showLoginOptions && (
                <div className="login-dropdown">
                  <button onClick={() => handleLogin("customer")}>
                    Login as Customer
                  </button>
                  <button onClick={() => handleLogin("admin")}>
                    Login as Admin
                  </button>
                </div>
              )}
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
