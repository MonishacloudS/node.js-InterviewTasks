const express = require('express');
const app = express();
const mongoose = require('mongoose');
// require('../Mongoose/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel.js')

const JWT_SECRET = 'secretkey';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = decoded;
        next();
    });
}

// Routes

// POST /login - Authenticate user and generate JWT token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// GET /users - Get all users (protected route)
app.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        await users.save()
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /users/:id - Get a specific user by ID (protected route)
app.get('/users/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.save()
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /users - Create a new user (public route)
app.post('/users', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, email });
        await newUser.save()
        return res.status(200).json({ newUser });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /users/:id - Update an existing user by ID (protected route)
app.put('/users/:id', verifyToken, async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password: hashedPassword, email }, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        await updatedUser.save()
        return res.status(200).json({ updatedUser });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /users/:id - Delete a user by ID (protected route)
app.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        await deletedUser.save()
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});
