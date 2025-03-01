// src/utils/coffeeUtils.js
import coffeesData from './coffeesData.json';

/**
 * Obtiene un conjunto aleatorio de cafés sin repetición
 * @param {number} count - Número de cafés a obtener
 * @returns {Array} Array de objetos de café
 */
export const getRandomCoffees = (count) => {
  // Primero obtener los IDs de café que ya han sido mostrados del localStorage
  const shownCoffeesJSON = localStorage.getItem('shownCoffees');
  let shownCoffeeIds = shownCoffeesJSON ? JSON.parse(shownCoffeesJSON) : [];
  
  // Si ya se han mostrado todos los cafés, reiniciar el registro
  if (shownCoffeeIds.length >= coffeesData.length) {
    shownCoffeeIds = [];
    localStorage.setItem('shownCoffees', JSON.stringify(shownCoffeeIds));
  }
  
  // Filtrar los cafés que aún no se han mostrado
  const availableCoffees = coffeesData.filter(coffee => !shownCoffeeIds.includes(coffee.id));
  
  // Barajar el array de cafés disponibles
  const shuffled = [...availableCoffees].sort(() => 0.5 - Math.random());
  
  // Seleccionar la cantidad solicitada (o menos si no hay suficientes)
  const selectedCount = Math.min(count, shuffled.length);
  const selectedCoffees = shuffled.slice(0, selectedCount);
  
  // Actualizar la lista de cafés mostrados en localStorage
  const newShownCoffeeIds = [
    ...shownCoffeeIds,
    ...selectedCoffees.map(coffee => coffee.id)
  ];
  localStorage.setItem('shownCoffees', JSON.stringify(newShownCoffeeIds));
  
  return selectedCoffees;
};

/**
 * Busca cafés por término
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Array de cafés filtrados
 */
// src/utils/coffeeUtils.js
// Actualización de la función searchCoffees

/**
 * Busca cafés por término
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Array de cafés filtrados o todos los cafés si el término está vacío
 */
export const searchCoffees = (searchTerm) => {
  // Si el término de búsqueda está vacío, devolver todos los cafés
  if (!searchTerm || !searchTerm.trim()) {
    return [...coffeesData];
  }
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return coffeesData.filter(coffee => 
    coffee.name.toLowerCase().includes(lowerSearchTerm) || 
    coffee.description.toLowerCase().includes(lowerSearchTerm) ||
    coffee.origin.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Resetea el historial de cafés mostrados
 */
export const resetShownCoffees = () => {
  localStorage.removeItem('shownCoffees');
};

/**
 * Obtiene un café por su ID
 * @param {number} id - ID del café
 * @returns {Object|null} Objeto de café o null si no se encuentra
 */
export const getCoffeeById = (id) => {
  return coffeesData.find(coffee => coffee.id === id) || null;
};

/**
 * Obtiene todos los cafés disponibles
 * @returns {Array} Array de todos los objetos de café
 */
export const getAllCoffees = () => {
  return [...coffeesData];
};