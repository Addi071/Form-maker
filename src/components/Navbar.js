import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // We'll create this CSS file next

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
localStorage.removeItem("user");
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem('user'))
  const userName = userData?.name;


  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand with animation */}
        <Link 
          to="/dashboard" 
          className="navbar-brand"
          onClick={() => setActiveLink('dashboard')}
        >
          <span className="logo-text">Form</span>
          <span className="logo-make">Make</span>
          <div className="logo-underline"></div>
        </Link>

        {/* Mobile menu button */}
        <div 
          className={`navbar-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation links */}
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {/* <Link 
            to="/" 
            className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
            onClick={() => setActiveLink('home')}
          >
            <span>Home</span>
            <div className="link-underline"></div>
          </Link> */}
          
          <Link 
            to="/dashboard" 
            className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveLink('dashboard')}
          >
            <span>Dashboard</span>
            <div className="link-underline"></div>
          </Link>
          
          <Link 
            to="/create-survey" 
            className={`nav-link ${activeLink === 'create-survey' ? 'active' : ''}`}
            onClick={() => setActiveLink('create-survey')}
          >
            <span>Create Survey</span>
            <div className="link-underline"></div>
          </Link>
          
          <Link 
            to="/my-surveys" 
            className={`nav-link ${activeLink === 'my-surveys' ? 'active' : ''}`}
            onClick={() => setActiveLink('my-surveys')}
          >
            <span>My Surveys</span>
            <div className="link-underline"></div>
          </Link>
          
          <div 
            className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveLink('profile')}
          >
            <span>{userName}</span>
            <div className="link-underline"></div>
          </div>
          
          <button 
            className="nav-link logout-btn"
            onClick={handleLogout}
          >
            <span>Logout</span>
            <div className="link-underline"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;