

// js/api.js - Cliente API centralizado

// **CAMBIO**: Se añade esta función para evitar errores
function cerrarSesion() {
  console.log('Cerrando sesión por error de API o sesión expirada...');
  localStorage.removeItem('empleado');
  localStorage.removeItem('permisos');
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
}

const API_BASE = 'http://localhost:3000/api';

class API {
  static async request(endpoint, options = {}) {
    const empleado = PermisosManager.obtenerEmpleado();

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'x-empleado-id': empleado?.id_empleado
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await response.json();

      if (response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        cerrarSesion(); // Esta llamada ahora funcionará y no detendrá el script
        return null;
      }

      if (response.status === 403) {
        alert(data.message || 'No tienes permisos para realizar esta acción');
        return null;
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('Error en API:', error);
      alert('Error: ' + error.message);
      return null;
    }
  }

  static get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  static post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  static put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  static patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  }

  static delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// API de Empleados
const EmpleadosAPI = {
  obtenerTodos: () => API.get('/empleados'),
  obtenerPorId: (id) => API.get(`/empleados/${id}`),
  crear: (empleado) => API.post('/empleados', empleado),
  actualizar: (id, empleado) => API.put(`/empleados/${id}`, empleado),
  eliminar: (id) => API.delete(`/empleados/${id}`),
  obtenerPuestos: () => API.get('/empleados/opciones/puestos'),
  obtenerEquipos: () => API.get('/empleados/opciones/equipos')
};

// API de Pacientes
const PacientesAPI = {
  obtenerTodos: () => API.get('/pacientes'),
  obtenerPorId: (id) => API.get(`/pacientes/${id}`),
  crear: (paciente) => API.post('/pacientes', paciente),
  actualizar: (id, paciente) => API.put(`/pacientes/${id}`, paciente),
  eliminar: (id) => API.delete(`/pacientes/${id}`)
};

// API de Cirugías
const CirugiasAPI = {
  obtenerTodas: () => API.get('/cirugias'),
  obtenerPorId: (id) => API.get(`/cirugias/${id}`),
  crear: (cirugia) => API.post('/cirugias', cirugia),
  actualizar: (id, cirugia) => API.put(`/cirugias/${id}`, cirugia),
  eliminar: (id) => API.delete(`/cirugias/${id}`),
  obtenerTipos: () => API.get('/cirugias/opciones/tipos'),
  obtenerQuirofanos: () => API.get('/cirugias/opciones/quirofanos'),
  crearQuirofano: (quirofano) => API.post('/cirugias/quirofanos', quirofano),
  actualizarQuirofano: (id, quirofano) => API.put(`/cirugias/quirofanos/${id}`, quirofano),
  eliminarQuirofano: (id) => API.delete(`/cirugias/quirofanos/${id}`)
};

// API de Inventario
const InventarioAPI = {
  obtenerTodo: () => API.get('/inventario'),
  obtenerPorId: (id) => API.get(`/inventario/${id}`),
  crear: (item) => API.post('/inventario', item),
  actualizar: (id, item) => API.put(`/inventario/${id}`, item),
  actualizarCantidad: (id, cantidad) => API.patch(`/inventario/${id}/cantidad`, { cantidad }),
  eliminar: (id) => API.delete(`/inventario/${id}`)
};

// API de Dashboard
const DashboardAPI = {
  obtenerEstadisticas: () => API.get('/dashboard/estadisticas'),
  obtenerCirugiasPorEstado: () => API.get('/dashboard/cirugias-estado'),
  obtenerEmpleadosPorPuesto: () => API.get('/dashboard/empleados-puesto'),
  obtenerInventarioCritico: () => API.get('/dashboard/inventario-critico')
};


const CatalogoAPI = {
  obtenerTodos: () => API.get('/catalogo'), // Endpoint a crear en el backend
  // Aquí irían los métodos para crear, editar, etc., el catálogo en el futuro
};

// ... (el resto de las APIs se mantiene igual) ...