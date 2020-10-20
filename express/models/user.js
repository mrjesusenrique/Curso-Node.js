'use strict'

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    isAdmin: {
        type: Boolean
    },

    role: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        lastName: this.lastName,
        isAdmin: this.isAdmin,
        role: this.role
    }, process.env.SECRET_KEY_APP_API);
};

const User = mongoose.model('user', userSchema);

module.exports = User;