'use strict'

const mongoose = require('mongoose');
const { companySchema } = require('./company');

const carSchema = new mongoose.Schema({

    company: {
        type: companySchema,
        required: true
    },

    model: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 99
    },

    sold: {
        type: Boolean,
        required: true
    },

    price: {
        type: Number,
        required: function () {
            return this.sold;
        }
    },

    year: {
        type: Number,
        requited: true,
        min: 2000,
        max: 2030
    },

    extras: {
        type: [String]
    },

    data: {
        type: Date,
        default: Date.now
    }
});

const Car = mongoose.model('car', carSchema);

module.exports = Car;

