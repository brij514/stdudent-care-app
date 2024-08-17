import React, { useState } from "react";
import "./LoginWindow.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
const LoginWindow = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="LoginWindow">
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label for="username">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button disabled={loading} className="btn w-full ">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <Link to="/signup">
          <div className="create">
            <h4>New user?</h4>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default LoginWindow;
