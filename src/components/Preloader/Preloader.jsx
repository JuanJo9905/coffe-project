import React from 'react';
import './Preloader.css';

function Preloader() {
  console.log('Preloader renderizado'); // Para depuración
  return (
    <div className="preloader">
      <div className="preloader__spinner"></div>
    </div>
  );
}

export default Preloader;