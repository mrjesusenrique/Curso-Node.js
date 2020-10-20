'use strict'

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Authorization = require('../middleware/auth');
const Administrator = require('../middleware/admin');
const Authorize = require('../middleware/role');
const Role = require('../helpers/roles');


// ------------------------------------------- MÉTODOS GET -----------------------------------------------------

router.get('/', [Authorization, Administrator, Authorize([Role.Admin, Role.User])], async (req, res) => {
    const user = await User.find();

    !user ? res.status(404).send('No hay datos de usuarios para mostrar') : res.status(200).send({
        status: 'success',
        message: 'Usuarios encontrados',
        Usuarios: user
    });
});

router.get('/:id', [Authorization, Administrator, Authorize([Role.Admin])], async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    !user ? res.status(404).send('No existe regitro con este ID') : res.status(200).send({
        status: 'success',
        message: 'Usuario encontrado',
        Usuario: user
    });
});

// ----------------------------------------------- MÉTODOS POST -------------------------------------------------------

router.post('/', [Authorization, Administrator, Authorize([Role.Admin])], [
    body('name').isString().isLength({ min: 2, max: 99 }),
    body('lastName').isString().isLength({ min: 2, max: 99 }),
    body('email').isString().isLength({ min: 5, max: 99 }),
    body('isCustomer').isBoolean(),
    body('password').isLength({ min: 3, max: 99 }).isString(),
    body('role').isString().isLength({ min: 3, max: 7 })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    let newEmail = req.body.email;

    let user = await User.findOne({ email: newEmail });

    if (user) {
        return res.status(400).send('El email ya se encuentra registrado en la Base de Datos');
    } else {

        let plainTextPassword = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(plainTextPassword, salt);

        const user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            isCustomer: req.body.isCustomer,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
        });

        await user.save();

        const token = user.generateJWT();

        res.status(201).header('Authorization', token).send({
            status: 'success',
            message: 'Usuario guardado exitosamente',
            Usuario: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                isCustomer: user.isCustomer,
                email: user.email,
                role: user.role
            }
        });
    };
});

// ------------------------------------------------ MÉTODO PUT --------------------------------------------------------

router.put('/:id', [Authorization, Administrator, Authorize([Role.Editor])], [
    body('name').isString().isLength({ min: 2, max: 99 }),
    body('lastName').isString().isLength({ min: 2, max: 99 }),
    body('email').isString().isLength({ min: 5, max: 99 }),
    body('isCustomer').isBoolean()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        name: req.body.name,
        lastName: req.body.lastName,
        isCustomer: req.body.isCustomer,
        email: req.body.email
    }, { new: true });

    if (!user) {
        return res.status(404).send('No se pudo encontrar ningun elemento con este ID');
    } else {
        res.status(200).send({
            status: 'success',
            message: 'Usuario actualizado',
            Usuario: user
        });
    };
});

// ------------------------------------------- MÉTODO DELETE ----------------------------------------------------------

router.delete('/:id', [Authorization, Administrator, Authorize([Role.Editor])], async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    !user ? res.status(404).send('No existe ningun elemento con este ID') :
        res.status(200).send({
            message: 'Usuario eliminado correctamente',
            Usuario: user
        });
});

module.exports = router;