const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//conexion con mongoDb
const mongodb = require('./connection/connectdb');

//inicio de server
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next()
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//rutas
app.use('/', require('./routes'));


//arranque de server
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