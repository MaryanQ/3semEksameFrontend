import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./security/Login";
import Register from "./security/Register";
import Home from "./components/Home/Home";
import CustomerReservations from "./components/Customers/CustomerReservations";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { getToken, getRoles, removeToken } from "./services/ApiFacade";
import Navbar from "./layouts/Navbar/Navbar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [roles, setRoles] = useState<string[]>(getRoles());

  const handleLogin = () => {
    setIsAuthenticated(true);
    setRoles(getRoles());
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    setRoles([]);
  };

  const hasRole = (role: string) => roles.includes(role);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        roles={roles}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/reservations"
          element={
            isAuthenticated && hasRole("CUSTOMER") ? (
              <CustomerReservations customerId={0} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && hasRole("ADMIN") ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
