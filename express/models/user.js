'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 99
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 99
    },

    isCustomer: {
        type: Boolean,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;