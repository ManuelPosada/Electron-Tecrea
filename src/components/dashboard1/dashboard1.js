const { protocol, ipcMain } = require("electron");
const { event } = require("jquery");
import  Command  from "../commands.js"


const commands = {
    "time_transmition": "AT+TIME=",
    "keep_alive": "AT+KEEP=",
    "wifi_switch": "AT+WIFI=",
    "always_report_switch": "AT+ALWAYS=",
    "down_link_switch": "AT+DL=",
    "redundant_msn_switch": "AT+REPEAT=",
    "only_send_switch": "AT+ONLYLOC=",
    "gps_switch": "AT+GPS=",
    "analog_input_1": "AT+ADC=1",
    "analog_input_2": "AT+ADC=2",
    "battery_mah": "AT+BATT=",
    "digital_input_options": "AT+DI=",
    "humidity": "AT+HUMI=",
    "temperature": "AT+TEMP=",
    "sigfox_zone": "AT+RCZ=",
    "led_color": "AT+LED=",
    "vibration": "AT+VIB=",
    "tilt_angle": "AT+ANGLE="
}



/* Examples commands
at+axl=enable,mode,low,med,high 
at+axl=enable,mode,xthresholdhigh,xthresholdlow,ythresholdhigh,ythresholdlow
AT+ADC=channel,enable ,max,min
AT+AIRQ=enable,max,min
AT+ALWAYS=enable
at+info?
at+batt?
AT+DI=channel,edge
AT+DL=enable
AT+GPS=enable
at+help?
AT+HT=sel,enable,max,min
at+id?
AT+iddev=dev
at+iddev?
AT+onlyloc=enable
at+pac?
AT+pulsed=npul,cev1,cev2,cev3,cevc
AT+RCZ =zone
at+read?
AT+REPEAT=enable
at+resetf
at+save
AT+TIME=keepalive,hours,minutes,seconds
AT+WIFI=enable

"ADC=%d,%u,%u,%d,%u,%u,TEMP=%d,%u,%u,HUM=%d,%u,%u,AQ=%d,%u,%u,FLAGS=%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,TIME=%d,%d,%d,AXL=%d,%d,%u,%u,%u,%u,%d,%u,%u,%u,COLOR=%d,%d,%d,%d,DI=%d,%d,ID=%s,PAC=%s\r\n"
*/

/**
 *   Analog Input 1
*/
const Analog1spanMax = document.getElementById("Analog1spanMax");
const Analog1RangeMax = document.getElementById("Analog1RangeMax").addEventListener("input", (event) => {
    Analog1spanMax.innerText = event.target.value;
});

const Analog1spanMin = document.getElementById("Analog1spanMin");
const Analog1RangeMin = document.getElementById("Analog1RangeMin").addEventListener("input", (event) => {
    Analog1spanMin.innerText = event.target.value;
});

document.getElementById("AnalogSwitch1").addEventListener("change", (event) => {
    console.log(event.target.value)
    console.log(event.target.checked)
    if (!event.target.checked) {
        document.getElementById("Analog1RangeMax").disabled = true;
        document.getElementById("Analog1RangeMin").disabled = true;
    } else {
        document.getElementById("Analog1RangeMax").disabled = false;
        document.getElementById("Analog1RangeMin").disabled = false;
    }
})

/** 
 * Analog Input 2
*/
const Analog2spanMax = document.getElementById("Analog2spanMax");
const Analog2RangeMax = document.getElementById("Analog2RangeMax").addEventListener("input", (event) => {
    Analog2spanMax.innerText = event.target.value;
});

const Analog2spanMin = document.getElementById("Analog2spanMin");
const Analog2RangeMin = document.getElementById("Analog2RangeMin").addEventListener("input", (event) => {
    Analog2spanMin.innerText = event.target.value;
});

document.getElementById("AnalogSwitch2").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("Analog2RangeMax").disabled = true;
        document.getElementById("Analog2RangeMin").disabled = true;
    } else {
        document.getElementById("Analog2RangeMax").disabled = false;
        document.getElementById("Analog2RangeMin").disabled = false;
    }
})

/**
 *  Battery
*/
const SocSpan = document.getElementById("SocSpan");
const SocRange = document.getElementById("SocRange").addEventListener("input", (event) => {
    SocSpan.innerText = event.target.value;
});

const VolSpan = document.getElementById("VolSpan");
const VolRange = document.getElementById("VolRange").addEventListener("input", (event) => {
    VolSpan.innerText = event.target.value;
});

document.getElementById("BatterySwitch").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("SocRange").disabled = true;
        document.getElementById("VolRange").disabled = true;
    } else {
        document.getElementById("SocRange").disabled = false;
        document.getElementById("VolRange").disabled = false;
    }
})

