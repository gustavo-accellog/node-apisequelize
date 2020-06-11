const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../config/swaggerDefinition.json');

module.exports = app => {
    // https://swagger.io/specification/  -> Info Object
    const swaggerOptions = {
        swaggerDefinition,
        apis: ['./src/controllers/*Controller.js'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}