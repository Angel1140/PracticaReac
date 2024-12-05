import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Recargar la página cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Recargar la página cada 2 segundos
    }, 2000); // Intervalo de 2 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonta el componente
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
