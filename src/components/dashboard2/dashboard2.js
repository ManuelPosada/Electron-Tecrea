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

 /**
  * Analog input 1 varables and events
  */
const d2_AnalogSwitch1 = document.getElementById('d2_AnalogSwitch1');
const d2_Analog1RangeMax = document.getElementById('d2_Analog1RangeMax');
const d2_Analog1RangeMin = document.getElementById('d2_Analog1RangeMin');
const d2_Analog1spanMax = document.getElementById('d2_Analog1spanMax');
const d2_Analog1spanMin = document.getElementById('d2_Analog1spanMin');

d2_Analog1RangeMax.addEventListener('input', (event) => {
    d2_Analog1spanMax.innerText = event.target.value;
});

d2_Analog1RangeMin.addEventListener('input', (event) => {
    d2_Analog1spanMin.innerText = event.target.value;
});

d2_AnalogSwitch1.addEventListener('change', (event) => {
    if (!event.target.checked) {
        d2_Analog1RangeMax.disabled = true;
        d2_Analog1RangeMin.disabled = true;
        d2_Analog1spanMin.style.backgroundColor = '#6c757d';
        d2_Analog1spanMax.style.backgroundColor = '#6c757d';
    } else {
        d2_Analog1RangeMax.disabled = false;
        d2_Analog1RangeMin.disabled = false;
        d2_Analog1spanMin.style.backgroundColor = '#007bff';
        d2_Analog1spanMax.style.backgroundColor = '#007bff';
    }
});

 /**
  * Analog input 2 varables and events
  */
const d2_AnalogSwitch2 = document.getElementById('d2_AnalogSwitch2');
const d2_Analog2RangeMax = document.getElementById('d2_Analog2RangeMax');
const d2_Analog2RangeMin = document.getElementById('d2_Analog2RangeMin');
const d2_Analog2spanMax = document.getElementById('d2_Analog2spanMax');
const d2_Analog2spanMin = document.getElementById('d2_Analog2spanMin');

d2_Analog2RangeMax.addEventListener('input', (event) => {
    d2_Analog2spanMax.innerText = event.target.value;
});

d2_Analog2RangeMin.addEventListener('input', (event) => {
    d2_Analog2spanMin.innerText = event.target.value;
});

d2_AnalogSwitch2.addEventListener('change', (event) => {
    if (!event.target.checked) {
        d2_Analog2RangeMax.disabled = true;
        d2_Analog2RangeMin.disabled = true;
        d2_Analog2spanMin.style.backgroundColor = '#6c757d';
        d2_Analog2spanMax.style.backgroundColor = '#6c757d';
    } else {
        d2_Analog2RangeMax.disabled = false;
        d2_Analog2RangeMin.disabled = false;
        d2_Analog2spanMin.style.backgroundColor = '#007bff';
        d2_Analog2spanMax.style.backgroundColor = '#007bff';
    }
});

/**
 *  Battery
*/
const d2_SocSpan = document.getElementById("d2_SocSpan");
const d2_SocRange = document.getElementById("d2_SocRange");

d2_SocRange.addEventListener("input", (event) => {
    d2_SocSpan.innerText = event.target.value;
});

const d2_VolSpan = document.getElementById("d2_VolSpan");
const d2_VolRange = document.getElementById("d2_VolRange");

d2_VolRange.addEventListener("input", (event) => {
    d2_VolSpan.innerText = event.target.value;
});

/**
 * Air Quality
 */
const d2_QualitySwitch = document.getElementById('d2_QualitySwitch');
const d2_QualityRangeMax = document.getElementById('d2_QualityRangeMax');
const d2_QualityRangeMin = document.getElementById('d2_QualityRangeMin');
const d2_QualityspanMax = document.getElementById('d2_QualityspanMax');
const d2_QualityspanMin = document.getElementById('d2_QualityspanMin');

d2_QualityRangeMax.addEventListener('input', (event) => {
    d2_QualityspanMax.innerText = event.target.value;
});

d2_QualityRangeMin.addEventListener('input', (event) => {
    d2_QualityspanMin.innerText = event.target.value;
});

d2_QualitySwitch.addEventListener('change', (event) => {
    if (!event.target.checked) {
        d2_QualityRangeMax.disabled = true;
        d2_QualityRangeMin.disabled = true;
        d2_QualityspanMin.style.backgroundColor = '#6c757d';
        d2_QualityspanMax.style.backgroundColor = '#6c757d';
    } else {
        d2_QualityRangeMax.disabled = false;
        d2_QualityRangeMin.disabled = false;
        d2_QualityspanMin.style.backgroundColor = '#007bff';
        d2_QualityspanMax.style.backgroundColor = '#007bff';
    }
});