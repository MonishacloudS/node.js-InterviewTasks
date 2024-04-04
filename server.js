const express = require("express");
const bodyParser = require('body-parser')
const app = express();
require('./Mongoose/db.js');
const requestLogger = require('./Task-3/customMiddleware.js')

require("dotenv").config();
app.use(express.json());
app.use(bodyParser.json());


//Task-3  Implementing the custom middleware in an Express.js application to log request details like URL and
//method.

app.use(requestLogger);


//Task-2 simple express application with GET & POST routes

app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Welcome to the app....!' })
})

app.post('/', (req, res) => {
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ success: false, message: 'Message is required in the request body' });
    } else {
        res.status(200).json({ success: true, message: `Received POST request with message: ${message}` });
    }
})


app.listen(3000, () => {
    console.log(`Server listening at http://localhost:3000`);
});