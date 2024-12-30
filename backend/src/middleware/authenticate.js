// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Check if the token is blacklisted
    if (blacklistedTokens.includes(token)) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, 'bhautik', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info for use in other routes
        next();
    });
};

module.exports = authenticateToken;