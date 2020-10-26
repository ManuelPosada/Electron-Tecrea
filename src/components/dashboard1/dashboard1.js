const { protocol, ipcMain } = require("electron");
import { Command } from "../commands.js"

function timetoSeconds (horas, minutos, segundos) {
    return (horas*3600)+(minutos*60)+segundos;
}

function secondstoDate(timeOnSeconds) {
    let dais, hours, minutes, seconds;

    if(timeOnSeconds >= 84600) dais = Math.floor(timeOnSeconds/86400); else dais = 0;
    if(timeOnSeconds >= 3600 ) hours = Math.floor((timeOnSeconds-(dais*86400))/3600); else hours = 0;
    if(timeOnSeconds >= 60) minutes = Math.floor(((timeOnSeconds-((dais*86400)+(hours*3600)))/60)); else minutes = 0;
    seconds = timeOnSeconds - ((dais*86400)+(hours*3600)+(minutes*60));

    return dais + ':' + hours+ ':' + minutes + ':' + seconds;
}

/**
 * Time and keep alive
 */
const horasField = document.getElementById('Horas');
const minutField = document.getElementById('Minutos');
const seconField = document.getElementById('Segundos');
const keepAField = document.getElementById('keepAlive');
const keepToTime = document.getElementById('TimeKeep'); 

horasField.addEventListener('input', (event) => {
    let seconds;
    seconds = timetoSeconds(Number(event.target.value), Number(minutField.value), Number(seconField.value));
    keepToTime.value = secondstoDate(seconds*(Number(keepAField.value)));
});

minutField.addEventListener('input', (event) => {
    let seconds;
    seconds = timetoSeconds(Number(horasField.value), Number(event.target.value), Number(seconField.value));
    keepToTime.value = secondstoDate(seconds*(Number(keepAField.value)));
});

seconField.addEventListener('input', (event) => {
    let seconds;
    seconds = timetoSeconds(Number(horasField.value), Number(minutField.value), Number(event.target.value));
    keepToTime.value = secondstoDate(seconds*(Number(keepAField.value)));
});

keepAField.addEventListener('input', (event) => {
    let seconds;
    seconds = timetoSeconds(Number(horasField.value), Number(minutField.value), Number(seconField.value));
    keepToTime.value = secondstoDate(seconds*(Number(event.target.value)));
});

keepAField.addEventListener('change', (event) => {
    let seconds;
    seconds = timetoSeconds(Number(horasField.value), Number(minutField.value), Number(seconField.value));
    keepToTime.value = secondstoDate(seconds*(Number(event.target.value)));
});

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
        Analog1spanMin.style.backgroundColor = '#6c757d'
        Analog1spanMax.style.backgroundColor = '#6c757d'
    } else {
        document.getElementById("Analog1RangeMax").disabled = false;
        document.getElementById("Analog1RangeMin").disabled = false;
        Analog1spanMin.style.backgroundColor = '#007bff'
        Analog1spanMax.style.backgroundColor = '#007bff'
    }
});

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
        Analog2spanMin.style.backgroundColor = '#6c757d'
        Analog2spanMax.style.backgroundColor = '#6c757d'
    } else {
        document.getElementById("Analog2RangeMax").disabled = false;
        document.getElementById("Analog2RangeMin").disabled = false;
        Analog2spanMin.style.backgroundColor = '#007bff'
        Analog2spanMax.style.backgroundColor = '#007bff'
    }
});

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
        HumidityspanMin.style.backgroundColor = '#6c757d';
        HumidityspanMax.style.backgroundColor = '#6c757d';
    } else {
        document.getElementById("HumidityRangeMax").disabled = false;
        document.getElementById("HumidityRangeMin").disabled = false;
        HumidityspanMin.style.backgroundColor = '#007bff';
        HumidityspanMax.style.backgroundColor = '#007bff';
    }
});

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
        TempspanMin.style.backgroundColor = '#6c757d';
        TempspanMax.style.backgroundColor = '#6c757d';
    } else {
        document.getElementById("TempRangeMax").disabled = false;
        document.getElementById("TempRangeMin").disabled = false;
        TempspanMin.style.backgroundColor = '#007bff';
        TempspanMax.style.backgroundColor = '#007bff';
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
    if (event.target.value === '0') {
        Cancel.disabled = true;  Cancel.style.backgroundColor = '#e2e4e6'; Cancel.value = '0';
    }
    if (event.target.value === '1') {
        Color2.disabled = true;  Color2.style.backgroundColor = '#e2e4e6'; Color2.value = '0'; 
        Color3.disabled = true;  Color3.style.backgroundColor = '#e2e4e6'; Color3.value = '0';
        Cancel.disabled = false; Cancel.style.backgroundColor = '#ff00ff'; Cancel.value = '5';
    }
    if (event.target.value === '2') {
        Color2.disabled = false; Color2.style.backgroundColor = '#00ffff'; Color2.value = '3';
        Color3.disabled = true;  Color3.style.backgroundColor = '#e2e4e6'; Color3.value = '0';
        Cancel.disabled = false; Cancel.style.backgroundColor = '#ff00ff'; Cancel.value = '5';
    }
    if (event.target.value === '3') {
        Color2.disabled = false; Color2.style.backgroundColor = '#00ffff'; Color2.value = '3'; 
        Color3.disabled = false; Color3.style.backgroundColor = '#ff0000'; Color3.value = '4';
        Cancel.disabled = false; Cancel.style.backgroundColor = '#ff00ff'; Cancel.value = '5';
    }
})

