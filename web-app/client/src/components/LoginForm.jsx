import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simple validation for now (you can expand this later)
    if (username && password) {
      onLogin(username);  // Pass the username back to parent
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 style={{ color: "black" }}>Login</h2>
        <div className="text-input">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        </div>
        <div className="text-input">
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
