const API_URL = 'hhttp://localhost:5000/api/auth'; // Cambia por tu URL real

// Tipos para los datos de registro
export type ClienteRegister = {
  role: 'cliente';
  name: string;
  email: string;
  password: string;
  cedulaIdentidad: string;
};

export type InmobiliariaRegister = {
  role: 'inmobiliaria';
  name: string;
  email: string;
  password: string;
  RUT: string;
  nombreEmpresa: string;
};

export type RegisterData = ClienteRegister | InmobiliariaRegister;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error en login');
  }
  return res.json();
}

export async function register(data: RegisterData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error en registro');
  }
  return res.json();
}
