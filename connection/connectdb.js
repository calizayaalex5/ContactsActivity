//en este archivo se establece la conexión a la base de datos MongoDB utilizando el paquete mongodb y dotenv para cargar las variables de entorno desde un archivo .env. La URI de conexión se obtiene de la variable de entorno MONGODB_URI, lo que permite mantener la información sensible fuera del código fuente.
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;
let _db;

const initDb = (callback) => {
    if (_db) {
        console.warn('Trying to init DB again!');
        return callback(null, _db);
    } else {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(client => {
                _db = client.db();
                console.log('DB initialized - connected to: ' + uri);
                return callback(null, _db);
            })
            .catch(err => {
                console.error('DB initialization failed:', err);
                return callback(err);
            });
    }
}