'use strict'

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3003;
const cars = require('./routes/cars');
const users = require('./routes/users');
const companies = require('./routes/companies');
const sales = require('./routes/sales');
const auth = require('./routes/auth');

app.use(express.json());        // Esto sirve para enviar datos por POST en formato JSON 

app.use('/api/cars/', cars);
app.use('/api/users/', users);
app.use('/api/companies', companies);
app.use('/api/sales/', sales);
app.use('/api/auth/', auth);

console.log(process.env.SECRET_KEY_APP);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/API_REST_CARSCOMPANIES', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('La conexión a la Base de Datos se ha realizado con éxito!!'))
    .catch((error) => console.log(`Ha ocurrido un error al intentar conectar con la Base de Datos ${error}`));
