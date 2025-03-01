import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <h2 className="about__title">Sobre el Proyecto</h2>
      <p className="about__description">
        Esta aplicación te permite explorar diferentes tipos de café. 
        Utiliza una API externa para obtener información detallada sobre 
        distintas variedades de café de todo el mundo.
      </p>
    </section>
  );
}

export default About;
