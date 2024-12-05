import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Utilizamos useEffect para configurar la actualización automática
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Recarga la página cada 2 segundos
    }, 1000); // Intervalo de 1 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

