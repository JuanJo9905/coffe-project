const COFFEE_API_URL = 'https://coffee.alexflipnote.dev';


export const getRandomCoffeeImage = () => {
  return `${COFFEE_API_URL}/random`;
};

export const getCoffeeImageWithSeed = (seed) => {
  return `${COFFEE_API_URL}/random?seed=${encodeURIComponent(seed)}`;
};


export const preloadCoffeeImages = (seeds) => {
  if (!seeds || !seeds.length) return;
  
  seeds.forEach(seed => {
    const img = new Image();
    img.src = getCoffeeImageWithSeed(seed);
  });
};

export default {
  getRandomCoffeeImage,
  getCoffeeImageWithSeed,
  preloadCoffeeImages
};