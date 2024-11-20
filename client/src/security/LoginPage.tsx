import React, { useState } from "react";
import { login } from "../services/ApiFacade"; // Assuming authService contains your login function

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // Type the event
    e.preventDefault();
    try {
      const token = await login(username, password); // Call the login function
      setToken(token);
      setErrorMessage("");
      console.log("Logged in successfully:", token);
      // You can store the token in localStorage or a global state (e.g. Redux or Context API)
      localStorage.setItem("authToken", token);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {token && <p>Logged in with token: {token}</p>}
    </div>
  );
};

export default Login;
