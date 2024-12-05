import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]); // Estado para almacenar los datos

  // Función para simular la obtención de datos desde un servidor
  const fetchData = () => {
    const simulatedData = [
      { id: 1, value: `Dato ${Math.floor(Math.random() * 100)}` },
      { id: 2, value: `Dato ${Math.floor(Math.random() * 100)}` },
      { id: 3, value: `Dato ${Math.floor(Math.random() * 100)}` },
    ];
    setData(simulatedData);
  };

  // Actualización automática cada 5 segundos
  useEffect(() => {
    fetchData(); // Obtener datos al cargar el componente

    const interval = setInterval(() => {
      fetchData();
    }, 2000); // Cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Actualización Automática de Datos</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
