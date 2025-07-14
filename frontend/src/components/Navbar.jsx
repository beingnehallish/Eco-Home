import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext1';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <h1>EcoHome</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
