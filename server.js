const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurar el servidor para aceptar JSON
app.use(express.json());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'gestion_ips'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Obtener IPs filtradas por tienda (si se especifica)
app.get('/api/get-ips', (req, res) => {
    const store = req.query.store;  // Obtenemos el parámetro store de la query string
    let query = 'SELECT * FROM ips';

    // Si se especificó una tienda, filtramos los resultados
    if (store && store !== 'all') {
        query += ' WHERE store = ?';
    }

    db.query(query, [store], (err, result) => {
        if (err) throw err;
        res.json({ ips: result });
    });
});

// Agregar una nueva IP
app.post('/api/add-ip', (req, res) => {
    const { store, ip } = req.body;
    db.query('INSERT INTO ips (store, ip) VALUES (?, ?)', [store, ip], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error al agregar la IP' });
        } else {
            res.json({ success: true });
        }
    });
});

// Eliminar una IP
app.delete('/api/delete-ip', (req, res) => {
    const { id } = req.body;
    db.query('DELETE FROM ips WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error al eliminar la IP' });
        } else {
            res.json({ success: true });
        }
    });
});

// Modificar una IP
app.put('/api/edit-ip', (req, res) => {
    const { id, newIP } = req.body;
    db.query('UPDATE ips SET ip = ? WHERE id = ?', [newIP, id], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error al modificar la IP' });
        } else {
            res.json({ success: true });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
