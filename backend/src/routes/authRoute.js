const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticate')

// Rate limiting
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { success: false, message: 'Too many accounts created from this IP, please try again later.' }
});

// Register a new user
router.post('/register', registerLimiter, [
    body('username').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }). withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if the user already exist
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({ success: false, message: 'User  already exists' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, password: hashedPassword });
        await user.save();

        return res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/login', [
    body('username').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'bhautik', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret

        // Send the token back to the client
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Add the token to the blacklist
    blacklistedTokens.push(token);

    res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;