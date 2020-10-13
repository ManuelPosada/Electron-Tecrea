const { protocol } = require("electron");


const commands = { 
    "Time Transmition": 'AT+TIME=',
    "Reports Enablers": 'Re',
    "Analog Input 1": 'An',
    "Analog Input 2": 'An',
    "Battery (%) (mah)": 'Ba',
    "Digital Input Options": 'Di',
    "Humidity": 'Hu',
    "Temperature (°C)": 'Te',
    "Sigfox Zone": 'Si',
    "LED Color": 'LE',
    "Vibration": 'Vi',
    "Tilt Angle (0°- 360°)": 'Ti'
}

/**
 *   Analog Input 1
*/
const Analog1spanMax = document.getElementById("Analog1spanMax");
const Analog1RangeMax =  document.getElementById("Analog1RangeMax").addEventListener("input", (event) => {
    Analog1spanMax.innerText = event.target.value;
});

const Analog1spanMin = document.getElementById("Analog1spanMin");
const Analog1RangeMin =  document.getElementById("Analog1RangeMin").addEventListener("input", (event) => {
    Analog1spanMin.innerText = event.target.value;
});

document.getElementById("AnalogSwitch1").addEventListener("change", (event) => {
    console.log(event.target.value)
    console.log(event.target.checked)
    if( !event.target.checked ){
        document.getElementById("Analog1RangeMax").disabled = true;
        document.getElementById("Analog1RangeMin").disabled = true;
    }else{
        document.getElementById("Analog1RangeMax").disabled = false;
        document.getElementById("Analog1RangeMin").disabled = false;
    }
})

/** 
 * Analog Input 2
*/
const Analog2spanMax = document.getElementById("Analog2spanMax");
const Analog2RangeMax =  document.getElementById("Analog2RangeMax").addEventListener("input", (event) => {
    Analog2spanMax.innerText = event.target.value;
});

const Analog2spanMin = document.getElementById("Analog2spanMin");
const Analog2RangeMin =  document.getElementById("Analog2RangeMin").addEventListener("input", (event) => {
    Analog2spanMin.innerText = event.target.value;
});

document.getElementById("AnalogSwitch2").addEventListener("change",(event) => {
    if( !event.target.checked ) {
        document.getElementById("Analog2RangeMax").disabled = true;
        document.getElementById("Analog2RangeMin").disabled = true;
    }else{
        document.getElementById("Analog2RangeMax").disabled = false;
        document.getElementById("Analog2RangeMin").disabled = false;
    }
})

/**
 *  Battery
*/
const SocSpan = document.getElementById("SocSpan");
const SocRange =  document.getElementById("SocRange").addEventListener("input", (event) => {
    SocSpan.innerText = event.target.value;
});

const VolSpan = document.getElementById("VolSpan");
const VolRange =  document.getElementById("VolRange").addEventListener("input", (event) => {
    VolSpan.innerText = event.target.value;
});

document.getElementById("BatterySwitch").addEventListener("change", (event) => {
    if( !event.target.checked ) {
        document.getElementById("SocRange").disabled = true;
        document.getElementById("VolRange").disabled = true;
    }else{
        document.getElementById("SocRange").disabled = false;
        document.getElementById("VolRange").disabled = false;
    }
})

/**
 *  Digital Inputs Selector
*/
document.getElementById("DISwitch").addEventListener("change", (event) => {
    if( !event.target.checked ) {
        document.getElementById("DigitalIn1Select").disabled = true;
        document.getElementById("DigitalIn2Select").disabled = true;
    }else{
        document.getElementById("DigitalIn1Select").disabled = false;
        document.getElementById("DigitalIn2Select").disabled = false;
    }
})

/**
 *  Humidity
*/
const HumidityspanMax = document.getElementById("HumidityspanMax");
const HumidityRangeMax =  document.getElementById("HumidityRangeMax").addEventListener("input", (event) => {
    HumidityspanMax.innerText = event.target.value;
});

const HumidityspanMin = document.getElementById("HumidityspanMin");
const HumidityRangeMin =  document.getElementById("HumidityRangeMin").addEventListener("input", (event) => {
    HumidityspanMin.innerText = event.target.value;
});

document.getElementById("HumiditySwitch").addEventListener("change", (event) => {
    if( !event.target.checked ){
        document.getElementById("HumidityRangeMax").disabled = true;
        document.getElementById("HumidityRangeMin").disabled = true;
    }else{
        document.getElementById("HumidityRangeMax").disabled = false;
        document.getElementById("HumidityRangeMin").disabled = false;
    }
})

/**
 *  Temperature
*/
const TempspanMax = document.getElementById("TempSpanMax");
const TempRangeMax =  document.getElementById("TempRangeMax").addEventListener("input", (event) => {
    TempspanMax.innerText = event.target.value;
});

const TempspanMin = document.getElementById("TempSpanMin");
const TempRangeMin =  document.getElementById("TempRangeMin").addEventListener("input", (event) => {
    TempspanMin.innerText = event.target.value;
});

document.getElementById("TempSwitch").addEventListener("change", (event) => {
    if( !event.target.checked ){
        document.getElementById("TempRangeMax").disabled = true;
        document.getElementById("TempRangeMin").disabled = true;
    }else{
        document.getElementById("TempRangeMax").disabled = false;
        document.getElementById("TempRangeMin").disabled = false;
    }
})

/**
 *  Sigfox Zone Selector
*/
document.getElementById("ZoneSwitch").addEventListener("change", (event) => {
    if( !event.target.checked ) {
        document.getElementById("ZoneSelect").disabled = true;
    }else{
        document.getElementById("ZoneSelect").disabled = false;
    }
})

/**
 *  Led Color Selector
*/

document.getElementById("ColorSwitch").addEventListener("change", (event) => {
    if( !event.target.checked ) {
        document.getElementById("ColorSelect").disabled = true;
    }else{
        document.getElementById("ColorSelect").disabled = false;
    }
})



/**
 *  commands generator
 *  @param command
 */
const commandGenerator = () => { 

    let command = '';
    let arrayCommands = [];
    for (section in json){ 
        command = commands[section];
        for( value in json[section] ) {
            command += json[section][value] + ',';
        }
        command = command.slice(0,-1)
        arrayCommands.push(command);
        command = '';
    }
    console.log(arrayCommands);
}

/**
 * Check cards value from forms
 */

let json = {}
 
document.getElementById("form-dashboard1").addEventListener("submit", (event) => {
    event.preventDefault();    
    
    Array.prototype.forEach.call(event.target.querySelectorAll(".card"),(componente) => {
        let cardName = componente.querySelector(".card-header").innerText.trim()
        console.log(cardName);
        json[cardName] = {};
        Array.prototype.forEach.call(componente.querySelectorAll("input, select"),(input ) =>{
            if(input.type == "checkbox"){
                json[cardName][input.name] = Number(input.checked);
            }else{
                json[cardName][input.name] = input.value
                console.log(input.value);
            }
        });
    })
    console.log(json);
    commandGenerator();
});

openPort





