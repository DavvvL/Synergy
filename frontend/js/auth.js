// auth.js - Sistema de autenticación y sesiones

const API_URL = 'http://localhost:3000/api';

// Verificar si el usuario está autenticado
function verificarSesion() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const empleado = localStorage.getItem('empleado');

  if (!isLoggedIn || !empleado) {
    window.location.href = 'index.html';
    return false;
  }

  return true;
}

// Cerrar sesión
function cerrarSesion() {
  if (confirm('¿Estás seguro de cerrar sesión?')) {
    localStorage.removeItem('empleado');
    localStorage.removeItem('permisos');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }
}

// Obtener información del empleado logueado
function obtenerEmpleado() {
  const empleado = localStorage.getItem('empleado');
  return empleado ? JSON.parse(empleado) : null;
}

// Obtener permisos del empleado
function obtenerPermisos() {
  const permisos = localStorage.getItem('permisos');
  return permisos ? JSON.parse(permisos) : [];
}