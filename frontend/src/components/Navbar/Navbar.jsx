import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from "../../hooks/useLogout.js";
import { Link } from "react-router-dom";
import { color, fontFamily, fontSize, fontWeight, padding } from "@mui/system";
const NavBar = () => {
  const { loading, logout } = useLogout();
  return (
    <nav style={styles.nav}>
    <div style={styles.header}>Student Care  </div>
      <div style={styles.leftButtons}>
        <Link to={'/'} style={styles.button}>Attendance</Link>
        <Link to={'/marks'} style={styles.button}>Marks</Link>
        <Link to={'/notes'} style={styles.button}>Notes</Link>
       
      </div>
      <button style={styles.logoutButton}>
        
        {!loading ? (
        <FaSignOutAlt
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-dots loading-md"></span>
      )}
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    backgroundColor: "#282c34",
    padding: "0 20px",
  },
  header:{
    fontSize:'30px',
    color:'white',
    fontWeight:'bold',
    paddingRight:'20px',
    fontFamily: "Architects Daughter, cursive"
  },
  leftButtons: {
    display: 'flex',
    justifyContent: 'center',  // Center horizontally
    alignItems: 'center', 
    
     
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyConten:"center",
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "10px 15px",
    margin: "0 5px",
    transition: "color 0.3s",
    textDecoration: 'none',
  },
  logoutButton: {
    color: "white",
    
    backgroundColor: "transparent",
    border: "none",
    fontSize: "27px",
    cursor: "pointer",
    paddingBottom:'10px',
    marginLeft: "auto",  // Pushes the logout button to the right
    transition: "color 0.3s",
    width:"40px"
  },
};

export default NavBar;
