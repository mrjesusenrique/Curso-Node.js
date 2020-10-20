'use strict'

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Car = require('../models/car');
const { Company } = require('../models/company');
const Authorization = require('../middleware/auth');
const Administrator = require('../middleware/admin');
const Authorize = require('../middleware/role');
const Role = require('../helpers/roles');

// ------------------------------------------- MÉTODOS GET -----------------------------------------------------

router.get('/', [Authorization, Administrator, Authorize([Role.Admin, Role.User])], async (req, res) => {
    const cars = await Car
        .find();

    !cars ? res.status(404).send('No hay datos de coches para mostrar') : res.status(200).send({
        status: "success",
        message: "Coches encontrados",
        Coches: cars
    });
});

router.get('/:id', [Authorization, Administrator, Authorize([Role.Admin])], async (req, res) => {
    const id = await req.params.id;
    const car = await Car.findById(id);

    !car ? res.status(404).send('No hay datos para mostrar') : res.status(200).send({
        status: "success",
        message: "Coche encontrado",
        Coche: car
    });
});

// ----------------------------------------------- MÉTODOS POST -------------------------------------------------------

router.post('/', [Authorization, Administrator, Authorize([Role.Admin])], [
    body('model').isString().isLength({ min: 3, max: 99 }),
    body('sold').isBoolean(),
    body('price').isNumeric(),
    body('year').isInt().isLength({ min: 4, max: 4 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const company = await Company.findById(req.body.companyId);

    if (!company) {
        return res.status(404).send('No existe este fabricante');
    };

    const car = new Car({
        company: company,
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

router.put('/:id', [Authorization, Administrator, Authorize([Role.Editor])], [
    body('model').isString().isLength({ min: 3, max: 99 }),
    body('sold').isBoolean(),
    body('price').isNumeric(),
    body('year').isInt().isLength({ min: 4, max: 4 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const id = req.params.id;
    const car = await Car.findByIdAndUpdate(id, {
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
            Coche: car
        });
    };
});

// ------------------------------------------- MÉTODO DELETE ----------------------------------------------------------

router.delete('/:id', [Authorization, Administrator, Authorize([Role.Editor])], async (req, res) => {

    const id = req.params.id;
    const car = await Car.findByIdAndDelete(id);

    !car ? res.status(404).send('No existe ningun elemento con este ID') :
        res.status(200).send({ status: 'success', message: 'Coche borrado exitosamente', coche: car });
});

module.exports = router;