// src/components/Coffees/Coffees.jsx
import React, { useState, useEffect } from 'react';
import CoffeeGrid from '../CoffeeGrid/CoffeeGrid';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { getRandomCoffees, searchCoffees, getAllCoffees } from '../../utils/coffeeUtils';
import './Coffees.css';

function Coffees() {
  // Estados para manejar los datos y la UI
  const [coffees, setCoffees] = useState([]);
  const [visibleCoffees, setVisibleCoffees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // Cantidad de cafés a mostrar inicialmente y al hacer clic en "Mostrar más"
  const COFFEES_PER_PAGE = 3;
  
  // Efecto para cargar cafés aleatorios al montar el componente
  useEffect(() => {
    try {
      // Simulamos un tiempo de carga
      setTimeout(() => {
        // Si no está en modo búsqueda, cargamos cafés aleatorios
        if (!isSearchActive) {
          // Obtenemos cafés aleatorios
          const randomCoffees = getRandomCoffees(9); // Obtener 9 cafés aleatorios
          
          if (randomCoffees.length === 0) {
            setErrorMessage('No se encontraron cafés disponibles');
          } else {
            setCoffees(randomCoffees);
            setVisibleCoffees(randomCoffees.slice(0, COFFEES_PER_PAGE));
          }
        }
        
        setIsLoading(false);
      }, 800); // Simulamos 800ms de carga
    } catch (error) {
      console.error('Error al cargar los cafés:', error);
      setErrorMessage('Hubo un error al cargar los cafés. Por favor, intenta de nuevo más tarde.');
      setIsLoading(false);
    }
  }, [isSearchActive]);
  
  // Función para mostrar más cafés
  const handleShowMore = () => {
    const currentlyVisible = visibleCoffees.length;
    const nextBatch = coffees.slice(
      currentlyVisible, 
      currentlyVisible + COFFEES_PER_PAGE
    );
    
    setVisibleCoffees([...visibleCoffees, ...nextBatch]);
  };
  
  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Si la búsqueda está vacía, mostrar todos los cafés
      if (!searchTerm.trim()) {
        // Obtener todos los cafés disponibles
        const allCoffees = getAllCoffees();
        setCoffees(allCoffees);
        setVisibleCoffees(allCoffees.slice(0, COFFEES_PER_PAGE));
        setIsSearchActive(false);
      } else {
        setIsSearchActive(true);
        
        // Simulamos un tiempo de respuesta
        setTimeout(() => {
          const searchResults = searchCoffees(searchTerm);
          
          if (searchResults.length === 0) {
            setErrorMessage(`No se encontraron cafés para "${searchTerm}"`);
            setCoffees([]);
            setVisibleCoffees([]);
          } else {
            setCoffees(searchResults);
            setVisibleCoffees(searchResults.slice(0, COFFEES_PER_PAGE));
          }
          
          setIsLoading(false);
        }, 500);
        return; // Salimos para evitar establecer isLoading a false antes de tiempo
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al buscar cafés:', error);
      setErrorMessage('Hubo un error al buscar los cafés. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  };
  
  // Manejador para click en café
  const onCoffeeClick = (coffee) => {
    console.log('Café seleccionado:', coffee);
    // Aquí podrías implementar un modal o navegación a detalles
    alert(`Has seleccionado: ${coffee.name} de ${coffee.origin}`);
  };
  
  // Función para cargar todos los cafés
  const handleLoadAll = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const allCoffees = getAllCoffees();
      setCoffees(allCoffees);
      setVisibleCoffees(allCoffees.slice(0, COFFEES_PER_PAGE));
      setIsLoading(false);
    }, 500);
  };
  
  // Función para mezclar y mostrar cafés aleatorios
  const handleShuffle = () => {
    setIsLoading(true);
    setIsSearchActive(false);
    
    // Permitimos que se recargue el useEffect
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };
  
  return (
    <div className="coffees">
      <div className="coffees__header">
        <h1 className="coffees__title">Explora nuestros cafés</h1>
        <SearchForm onSearch={handleSearch} />
        
        <div className="coffees__actions">
          <button 
            className="coffees__action-button" 
            onClick={handleShuffle}
          >
            Mezclar cafés
          </button>
          
          <button 
            className="coffees__action-button coffees__action-button--secondary" 
            onClick={handleLoadAll}
          >
            Ver todos
          </button>
        </div>
      </div>
      
      {isLoading && <Preloader />}
      
      {!isLoading && errorMessage && (
        <p className="coffees__error">{errorMessage}</p>
      )}
      
      {!isLoading && !errorMessage && (
        <>
          {visibleCoffees.length > 0 ? (
            <>
              <CoffeeGrid 
                coffees={visibleCoffees} 
                onCoffeeClick={onCoffeeClick}
              />
              
              {visibleCoffees.length < coffees.length && (
                <button 
                  className="coffees__more-button" 
                  onClick={handleShowMore}
                >
                  Mostrar más
                </button>
              )}
            </>
          ) : (
            <p className="coffees__empty">No hay cafés disponibles.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Coffees;