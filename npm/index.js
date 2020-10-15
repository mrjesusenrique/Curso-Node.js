const day = new Date(2021, 02, 01);
const today = new Date(2021, 03, 01);
const d3 = require('d3-time');

const miliseconds = 24 * 60 * 60 * 1000;

let resultado = (today - day) / miliseconds;
console.log(resultado);

resultado = d3.timeDay.count(day, today);
console.log(resultado);