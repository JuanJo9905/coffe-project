import coffeesData from './coffeesData.json';


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
  
  // Seleccionar la cantidad solicitada 
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


export const resetShownCoffees = () => {
  localStorage.removeItem('shownCoffees');
};


export const getCoffeeById = (id) => {
  return coffeesData.find(coffee => coffee.id === id) || null;
};


export const getAllCoffees = () => {
  return [...coffeesData];
};