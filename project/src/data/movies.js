import { genres } from './movieGenres.js';

// Helper function to generate random movie data
function generateMovie(id) {
  const titles = [
    "The Phantom Menace", "Avatar", "Titanic", "The Matrix", 
    "Interstellar", "Gladiator", "Black Panther", "Pulp Fiction", 
    "The Dark Knight", "Forrest Gump", "Shrek", "Toy Story", "Frozen", 
    "Jaws", "Jurassic Park", "Rocky", "Terminator 2", "Inglourious Basterds",
    "The Prestige", "The Grand Budapest Hotel"
  ];
  
  const directors = [
    "Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", 
    "Martin Scorsese", "James Cameron", "Peter Jackson", 
    "Ridley Scott", "Stanley Kubrick", "George Lucas"
  ];
  
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomDirector = directors[Math.floor(Math.random() * directors.length)];
  const randomGenre = Object.values(genres)[Math.floor(Math.random() * Object.values(genres).length)];
  const randomRating = (Math.random() * 2 + 7).toFixed(1); // Ratings between 7.0 and 9.0
  const randomYear = Math.floor(Math.random() * 50) + 1970; // Years between 1970 and 2020

  return {
    id,
    title: randomTitle + " " + id, // Adding ID to avoid duplicates
    genre: randomGenre,
    rating: parseFloat(randomRating),
    image: `https://picsum.photos/300/4${50 + id % 10}`,
    description: `Description for ${randomTitle} ${id}.`,
    year: randomYear,
    director: randomDirector
  };
}

// Generate 2000 movies
export const movies = Array.from({ length: 2000 }, (_, index) => generateMovie(index + 1));
