import React from "react";
import Login from "./components/Login/Login.jsx";
import "./App.css";
import First from "./components/First page/First.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Marks from "./components/Second page/Marks.jsx";
import Todo from "./components/Third page/Todo.jsx";
// import Content from "./components/Fourth page/Content.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import { ToastBar, Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import NavBar from "./components/Navbar/Navbar.jsx";
const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div>
    
      <Routes>
        <Route path="/signup" element={authUser ?  <Navigate to='/'/> : <SignUp />} />
        <Route path="/login" element={authUser ?  <Navigate to='/'/> :<Login />} />
        
        <Route path="/" element={authUser ? <><NavBar/> <First /></> :<Navigate to={'/login'}/>} />
        <Route path="/marks" element={authUser ? <><NavBar/> <Marks /></>:<Navigate to={'/login'}/>} />
        <Route path="/notes" element={authUser ?  <><NavBar/> <Todo /></>:<Navigate to={'/login'}/>} />
           </Routes>
      <Toaster />
    </div>
  ); 
};

export default App;
