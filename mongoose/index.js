const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/carsdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('La conexión a la Base de Datos se ha realizado exitosamente'))
    .catch(() => console.log('Ha ocurrido un error al conectar con la Base de Datos'));

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    price: Number,
    year: Number,
    sold: Boolean,
    extras: [String],
    data: { type: Date, default: Date.now }
});

const Car = mongoose.model('carCollection', carSchema); // Esta es mi Clase principal

deleteCar('5f8477cc619de3181ce1dfea');

async function deleteCar(id) {
    const result = await Car.deleteOne({ _id: id });
    console.log(result);
};

//updateFirtsCar('5f84709dc04213165cbf2aea');

async function updateFirtsCar(id) {
    const result = await Car.update(
        { _id: id },
        { $set: { company: "Chevrolet", model: "Captiva" } }
    );

    console.log(result);
};

//updateCar('5f84806d1ac91e19287aed39');

async function updateCar(id) {
    const car = await Car.findById(id);

    if (!car) {
        console.log(`El Auto con el id: ${id} no existe en la Base de Datos`);
    } else {
        car.company = "Mercedes Benz";
        car.model = "Clase A";
    };

    const resultado = await car.save();
    console.log("Los datos del auto se han actualizado correctamente");
    console.log(resultado);
};

//getPaginationCars();

async function getPaginationCars() {
    const pageNumber = 3;
    const pageSize = 2;

    const cars = await Car
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

    console.log(cars);
};

//getCountCars();

async function getCountCars() {
    const cars = await Car.find({ company: "Audi" }).countDocuments();
    console.log(cars);
};

//getCarsByAndOr();

async function getCarsByAndOr() {
    const cars = await Car
        .find()
        //.and([{ company: "BMW" }, { model: "A10" }]);
        .or([{ company: "Audi" }, { model: "A9" }]);

    console.log(cars);
};

//getCarsByStrings();

async function getCarsByStrings() {
    const cars = await Car
        .find({ extras: { $in: "Synchronous" } });

    console.log(cars);
};

//getCarsByPrice();

async function getCarsByPrice() {
    const cars = await Car
        .find({ price: { $gte: 4000, $lt: 7000 } })
        .sort({ price: -1 })
        .select({ company: 1, model: 1, year: 1, price: 1 })

    console.log(cars);
};

//getCarsByMoreFilters();

async function getCarsByMoreFilters() {
    const cars = await Car
        .find({ company: "BMW", sold: false })
        .sort({ price: -1 })
        .limit(4)
        .select({ company: 1, model: 1, price: 1, year: 1 });

    console.log(cars);
};

//getCompanyAndSoldFilterCars();

async function getCompanyAndSoldFilterCars() {
    const cars = await Car.find({ company: "Audi", sold: false });
    console.log(cars);
};

//getCars();

async function getCars() {
    const cars = await Car.find();
    console.log(cars);
};

//createCar();

async function createCar() {
    const car = new Car({
        company: "BMW",
        model: "A11",
        price: 9599,
        year: 2021,
        sold: false,
        extras: ["Synchronous", "4*4", "Descapotable"]
    });

    const result = await car.save();
    console.log("Coche guardado correctamente en la Base de Datos");
    console.log(result);
};