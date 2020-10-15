'use strict'

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Car = require('../model/car');

// ------------------------------------------- MÉTODOS GET -----------------------------------------------------

router.get('/', async (req, res) => {
    const cars = await Car.find();

    !cars ? res.status(404).send('No hay datos de coches para mostrar') : res.status(200).send({
        status: "success",
        message: "Coches encontrados",
        coches: cars
    });
});

router.get('/:id', async (req, res) => {
    const id = await req.params.id;
    const car = await Car.findById(id);

    !car ? res.status(404).send('No hay datos para mostrar') : res.status(200).send({
        status: "success",
        message: "Coche encontrado",
        coche: car
    });
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
    res.status(201).send({
        status: 'success',
        message: 'Auto guardado exitosamente',
        Coche: result
    });
});

// ------------------------------------------------ MÉTODO PUT --------------------------------------------------------

router.put('/:id', [
    body('company').isLength({ min: 3 }),
    body('model').isLength({ min: 3 }),
    body('year').isInt()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const id = req.params.id;
    const car = await Car.findByIdAndUpdate(id, {
        company: req.body.company,
        model: req.body.model,
        sold: req.body.sold,
        price: req.body.price,
        year: req.body.year,
        extras: req.body.extras
    }, { new: true });

    if (!car) {
        return res.status(404).send('No se pudo encontrar ningun elemento con este ID');
    } else {
        res.status(200).send({
            status: 'success',
            message: 'Coche actualizado',
            coche: car
        });
    };
});

// ------------------------------------------- MÉTODO DELETE ----------------------------------------------------------

router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const car = await Car.findByIdAndDelete(id);

    !car ? res.status(404).send('No existe ningun elemento con este ID') :
        res.status(200).send({ message: 'Coche borrado exitosamente', coche: car });
});

module.exports = router;