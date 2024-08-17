import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
 

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    email,
     
    password,
    confirmPassword,
    
  }) => {
    const success = handleInputsErrors({
      email,
      
      password,
      confirmPassword,
      
    });

    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          
          password,
          confirmPassword,
         
        }),
      });

      const data = await res.json();
      if (data.error) {
        return new (data.error); //This error will be from auth controller
      }
      //we store data into Localstorage then we send to frontend using context and verify
      localStorage.setItem("user-data", JSON.stringify(data));

      setAuthUser(data);

      
    } catch (error) {
      toast.error("Email already exist");
      
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputsErrors({
  email,
  
  password,
  confirmPassword,
 
}) {
  if (!email  || !password || !confirmPassword  ) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Passwords must be at least 6 characters");
    return false;
  }
  return true;
}
