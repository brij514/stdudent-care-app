import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (email, password) => {
    const success = handleInputsErrors({
      email,
      password,
    });

    if (!success) {
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputsErrors({
  
  email,
  password
  
}) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Passwords must be at least 6 characters");
    return false;
  }
  return true;
}
