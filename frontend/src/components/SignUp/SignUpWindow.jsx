import React, { useState } from "react";
import "./SignUpWindow.css";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
const LoginWindow = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  const {loading, signup} = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="LoginWindow">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label for="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <label for="confirm_password">Confirm Password</label>
        <input
          type="password"
          placeholder="Password"
          id="confirm_password"
          value={inputs.confirmPassword}
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
        />

        <Link to="/login">
          <div className="login_redirect">Already have an account ?</div>
        </Link>
        <div>
            <button disabled={loading} className="btn w-full ">
            {loading ? <span className="loading loading-spinner"></span> :"SignUp"}
            </button>
          </div>
      </form>
    </div>
  );
};

export default LoginWindow;
