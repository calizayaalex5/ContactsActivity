const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Users API",
        description: "Api para actividad de CRUD con mongoDB en CSE341 Class"
    },
    host: "contactsactivity.onrender.com/",
    schemes: ["https"]
};

const outputFile = './swagger.json'
const endPointsFiles = ['./routes/users.js']

swaggerAutogen(outputFile, endPointsFiles, doc)