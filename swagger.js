const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Users API",
        description: "Api para actividad de CRUD con mongoDB en CSE341 Class"
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = './swagger.json'
const endPointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endPointsFiles, doc)