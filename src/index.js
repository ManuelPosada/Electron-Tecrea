const { ipcRenderer } = require('electron')
const electron = require('electron')
const path = require('path')
const SerialPort = require('serialport')

async function fetchHtmlAsText(url) {
    const pathFile = path.join('file://', __dirname, `components/${url}.html`)
    return await (await fetch(pathFile)).text();
}

const loadCSS = (componenet) => {
    const styleSheet = document.createElement("link");
    styleSheet.rel="stylesheet";
    styleSheet.href = `components/${componenet}.css`;
    document.querySelector("head").appendChild(styleSheet);
}

const loadJs = (componenet) => {
    const script = document.createElement("script");
    script.type ="text/javascript";
    script.src = `components/${componenet}.js`;
    document.querySelector("body").appendChild(script);
}

async function loadHtml(htmlFile) {
    loadCSS(htmlFile);
    const div = document.createElement("div");
    div.innerHTML =  await fetchHtmlAsText(htmlFile);
    div.classList.add("section");
    div.setAttribute("id",`componenet-${htmlFile}-id`)
    document.querySelector('.content').append(div);
    document.querySelector('.js-content').classList.add('is-shown'); 
    loadJs(htmlFile);  
}

loadHtml("dashboard1/dashboard1");
loadHtml("dashboard2/dashboard2");

const showTemaple = (component) => {
    const sections = document.querySelector('.section.is-shown')  
    if(sections) {
        sections.classList.remove("is-shown");
    }
    document.getElementById(`componenet-${component}-id`).classList.add("is-shown")
}

ipcRenderer.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})

let device_connected = {};
const connectButton = document.getElementById("connect-button");
connectButton.addEventListener('click', function (event) {

    SerialPort.list().then((resultSerialPort) => {
        const serialPortlList = resultSerialPort;
        serialPortlList.forEach((device) => {
            if (device.vendorId === "0403") {
                device_connected = device;
                showTemaple("dashboard1/dashboard1");
                openPort(device.path); 
            } else if (device.vendorId === "067B") {
                device_connected = device;
                showTemaple("dashboard1/dashboard2");
                openPort(device.path);
            }else {
                //Plantilla no encontro nigun boton
                showTemaple("dashboard2/dashboard1");
            }
        })
        if(serialPortlList.length<=0){
            showTemaple("dashboard1/dashboard1");
        }
    })
});

const openPort = (path) => {
    const port = new SerialPort(path, { 
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
        port.write('main screen turn on')
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
        console.log('Data:', String.fromCharCode(...port.read()))
      })
      
      // Switches the port into "flowing mode"
      port.on('data', function (data) {
        console.log('Data:', data)
      })
}