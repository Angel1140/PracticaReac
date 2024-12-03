import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Obtener datos de los alumnos
  const fetchAlumnos = async () => {
    try {
      const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error('Error fetching alumnos data:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchAlumnos();
    const intervalId = setInterval(() => {
      fetchClientes();
    }, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  // Datos para las gráficas de barras de cada alumno con colores
  const dataAlumnos = (alumno) => ({
    labels: ['Hilos', 'Socket', 'Node', 'React', 'Git'],
    datasets: [
      {
        label: alumno.nombre,
        data: [
          alumno.practicas.practica_hilos,
          alumno.practicas.practica_socket,
          alumno.practicas.practica_node,
          alumno.practicas.practica_react,
          alumno.practicas.practica_git,
        ],
        backgroundColor: [
          '#FF5733', // Hilos
          '#33FF57', // Socket
          '#3357FF', // Node
          '#FF33A8', // React
          '#FF8333', // Git
        ],
        borderColor: [
          '#FF5733', // Hilos
          '#33FF57', // Socket
          '#3357FF', // Node
          '#FF33A8', // React
          '#FF8333', // Git
        ],
        borderWidth: 1,
      },
    ],
  });

  // Función para determinar si un alumno aprobó o reprobó
  const obtenerEstadoAlumno = (alumno) => {
    const aprobacion = 6; // Calificación mínima para aprobar
    const practicas = [
      alumno.practicas.practica_hilos,
      alumno.practicas.practica_socket,
      alumno.practicas.practica_node,
      alumno.practicas.practica_react,
      alumno.practicas.practica_git,
    ];

    // Verificar si todas las prácticas son aprobadas
    const resultado = practicas.every(calificacion => calificacion >= aprobacion);
    return resultado ? 'Aprobado' : 'Reprobado';
  };

  // Función para los datos de la gráfica de los clientes (con solo una gráfica)
  const dataClientes = () => {
    // Generar colores aleatorios para cada cliente
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    return {
      labels: clientes.map((cliente) => `Cliente ID: ${cliente.id}`), // Usando los ID de los clientes como etiquetas
      datasets: [
        {
          label: 'Clientes',
          data: clientes.map((cliente) => cliente.id), // Graficando el ID de cada cliente
          backgroundColor: clientes.map(() => generateRandomColor()), // Colores aleatorios para cada cliente
          borderColor: clientes.map(() => generateRandomColor()), // Bordes de color aleatorio
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="title" style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>
        CLIENTES INGENIERÍA INFORMÁTICA TESSFP
      </h1>

      {/* Sección de Alumnos */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: 'black' }}>
          Datos y Gráficas de Alumnos
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {alumnos.map((alumno) => (
            <div key={alumno.id} style={{ width: '48%', marginBottom: '30px' }}>
              {/* Fila de Datos del Alumno */}
              <div style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px' }}>Nombre</td>
                      <td style={{ padding: '12px' }}>{alumno.nombre}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>Hilos</td>
                      <td style={{ padding: '12px' }}>{alumno.practicas.practica_hilos}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>Socket</td>
                      <td style={{ padding: '12px' }}>{alumno.practicas.practica_socket}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Segunda Fila de Datos del Alumno */}
              <div style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px' }}>Node</td>
                      <td style={{ padding: '12px' }}>{alumno.practicas.practica_node}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>React</td>
                      <td style={{ padding: '12px' }}>{alumno.practicas.practica_react}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>Git</td>
                      <td style={{ padding: '12px' }}>{alumno.practicas.practica_git}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Estado del Alumno (Aprobado/Reprobado) */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Estado: {obtenerEstadoAlumno(alumno)}
                </p>
              </div>

              {/* Gráfica del Alumno */}
              <div style={{ marginBottom: '30px' }}>
                <Bar data={dataAlumnos(alumno)} options={{ responsive: true, maintainAspectRatio: true }} height={100} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Clientes */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: 'black' }}>Datos de Clientes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {clientes.map((cliente) => (
            <div key={cliente.id} style={{ width: '48%', marginBottom: '20px' }}>
              {/* Datos del Cliente (con recuadro) */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                  border: '2px solid black',
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '2px solid black' }}>Nombre</td>
                    <td style={{ padding: '12px', border: '2px solid black' }}>{cliente.nombre}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '2px solid black' }}>Teléfono</td>
                    <td style={{ padding: '12px', border: '2px solid black' }}>{cliente.telefono}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '2px solid black' }}>Correo</td>
                    <td style={{ padding: '12px', border: '2px solid black' }}>{cliente.correo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Gráfica de Clientes */}
        <div style={{ textAlign: 'center' }}>
          <Bar data={dataClientes()} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
};

export default ListaClientes;