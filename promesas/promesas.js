function getCar(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Se ha obtenido el coche con id ${id} de la Base de Datos`);
            resolve({ id: id, modelo: "A3", marca: "Audi" });
        }, 3000);
    });
};

function getModel(model) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Se obtuvieron los datos de su modelo');
            resolve({ speed: 450, seat: 4, size: '4*5' });
        }, 3000);
    });
};

/*
const promesa = getCar(1);
//promesa.then((result) => console.log(result));

promesa
    .then(result => getModel(result.modelo))
    .then(result => console.log(result))
    .catch(err => console.log(err.message));
*/

async function showModel() {
    try {
        const car = await getCar(2);
        const model = await getModel(car.modelo);
        console.log(model);
    } catch (error) {
        console.log(error);
    };
};

showModel();

// await: espera que la promesa esté resulta para continuar. Funciona en funciones de tipo async.