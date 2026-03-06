//en este archivo se establece la conexión a la base de datos MongoDB utilizando el paquete mongodb y dotenv para cargar las variables de entorno desde un archivo .env. La URI de conexión se obtiene de la variable de entorno MONGODB_URI, lo que permite mantener la información sensible fuera del código fuente.
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;
let _db; //variable para almacenar la conexion

const initDb = (callback) => {
    if (_db) {
        console.warn('Db is already initialized!');
        return callback(null, _db);
    }
        MongoClient.connect(uri)
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

const getDb = () => {
    if (!_db) {
        throw new Error('Db not initialized');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}