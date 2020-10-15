const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id: 1, modelo: "Optra", marca: "Chevrolet" });
        //reject(new Error('Se ha producido un error al conectar con la BD'));
    }, 3000);
});

promesa
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));
