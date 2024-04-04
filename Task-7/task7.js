const express = require('express');
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Logging middleware (optional)
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// Example route throwing an error
app.get('/error', (req, res, next) => {
    try {
       
        const x = undefined;
        const y = x.someProperty;
        res.send(y); // This will throw an error
    } catch (error) {
        next(error);
    }
});