const { ipcRenderer } = require('electron')
const SerialPort = require('serialport')

const connectButton = document.getElementById("connect-button");
let port = null;

connectButton.addEventListener('click', (event) => {

    SerialPort.list().then((resultSerialPort) => {
        const serialPortlList = resultSerialPort;
        serialPortlList.forEach((device) => {
            if (device.vendorId === "0403") {
                device_connected = device;
                showTemaple("dashboard1/dashboard1");
                openPort(device.path); 
                connectButton.innerText = "Disconnect"
                
            } else if (device.vendorId === "067B") {
                device_connected = device;
                showTemaple("dashboard2/dashboard2");
                openPort(device.path);
            }else {
                //Plantilla no encontro nigun boton
                showTemaple("dashboard1/dashboard1");
            }
        })
        if(serialPortlList.length<=0){
            showTemaple("dashboard2/dashboard2");
        }
    })
});

const openPort = (path) => {
    console.log(path)
    port = new SerialPort(path, { 
            autoOpen: false,
            baudRate: 115200,
            dataBits:8,
            stopBits:1,
            parity:'none',
         })
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }
    port.write('main screen turn on');
    

    })
    // The open event is always emitted
    port.on('open', function () {
        console.log(port.isOpen)
        if(port.isOpen){
            document.getElementById("device_connected").setAttribute("value", device_connected.path);
        }else{
            
        }
    })
    port.on('readable', function () {
        console.log('Data1:', String.fromCharCode(...port.read()))
      })

      
      // Switches the port into "flowing mode"
      port.on('data', function (data) {
        console.log('Data2:', data)
      })
}