import React from 'react';
import './Main.css';
import About from '../About/About.jsx';

function Main() {
  return (
    <main className="main">
      <h1 className="main__title">Bienvenido a la Coffee App</h1>
      <About />
    </main>
  );
}

export default Main;
