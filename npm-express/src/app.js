const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//db connection
require('./database/connection');
require('./bootstrap')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}...`));