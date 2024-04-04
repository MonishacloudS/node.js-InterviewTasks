const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();


// Middleware validate request payload
const validatePayload = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// validation schema using express-validator
const validationSchema = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];


app.post('/register', validationSchema, validatePayload, (req, res) => {
    
    res.send('User registered successfully');
});
