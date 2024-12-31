const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' }); // No token provided
    }

    jwt.verify(token, 'bhautik', (err, user) => { // Verify the token
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' }); // Invalid token
        }
        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;