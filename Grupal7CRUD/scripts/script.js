const inputbuscar = document.getElementById("inputGet1Id");
const botonBuscar = document.getElementById("btnGet1");
const results = document.getElementById("results");
let APIURL = "https://636ac7e5b10125b78fe4a931.mockapi.io/";
const agregar = document.getElementById("btnPost");
const inputNombre = document.getElementById("inputPostNombre");
const inputApellido = document.getElementById("inputPostApellido");

fetch(APIURL + "/users").then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    mostrar(data);
});
function mostrar(data) {
    botonBuscar.addEventListener("click", () => {
        for (person of data) {
            if (inputbuscar.value == person.id) {
                results.innerHTML = `<p> name: ${person.name}<br>
                lastname: ${person.lastname}<br> 
                id: ${person.id}</p> `;
            } if (inputbuscar.value == "") {
                results.innerHTML += `<p> name: ${person.name}<br>
                lastname: ${person.lastname}<br> 
                id: ${person.id}</p> `;
            }
        }
    }
    )
}
//enviar datos al servidor
agregar.addEventListener("click", () => {
    fetch(APIURL + "/users", {
        method: "POST",
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify({name: inputNombre.value, lastname:inputApellido.value})
    })
    .then(response => response.json())
    .then(dataResponse=>console.log(dataResponse))
    .catch(error=>alert("ocurrióo un error"))
})