Color1.addEventListener("change", (event) => {
    if(event.target.value === '0') event.target.style.backgroundColor =  '#000000';
    if(event.target.value === '1') event.target.style.backgroundColor =  '#0000ff';
    if(event.target.value === '2') event.target.style.backgroundColor =  '#00ff00';
    if(event.target.value === '3') event.target.style.backgroundColor =  '#00ffff';
    if(event.target.value === '4') event.target.style.backgroundColor =  '#ff0000';
    if(event.target.value === '5') event.target.style.backgroundColor =  '#ff00ff';
    if(event.target.value === '6') event.target.style.backgroundColor =  '#ffff00';
    if(event.target.value === '7') event.target.style.backgroundColor =  '#ffffff';
});

Color2.addEventListener("change", (event) => {
    if(event.target.value === '0') event.target.style.backgroundColor =  '#000000';
    if(event.target.value === '1') event.target.style.backgroundColor =  '#0000ff';
    if(event.target.value === '2') event.target.style.backgroundColor =  '#00ff00';
    if(event.target.value === '3') event.target.style.backgroundColor =  '#00ffff';
    if(event.target.value === '4') event.target.style.backgroundColor =  '#ff0000';
    if(event.target.value === '5') event.target.style.backgroundColor =  '#ff00ff';
    if(event.target.value === '6') event.target.style.backgroundColor =  '#ffff00';
    if(event.target.value === '7') event.target.style.backgroundColor =  '#ffffff';
});

Color3.addEventListener("change", (event) => {
    if(event.target.value === '0') event.target.style.backgroundColor =  '#000000';
    if(event.target.value === '1') event.target.style.backgroundColor =  '#0000ff';
    if(event.target.value === '2') event.target.style.backgroundColor =  '#00ff00';
    if(event.target.value === '3') event.target.style.backgroundColor =  '#00ffff';
    if(event.target.value === '4') event.target.style.backgroundColor =  '#ff0000';
    if(event.target.value === '5') event.target.style.backgroundColor =  '#ff00ff';
    if(event.target.value === '6') event.target.style.backgroundColor =  '#ffff00';
    if(event.target.value === '7') event.target.style.backgroundColor =  '#ffffff';
})

Cancel.addEventListener("change", (event) => {
    if(event.target.value === '0') event.target.style.backgroundColor =  '#000000';
    if(event.target.value === '1') event.target.style.backgroundColor =  '#0000ff';
    if(event.target.value === '2') event.target.style.backgroundColor =  '#00ff00';
    if(event.target.value === '3') event.target.style.backgroundColor =  '#00ffff';
    if(event.target.value === '4') event.target.style.backgroundColor =  '#ff0000';
    if(event.target.value === '5') event.target.style.backgroundColor =  '#ff00ff';
    if(event.target.value === '6') event.target.style.backgroundColor =  '#ffff00';
    if(event.target.value === '7') event.target.style.backgroundColor =  '#ffffff';
})


/**
 * Vibration variables
 */
const VibrationSwitch = document.getElementById('VibrationSwitch');
const VibrationRangeMax = document.getElementById('VibrationRangeMax');
const VibrationRangeMed = document.getElementById('VibrationRangeMed');
const VibrationRangeMin = document.getElementById('VibrationRangeMin');

const VibrationSpanMax = document.getElementById('VibrationSpanMax');
const VibrationSpanMed = document.getElementById('VibrationSpanMed');
const VibrationSpanMin = document.getElementById('VibrationSpanMin');

VibrationRangeMax.addEventListener('input', (event) => {
    VibrationSpanMax.innerText = event.target.value;
});
VibrationRangeMed.addEventListener('input', (event) => {
    VibrationSpanMed.innerText = event.target.value;
});
VibrationRangeMin.addEventListener('input', (event) => {
    VibrationSpanMin.innerText = event.target.value;
});

