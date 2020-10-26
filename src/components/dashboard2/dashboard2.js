import { Command } from '../commands.js'
import * as time from '../utilities.js'

/**
 * Time and keep alive
 */
const d2_horasField = document.getElementById('d2_Horas');
const d2_minutField = document.getElementById('d2_Minutos');
const d2_seconField = document.getElementById('d2_Segundos');
const d2_keepAField = document.getElementById('d2_keepAlive');
const d2_keepToTime = document.getElementById('d2_TimeKeep'); 

d2_horasField.addEventListener('input', (event) => {
    let seconds;
    seconds = time.timetoSeconds(Number(event.target.value), Number(d2_minutField.value), Number(d2_seconField.value));
    d2_keepToTime.value = time.secondstoDate(seconds*(Number(d2_keepAField.value)));
});

d2_minutField.addEventListener('input', (event) => {
    let seconds;
    seconds = time.timetoSeconds(Number(d2_horasField.value), Number(event.target.value), Number(d2_seconField.value));
    d2_keepToTime.value = time.secondstoDate(seconds*(Number(d2_keepAField.value)));
});

d2_seconField.addEventListener('input', (event) => {
    let seconds;
    seconds = time.timetoSeconds(Number(d2_horasField.value), Number(d2_minutField.value), Number(event.target.value));
    d2_keepToTime.value = time.secondstoDate(seconds*(Number(d2_keepAField.value)));
});

d2_keepAField.addEventListener('input', (event) => {
    let seconds;
    seconds = time.timetoSeconds(Number(d2_horasField.value), Number(d2_minutField.value), Number(d2_seconField.value));
    d2_keepToTime.value = time.secondstoDate(seconds*(Number(event.target.value)));
});

d2_keepAField.addEventListener('change', (event) => {
    let seconds;
    seconds = time.timetoSeconds(Number(d2_horasField.value), Number(d2_minutField.value), Number(d2_seconField.value));
    d2_keepToTime.value = time.secondstoDate(seconds*(Number(event.target.value)));
});