// permisos.js - Gestión de permisos por rol

class PermisosManager {
  static obtenerEmpleado() {
    const empleado = localStorage.getItem('empleado');
    return empleado ? JSON.parse(empleado) : null;
  }

  static obtenerPermisos() {
    const permisos = localStorage.getItem('permisos');
    return permisos ? JSON.parse(permisos) : [];
  }

  static tienePermiso(modulo) {
    const permisos = this.obtenerPermisos();
    return permisos.includes(modulo);
  }

  static esAdmin() {
    const empleado = this.obtenerEmpleado();
    return empleado?.puesto === 'admin';
  }

  static esDoctor() {
    const empleado = this.obtenerEmpleado();
    return empleado?.puesto === 'doctor';
  }

  static esEnfermero() {
    const empleado = this.obtenerEmpleado();
    return empleado?.puesto === 'enfermero';
  }

  static obtenerIdEmpleado() {
    const empleado = this.obtenerEmpleado();
    return empleado?.id_empleado;
  }

  static aplicarPermisosNavbar() {
    // Ocultar empleados si no tiene permiso (solo admin)
    if (!this.tienePermiso('empleados')) {
      const navEmpleados = document.getElementById('nav-empleados');
      if (navEmpleados) navEmpleados.style.display = 'none';
    }

    // Ocultar inventario si no tiene permiso (solo admin)
    if (!this.tienePermiso('inventario')) {
      const navInventario = document.getElementById('nav-inventario');
      if (navInventario) navInventario.style.display = 'none';
    }

    // Ocultar pacientes si no tiene permiso
    if (!this.tienePermiso('pacientes')) {
      const navPacientes = document.getElementById('nav-pacientes');
      if (navPacientes) navPacientes.style.display = 'none';
    }

    // Ocultar cirugías si no tiene permiso (admin, doctor y enfermero tienen acceso)
    if (!this.tienePermiso('cirugias')) {
      const navCirugias = document.getElementById('nav-cirugias');
      if (navCirugias) navCirugias.style.display = 'none';
    }
  }

  static mostrarInfoUsuario() {
    const empleado = this.obtenerEmpleado();
    if (!empleado) return;

    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');

    if (userName) {
      userName.textContent = `${empleado.nombre} ${empleado.paterno}`;
    }

    if (userRole) {
      userRole.textContent = empleado.puesto;
    }
  }
}