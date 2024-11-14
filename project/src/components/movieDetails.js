export function createMovieDetails(movie) {
  return `
    <h2>${movie.title}</h2>
    <p><strong>Director:</strong> ${movie.director}</p>
    <p><strong>Year:</strong> ${movie.year}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Rating:</strong> ★ ${movie.rating}</p>
    <p>${movie.description}</p>
  `;
}