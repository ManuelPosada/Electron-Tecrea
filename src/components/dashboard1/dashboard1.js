// let slider = document.getElementById("range1").value
// console.log(`valor slider 1 ${slider}`)

let manuel = 78
let prueba = 12314




// function myFunction() {
//     let name = document.getElementById("range1").value;
//     document.getElementById("namespan").textContent=name;
// }

const namespan1 = document.getElementById("namespan1");
const range1 =  document.getElementById("range1").addEventListener("input",(event) => {
    namespan1.innerText = event.target.value;
});


const namespan2 = document.getElementById("namespan2");
const range2 =  document.getElementById("range2").addEventListener("input",(event) => {
    namespan2.innerText = event.target.value;
});


document.getElementById("customSwitch1").addEventListener("change",(event) => {
    if( !event.target.checked ){
        document.getElementById("range1").disabled = true;
        document.getElementById("range2").disabled = true;
    }else{
        document.getElementById("range1").disabled = false;
        document.getElementById("range2").disabled = false;
    }
})



document.getElementById("form-dashboard1").addEventListener("submit",(event) => {
    console.log(event.target);
});
