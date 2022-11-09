const inputbuscar = document.getElementById("inputGet1Id");
const botonBuscar = document.getElementById("btnGet1");
const results = document.getElementById("results");
let APIURL = "https://636ac7e5b10125b78fe4a931.mockapi.io/";
const agregar = document.getElementById("btnPost");
const inputNombre = document.getElementById("inputPostNombre");
const inputApellido = document.getElementById("inputPostApellido");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const modificar = document.getElementById("btnPut");
const inputPutId = document.getElementById("inputPutId");

fetch(APIURL + "/users").then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    mostrar(data);
});

    modificar.addEventListener("click", ()=>{
        fetch(APIURL + "/users/" + inputPutId.value, {
            method: "PUT",
            headers: {"Content-Type": "aplication/json"},
            body: JSON.stringify({id: inputPutId.value})
        })
        .then(response => response.json())
        .then(dataResponse=>console.log(dataResponse))
        .catch(error=>alert("ocurrióo un error"))
    })
    
function mostrar(data) {
    botonBuscar.addEventListener("click", () => {
        results.innerHTML = ``;
        for (person of data) {
            if (inputbuscar.value == "") {
                results.innerHTML += `<p> name: ${person.name}<br>
                lastname: ${person.lastname}<br> 
                id: ${person.id}</p> `;
            }if (inputbuscar.value == person.id) {
                results.innerHTML = `<p> name: ${person.name}<br>
                lastname: ${person.lastname}<br> 
                id: ${person.id}</p> `;
            } 
        }
    }
    )
}
//enviar datos al servidor
agregar.addEventListener("click", () => {
    console.log(inputNombre.value);
    fetch(APIURL + "/users", {
        method: "POST",
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify({name: `${inputNombre.value}`, lastname: `${inputApellido.value}`})
    })
    .then(response => response.json())
    .then(dataResponse=>console.log(dataResponse))
    .catch(error=>alert("ocurrióo un error"))
})

