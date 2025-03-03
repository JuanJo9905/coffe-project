import React from 'react';
import CoffeeCard from '../CoffeeCard/CoffeeCard';
import './CoffeeGrid.css';

function CoffeeGrid({ coffees, onCoffeeClick }) {
  const handleCoffeeClick = (coffee) => {

    console.log('Tarjeta seleccionada:', coffee.name);
    
    if (onCoffeeClick) {

    }
  };
  
  return (
    <div className="coffee-grid">
      <div className="coffee-grid__container">
        {coffees.map((coffee) => (
          <div className="coffee-grid__item" key={coffee.id}>
            <CoffeeCard 
              coffee={coffee} 
              onClick={() => handleCoffeeClick(coffee)} 
            />
          </div>
        ))}
      </div>
      
      {coffees.length > 0 && coffees.length <= 3 && (
        <div className="coffee-grid__dimensions">
          {/* {coffees.length * 400} Hug × 640 Hug */}
        </div>
      )}
    </div>
  );
}

export default CoffeeGrid;