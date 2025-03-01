// src/components/App/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Importación de componentes
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Coffees from '../Coffees/Coffees';

function App() {
  console.log('App component rendered');
  
  return (
    <div className="app">
      <Header />
      
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coffees" element={<Coffees />} />
          {/* Añade una ruta de prueba para depuración */}
          <Route path="/test" element={<div>Página de prueba</div>} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;