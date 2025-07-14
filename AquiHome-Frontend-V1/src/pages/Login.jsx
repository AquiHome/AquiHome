import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  const result = await loginUser({ email, password });

  if (result.message === "Credenciales inválidas") {
    alert("❌ Credenciales incorrectas.");
    return;
  }

  if (result.token) {
    sessionStorage.setItem("token", result.token);
    navigate('/home');
  } else {
    alert("Error desconocido.");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        

        <h2 className="brand-heading">aquihome</h2>
        <p>Inicia sesión para comenzar</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email o usuario</label>
          <input type="email" id="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="login-actions">
            
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="login-button">Ingresar</button>
        </form>


        <p className="footer-text">
          ¿Nuevo en AquiHome? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
