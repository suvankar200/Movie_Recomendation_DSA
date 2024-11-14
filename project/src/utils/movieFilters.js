export function filterMovies(movies, { searchTerm = '', genre = '', minRating = 1, year = '' }) {
  return movies.filter(movie => {
    const searchMatch = !searchTerm || 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase());
    
    const genreMatch = !genre || movie.genre === genre;
    const ratingMatch = movie.rating >= minRating;
    const yearMatch = !year || movie.year >= parseInt(year);
    
    return searchMatch && genreMatch && ratingMatch && yearMatch;
  });
}