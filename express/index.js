const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cars = require('./routes/cars');

app.use(express.json());        // Esto sirve para enviar datos por POST en formato JSON 
app.use('/api/cars/', cars);

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
