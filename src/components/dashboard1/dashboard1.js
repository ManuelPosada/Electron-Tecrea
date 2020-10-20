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
 *  Led Color Selector
*/
const pulsations = document.getElementById("pulsations");
const Color1 = document.getElementById("Color1");
const Color2 = document.getElementById("Color2");
const Color3 = document.getElementById("Color3");
const Cancel = document.getElementById("Cancel");

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

let json = {}

/**
 * 
 * @param {*} commandsList 
 */
async function sendCommands (commandsList) {
    for (const command in commandsList) {
        console.log('Comamdo:', commandsList[command])
        serialPort.write(commandsList[command]);
        await sleep(500)
        BUFFER.pop();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    console.log(command.setCommand('HT', { hum: 1, ...json.humidity }, true));
    console.log(command.setCommand('HT', { tem: 2, ...json.temperature }, true));
    console.log(command.setCommand('RCZ', json.sigfox_zone, true));
    console.log(command.setCommand('PULSED', json.led_color, true));
    console.log(command.setCommand('AXL', { vibr: 1, ...json.vibration }, true));
    console.log(command.setCommand('AXL', { Angu: 2, ...json.tilt_angle }, true));
    console.log(command.setCommand('SAVE', {}, true));
    sendCommands(command.getBufferedCommands());
    command.clearBufferCommand();
});

/**
 * @brief Event Read From Devive Button
 */
document.getElementById('read_from_device').addEventListener('click', () => {
    serialPort.write(command.getReadCommand());
    setTimeout(() => {
        console.log(BUFFER)
        if (BUFFER.length > 1) BUFFER.pop()
        const response = BUFFER.pop();
        console.log(response);
        setDataToHTML(command.getHumidity(response));
        setDataToHTML(command.getTime(response));
        setDataToHTML(command.getFlags(response));
        setDataToHTML(command.getADC(response));
        setDataToHTML(command.getColor(response));
    },2000)
});

const setDataToHTML = (data) => {
    for (const paramsJson in data) {
        if (data.hasOwnProperty(paramsJson)) {
            let params = data[paramsJson];
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    const htmlElement = document.getElementById(param);
                    if (htmlElement.type == 'checkbox') {
                        htmlElement.checked = Boolean(Number(params[param]));
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


const get_Mode_btn = document.getElementById('get_Mode_btn');
const get_id_btn = document.getElementById('get_ID_btn');
const get_Pac_btn = document.getElementById('get_Pac_btn');

const operation_Mode = document.getElementById('operation_Mode')
const sigfox_ID = document.getElementById('sigfox_ID')
const sigfox_Pac = document.getElementById('sigfox_Pac')

get_Mode_btn.addEventListener('click', (event) => {

    serialPort.write(command.getIdDeviceCommand())
    setTimeout(function () {
        console.log(BUFFER)
        if (BUFFER.length > 1) BUFFER.pop()
        const response = BUFFER.pop();
        console.log(response);

        switch (response) {
            case '0':
                operation_Mode.value = 'Wi-Fi'
                break;
            case '1':
                operation_Mode.value = 'GPS'
                break;
        }
    }, 200)
})

get_id_btn.addEventListener('click', (event) => {
    serialPort.write(command.getIdSigfoxCommand())
    setTimeout(function () {
        console.log(BUFFER)
        if (BUFFER.length > 1) BUFFER.pop()
        const response = BUFFER.pop();
        console.log(response);
        sigfox_ID.value = response
    }, 200)
})

get_Pac_btn.addEventListener('click', (event) => {
    serialPort.write(command.getPacSigfoxCommand())

    setTimeout(function () {
        console.log(BUFFER)
        if (BUFFER.length > 1) BUFFER.pop()
        const response = BUFFER.pop();
        console.log(response);
        sigfox_Pac.value = response
    }, 200)
})
