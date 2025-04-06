# Movie Review Application

A full-stack web application for managing movie reviews. Users can register, log in, add movie reviews, view their reviews, and delete them. The application uses a **Node.js** backend with **Express** and **MongoDB**, and a **vanilla JavaScript** frontend.

## Features

- **User Authentication**: Register and log in securely using JWT.
- **Add Movie Reviews**: Add reviews with a title, rating (1-5 stars), and a detailed review.
- **View Reviews**: View all reviews added by the logged-in user.
- **Delete Reviews**: Delete reviews that belong to the logged-in user.
- **Responsive Design**: Frontend is styled with CSS for a clean and responsive user interface.

## Tech Stack

### Backend
- **Node.js** with **Express** for server-side logic.
- **MongoDB** with **Mongoose** for database management.
- **JWT** for user authentication.
- **bcryptjs** for password hashing.

### Frontend
- **HTML**, **CSS**, and **JavaScript** for the user interface.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movies
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies (if any):
   ```bash
   cd ../frontend
   # No dependencies to install for vanilla JS
   ```

## Configuration

1. Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   PORT=3000
   ```

2. Replace `<your-mongodb-connection-string>` with your MongoDB URI and `<your-secret-key>` with a secure secret key.

## Running the Application

### Backend
1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`.

### Frontend
1. Open the `frontend/public/index.html` file in your browser to access the application.

## Project Structure

```
movies/
├── backend/
│   ├── db/               # Database configuration
│   ├── models/           # Mongoose models (User, Movie)
│   ├── routes/           # API routes (auth, movies)
│   ├── server.js         # Main server file
│   └── .env              # Environment variables (not included in repo)
├── frontend/
│   ├── public/
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # Frontend JavaScript
│   │   ├── index.html    # Login page
│   │   ├── signup.html   # Signup page
│   │   └── dashboard.html # Dashboard for managing reviews
├── .gitignore            # Files to ignore in Git
└── README.md             # Project documentation
```

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in an existing user.

### Movies
- **GET** `/api/movies`: Get all movies for the logged-in user.
- **POST** `/api/movies`: Add a new movie review.
- **DELETE** `/api/movies/:id`: Delete a movie review by ID.

## Frontend Pages

- **Login Page**: `index.html` - Allows users to log in.
- **Signup Page**: `signup.html` - Allows users to register.
- **Dashboard**: `dashboard.html` - Displays user reviews and allows adding/deleting reviews.

## Future Enhancements

- Add support for editing reviews.
- Implement search and filter functionality for reviews.
- Add user profile management.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Acknowledgments

- **Node.js** and **Express** for backend development.
- **MongoDB** for database management.
- **JWT** for secure authentication.
- **Vanilla JavaScript** for the frontend.

Happy coding!
