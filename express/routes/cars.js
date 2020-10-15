const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

let coches = [
    {
        id: 0,
        marca: "Chevrolet",
        modelo: "Captiva",
        year: 2010
    },

    {
        id: 1,
        marca: "Fiat",
        modelo: "Palio",
        year: 2007
    },

    {
        id: 2,
        marca: "Jeep",
        modelo: "Grand Cherokee",
        year: 2020
    },

    {
        id: 3,
        marca: "Ford",
        modelo: "Focus",
        year: 2019
    },

    {
        id: 4,
        marca: "Ford",
        modelo: "Explorer",
        year: 2019
    },

    {
        id: 5,
        marca: "Jeep",
        modelo: "Cherokee",
        year: 2020
    },

    {
        id: 6,
        marca: "Chevrolet",
        modelo: "Optra",
        year: 2020
    }
];

router.get('/list', (req, res) => {
    res.send(['Chevrolet Captiva', 'Fiat Palio', 'Chevrolet Aveo', 'Ford Focus', 'Jeep Grand Cherokee', 'Jeep Cherokiee']);
});

// Si queremos agarrar el id de la URL

router.get('/id/:id', (req, res) => {
    res.send(req.params.id);
});

// Sacando más parámetros de la URL 

router.get('/:company/:model', (req, res) => {
    res.send(req.params);       // Si no especifico cual parámetro quiero me saca todos en formato json
});

router.get('/', (req, res) => {
    res.send(coches);
});

router.get('/:company', (req, res) => {

    // El método 'find' me arroja solo el primer resultado que coincida con la búsqueda

    const coche = coches.find(coche => coche.marca === req.params.company);

    if (!coche) {
        res.status(404).send('No existe coche de esa marca');
    } else {
        res.status(200).send(coche);
    }
});

// ----------------------------------------------- MÉTODOS POST -------------------------------------------------------

router.post('/', (req, res) => {
    var carId = coches.length;

    var coche = {
        id: carId,
        marca: req.body.marca,
        modelo: req.body.modelo,
        year: req.body.year
    };

    coches.push(coche);
    res.status(201).send(coche);
});

router.post('/2', (req, res) => {

    if (!req.body.marca || req.body.marca.length < 3) {
        res.status(400).send('Por favor ingrese una marca valida')
        return;
    };

    let carId = coches.length;

    let coche = {
        id: carId,
        marca: req.body.marca,
        modelo: req.body.modelo,
        year: req.body.year
    };

    coches.push(coche);
    res.status(201).send(coche);
});

router.post('/3', [
    body('marca').isLength({ min: 3 }),
    body('modelo').isLength({ min: 2 })
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    let carId = coches.length;

    let coche = {
        id: carId,
        marca: req.body.marca,
        modelo: req.body.modelo,
        year: req.body.year
    };

    coches.push(coche);
    res.status(201).send(coche);
});

// ------------------------------------------------ MÉTODO PUT --------------------------------------------------------

router.put('/:id', [
    body('marca').isLength({ min: 3 }),
    body('modelo').isLength({ min: 2 }),
    body('year').isInt()
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const coche = coches.find(coche => coche.id === Number(req.params.id));

    if (!coche) {
        return res.status(404).send('El coche con este ID no existe');
    };

    coche.marca = req.body.marca;
    coche.modelo = req.body.modelo;
    coche.year = req.body.year;

    res.status(200).send({ message: "El coche se ha actualizado correctamente", coche: coche });

});

// ------------------------------------------- MÉTODO DELETE ----------------------------------------------------------

router.delete('/:id', (req, res) => {
    const coche = coches.find(coche => coche.id === Number(req.params.id));

    if (!coche) {
        return res.status(404).send('El coche con este ID no existe y no se puede borrar');
    };

    const index = coches.indexOf(coche);
    coches.splice(index, 1);
    res.status(200).send({ message: 'Coche borrado exitosamente', coche: coche });
});

module.exports = router;