import React from "react";
import First from "./components/First page/First";
import Marks from "./components/Second page/Marks";
// import Content from "./components/Fourth page/Content";
import Todo from './components/Third page/Todo.jsx'
import NavBar from "./components/Navbar/Navbar.jsx";
const Home = () => {
  return (
    <div>
      <NavBar/>
      <First />
      <Marks />
      <Todo />
       
    </div>
  );
};

export default Home;
