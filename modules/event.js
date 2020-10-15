const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', function () {
    console.log('Ha ocurrido un evento!!');
});

emitter.emit('event');

emitter.on('eventWithArguments', function (arg) {
    console.log(`Un evento con los siguientes argumentos ha ocurrido: ${arg.id}, ${arg.numero}`);
});

emitter.emit('eventWithArguments', {
    id: 23,
    numero: 1122514722
});

emitter.on('eventArrow', (arg) => {
    console.log(`Un evento de función flecha con los siguientes argumentos ha ocurrido: ${arg.nombre}, ${arg.apellido}`);
});

emitter.emit('eventArrow', {
    nombre: 'Jesús',
    apellido: 'Casañas'
});