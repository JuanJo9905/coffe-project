// src/components/SearchForm/SearchForm.jsx
import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pasamos el término tal cual, incluso si está vacío
    // Esto permitirá mostrar todos los cafés cuando no hay texto de búsqueda
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    // Al limpiar, enviamos término vacío, lo que mostrará todos los cafés
    onSearch('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Buscar cafés..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            type="button" 
            className="search-form__clear-button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;