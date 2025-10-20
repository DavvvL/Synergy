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
    // **CAMBIO**: Se usa toLowerCase() para una comparación robusta
    return empleado?.puesto.toLowerCase() === 'admin';
  }

  static esDoctor() {
    const empleado = this.obtenerEmpleado();
    // **CAMBIO**: Se usa toLowerCase()
    return empleado?.puesto.toLowerCase() === 'doctor';
  }

  static esEnfermero() {
    const empleado = this.obtenerEmpleado();
    // **CAMBIO**: Se usa toLowerCase() y se corrige el nombre del rol
    return empleado?.puesto.toLowerCase() === 'enfermero/a';
  }

  static obtenerIdEmpleado() {
    const empleado = this.obtenerEmpleado();
    return empleado?.id_empleado;
  }

  static aplicarPermisosNavbar() {
    if (!this.tienePermiso('empleados')) {
      const navEmpleados = document.getElementById('nav-empleados');
      if (navEmpleados) navEmpleados.style.display = 'none';
    }

    if (!this.tienePermiso('inventario')) {
      const navInventario = document.getElementById('nav-inventario');
      if (navInventario) navInventario.style.display = 'none';
    }

    if (!this.tienePermiso('pacientes')) {
      const navPacientes = document.getElementById('nav-pacientes');
      if (navPacientes) navPacientes.style.display = 'none';
    }
    
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