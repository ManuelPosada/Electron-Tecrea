export class Command {

    constructor() {
        this.prefix = 'AT';
        this.bufferCommands = [];
    }

    setBufferCommand = (command, buffer) => {
        if (buffer) this.bufferCommands.push(command);
    }

    getBufferedCommands = () => {
        return this.bufferCommands;
    }
  
    clearBufferCommand = ( ) => {
        this.bufferCommands = [];
    }

    getReadCommand = () => {
        return 'at+read?\r\n';
    }

    getIdSigfoxCommand = () => {
        return 'at+id?\r\n';
    }

    getPacSigfoxCommand = () => {
        return 'at+pac?\r\n';
    }

    getIdDeviceCommand = () => {
        return 'at+iddev?\r\n';
    }


    setCommand = (command, params = {}, buffer = false) => {
        let command_string = `${this.prefix}+${command}=`;
        for (let param in params) {
            command_string += params[param] + ',';
        }
        command_string = command_string.slice(0, -1) + "\r\n"
        this.setBufferCommand(command_string, buffer);
        return command_string;
    }

    getADC = (cadena) => {
        const adc = cadena.split('ADC=')[1].split('TEMP')[0].split(',');
        return {
            analog_input1: {
                AnalogSwitch1: adc[0],
                Analog1RangeMax: adc[1],
                Analog1RangeMin: adc[2]
            },
            analog_input2: {
                AnalogSwitch2: adc[3],
                Analog2RangeMax: adc[4],
                Analog2RangeMin: adc[5]
            }
        }
    }

    getTemperature = (cadena) => {
        const temp = cadena.split('TEMP=')[1].split('HUM')[0].split(',');
        return {
            temperature: {
                TempSwitch: temp[0],
                TempRangeMax: temp[1],
                TempRangeMin: temp[2]
            }
        }
    }
    getHumidity = (cadena) => {
        const humi = cadena.split('HUM=')[1].split('AQ')[0].split(',');
        return { humidity: {
                HumiditySwitch: humi[0],
                HumidityRangeMax: humi[1],
                HumidityRangeMin: humi[2]
            }
        }
    }
    getAQ = (cadena) => {
        const AQ = cadena.split('AQ=')[1].split('FLAGS')[0].split(',');
        return {
            air_quality: {
                enalbed: AQ[0],
                AQRangeMax: AQ[1],
                AQRangeMin: AQ[2],
            }
        }
    };
    getFlags = (cadena) => {
        const flags = cadena.split('FLAGS=')[1].split('TIME')[0].split(',');
        return {
            flags: {
                SocRange: flags[0],
                VolRange: flags[1],
                gpsSwitch: flags[2],
                WiFiSwitch: flags[3],
                AlwaysReportSwitch: flags[4],
                RedundantMsnSwitch: flags[5],
                DownLinkSwitch: flags[6],
                keepAlive: flags[7],
                pulsations: flags[8],
                OnlySendSwitch: flags[9],
                // idDivice: flags[10],
                // DoCtrl: flags[11],
                // ZoneSelect: flags[12]
            }
        }

    }
    getTime = (cadena) => {
        const time = cadena.split('TIME=')[1].split('AXL')[0].split(',');
        return {
            time_transmition: {
                Horas: time[0],
                Minutos: time[1],
                Segundos: time[2]
            }
        }
    }
    getAXL = (cadena) => {
        const axl = cadena.split('AXL=')[1].split('COLOR')[0].split(',');
        return {
            time_axl: {
                AngleSwitch: axl[0],
                VibrationSwitch: axl[1],
                AngleRangeX_Max: axl[2],
                AngleRangeX_Min: axl[3],
                AngleRangeY_Max: axl[4],
                AngleRangeY_Min: axl[4]
            }
        }
    }

    getColor = (cadena) => {
        const color = cadena.split('COLOR=')[1].split('DI')[0].split(',');
        return {
            led_color: {
                Color1: color[0],
                Color2: color[1],
                Color3: color[2],
                Cancel: color[3]
            }
        }
    }
    getDI = (cadena) => {
        const di = cadena.split('DI=')[1].split('ID')[0].split(',');
        return {
            digital_input_options: {
                DigitalIn1Select: di[0],
                DigitalIn2Select: di[1]
            }
        }
    }
    getIP = (cadena) => {
        const IP = cadena.split('DI=')[1].split('PAC')[0].split(',');
        return {
            module: {
                id_module: IP[0],
            }
        }
    }
    getPAC = (cadena) => {
        const pac = cadena.split('PAC=')[1].split(',');
        return {
            module: {
                pac_nodule: pac[0],
            }
        }
    }
}


/*
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
}*/