VibrationSwitch.addEventListener('change', (event) => {
    if (!event.target.checked) {
        VibrationRangeMax.disabled = true;  VibrationSpanMax.style.backgroundColor = '#6c757d'
        VibrationRangeMed.disabled = true;  VibrationSpanMed.style.backgroundColor = '#6c757d'
        VibrationRangeMin.disabled = true;  VibrationSpanMin.style.backgroundColor = '#6c757d'

    } else {
        VibrationRangeMax.disabled = false; VibrationSpanMax.style.backgroundColor = '#007bff'
        VibrationRangeMed.disabled = false; VibrationSpanMed.style.backgroundColor = '#007bff'
        VibrationRangeMin.disabled = false; VibrationSpanMin.style.backgroundColor = '#007bff'
    }
});

/** 
 * Angle variables
*/
const AngleSwitch = document.getElementById('AngleSwitch');
const AngleRangeX_Max = document.getElementById('AngleRangeX-Max');
const AngleRangeX_Min = document.getElementById('AngleRangeX-Min');
const AngleRangeY_Max = document.getElementById('AngleRangeY-Max');
const AngleRangeY_Min = document.getElementById('AngleRangeY-Min');

const AngleSpanX_Max = document.getElementById('AngleSpanX-Max');
const AngleSpanX_Min = document.getElementById('AngleSpanX-Min');
const AngleSpanY_Max = document.getElementById('AngleSpanY-Max');
const AngleSpanY_Min = document.getElementById('AngleSpanY-Min');

AngleRangeX_Max.addEventListener('input', (event) => {
    AngleSpanX_Max.innerText = event.target.value;
})

AngleRangeX_Min.addEventListener('input', (event) => {
    AngleSpanX_Min.innerText = event.target.value;
})

AngleRangeY_Max.addEventListener('input', (event) => {
    AngleSpanY_Max.innerText = event.target.value;
})

AngleRangeY_Min.addEventListener('input', (event) => {
    AngleSpanY_Min.innerText = event.target.value;
})

AngleSwitch.addEventListener('change', (event) => {
    if (!event.target.checked) {
        AngleRangeX_Max.disabled = true; AngleSpanX_Max.style.backgroundColor = '#6c757d';
        AngleRangeX_Min.disabled = true; AngleSpanX_Min.style.backgroundColor = '#6c757d';
        AngleRangeY_Max.disabled = true; AngleSpanY_Max.style.backgroundColor = '#6c757d';
        AngleRangeY_Min.disabled = true; AngleSpanY_Min.style.backgroundColor = '#6c757d';

    } else {
        AngleRangeX_Max.disabled = false; AngleSpanX_Max.style.backgroundColor = '#007bff';                                                            
        AngleRangeX_Min.disabled = false; AngleSpanX_Min.style.backgroundColor = '#007bff';
        AngleRangeY_Max.disabled = false; AngleSpanY_Max.style.backgroundColor = '#007bff';
        AngleRangeY_Min.disabled = false; AngleSpanY_Min.style.backgroundColor = '#007bff';
    }
});


let json = {}

const progressBar = document.getElementById('progress_Bar');


/**
 * @param {*} commandsList 
 */
async function sendCommands (commandsList) {

    let progresAdd = 0;
    progressBar.style.backgroundColor = '#007bff'
    progressBar.style.width = '0%'
    await sleep(200);

    for (const command in commandsList) {
        console.log('Comamdo:', commandsList[command])
        serialPort.write(commandsList[command]);
        await sleep(500);
        BUFFER.pop();
        progresAdd += 5;
        console.log(progresAdd + '%');
        progressBar.style.width = progresAdd + '%';
    }
    await sleep(500);
    progressBar.style.backgroundColor = 'rgb(35 185 35)';
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
                // console.log(input.value);
            }
        }
    });
    console.log(json);
    console.log(command.setCommand('READ', {value: 1}, true));
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
    console.log(command.setCommand('DI', { Input1: 1, ...json.digital_input_1}, true));
    console.log(command.setCommand('DI', { Input2: 2, ...json.digital_input_2}, true));
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
        setDataToHTML(command.getTemperature(response))
        setDataToHTML(command.getTime(response));
        setDataToHTML(command.getFlags(response));
        setDataToHTML(command.getADC(response));
        setDataToHTML(command.getDI(response));
        setDataToHTML(command.getColor(response));
    },500)
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


const WiFiSwitch = document.getElementById('WiFiSwitch')
const gpsSwitch = document.getElementById('gpsSwitch')

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
                WiFiSwitch.disabled = false;
                gpsSwitch.disabled = true;
                break;
            case '1':
                operation_Mode.value = 'GPS'
                WiFiSwitch.disabled = true;
                gpsSwitch.disabled = false;
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
