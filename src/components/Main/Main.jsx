import React, { useEffect, useRef } from 'react';
import './Main.css';
import './animations.css';

function Main() {
  const titleRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  
  useEffect(() => {
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    const handleScroll = () => {
      if (section2Ref.current && isElementInViewport(section2Ref.current)) {
        section2Ref.current.classList.add('animate-in');
      }
      if (section3Ref.current && isElementInViewport(section3Ref.current)) {
        section3Ref.current.classList.add('animate-in');
      }
    };
    
    if (titleRef.current) {
      setTimeout(() => {
        titleRef.current.classList.add('animate-in');
      }, 300);
    }
    
    if (section1Ref.current) {
      section1Ref.current.classList.add('animate-in');
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="main">
      <h1 className="main__title animate-ready" ref={titleRef}>Bienvenido a la Coffee App</h1>
      
      <section className="main__section animate-ready" ref={section1Ref}>
        <h2 className="main__section-title">El Café y la Salud</h2>
        <div className="main__section-content">
          <p>El café es uno de los productos agrícolas más valiosos a nivel mundial con un papel clave para muchas economías en desarrollo, especialmente en Latinoamérica, África y Asia.</p>
          <p>Para muchas personas el café se ha vuelto parte de su día a día y no es de extrañar ya que en un consumo moderado una sola taza puede aumentar la energía y la concentración mejorando la función cerebral potenciando la memoria, atención y concentración. Cuenta con antioxidantes que ayudan a combatir el daño celular y puede favorecer la quema de grasa gracias a que acelera el metabolismo mejorando el rendimiento físico.</p>          
          <p>Pero cuidado, un consumo excesivo de café puede convertir las ventajas en todo lo contrario causando aumento de ansiedad y nerviosismo, problemas de sueño, afecta la presión arterial y mancha los dientes.</p>
          <p>Agradezcamos y respetemos los efectos de este grano en nuestro cuerpo moderando nuestro consumo.</p>
        </div>
      </section>
      
      <section className="main__section animate-ready" ref={section2Ref}>
        <h2 className="main__section-title">El Valor Cultural del Café</h2>
        <div className="main__section-content">
          <p>El café es mucho más que una bebida, es el esfuerzo de miles de manos que trabajan cada día en los cultivos bajo el sol, son los nutrientes específicos de diferentes biomas que aportan su sabor tan característico, es la identidad de muchas regiones y el sustento de millones de familias. Cada sorbo que se disfruta a lo largo del mundo lleva consigo una historia que contar.</p>
        </div>
      </section>
      
      <section className="main__section animate-ready" ref={section3Ref}>
        <h2 className="main__section-title">Sobre Nuestra Aplicación</h2>
        <div className="main__section-content">
          <p>La Coffee App es una aplicación web desarrollada con React y Vite que busca ofrecer una experiencia para explorar diferentes variedades de café alrededor del mundo.</p>
          
          <p>Para la realización de este trabajo se usaron las siguientes tecnologías:</p>
          <ul className="main__tech-list">
            <li>React</li>
            <li>React Router</li>
            <li>CSS Modular</li>
            <li>Diseño responsivo</li>
            <li>Animaciones CSS</li>
            <li>Fetch API</li>
            <li>localStorage</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;