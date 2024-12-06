
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

require('./controllers/userController')(app);
app.use(bodyParser.json()); // for parsing application/json
app.use((req, res) => {
    res.status(404).send({ msg: 'Route not found' });
});
app.use('/getfiles', express.static('files'))


module.exports = app;
