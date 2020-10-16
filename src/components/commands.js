class Command {

    constructor(){
        this.prefix = "AT"
    }

    
    setCommand = (command, params = {}, buffer=0) => {
        let command_string = `${this.prefix}+${command}=`;
        for( let param in params) {
            command_string += params[param] + ',';
        }
        command_string = command_string.slice(0, -1) + "\r\n"
        return command_string;
    }
    
    getADC = (cadena) => {
        const adc = cadena.split('ADC=')[1].split('TEMP')[0].split(',');
        return { analog_input1: {
                enabled:adc[0],
                Analog1RangeMax:adc[1],
                Analog1RangeMin:adc[2]
            },
            analog_input2:{
                enabled:adc[3],
                Analog1RangeMax:adc[4],
                Analog1RangeMin:adc[5]
            }
        }
    }
    
    getTemperature = () => {
        const temp = cadena.split('TEMP=')[1].split('HUM')[0].split(',');
        return { temperature: {
                enabled:temp[0],
                TempRangeMax:temp[1],
                TempRangeMin:temp[2]
            }
        }
    }
    getHumidity = () => {
        const temp = cadena.split('HUM=')[1].split('AQ')[0].split(',');
        return { humidity: {
                enabled:temp[0],
                HumidityRangeMax:temp[1],
                HumidityRangeMin:temp[2]
            }
        }
    }
    getHumidity = () => {
        const temp = cadena.split('HUM=')[1].split('AQ')[0].split(',');
        return { humidity: {
                enabled:temp[0],
                HumidityRangeMax:temp[1],
                HumidityRangeMin:temp[2]
            }
        }
    }
    getAQ = () => {
        const AQ = cadena.split('HUM=')[1].split('AQ')[0].split(',');
    }
    getFlags = () => {
        const flags = cadena.split('FLAGS=')[1].split('TIME')[0].split(',');
    }
    getTime = () => {
        const time = cadena.split('TIME=')[1].split('AXL')[0].split(',');
        return { time_transmition: {
                Horas:temp[0],
                Minutos:temp[1],
                Segundos:temp[2]
            }
        }
    }
    getAXL = () => {
        const axl = cadena.split('AXL=')[1].split('COLOR')[0].split(',');
    }

    getColor = () => {
        const color = cadena.split('COLOR=')[1].split('DI')[0].split(',');
    }
    getDI = () => {
        const di = cadena.split('DI=')[1].split('IP')[0].split(',');
    }
    getIP = () => {
        const di = cadena.split('DI=')[1].split('PAC')[0].split(',');
    }
    getPAC = () => {
        const pac = cadena.split('PAC=')[1].split(',');
    }
}
export default Command; 

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