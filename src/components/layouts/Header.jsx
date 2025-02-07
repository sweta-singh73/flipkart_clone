import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStore, FaEllipsisV } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LuCircleUserRound } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import "./Header.css";

const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [user, setUser] = useState(null); // Stores user details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  const loginMenuItems = [
    { path: "/profile", label: "My Profile" },
    { path: "/orders", label: "Orders" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/gifts", label: "My Gifts" },
    { path: "/rewards", label: "Rewards" },
    { path: "/gift-zone", label: "Flipkart Gift Zone" },
  ];

  const moreMenuItems = [
    { path: "/notifications", label: "Notifications" },
    { path: "/advertise", label: "Advertise" },
    { path: "/download-app", label: "Download App" },
  ];

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/flipkartlogo.svg" alt="Flipkart Logo" className="flipkart-logo" />
        </Link>
      </div>

      <div className="search-bar">
        <CiSearch className="search-icon" />
        <input type="text" placeholder="Search for products, brands, and more" />
      </div>

      <div className="right-section">
        {/* If user is logged in, show username instead of login */}
        {user ? (
          <div
            className="nav-item dropdown login-nav"
            onMouseEnter={() => setShowLoginMenu(true)}
            onMouseLeave={() => setShowLoginMenu(false)}
          >
            <LuCircleUserRound className="icon large-icon" />
            <span className="header-components username">{user.name}</span>
            <MdKeyboardArrowDown className="dropdown-icon" />
            {showLoginMenu && (
              <div className="dropdown-menu">
                {loginMenuItems.map((item, index) => (
                  <Link key={index} to={item.path}>{item.label}</Link>
                ))}
                <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div 
            className="nav-item dropdown login-nav"
            onMouseEnter={() => setShowLoginMenu(true)}
            onMouseLeave={() => setShowLoginMenu(false)}
          >
            <LuCircleUserRound className="icon large-icon" />
            <Link to="/login" className="header-components login-button">Login</Link>
            <MdKeyboardArrowDown className="dropdown-icon" />
            {showLoginMenu && (
              <div className="dropdown-menu">
                <div className="signup-section">
                  <span>New Customer? </span>
                  <button className="signup-button" onClick={() => navigate("/signup")}>Signup</button>
                </div>
                {loginMenuItems.map((item, index) => (
                  <Link key={index} to={item.path}>{item.label}</Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="nav-item">
          <IoCartOutline className="icon large-icon" />
          <Link to="/cart" className="header-components">Cart</Link>
        </div>

        <div className="nav-item">
          <FaStore className="icon large-icon" />
          <Link to="/seller" className="header-components">Become a Seller</Link>
        </div>

        <div 
          className="nav-item dropdown"
          onMouseEnter={() => setShowMoreMenu(true)}
          onMouseLeave={() => setShowMoreMenu(false)}
        >
          <FaEllipsisV className="icon large-icon dot" />
          {showMoreMenu && (
            <div className="dropdown-menu">
              {moreMenuItems.map((item, index) => (
                <Link key={index} to={item.path}>{item.label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
