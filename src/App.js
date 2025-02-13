import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Login from "./Pages/Login"; // Ensure this exists
import Students from "./Pages/Students"; // Assuming you're using this

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route path="/" element={<Sidebar />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
