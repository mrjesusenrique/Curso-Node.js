'use strict'

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3003;
const cars = require('./routes/cars');
const users = require('./routes/users');
const companies = require('./routes/companies');

app.use(express.json());        // Esto sirve para enviar datos por POST en formato JSON 
app.use('/api/cars/', cars);
app.use('/api/users/', users);
app.use('/api/companies', companies);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/API_REST_CARS', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('La conexión a la Base de Datos se ha realizado con éxito!!'))
    .catch((error) => console.log(`Ha ocurrido un error al intentar conectar con la Base de Datos ${error}`));
