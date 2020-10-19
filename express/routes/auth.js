'use strict'

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', [
    body('email').isString().isLength({ min: 5, max: 99 }),
    body('password').isString().isLength({ min: 3, max: 99 })
], async (req, res) => {

    const errors = validationResult(req);
    !errors.isEmpty() && res.status(422).json({ errors: errors.array() });

    const inputEmail = req.body.email;

    let user = await User.findOne({ email: inputEmail });
    !user && res.status(400).send('El usuario o contraseña es incorrecto');

    const inputPassword = req.body.password;

    const validPassword = await bcrypt.compare(inputPassword, user.password);
    !validPassword && res.status(400).send('El usuario o contraseña es incorrecto');

    const token = user.generateJWT();

    res.status(200).header('Authorization', token).send({
        status: 'success',
        message: 'Login correcto ',
    });
});

module.exports = router;