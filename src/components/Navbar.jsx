import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/files/Group 1.jpg";
import profile from "../assets/files/Group 4.png";
import leftIcon from "../assets/files/hugeicons_logout-circle-02.jpg";
import dropdown from "../assets/files/Vector.jpg";
import { BASE_URL, ADMIN_URL } from "../constants";

const Navbar = ({ setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}${ADMIN_URL}/logout`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included in request
      });
  
      if (!response.ok) {
        throw new Error(`Logout failed! Status: ${response.status}`);
      }
  
      // ✅ Clear cookies & localStorage
      document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("adminToken");
  
      // ✅ Update authentication state
      setIsAuthenticated(false);
  
      // ✅ Redirect to login page after logout
      window.location.href = "/";
  
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };
  
  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest(".adminSection") && !e.target.closest(".dropdown-menu")) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <nav className="navbar">
      {/* Menu Toggle Button */}
      <button className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <img src={Logo} alt="Logo" width="120" height="70" />
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/manage" onClick={() => setMenuOpen(false)}>Manage Users</Link>
          <Link to="/ads" onClick={() => setMenuOpen(false)}>New Ads</Link>
          <Link to="/analytics" onClick={() => setMenuOpen(false)}>Analytics</Link>
        </div>

        {/* Profile Section */}
        <div className="profilesection">
          {/* Go Back Button */}
          <div className="admin" onClick={() => window.history.back()} style={{ cursor: "pointer" }}>
            <img src={leftIcon} alt="Go Back" width="40" height="40" />
          </div>

          {/* Profile & Dropdown */}
          <div className="adminSection">
            <div className="profileImage">
              <img src={profile} alt="Profile" width="35" height="35" />
            </div>
            <div className="dropdownimage">
              <img
                src={dropdown}
                alt="Dropdown"
                width="12"
                height="9"
                style={{ cursor: "pointer", backgroundColor: "rgba(201,201,201,1)" }}
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
