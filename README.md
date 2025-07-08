# coffe-project

## Contexto 

En el mercado actual del café, los consumidores se sienten abrumados por la variedad de opciones disponibles. Muchas páginas web de café son estáticas y no logran transmitir la experiencia sensorial que representa cada tipo de café, limitando la capacidad del usuario para descubrir nuevos sabores y orígenes.

Crear una experiencia digital inmersiva que permita a los usuarios explorar diferentes tipos de café de manera interactiva, educativa y visualmente atractiva, aprovechando las capacidades modernas de CSS para crear efectos que simulen la experiencia de descubrir el café.

### Herramientas
- **React**: Elegido por su capacidad de crear interfaces dinámicas y reutilizables
- **CSS**: Preferido sobre frameworks para tener control total sobre animaciones y efectos
- **JSON**: Estructura flexible para datos de café que permite fácil escalabilidad
- **Vanilla JavaScript**: Complemento a React para funcionalidades específicas del DOM


## Análisis de la información
Para presentar la información se organizó cada producto por su origen, intensidad y perfil de sabor además se implementó un filtro para facilitar la busqueda de los productos.
Los datos de café se organizaron en formato JSON con la siguiente estructura:
```json
{
  "coffeeTypes": [
    {
      "id": "arabica",
      "name": "Arábica",
      "origin": "Etiopía",
      "flavor": "Suave y aromático",
      "strength": 3,
      "description": "...",
      "image": "arabica.jpg"
    }
  ]
}
```

### Habilidades técnicas
- **Conocimientos en CSS**: Uso de propiedades como `transform` y `opacity` para animaciones más fluidas.
- **Desarrollo en React**: Creación de componentes funcionales, gestión de estados y uso de hooks.
- **JavaScript**: Manipulación del DOM, eventos y optimización del rendimiento.
- **UX/UI**: Diseño pensado en el usuario y los principios de usabilidad.

## Conclusiones

La combinación de las buenas practicas en el desarrollo con una estructura solida dió como resultado un producto fiable capaz de ser visualizado en diferentes dispositivos y navegadores asegurando de esa manera una experiencia de usuario satisfactoria usando animaciones sutiles que no solo sean funcionales si no tambien memorables.
