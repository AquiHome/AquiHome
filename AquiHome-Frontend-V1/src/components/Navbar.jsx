import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="simple-navbar">
      <div className="navbar-container">
        <div className="simple-navbar-left" onClick={() => navigate('/home')}>
          aquihome
        </div>
        <button className="simple-navbar-right" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
