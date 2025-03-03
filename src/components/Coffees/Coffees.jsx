import React, { useState, useEffect } from 'react';
import CoffeeGrid from '../CoffeeGrid/CoffeeGrid';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { getRandomCoffees, searchCoffees, getAllCoffees } from '../../utils/coffeeUtils';
import { preloadCoffeeImages } from '../../utils/coffeeAPI';
import './Coffees.css';

function Coffees() {
  const [coffees, setCoffees] = useState([]);
  const [visibleCoffees, setVisibleCoffees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const COFFEES_PER_PAGE = 3;
  
  useEffect(() => {
    try {
      setTimeout(() => {
        if (!isSearchActive) {
          const randomCoffees = getRandomCoffees(9); 
          
          if (randomCoffees.length === 0) {
            setErrorMessage('No se encontraron cafés disponibles');
          } else {
            setCoffees(randomCoffees);
            setVisibleCoffees(randomCoffees.slice(0, COFFEES_PER_PAGE));
            
            
            const seeds = randomCoffees.slice(0, COFFEES_PER_PAGE).map(coffee => 
              coffee.seed || `coffee-${coffee.id}`
            );
            preloadCoffeeImages(seeds);
          }
        }
        
        setIsLoading(false);
      }, 800); 
    } catch (error) {
      console.error('Error al cargar los cafés:', error);
      setErrorMessage('Hubo un error al cargar los cafés. Por favor, intenta de nuevo más tarde.');
      setIsLoading(false);
    }
  }, [isSearchActive]);
  
  useEffect(() => {
    if (visibleCoffees.length > 0) {
      // Precargamos también las siguientes imágenes para mejorar la experiencia
      const nextBatchIndex = visibleCoffees.length;
      const nextCoffeesSeeds = coffees
        .slice(nextBatchIndex, nextBatchIndex + COFFEES_PER_PAGE)
        .map(coffee => coffee.seed || `coffee-${coffee.id}`);
      
      if (nextCoffeesSeeds.length > 0) {
        preloadCoffeeImages(nextCoffeesSeeds);
      }
    }
  }, [visibleCoffees, coffees]);
  
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
        
        setTimeout(() => {
          const searchResults = searchCoffees(searchTerm);
          
          if (searchResults.length === 0) {
            setErrorMessage(`No se encontraron cafés para "${searchTerm}"`);
            setCoffees([]);
            setVisibleCoffees([]);
          } else {
            setCoffees(searchResults);
            setVisibleCoffees(searchResults.slice(0, COFFEES_PER_PAGE));
            
            const seeds = searchResults.slice(0, COFFEES_PER_PAGE).map(coffee => 
              coffee.seed || `coffee-${coffee.id}`
            );
            preloadCoffeeImages(seeds);
          }
          
          setIsLoading(false);
        }, 500);
        return; 
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al buscar cafés:', error);
      setErrorMessage('Hubo un error al buscar los cafés. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  };
  
  const onCoffeeClick = (coffee) => {
    console.log('Café seleccionado:', coffee);
    alert(`Has seleccionado: ${coffee.name} de ${coffee.origin}`);
  };
  
  const handleLoadAll = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const allCoffees = getAllCoffees();
      setCoffees(allCoffees);
      setVisibleCoffees(allCoffees.slice(0, COFFEES_PER_PAGE));
      
      const seeds = allCoffees.slice(0, COFFEES_PER_PAGE).map(coffee => 
        coffee.seed || `coffee-${coffee.id}`
      );
      preloadCoffeeImages(seeds);
      
      setIsLoading(false);
    }, 500);
  };
  
  // Función para mezclar y mostrar cafés aleatorios
  const handleShuffle = () => {
    setIsLoading(true);
    setIsSearchActive(false);
    
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