const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Car = require('../model/car');

// ------------------------------------------- MÉTODOS GET -----------------------------------------------------

router.get('/', async (req, res) => {
    const cars = await Car.find();

    !cars ? res.status(404).send('No hay datos de coches para mostrar') : res.status(200).send(cars);
});

router.get('/:id', async (req, res) => {
    const id = await req.params.id;
    const car = await findById(id);

    !car ? res.status(404).send('No hay datos para mostrar') : res.status(200).send(car);
});

// ----------------------------------------------- MÉTODOS POST -------------------------------------------------------

router.post('/', [
    body('company').isLength({ min: 3 }),
    body('model').isLength({ min: 3 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const car = new Car({
        company: req.body.company,
        model: req.body.model,
        sold: req.body.sold,
        price: req.body.price,
        year: req.body.year,
        extras: req.body.extras
    });

    const result = await car.save();
    res.status(201).send(result);
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