export function createMovieCard(movie) {
  return `
    <div class="movie-card" data-movie-id="${movie.id}">
      <img src="${movie.image}" alt="${movie.title}">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-rating">★ ${movie.rating}</div>
      </div>
    </div>
  `;
}