import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1776f1' }}>Bienvenido a AquiHome 🏡</h1>
        <p style={{ fontSize: '1rem', color: '#6b7280' }}>Has iniciado sesión correctamente</p>
      </div>
    </div>
  );
};

export default Home;