/**
 *  Digital Inputs Selector
*/
document.getElementById("DISwitch").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("DigitalIn1Select").disabled = true;
        document.getElementById("DigitalIn2Select").disabled = true;
    } else {
        document.getElementById("DigitalIn1Select").disabled = false;
        document.getElementById("DigitalIn2Select").disabled = false;
    }
})

/**
 *  Humidity
*/
const HumidityspanMax = document.getElementById("HumidityspanMax");
const HumidityRangeMax = document.getElementById("HumidityRangeMax").addEventListener("input", (event) => {
    HumidityspanMax.innerText = event.target.value;
});

const HumidityspanMin = document.getElementById("HumidityspanMin");
const HumidityRangeMin = document.getElementById("HumidityRangeMin").addEventListener("input", (event) => {
    HumidityspanMin.innerText = event.target.value;
});

document.getElementById("HumiditySwitch").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("HumidityRangeMax").disabled = true;
        document.getElementById("HumidityRangeMin").disabled = true;
    } else {
        document.getElementById("HumidityRangeMax").disabled = false;
        document.getElementById("HumidityRangeMin").disabled = false;
    }
})

/**
 *  Temperature
*/
const TempspanMax = document.getElementById("TempSpanMax");
const TempRangeMax = document.getElementById("TempRangeMax").addEventListener("input", (event) => {
    TempspanMax.innerText = event.target.value;
});

const TempspanMin = document.getElementById("TempSpanMin");
const TempRangeMin = document.getElementById("TempRangeMin").addEventListener("input", (event) => {
    TempspanMin.innerText = event.target.value;
});

document.getElementById("TempSwitch").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("TempRangeMax").disabled = true;
        document.getElementById("TempRangeMin").disabled = true;
    } else {
        document.getElementById("TempRangeMax").disabled = false;
        document.getElementById("TempRangeMin").disabled = false;
    }
})

/**
 *  Sigfox Zone Selector
*/
document.getElementById("ZoneSwitch").addEventListener("change", (event) => {
    if (!event.target.checked) {
        document.getElementById("ZoneSelect").disabled = true;
    } else {
        document.getElementById("ZoneSelect").disabled = false;
    }
})

/**
 *  Led Color Selector
*/
const ColorSwitch = document.getElementById("ColorSwitch");
const pulsations = document.getElementById("pulsations");
const Color1 = document.getElementById("Color1");
const Color2 = document.getElementById("Color2");
const Color3 = document.getElementById("Color3");
const Cancel = document.getElementById("Cancel");

ColorSwitch.addEventListener("change", (event) => {
    if (!event.target.checked) {
        Color1.disabled = true;
        Color2.disabled = true;
        Color3.disabled = true;
        Cancel.disabled = true
        pulsations.disabled = true;
    } else {
        Color1.disabled = false;
        pulsations.disabled = false;
    }
    if ((pulsations.value == 0) && (event.target.checked === true)) {
        Cancel.disabled = true;
    }
    if ((pulsations.value == 1) && (event.target.checked === true)) {
        Color2.disabled = true;
        Color3.disabled = true;
        Cancel.disabled = false;
    }
    if ((pulsations.value == 2) && (event.target.checked === true)) {
        Color2.disabled = false;
        Color3.disabled = true;
        Cancel.disabled = false;
    }
    if ((pulsations.value == 3) && (event.target.checked === true)) {
        Color2.disabled = false;
        Color3.disabled = false;
        Cancel.disabled = false;
    }
})

pulsations.addEventListener("change", (event) => {
    console.log(event.target.value)
    if (event.target.value == 0) {
        Cancel.disabled = true;
    }
    if (event.target.value == 1) {
        Color2.disabled = true;
        Color3.disabled = true;
        Cancel.disabled = false;
    }
    if (event.target.value == 2) {
        Color2.disabled = false;
        Color3.disabled = true;
        Cancel.disabled = false;
    }
    if (event.target.value == 3) {
        Color2.disabled = false;
        Color3.disabled = false;
        Cancel.disabled = false;
    }
})

Color1.addEventListener("change", (event) => {
    console.log(event.target.value)
    // Color1.style.background
})

/**
 *  commands generator
 *  @param command
 */
const commandGenerator = () => {

    let command = '';
    let arrayCommands = [];
    for (section in json) {
        command = commands[section];
        for (value in json[section]) {
            command += json[section][value] + ',';
        }
        command = command.slice(0, -1) + "\r\n"
        arrayCommands.push(command);
        command = '';
    }
    return arrayCommands;
}

/**
 * Check cards value from forms
 */

let json = {}

