const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');

let BUFFER = [];              /** Incoming data buffer */             
let serialPort = null;        /** Serial Port object */
let Parser = null;            /** Parser Object*/ 

const VENDOR_ID_ST = '0483'   /** VendorId STMicroelctronics */
const VENDOR_ID_FT = '0403'   /** VendorId FTDI32 */

const CONECT_STATE = 'Connect'
const DISCONNECT_STATE = 'Disconnect'

portConfigurations = {
    autoOpen: false,
    baudRate: 115200,
    dataBits:8,
    stopBits:1,
    parity:'none'
}

const connectButton = document.getElementById("connect-button");

function changeStatusConnectButton() {
    if (connectButton.innerText == CONECT_STATE) connectButton.innerText = DISCONNECT_STATE;
    else if (connectButton.innerText == DISCONNECT_STATE) connectButton.innerText = CONECT_STATE;
}

connectButton.addEventListener("click", (event) => {

    if (connectButton.innerText === CONECT_STATE) {
        console.log("Dispositivo Conectado")

        SerialPort.list().then((deviceList) => {
            deviceList.forEach((Device) => {
                if (Device.vendorId === VENDOR_ID_ST) {
                    showTemaple("dashboard1/dashboard1");
                    openPort(Device.path);
                }
                else if ( Device.vendorId === VENDOR_ID_FT) {
                    showTemaple("dashboard2/dashboard2");
                    openPort(Device.path);
                }
            })
            if(deviceList.length <= 0 ) {
                showTemaple("dashboard2/dashboard2");
            }
        })
    }

    if (connectButton.innerText === DISCONNECT_STATE) {
        console.log("Dispositivo Deconectado")
        
        if (serialPort.isOpen ) {
            serialPort.close(function (error) {
                if (error) console.log(error.message)
            })
        }
    }
})

const openPort = (path) => {

    serialPort = new SerialPort(path, portConfigurations )
    Parser = new ReadLine({ delimiter: '\r\n' })

    serialPort.pipe(Parser)

    serialPort.open(function (error) {
        if (error) { return console.log('Error:', error.message) }
    })

    // The open event is always emitted
    serialPort.on('open', function () {
        if(serialPort.isOpen) {
            document.getElementById("device_connected").setAttribute("value", path);
            console.log('Port Open')
            changeStatusConnectButton()
        }else { }
    })
    
    // Port closing event
    serialPort.on('close', function () {
        console.log('Port Close')
        changeStatusConnectButton()
    })

    // Incoming data parser event
    Parser.on('data', function (data) {
        BUFFER.push(data)
        console.log('data:', data)
    })

    // Error event
    serialPort.on('error', function (error) {
        console.log('Error', error.message)
    })
};



    // serialPort.on('readable', function (Data) {
    //     BUFFER.push(String.fromCharCode(...serialPort.read()))
    //     // console.log('Data:', String.fromCharCode(...serialPort.read()));
    //     // console.log('Data:', serialPort.read());
    // })
    
    // serialPort.on('data', function (data) {
    //     console.log('Data2:', data)
    //     BUFFER.push(data)
    // })