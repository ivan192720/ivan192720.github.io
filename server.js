const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurar el servidor para aceptar JSON
app.use(express.json());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',            // Asegúrate de que esto sea tu usuario MySQL
    password: 'your_password',  // Asegúrate de cambiar esto por tu contraseña real
    database: 'gestionar_ips'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
    }
    console.log('Conectado a la base de datos');
});

// Obtener IPs filtradas por tienda (si se especifica)
app.get('/api/get-ips', (req, res) => {
    const store = req.query.store || 'all';  // Si no se especifica, se asume 'all'
    let query = 'SELECT * FROM ips';

    // Si se especificó una tienda distinta a 'all', filtramos los resultados
    if (store !== 'all') {
        query += ' WHERE store = ?';
    }

    db.query(query, [store], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error al obtener las IPs', error: err });
        } else {
            res.json({ success: true, ips: result });
        }
    });
});

// Agregar una nueva IP
app.post('/api/add-ip', (req, res) => {
    const { store, ip } = req.body;

    if (!store || !ip) {
        return res.status(400).json({ success: false, message: 'Faltan datos: store o ip' });
    }

    db.query('INSERT INTO ips (store, ip) VALUES (?, ?)', [store, ip], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error al agregar la IP', error: err });
        } else {
            res.json({ success: true, message: 'IP agregada exitosamente' });
        }
    });
});

// Eliminar una IP
app.delete('/api/delete-ip', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Falta el ID de la IP' });
    }

    db.query('DELETE FROM ips WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error al eliminar la IP', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ success: false, message: 'IP no encontrada' });
        } else {
            res.json({ success: true, message: 'IP eliminada exitosamente' });
        }
    });
});

// Modificar una IP
app.put('/api/edit-ip', (req, res) => {
    const { id, newIP } = req.body;

    if (!id || !newIP) {
        return res.status(400).json({ success: false, message: 'Faltan datos: id o newIP' });
    }

    db.query('UPDATE ips SET ip = ? WHERE id = ?', [newIP, id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error al modificar la IP', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ success: false, message: 'IP no encontrada' });
        } else {
            res.json({ success: true, message: 'IP modificada exitosamente' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
