document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Set user name
    document.getElementById('user-name').textContent = `Welcome, ${user.name}!`;
    
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
    
    // Add movie form submission
    const addMovieForm = document.getElementById('add-movie-form');
    addMovieForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('movie-title').value;
        const review = document.getElementById('movie-review').value;
        const rating = document.getElementById('movie-rating').value;
        
        try {
            const response = await fetch('http://localhost:3000/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, review, rating })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                addMovieForm.reset();
                fetchMovies();
            } else {
                alert(data.message || 'Failed to add movie');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the movie');
        }
    });
    
    // Function to fetch and display movies
    async function fetchMovies() {
        try {
            const response = await fetch('http://localhost:3000/api/movies', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                displayMovies(data);
            } else {
                alert(data.message || 'Failed to fetch movies');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching movies');
        }
    }
    
    // Function to display movies
    function displayMovies(movies) {
        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = '';
        
        if (movies.length === 0) {
            movieList.innerHTML = '<p>You haven\'t added any movies yet. Start by adding your first movie review!</p>';
            return;
        }
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            const stars = '★'.repeat(movie.rating) + '☆'.repeat(5 - movie.rating);
            
            movieCard.innerHTML = `
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-rating">${stars} (${movie.rating}/5)</div>
                <p class="movie-review">${movie.review}</p>
                <div class="movie-date">Added on: ${new Date(movie.createdAt).toLocaleDateString()}</div>
            `;
            
            movieList.appendChild(movieCard);
        });
    }
    
    // Fetch movies on page load
    fetchMovies();
});