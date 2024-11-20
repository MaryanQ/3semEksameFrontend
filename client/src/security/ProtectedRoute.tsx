import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute wrapper komponent
const ProtectedRoute = () => {
  // Tjekker om brugeren er logget ind ved at se om der er en token i localStorage
  const isAuthenticated = !!localStorage.getItem("authToken");

  // Hvis ikke autentificeret, omdiriger til login siden
  if (!isAuthenticated) {
    return <Navigate to="/account" />;
  }

  // Hvis autentificeret, render den beskyttede rute
  return <Outlet />;
};

export default ProtectedRoute;
