import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user-data");
      setAuthUser(null);
    } catch (error) {
      toast.error("Error in Logout");
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
