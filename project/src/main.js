import { movies } from './data/movies.js';
import { filterMovies } from './utils/movieFilters.js';
import { getPaginatedData } from './utils/pagination.js';
import { createMovieCard } from './components/movieCard.js';
import { createMovieDetails } from './components/movieDetails.js';
import { getComments, addComment } from './services/commentService.js';

// State
let filteredMovies = [...movies];
let currentMovieId = null;
let currentPage = 1;
const MOVIES_PER_PAGE = 12;

// DOM Elements
const elements = {
  movieGrid: document.getElementById('movieGrid'),
  filterBtn: document.getElementById('filterBtn'),
  filterModal: document.getElementById('filterModal'),
  movieModal: document.getElementById('movieModal'),
  closeButtons: document.querySelectorAll('.close'),
  genreFilter: document.getElementById('genreFilter'),
  ratingFilter: document.getElementById('ratingFilter'),
  ratingValue: document.getElementById('ratingValue'),
  yearFilter: document.getElementById('yearFilter'),
  applyFilters: document.getElementById('applyFilters'),
  searchInput: document.getElementById('searchInput'),
  newComment: document.getElementById('newComment'),
  submitComment: document.getElementById('submitComment'),
  prevPageBtns: document.querySelectorAll('#prevPage, #prevPage2'),
  nextPageBtns: document.querySelectorAll('#nextPage, #nextPage2'),
  pageInfoSpans: document.querySelectorAll('#pageInfo, #pageInfo2')
};

// Event Handlers
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  filteredMovies = filterMovies(movies, { searchTerm });
  currentPage = 1;
  renderMovies();
}

function handleFilterApply() {
  const filters = {
    genre: elements.genreFilter.value,
    minRating: parseFloat(elements.ratingFilter.value),
    year: elements.yearFilter.value
  };

  filteredMovies = filterMovies(movies, filters);
  currentPage = 1;
  renderMovies();
  elements.filterModal.style.display = 'none';
}

async function handleCommentSubmit() {
  const commentText = elements.newComment.value.trim();
  if (!currentMovieId || !commentText) return;

  const success = await addComment(currentMovieId, commentText);
  if (success) {
    elements.newComment.value = '';
    loadComments(currentMovieId);
  }
}

// Rendering Functions
function renderMovies() {
  const { items: moviesToShow, totalPages } = getPaginatedData(filteredMovies, currentPage, MOVIES_PER_PAGE);
  
  elements.movieGrid.innerHTML = moviesToShow.map(createMovieCard).join('');
  
  // Update pagination controls
  elements.prevPageBtns.forEach(btn => btn.disabled = currentPage === 1);
  elements.nextPageBtns.forEach(btn => btn.disabled = currentPage === totalPages);
  elements.pageInfoSpans.forEach(span => span.textContent = `Page ${currentPage} of ${totalPages}`);
}

async function loadComments(movieId) {
  const comments = await getComments(movieId);
  const commentsContainer = document.getElementById('comments');
  
  commentsContainer.innerHTML = comments.length
    ? comments.map(comment => `
        <div class="comment">
          <p>${comment.text}</p>
          <small>${new Date(comment.timestamp).toLocaleString()}</small>
        </div>
      `).join('')
    : '<p>No comments yet</p>';
}

// Event Listeners
elements.filterBtn.addEventListener('click', () => elements.filterModal.style.display = 'block');
elements.closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    elements.filterModal.style.display = 'none';
    elements.movieModal.style.display = 'none';
  });
});

elements.ratingFilter.addEventListener('input', e => {
  elements.ratingValue.textContent = e.target.value;
});

elements.searchInput.addEventListener('input', handleSearch);
elements.applyFilters.addEventListener('click', handleFilterApply);
elements.submitComment.addEventListener('click', handleCommentSubmit);

elements.prevPageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderMovies();
    }
  });
});

elements.nextPageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderMovies();
    }
  });
});

// Movie Details Handler
document.addEventListener('click', async (e) => {
  const movieCard = e.target.closest('.movie-card');
  if (!movieCard) return;

  const movieId = parseInt(movieCard.dataset.movieId);
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return;

  currentMovieId = movieId;
  document.getElementById('movieDetails').innerHTML = createMovieDetails(movie);
  await loadComments(movieId);
  elements.movieModal.style.display = 'block';
});

// Initial render
renderMovies();