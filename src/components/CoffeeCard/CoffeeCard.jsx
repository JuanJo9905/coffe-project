// src/components/CoffeeCard/CoffeeCard.jsx
import React from 'react';
import './CoffeeCard.css';

function CoffeeCard({ coffee, onClick }) {
  // Formato de fecha
  const formattedDate = new Date(coffee.createdAt || Date.now()).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="coffee-card" onClick={onClick}>
      <div className="coffee-card__image-container">
        <img 
          src={coffee.image || 'https://via.placeholder.com/640x400'} 
          alt={coffee.name} 
          className="coffee-card__image" 
        />
        <button className="coffee-card__bookmark-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="coffee-card__content">
        <span className="coffee-card__date">{formattedDate}</span>
        <h3 className="coffee-card__title">{coffee.name}</h3>
        <p className="coffee-card__description">
          {coffee.description}
        </p>
        <div className="coffee-card__source">{coffee.origin}</div>
      </div>
    </div>
  );
}

export default CoffeeCard;