// document.getElementById("form-dashboard1").addEventListener("submit", (event) => {
//     event.preventDefault();

//     Array.prototype.forEach.call(event.target.querySelectorAll(".card"), (componente) => {
//         let cardName = componente.querySelector(".card-header").innerText.trim()
//         console.log(cardName);
//         json[cardName] = {};
//         Array.prototype.forEach.call(componente.querySelectorAll("input, select"), (input) => {
//             if (input.type == "checkbox") {
//                 json[cardName][input.name] = Number(input.checked);
//             } else {
//                 json[cardName][input.name] = input.value
//                 console.log(input.value);
//                 console.log(input.getAttribute('group'))
//             }
//         });
//     })
//     console.log(JSON.stringify(json));
//     commandGenerator();
// });

const sendCommands = (commandsList) => {
    commandsList.forEach((command) => {
        port.write(command);
        console.log(port.read());
        // String.fromCharCode(...port.read())
    });
}
const command = new Command();
document.getElementById("form-dashboard1").addEventListener("submit", (event) => {
    event.preventDefault();
    const component = event.target;

    Array.prototype.forEach.call(component.querySelectorAll("input, select"), (input) => {
        if (input.getAttribute('group')) {

            json[input.getAttribute('group')] = { ...json[input.getAttribute('group')] }
            if (input.type == "checkbox") {
                json[input.getAttribute('group')][input.name] = Number(input.checked);
            } else {
                json[input.getAttribute('group')][input.name] = input.value
                console.log(input.value);
            }
        }
    });
    console.log(json);
    console.log(command.setCommand("ADC",{ ...json.analog_input_1, ...json.analog_input_2 }))
    console.log(command.setCommand("ADC",{ ...json.analog_input_1 }))
    // sendCommands(commandGenerator());
})


/*
let formData = []
document.getElementById("form-dashboard1").addEventListener("submit", (event) => {
    event.preventDefault();
    const t = event.target;
    const data = [
        {
            name: 'time_transmition',
            enabled: true,
            command: commands.time_transmition,
            data: {
                hour: t.time_transmition_hour.value,
                minutes: t.time_transmition_minutes.value,
                secods: t.time_transmition_secods.value,
                // time_keep: t.time_transmition_time_kee.value
            }
        },
        {
            name: 'keep_alive',
            enabled: true,
            command: commands.keep_alive,
            data: {
                keep_alive: t.keep_alive_keep_alive.value,
            }
        },
        {
            name: 'reports_enablers',
            enabled: true,
            command: commands.time_transmition,
            data: {
                hour: t.time_transmition_hour.value,
                minutes: t.time_transmition_minutes.value,
                secods: t.time_transmition_secods.value,
                // time_keep: t.time_transmition_time_kee.value
            }
        },

    ]



// });

// const a =
// {
//     "Time Transmition":
//         { "Horas": "0", "Minutos": "0", "Segundos": "0", "keepAlive": "0", "TimeKeep": "" }
//     , "Reports Enablers":
//         { "WiFi": 0, "AlwaysReport": 0, "DownLink": 0, "RedundantMsn": 0, "OnlySend": 0 }
//     , "Analog Input 1": { "enabled": 0, "Analog1RangeMax": "2048", "Analog1RangeMin": "2048" },
//     "Analog Input 2": { "enabled": 0, "Analog2RangeMax": "2048", "Analog2RangeMin": "2048" }, "Battery (%) (mah)": { "Battery": 0, "SocRange": "50", "VolRange": "3400" }, "Digital Input Options": { "DigitalIn": 0, "DigitalIn1Select": "Rising Edge", "DigitalIn2Select": "Rising Edge" }, "Humidity": { "humidity": 0, "HumidityRangeMax": "50", "HumidityRangeMin": "50" }, "Temperature (°C)": { "Temperature": 0, "TempRangeMax": "0", "TempRangeMin": "0" }, "Sigfox Zone": { "SigFoxZone": 0, "ZoneSelect": "RCZ2" }, "LED Color": { "SigFoxZone": 0, "ColorSelect": "0" }, "Vibration": { "Vibration": 0, "VibrationRangeMax": "50", "VibrationRangeMin": "50" }, "Tilt Angle (0°- 360°)": { "Angle": 0, "AngleRangeMax": "90", "AngleRangeMin": "90" }
// }

// // const b = event.target;
// // const a = {
// //     input_analog: {
// //         command:'ac_dt',
// //         data:{
// //             campo1:b.tal.value,
// //             campo2:b.tal2.value,
// //             campo2:b.tal2.value
// //         }
// //     },
// //     keep_alive:{
// //         command:'ac_dt1',
// //         data:{
// //             campo2:"",
// //             campo3:""
// //         }
// //     },

// // }*/