const mongoose = require('mongoose');
const { createSecurePair } = require('tls');

mongoose.connect('mongodb://localhost/carsdb2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('La conexión a la Base de Datos se ha realizado exitosamente'))
    .catch(() => console.log('Ha ocurrido un error al conectar con la Base de Datos'));

const carSchema = new mongoose.Schema({

    company: {
        type: String,
        required: true,
        //lowercase: true,
        uppercase: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
        enum: ['BMW', 'AUDI', 'FIAT']
    },

    model: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },

    sold: Boolean,

    price: {
        type: Number,
        trim: true,
        required: function () {
            return this.sold
        }
    },

    year: {
        type: Number,
        min: 2000,
        max: 2030,
        get: y => Math.round(y)
    },

    extras: [String],

    date: {
        type: Date,
        default: Date.now
    }
});

const Car = mongoose.model('carsCollection2', carSchema);

createCar();

async function createCar() {
    const car = new Car({
        company: 'AUDI',
        model: "X3",
        sold: false,
        price: 4999,
        year: 2027,
        extras: ['Aire Acondicionado', 'Descapotable']
    });

    try {
        const resultado = await car.save();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    };
};