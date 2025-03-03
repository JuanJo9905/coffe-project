import React, { useState, useEffect } from 'react';
import { getCoffeeImageWithSeed } from '../../utils/coffeeAPI';
import './CoffeeCard.css';

function CoffeeCard({ coffee, onClick }) {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [backgroundPattern, setBackgroundPattern] = useState('pattern-cups');

  const formattedDate = new Date(coffee.createdAt || Date.now()).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    const seed = coffee.seed || `coffee-${coffee.id}`;
    const url = getCoffeeImageWithSeed(seed);
    setImageUrl(url);

    if (coffee.phrases && coffee.phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * coffee.phrases.length);
      setSelectedPhrase(coffee.phrases[randomIndex]);
    }
    
  }, [coffee.id, coffee.seed, coffee.phrases]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);

    setImageUrl('https://via.placeholder.com/640x400?text=Café');
  };


  const handleCardClick = (e) => {
    e.stopPropagation(); 
    setIsFlipped(!isFlipped);
    

    if (isFlipped && onClick) {
      onClick(coffee);
    }
  };


  const handlePatternChange = (e) => {
    e.stopPropagation(); 
  };


  const renderIntensityIndicators = () => {
    const maxIntensity = 5;
    const intensity = coffee.intensity || 3; 

    return (
      <div className="coffee-card__intensity">
        <span className="coffee-card__intensity-label">Intensidad:</span>
        <div className="coffee-card__intensity-indicators">
          {[...Array(maxIntensity)].map((_, index) => (
            <span 
              key={index} 
              className={`coffee-card__intensity-dot ${index < intensity ? 'coffee-card__intensity-dot--active' : ''}`}
              aria-hidden="true"
            ></span>
          ))}
        </div>
      </div>
    );
  };


  const renderBackIntensityDots = () => {
    const maxIntensity = 5;
    const intensity = coffee.intensity || 3; 

    return (
      <div className="coffee-card__intensity-indicators">
        {[...Array(maxIntensity)].map((_, index) => (
          <span 
            key={index} 
            className={`coffee-card__intensity-dot ${index < intensity ? 'coffee-card__intensity-dot--active' : ''}`}
            aria-hidden="true"
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`coffee-card-container ${isFlipped ? 'coffee-card-container--flipped' : ''}`}
      onClick={handleCardClick}
    >
      {/* Parte frontal de la tarjeta */}
      <div className="coffee-card coffee-card--front">
        <div className="coffee-card__image-container">
          {isImageLoading && (
            <div className="coffee-card__image-loader">
              <div className="coffee-card__image-loader-spinner"></div>
            </div>
          )}
          <img 
            src={imageUrl}
            alt={coffee.name} 
            className="coffee-card__image" 
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: isImageLoading ? 0 : 1 }}
          />
        </div>
        <div className="coffee-card__content">
          <span className="coffee-card__date">{formattedDate}</span>
          <h3 className="coffee-card__title">{coffee.name}</h3>
          {renderIntensityIndicators()}
          <p className="coffee-card__description">
            {coffee.description}
          </p>
          <div className="coffee-card__source">{coffee.origin}</div>
        </div>
      </div>
      
      {/* Parte trasera de la tarjeta */}
      <div className={`coffee-card coffee-card--back ${backgroundPattern}`}>
        <div className="coffee-card__back-content">
          <h3 className="coffee-card__title">{coffee.name}</h3>
          
          <div className="coffee-card__back-intensity">
            <h4 className="coffee-card__back-subtitle">Intensidad</h4>
            <div className="coffee-card__back-intensity-display">
              {renderBackIntensityDots()}
              <span className="coffee-card__back-intensity-value">
                {coffee.intensity || 3}/5
              </span>
            </div>
          </div>
          
          <div className="coffee-card__back-phrase">
            <h4 className="coffee-card__back-subtitle">Sobre este café</h4>
            <blockquote className="coffee-card__back-quote">
              {selectedPhrase || "Un café de calidad excepcional con sabor único."}
            </blockquote>
          </div>
          
          <div className="coffee-card__back-origin">
            <h4 className="coffee-card__back-subtitle">Origen</h4>
            <p className="coffee-card__back-origin-value">{coffee.origin}</p>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;