'use strict'

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const Car = require('../models/car');
const User = require('../models/user');

router.get('/', async (req, res) => {
    const sales = await Sale.find();

    !sales ? res.status(404).send('No hay ventas para mostrar') :
        res.status(200).send({
            status: 'success',
            message: 'Ventas obtenidas',
            Ventas: sales
        });
});

router.post('/', async (req, res) => {

    const user = await User.findById(req.body.userId);
    !user && res.status(400).send('El ususario no existe');

    const car = await Car.findById(req.body.carId);
    !car && res.status(400).send('El coche no existe');

    car.sold === true && res.status(400).send('El coche ya ha sido vendido');

    const sale = new Sale({
        user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
        },

        car: {
            _id: car._id,
            model: car.model,
        },

        price: req.body.price
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await sale.save();
        user.isCustomer = true;
        user.save();
        car.sold = true;
        car.save();

        await session.commitTransaction();
        session.endSession();

        res.status(201).send({
            status: 'success',
            message: 'Venta guardada en la Base de Datos',
            venta: result
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send(error.message);
    };
});

module.exports = router