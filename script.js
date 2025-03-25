// Inicializamos un array de objetos para almacenar las IPs por tienda
let ipDatabase = JSON.parse(localStorage.getItem('ipDatabase')) || {
    "F622": [],
    "D423": [],
    "MERCADO": [],
    "I810": [],
    "TULTITLAN": [],
    "TLANEPANTLA": [],
    "D80": [],
    "H56": [],
    "CHALCO": [],
    "ROI TULA": []
};

// Variable para almacenar el índice de la IP que estamos modificando
let editIndex = -1;
let currentStore = "";

// Función para agregar una IP a la base de datos
function addIP() {
    const store = document.getElementById("store").value;
    const ip = document.getElementById("ip").value;
    const ipSource = document.getElementById("ipSource").value;
    const model = document.getElementById("model").value;
    const articleKey = document.getElementById("articleKey").value;

    // Validar que la IP no esté vacía y que se haya seleccionado una tienda
    if (!store || !ip || !ipSource || !model || !articleKey) {
        alert("Por favor, llena todos los campos.");
        return;
    }

    // Validar el formato de la IP
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
        alert("La IP ingresada no tiene un formato válido.");
        return;
    }

    // Si estamos editando una IP, la modificamos
    if (editIndex !== -1) {
        ipDatabase[store][editIndex] = { ip, ipSource, model, articleKey };
        alert("IP modificada correctamente!");
        editIndex = -1;  // Limpiamos el índice de edición
    } else {
        // Si no estamos editando, agregamos una nueva IP
        ipDatabase[store].push({ ip, ipSource, model, articleKey });
        alert("IP agregada correctamente!");
    }

    // Guardar los datos en el almacenamiento local
    localStorage.setItem('ipDatabase', JSON.stringify(ipDatabase));

    // Limpiar el formulario
    clearForm();
    // Actualizar la tabla con las IPs filtradas
    loadIPs();
}

// Función para cargar las IPs según la tienda seleccionada
function loadIPs() {
    const store = document.getElementById("store").value;
    currentStore = store;  // Guardamos la tienda seleccionada
    const tableBody = document.getElementById("ipTable").getElementsByTagName("tbody")[0];
    
    // Limpiar la tabla antes de cargar las nuevas IPs
    tableBody.innerHTML = "";

    let ipList = [];

    // Si se seleccionó "Todas las Tiendas", mostramos todas las IPs
    if (store === "all") {
        for (let store in ipDatabase) {
            ipList = ipList.concat(ipDatabase[store].map(entry => ({ store, ...entry })));
        }
    } else {
        ipList = ipDatabase[store].map(entry => ({ store, ...entry }));
    }

    // Crear las filas de la tabla para mostrar las IPs
    ipList.forEach((entry, index) => {
        const row = tableBody.insertRow();
        const storeCell = row.insertCell(0);
        const ipCell = row.insertCell(1);
        const sourceCell = row.insertCell(2);
        const modelCell = row.insertCell(3);
        const articleCell = row.insertCell(4);
        const actionCell = row.insertCell(5);

        storeCell.textContent = entry.store;
        ipCell.textContent = entry.ip;
        sourceCell.textContent = entry.ipSource;
        modelCell.textContent = entry.model;
        articleCell.textContent = entry.articleKey;

        // Acción para eliminar la IP
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("button-danger");
        deleteButton.onclick = () => confirmDelete(entry.store, entry.ip);
        actionCell.appendChild(deleteButton);

        // Acción para modificar la IP
        const editButton = document.createElement("button");
        editButton.textContent = "Modificar";
        editButton.classList.add("button-edit");
        editButton.onclick = () => editIP(entry.store, index);
        actionCell.appendChild(editButton);
    });
}

// Función para confirmar la eliminación de una IP
function confirmDelete(store, ip) {
    if (confirm("¿Estás seguro de que deseas eliminar esta IP?")) {
        deleteIP(store, ip);
    }
}

// Función para eliminar una IP
function deleteIP(store, ip) {
    const index = ipDatabase[store].findIndex(entry => entry.ip === ip);
    if (index !== -1) {
        ipDatabase[store].splice(index, 1);
        alert("IP eliminada correctamente!");
        localStorage.setItem('ipDatabase', JSON.stringify(ipDatabase));
        loadIPs();
    }
}

// Función para editar una IP
function editIP(store, index) {
    const ipEntry = ipDatabase[store][index];
    document.getElementById("store").value = store;
    document.getElementById("ip").value = ipEntry.ip;
    document.getElementById("ipSource").value = ipEntry.ipSource;
    document.getElementById("model").value = ipEntry.model;
    document.getElementById("articleKey").value = ipEntry.articleKey;
    editIndex = index;  // Guardamos el índice de la IP a editar
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById("ip").value = "";
    document.getElementById("model").value = "";
    document.getElementById("articleKey").value = "";
    document.getElementById("store").value = "all";  // Restablecer la tienda a "Todas"
    document.getElementById("ipSource").value = "CAJA";  // Restablecer origen a "CAJA"
    loadIPs();  // Actualizar la tabla
}

// Cargar las IPs automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', loadIPs);
