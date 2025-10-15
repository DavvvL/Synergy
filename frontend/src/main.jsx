import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminEmpleados from './pages/AdminEmpleados';
import './main.css'; // Estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminEmpleados />
  </React.StrictMode>
);