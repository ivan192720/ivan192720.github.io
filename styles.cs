/* Estilo general */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #EAEAEA;  /* Fondo gris suave */
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

/* Contenedor principal */
.container {
    width: 90%;
    max-width: 900px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Título principal */
h1 {
    color: #FF5733;  /* Naranja vibrante */
    font-size: 2.8em;
    margin-bottom: 30px;
    font-weight: bold;
}

/* Estilo de los campos del formulario */
.form-group {
    margin-bottom: 40px;
}

label {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 10px;
    display: block;
    text-align: left;
}

input[type="text"], select {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #F1F1F1;  /* Fondo gris claro */
    margin-top: 10px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

input[type="text"]:focus, select:focus {
    border-color: #FF5733;  /* Color de borde naranja brillante */
    outline: none;
    background-color: #FFF8F2;  /* Fondo más claro al enfocar */
}

/* Botones */
button {
    padding: 15px 25px;
    font-size: 1.1em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

.button {
    background-color: #FF5733;  /* Naranja brillante */
    color: white;
}

.button-secondary {
    background-color: #34B6B4;  /* Turquesa suave */
    color: white;
    border: 1px solid #ddd;
}

.button-danger {
    background-color: #F44336;  /* Rojo vibrante */
    color: white;
}

.button-edit {
    background-color: #FFC107;  /* Amarillo cálido */
    color: white;
}

/* Estilo para las listas horizontales */
ul {
    display: flex;  /* Activamos el modelo de flexbox */
    flex-wrap: wrap;  /* Asegura que los elementos se envuelvan si no caben */
    justify-content: center;  /* Centra los elementos horizontalmente */
    padding: 0;
    list-style-type: none;
    margin-bottom: 30px;
}

ul li {
    margin: 10px 20px;
    padding: 10px;
    background-color: #FF5733;  /* Naranja brillante */
    color: white;
    font-size: 1.1em;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

ul li:hover {
    background-color: #C0392B;  /* Naranja más oscuro al pasar el cursor */
}

/* Tabla */
table {
    width: 100%;
    margin-top: 30px;
    border-collapse: collapse;
    margin-bottom: 40px;
}

th, td {
    padding: 20px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 1.1em;
}

th {
    background-color: #34B6B4;  /* Turquesa suave */
    color: white;
}

td {
    background-color: #F9F9F9;
}

td button {
    margin-right: 12px;
}

/* Estilo para las filas alternadas */
tr:nth-child(even) {
    background-color: #F2F2F2;
}

/* Diseño responsivo */
@media screen and (max-width: 768px) {
    .container {
        width: 95%;
        padding: 20px;
    }

    table {
        font-size: 1em;
    }
    
    input[type="text"], select {
        font-size: 1em;
        padding: 12px;
    }
    
    button {
        font-size: 1.1em;
        width: 100%;
    }
}
