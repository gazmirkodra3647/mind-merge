/*
Filename: SophisticatedCode.js

Description: This code implements a complex algorithm to solve the traveling salesman problem using a genetic algorithm. It generates a random set of cities, evolves a population of routes using genetic operators such as selection, crossover, and mutation, and finally finds the optimal route for visiting all cities in the shortest distance.

Note: This code requires the 'math.js' library for some mathematical operations. Please make sure to include it before executing the code.

Author: Anonymous
Date: October 2021
*/

// Define necessary constants
const POPULATION_SIZE = 100;
const NUM_CITIES = 50;
const MAX_GENERATIONS = 1000;

// Create a City class to represent each city
class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(city) {
    const xDistance = Math.abs(this.x - city.x);
    const yDistance = Math.abs(this.y - city.y);
    return Math.sqrt(xDistance ** 2 + yDistance ** 2);
  }
}

// Create a Route class to represent a sequence of cities
class Route {
  constructor(route) {
    this.route = route || this.generateRandomRoute();
    this.distance = this.calculateDistance();
    this.fitness = 1 / this.distance;
  }

  generateRandomRoute() {
    const route = [];
    for (let i = 0; i < NUM_CITIES; i++) {
      route.push(i);
    }
    return shuffle(route);
  }

  calculateDistance() {
    let distance = 0;
    for (let i = 0; i < this.route.length - 1; i++) {
      const cityA = cities[this.route[i]];
      const cityB = cities[this.route[i + 1]];
      distance += cityA.distanceTo(cityB);
    }
    return distance;
  }
}

// Create a helper function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create an initial population of routes
let population = [];
for (let i = 0; i < POPULATION_SIZE; i++) {
  population.push(new Route());
}

// Start the genetic algorithm
let generation = 0;
while (generation < MAX_GENERATIONS) {
  // Perform selection based on fitness proportional to distance
  const selectedRoutes = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const index = Math.floor(Math.random() * POPULATION_SIZE);
    selectedRoutes.push(population[index]);
  }

  // Perform crossover by combining routes
  const offspringRoutes = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const parentA = selectedRoutes[i];
    const parentB = selectedRoutes[i + 1] || selectedRoutes[0];
    const pivot = Math.floor(Math.random() * NUM_CITIES);
    const offspringRoute = [];

    for (let j = 0; j < NUM_CITIES; j++) {
      if (j <= pivot) {
        offspringRoute.push(parentA.route[j]);
      } else {
        for (const city of parentB.route) {
          if (!offspringRoute.includes(city)) {
            offspringRoute.push(city);
          }
        }
      }
    }
    offspringRoutes.push(new Route(offspringRoute));
  }

  // Perform mutation by swapping two cities in a route
  for (const route of offspringRoutes) {
    if (Math.random() < 0.01) {
      const indexA = Math.floor(Math.random() * NUM_CITIES);
      let indexB = Math.floor(Math.random() * NUM_CITIES);
      while (indexB === indexA) {
        indexB = Math.floor(Math.random() * NUM_CITIES);
      }
      [route.route[indexA], route.route[indexB]] = [route.route[indexB], route.route[indexA]];
    }
  }

  // Replace the old population with the new offspring population
  population = offspringRoutes;

  // Find the fittest route in the current population
  let fittestRoute = population[0];
  for (const route of population) {
    if (route.fitness > fittestRoute.fitness) {
      fittestRoute = route;
    }
  }

  // Print information about the current generation
  console.log(`Generation ${generation + 1}`);
  console.log(`Fittest Route: ${fittestRoute.route.join(' -> ')}`);
  console.log(`Distance: ${fittestRoute.distance}`);
  console.log('-------------------------');

  generation++;
}

// Print the final result
console.log('Optimal Route:');
console.log(fittestRoute.route.join(' -> '));
console.log(`Shortest Distance: ${fittestRoute.distance}`);