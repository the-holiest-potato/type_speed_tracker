import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1 className="logo">TypeShift</h1>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item" title="Home">
            <Home size={20} />
          </Link>
          <Link to="/login" className="nav-item" title="Login">
            <LogIn size={20} />
          </Link>
          <Link to="/profile" className="nav-item" title="Profile">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
