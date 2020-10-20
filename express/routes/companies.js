'use strict'

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Company } = require('../models/company');
const Authorization = require('../middleware/auth');
const Administrator = require('../middleware/admin');
const Authorize = require('../middleware/role');
const Role = require('../helpers/roles');

// ------------------------------------------- MÉTODOS GET -----------------------------------------------------

router.get('/', [Authorization, Administrator, Authorize([Role.Admin, Role.User])], async (req, res) => {
    const companies = await Company.find();

    !companies ? res.status(404).send('No hay datos de compañias para mostrar') :
        res.status(200).send({
            status: 'success',
            message: 'Compañias para mostrar',
            Compañias: companies
        });
});

router.get('/:id', [Authorization, Administrator, Authorize([Role.Admin])], async (req, res) => {
    const id = req.params.id;
    const company = await Company.findById(id);

    company === null ? res.status(404).send("No hay registro con este ID") :
        res.status(200).send({
            status: 'success',
            message: 'Compañia encontrada exitosamente',
            Compañia: company
        });
});

// ----------------------------------------------- MÉTODOS POST -------------------------------------------------------

router.post('/', [Authorization, Administrator, Authorize([Role.Admin])], [
    body('name').isString().isLength({ min: 3, max: 99 }).isUppercase(),
    body('country').isString().isLength({ min: 3, max: 99 }),
    body('yearFoundation').isInt().isLength({ min: 4, max: 4 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    };

    const company = new Company({
        name: req.body.name,
        country: req.body.country,
        yearFoundation: req.body.yearFoundation
    });

    const result = await company.save();

    res.status(201).send({
        status: 'success',
        message: 'Compañia guardada en la Base de Datos exitosamente',
        Comapañia: result
    });
});

// ------------------------------------------------ MÉTODO PUT --------------------------------------------------------

router.put('/:id', [Authorization, Administrator, Authorize([Role.Editor])], [
    body('name').isString().isLength({ min: 3, max: 99 }).isUppercase(),
    body('country').isString().isLength({ min: 3, max: 99 }),
    body('yearFoundation').isInt().isLength({ min: 4, max: 4 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    };

    const id = req.params.id;
    const company = await Company.findByIdAndUpdate(id, {
        name: req.body.name,
        country: req.body.country,
        yearFoundation: req.body.yearFoundation
    }, { new: true });

    if (!company) {
        return res.stataus(404).send('No se pudo encontrar ningun elemento con este ID');
    };

    res.status(200).send({
        status: 'success',
        message: 'Compañia actualizada correctamente',
        Comapañia: company
    });
});

// ------------------------------------------- MÉTODO DELETE ----------------------------------------------------------

router.delete('/:id', [Authorization, Administrator, Authorize([Role.Editor])], async (req, res) => {

    const id = req.params.id;
    const company = await Company.findByIdAndDelete(id);

    !company ? res.status(404).send('No existe ningun elemento con este ID') :
        res.status(200).send({
            status: 'success',
            message: 'Compañia borrada exitosamente',
            Comapañia: company
        });
});

module.exports = router;