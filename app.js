const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require('./connection/connectdb');

const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        })
    }
})