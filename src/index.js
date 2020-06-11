const express = require('express');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swagger-docs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

require('./swagger-docs')(app);
require('./controllers/index')(app);

app.listen(port, () => {
    console.log('Node API Sequelize start at ', port)
});