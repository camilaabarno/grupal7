const APIURL = "https://636ac7e5b10125b78fe4a931.mockapi.io/";
const inputBuscar = document.getElementById("inputGet1Id");
const botonBuscar = document.getElementById("btnGet1");
const resultsDiv = document.getElementById("resultsDiv");
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
const dataModal = document.getElementById("dataModal");

//BUSCA DATOS EN EL SERVIDOR
botonBuscar.addEventListener("click", () => {
    mostrarListado();
});

function mostrarListado() {
    fetch(APIURL + "/users").then(function (response) {
        return response.json();
    }).then(function (data) {
        resultsDiv.innerHTML = "";

        let newElem = data.find(elem => elem.id == inputBuscar.value);

        if (newElem != undefined) {
            resultsDiv.innerHTML = `<p> name: ${newElem.name}<br>
            lastname: ${newElem.lastname}<br> 
            id: ${newElem.id}</p> `;
        } else if (inputBuscar.value.length == 0) {
            for (person of data) {
                resultsDiv.innerHTML += `<p> name: ${person.name}<br>
                lastname: ${person.lastname}<br> 
                id: ${person.id}</p> `;
            }
        } else {
            errorAlert.classList.add("show");
            setTimeout(() => { errorAlert.classList.remove("show") }, 3000);
        }

        inputBuscar.value = "";

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
    inputHabilitado();
}
);

// MODIFICA DATOS DEL SERVIDOR
btnModificar.addEventListener("click", () => {
    fetch(APIURL + "/users/" + inputPutId.value, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(obj => {
            if (obj.status == 200) {
                $('#dataModal').modal('show');
                inputPutNombre.value = obj.body.name;
                inputPutApellido.value = obj.body.lastname;
                btnSendChanges.addEventListener("click", () => {
                    editPut();
                })
            } else {
                errorAlert.classList.add("show");
                setTimeout(() => { errorAlert.classList.remove("show") }, 3000);
                inputPutId.value = "";
                inputHabilitado();
            }
        });

});


function editPut() {
    fetch(APIURL + "/users/" + inputPutId.value, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inputPutId.value, name: inputPutNombre.value, lastname: inputPutApellido.value })
    })
        .then(res => res.json())
        .then(res => {
            mostrarListado()
            inputPutId.value = "";
            inputHabilitado();
        })
}

function cancelModify(){
    inputPutId.value = "";
    inputHabilitado();
}


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
    inputHabilitado();
});

// FUNCION PARA HABILITAR/DESHABILITAR INPUTS
function inputHabilitado() {

    inputNombre.value || inputApellido.value ? btnAgregar.disabled = false : btnAgregar.disabled = true;
    inputPutId.value ? btnModificar.disabled = false : btnModificar.disabled = true;
    inputDelete.value ? btnEliminar.disabled = false : btnEliminar.disabled = true;
}