// Base URL para las solicitudes a la API
const BASE_URL = 'https://api.example.com/coffees';

class RandomCoffeeApi {
  // Método para obtener todos los cafés
  async getCoffees() {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Verificar si la respuesta es correcta
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener los cafés:', error);
      throw new Error(
        'Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde'
      );
    }
  }

  // Método para buscar cafés por término
  async searchCoffees(searchTerm) {
    try {
      const response = await fetch(`${BASE_URL}/search?term=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al buscar cafés:', error);
      throw new Error(
        'Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde'
      );
    }
  }
}

// Exportar una instancia de la clase para usar en los componentes
const randomCoffeeApi = new RandomCoffeeApi();
export default randomCoffeeApi;