'use strict'

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 99,
        uppercase: true
    },

    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 99
    },

    yearFoundation: {
        type: Number,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.model('company', companySchema);

module.exports.Company = Company;
module.exports.companySchema = companySchema;