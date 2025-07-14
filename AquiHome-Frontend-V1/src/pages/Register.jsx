import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/api';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    tipo_usuario: 'particular'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const password = formData.password;

  const validate = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(validate).every(Boolean);

 const handleRegister = async (e) => {
  e.preventDefault();
  const result = await registerUser(formData);

  if (result.message === "Email ya registrado") {
    alert("⚠️ Email ya registrado.");
    return;
  }

  if (result.token) {
    sessionStorage.setItem("token", result.token);
    navigate('/home');
  } else {
    alert("❌ Registro fallido.");
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="brand-heading">aquihome</h2>
        <p>Crear tu cuenta</p>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                name="nombre"
                type="text"
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {password && (
            <>
              {isPasswordValid ? (
                <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '1rem' }}>
                  ✅ Contraseña segura
                </div>
              ) : (
                <ul className="password-checklist">
                  <li className={validate.length ? 'valid' : ''}>Al menos 8 caracteres</li>
                  <li className={validate.uppercase ? 'valid' : ''}>Una letra mayúscula</li>
                  <li className={validate.number ? 'valid' : ''}>Un número</li>
                  <li className={validate.special ? 'valid' : ''}>Un caracter especial</li>
                </ul>
              )}
            </>
          )}

          <label htmlFor="telefono">Teléfono</label>
          <input
            name="telefono"
            type="tel"
            placeholder="099123456"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="direccion">Dirección</label>
          <input
            name="direccion"
            type="text"
            placeholder="Calle 123"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                name="ciudad"
                type="text"
                placeholder="Montevideo"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <input
                name="departamento"
                type="text"
                placeholder="Montevideo"
                value={formData.departamento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="tipo_usuario">Tipo de usuario</label>
          <select name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange}>
            <option value="particular">Particular</option>
            <option value="profesional">Profesional</option>
          </select>

          <button type="submit" className="login-button">Registrarse</button>
        </form>

        <p className="footer-text">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
