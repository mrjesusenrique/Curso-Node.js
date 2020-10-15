const http = require('http');
const { report } = require('process');
/*
const server = http.createServer();

server.on('connection', (socket) => {
    console.log('nueva conexión detectada');
});

server.listen(2012);
console.log('Servidor escuchando en el puerto 2012...');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hola Mundo desde Node.js');
        res.end();
    };

    if (req.url === '/coches') {
        res.write('Coche 1');
        res.end();
    };
});

server.listen(3030);
console.log('Servidor escuchando en puerto 3030...');

*/

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Contect-Type': 'Text/html' });
    res.write('<h1>Hola a todos</h1>');
    res.write('<p>Bienvenidos a mi Web</p>');
    res.end();
}).listen(5050);

console.log('Servidor lanzado en el puerto 5050...');