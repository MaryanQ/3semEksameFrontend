import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./layouts/Navbar/Navbar"; // Hvis du har en Navbar
import "./App.css";
import AccountPage from "./components/Customers/AccountPage";
import ProtectedRoute from "./security/ProtectedRoute";
import AlbumDashboardPage from "./components/Albums/AlbumDashboardPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/album-dashboard" element={<AlbumDashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
