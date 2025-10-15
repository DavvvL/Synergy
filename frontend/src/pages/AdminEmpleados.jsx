import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/empleados';


function AdminEmpleados() {
  const [puestos, setPuestos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    paterno: '',
    materno: '',
    correo: '',
    contraseña: '',
    turno: '',
    telefono: '',
    puesto: '',
    activo: true,
    id_equipo: ''
  });
  const [editando, setEditando] = useState(null);

  
    const fetchEmpleados = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/empleados');
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  // Función para cargar puestos
  const fetchPuestos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/empleados/opciones/puestos');
      const data = await res.json();
      setPuestos(data);
    } catch (error) {
      console.error('Error al cargar puestos:', error);
    }
  };

  // Función para cargar equipos
  const fetchEquipos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/empleados/opciones/equipos');
      const data = await res.json();
      setEquipos(data);
    } catch (error) {
      console.error('Error al cargar equipos:', error);
    }
  };
  
  // Cargar empleados al inicio
  useEffect(() => {
  // Función para cargar empleados
 // Ejecutamos las 3 funciones
  fetchEmpleados();
  fetchPuestos();
  fetchEquipos();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editando) {
      await fetch(`${API_URL}/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }
    setForm({
      nombre: '',
      paterno: '',
      materno: '',
      correo: '',
      contraseña: '',
      turno: '',
      telefono: '',
      puesto: '',
      activo: true,
      id_equipo: ''
    });
    setEditando(null);
    fetchEmpleados();
  };

  const handleEdit = empleado => {
    setForm(empleado);
    setEditando(empleado.id_empleado);
  };

  const handleDelete = async id => {
    if (!confirm('¿Seguro que quieres eliminar este empleado?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchEmpleados();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Empleados</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="paterno" placeholder="Apellido paterno" value={form.paterno} onChange={handleChange} required />
        <input name="materno" placeholder="Apellido materno" value={form.materno} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <input name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} required />
        <input name="turno" placeholder="Turno" value={form.turno} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <select name="puesto" value={form.puesto} onChange={handleChange}>
            <option value="">Selecciona un puesto</option>
            {puestos.map((p, index) => (
                <option key={index} value={p.puesto}>{p.puesto}</option>
            ))}
        </select>

        <select name="id_equipo" value={form.id_equipo} onChange={handleChange}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((e) => (
                <option key={e.id_equipo} value={e.id_equipo}>
                    {e.nombre_equipo}
                </option>
            ))}
        </select>
        <label>
          Activo:
          <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
        </label>
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'} empleado</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Turno</th>
            <th>Teléfono</th>
            <th>Puesto</th>
            <th>Activo</th>
            <th>ID equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id_empleado}>
              <td>{emp.id_empleado}</td>
              <td>{emp.nombre} {emp.paterno} {emp.materno}</td>
              <td>{emp.correo}</td>
              <td>{emp.turno}</td>
              <td>{emp.telefono}</td>
              <td>{emp.puesto}</td>
              <td>{emp.activo ? 'Sí' : 'No'}</td>
              <td>{emp.id_equipo}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Editar</button>
                <button onClick={() => handleDelete(emp.id_empleado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEmpleados;