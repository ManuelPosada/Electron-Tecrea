const { protocol, ipcMain } = require("electron");
import { Command } from "../commands.js"

/**
 *   Analog Input 1
*/


const formDashboard1 = document.getElementById("form-dashboard1");

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

const sendCommands = (commandsList) => {
    commandsList.forEach((command) => {
        port.write(command);
        console.log(port.read());
        // String.fromCharCode(...port.read())
    });
}
const command = new Command();
formDashboard1.addEventListener("submit", (event) => {
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
    console.log(command.setCommand('TIME', { ...json.keep_alive, ...json.time_transmition }, true));
    console.log(command.setCommand('WIFI', json.wifi_switch, true));
    console.log(command.setCommand('ALWAYS', json.always_report_switch, true));
    console.log(command.setCommand('DL', json.down_link_switch, true));
    console.log(command.setCommand('REPEAT', json.redundant_msn_switch, true));
    console.log(command.setCommand('ONLYLOC', json.only_send_switch, true));
    console.log(command.setCommand('GPS', json.gps_switch, true));
    console.log(command.setCommand('ADC', { channel: 1, ...json.analog_input_1 }, true));
    console.log(command.setCommand('ADC', { channel: 2, ...json.analog_input_2 }, true));
    console.log(command.setCommand('BATT', json.battery_mah, true));
    console.log(command.setCommand('DI', json.digital_input_options, true));
    console.log(command.setCommand('HUMI', json.humidity, true));
    console.log(command.setCommand('TEMP', json.temperature, true));
    console.log(command.setCommand('RCZ', json.sigfox_zone, true));
    console.log(command.setCommand('LED', json.led_color, true));
    console.log(command.setCommand('VIB', json.vibration, true));
    console.log(command.setCommand('ANGLE', json.tilt_angle, true));
    sendCommands(command.getBufferedCommands());
});


document.getElementById("read_from_device").addEventListener("click",() => {
    const dataRed = "ADC=12,0,0,0,0,0,TEMP=0,0,0,HUM=0,0,0,AQ=0,0,0,FLAGS=0,0,0,0,0,0,0,0,0,0,0,0,TIME=0,0,0,AXL=0,0,0,0,0,0,0,0,0,0,COLOR=0,0,0,0,DI=0,0,ID=003FD23F    ,PAC=1F6C175DC8BFAEE6"
    port.write(command.getReadCommand());
    setTimeout(() => {
        const response = BUFFER.pop();
        console.log(response);
        // setDataToHTML(command.getHumidity(response));
        setDataToHTML(command.getTime(response));
    },5000)
    
});


const setDataToHTML = (data) => {
    for (const paramsJson in data) {
        if (data.hasOwnProperty(paramsJson)) {
            let params = data[paramsJson];
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    const htmlElement = document.getElementById(param);
                    if (htmlElement.type == 'checkbox') {
                        htmlElement.checked = Boolean(params[param]);
                        htmlElement.dispatchEvent( new Event("change"));
                    } else if(htmlElement.type == 'range') {
                        htmlElement.value = params[param];
                        htmlElement.dispatchEvent( new Event("input"));
                    }else  {
                        htmlElement.value = params[param];
                        htmlElement.dispatchEvent( new Event("change"));
                    }
                }
            }
        }
    }
}


