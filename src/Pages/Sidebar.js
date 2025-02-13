import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { signOut } from "firebase/auth"; 
import { auth } from "../firebase";
import "../Styles/Sidebar.css"; 

const Sidebar = () => {
  const navigate = useNavigate(); // Hook to navigate

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/login"); // Redirect to sign-in page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="sidebar">
      <Link to="/students" className="sidebar-link">Students Page</Link>
      <button className="sidebar-button" onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Sidebar;
