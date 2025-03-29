const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Movie = require('../models/Movie');

// Middleware to authenticate JWT token
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all movies for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const movies = await Movie.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a new movie
router.post('/', auth, async (req, res) => {
    try {
        const { title, review, rating } = req.body;
        
        const newMovie = new Movie({
            title,
            review,
            rating,
            user: req.user.id
        });
        
        const movie = await newMovie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a movie
router.delete('/:id', auth, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        
        // Check if movie belongs to user
        if (movie.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await movie.remove();
        res.json({ message: 'Movie removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;