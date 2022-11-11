const inputbuscar = document.getElementById("inputGet1Id");
const botonBuscar = document.getElementById("btnGet1");
const results = document.getElementById("results");
let APIURL = "https://636ac7e5b10125b78fe4a931.mockapi.io/";
const btnAgregar = document.getElementById("btnPost");
const inputNombre = document.getElementById("inputPostNombre");
const inputApellido = document.getElementById("inputPostApellido");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnModificar = document.getElementById("btnPut");
const inputPutId = document.getElementById("inputPutId");
const btnSendChanges = document.getElementById("btnSendChanges");
const btnEliminar = document.getElementById("btnDelete");
const inputDelete = document.getElementById("inputDelete");
const errorAlert = document.getElementById("alert-error");
const modalHTML = document.getElementById("modalHTML");

//BUSCA DATOS EN EL SERVIDOR
botonBuscar.addEventListener("click", () => {
    mostrarListado();
});

function mostrarListado() {
    fetch(APIURL + "/users").then(function (response) {
        return response.json();
        debugger;
    }).then(function (data) {
        results.innerHTML = "";
        for (person of data) {
            if (inputbuscar.value == "") {
                results.innerHTML += `<p> name: ${person.name}<br>
            lastname: ${person.lastname}<br> 
            id: ${person.id}</p> `;
            } if (inputbuscar.value == person.id) {
                results.innerHTML = `<p> name: ${person.name}<br>
            lastname: ${person.lastname}<br> 
            id: ${person.id}</p> `;
            }
        }
    })
};

//AGREGA DATOS AL SERVIDOR
btnAgregar.addEventListener("click", () => {
    fetch(APIURL + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": inputNombre.value, "lastname": inputApellido.value })
    })
        .then(response => response.json())
        .then(dataResponse => mostrarListado())
        .catch(error => alert("ocurrióo un error"))
    inputApellido.value = "";
    inputNombre.value = "";
    habilitado();
}
);



//MODIFICA DATOS EN SERVIDOR
// btnModificar.addEventListener("click", () => {
//     fetch(APIURL + "/users/" + inputPutId.value, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },

//     })
//         .then(response => response.json())
//         .then(dataResponse => {
//             inputPutNombre.value = dataResponse.name;
//             inputPutApellido.value = dataResponse.lastname;
//             btnSendChanges.addEventListener("click", () => {
//                 fetch(APIURL + "/users/" + inputPutId.value, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ id: inputPutId.value, name: inputPutNombre.value, lastname: inputPutApellido.value })
//                 })
//                 mostrarListado();
//             })
//         })
//         .catch(error => alert("ocurrióo un error"))
//         inputPutId.value = "";
//         habilitado();
// });



btnModificar.addEventListener("click", () => {
    fetch(APIURL + "/users/" + inputPutId.value, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    })
        .then(response => response.json())
        .then(dataResponse => {
            inputPutNombre.value = dataResponse.name;
            inputPutApellido.value = dataResponse.lastname;
            btnSendChanges.addEventListener("click", () => {
                fetch(APIURL + "/users/" + inputPutId.value, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: inputPutId.value, name: inputPutNombre.value, lastname: inputPutApellido.value })
                })
                    .then(response => response.json())
                    .then(dataResponse => {
                        mostrarListado()
                        inputPutId.value = ""; // estas lineas estaban debajo del catch
                        habilitado();
                    } )
            })
        })
        .catch(error => alert("ocurrióo un error"));
});






// ELIMINA REGISTRO DEL SERVIDOR
btnEliminar.addEventListener("click", () => {
    var raw = "";
    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch(APIURL + "/users/" + inputDelete.value, requestOptions)
        .then((response) => {
            if (!response.ok) {
                errorAlert.classList.add("show");
                setTimeout(() => { errorAlert.classList.remove("show") }, 3000);
            }
            mostrarListado()
        })
        .catch(error => console.log('error', error));
    inputDelete.value = "";
    habilitado();

});

function habilitado() {

    inputNombre.value || inputApellido.value ? btnAgregar.disabled = false : btnAgregar.disabled = true;
    inputPutId.value ? btnModificar.disabled = false : btnModificar.disabled = true;
    inputDelete.value ? btnEliminar.disabled = false : btnEliminar.disabled = true;
}