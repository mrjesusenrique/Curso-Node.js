const promesa1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Obteniendo Datos de FB');
        resolve({ amigos: 200, likes: 400 });
    }, 1000);
});

const promesa2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Obteniendo Datos de TW');
        resolve({ seguidores: 250, likes: 300 });
    }, 4000);
});

// Ejecutar promesas distintas que van a API's distintas en paralelo

Promise.all([promesa1, promesa2])
    .then(result => console.log(result))
    .catch(error => console.log(error.message));


// Enviar solo datos de la primera promesa que acaba

/*
Promise.race([promesa1, promesa2])
    .then(result => console.log(result))
    .catch(error => console.log(error.message));
*/