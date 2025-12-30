import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // 1. Estado para el formulario
  const [alimento, setAlimento] = useState({
    nombre: '',
    categoria: '',
    cantidad: 1,
    fechaVencimiento: ''
  });

  // 2. Estado para la lista de inventario
  const [inventario, setInventario] = useState([]);

  // 3. Función para traer los datos de la base de datos
  const obtenerInventario = async () => {
    try {
      // Cambio a 127.0.0.1 para asegurar conexión
      const res = await axios.get('http://127.0.0.1:5000/api/alimentos/lista');
      setInventario(res.data);
    } catch (error) {
      console.error("Error al obtener el inventario", error);
    }
  };

  // 4. Se ejecuta al abrir la página
  useEffect(() => {
    obtenerInventario();
  }, []);

  const manejarCambio = (e) => {
    setAlimento({ ...alimento, [e.target.name]: e.target.value });
  };

  const guardarAlimento = async (e) => {
    e.preventDefault();
    try {
      // Cambio a 127.0.0.1 para asegurar conexión
      const res = await axios.post('http://127.0.0.1:5000/api/alimentos/agregar', alimento);
      alert('✅ ' + res.data.mensaje);
      obtenerInventario(); // Refresca la tabla automáticamente tras guardar
    } catch (error) {
      console.error("Detalle del error:", error);
      alert('❌ Error al registrar el alimento. Revisa que el servidor esté encendido.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Sistema FoodConnect</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* FORMULARIO */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ color: '#27ae60' }}>Registrar Donación</h2>
          <form onSubmit={guardarAlimento} style={{ display: 'grid', gap: '15px' }}>
            <input name="nombre" placeholder="Nombre del alimento" onChange={manejarCambio} required style={{ padding: '10px' }} />
            <select name="categoria" onChange={manejarCambio} required style={{ padding: '10px' }}>
              <option value="">Seleccione categoría</option>
              <option value="Enlatados">Enlatados</option>
              <option value="Granos">Granos</option>
              <option value="Lácteos">Lácteos</option>
            </select>
            <input name="cantidad" type="number" placeholder="Cantidad" onChange={manejarCambio} required style={{ padding: '10px' }} />
            <input name="fechaVencimiento" type="date" onChange={manejarCambio} required style={{ padding: '10px' }} />
            <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>
              REGISTRAR EN INVENTARIO
            </button>
          </form>
        </div>

        {/* TABLA DE INVENTARIO */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', flex: '1', minWidth: '400px' }}>
          <h2 style={{ color: '#2980b9' }}>Inventario Actualizado</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Alimento</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Categoría</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cantidad</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((item) => (
                <tr key={item._id} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.nombre}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.categoria}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.cantidad} unidades</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(item.fechaVencimiento).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;