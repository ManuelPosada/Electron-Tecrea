const path = require('path')

async function fetchHtmlAsText(url) {
    const pathFile = path.join('file://', __dirname, `components/${url}.html`)
    return (await fetch(pathFile)).text();
}

const loadCSS = (componenet) => {
    const styleSheet = document.createElement("link");
    styleSheet.rel="stylesheet";
    styleSheet.href = `components/${componenet}.css`;
    document.querySelector("head").appendChild(styleSheet);
}

const loadJs = (componenet) => {
    const script = document.createElement("script");
    script.type ="module";
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
loadHtml("dashboardx/disconnect");

const showTemaple = (component) => {
    const sections = document.querySelector('.section.is-shown')  
    if(sections) sections.classList.remove("is-shown");
    document.getElementById(`componenet-${component}-id`).classList.add("is-shown")
}
