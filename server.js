const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_FQ0lNCVk7wKb@ep-summer-resonance-a5gim4mg-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => console.log('✅ Conectado a la base de datos en Neon'))
    .catch(err => console.error('❌ Error al conectar a la base de datos:', err));


    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ips (
        id SERIAL PRIMARY KEY,
        store VARCHAR(100),
        ip VARCHAR(15),
        ipSource VARCHAR(100),
        model VARCHAR(100),
        articleKey VARCHAR(100)
    );
    `;
    
    const insertDataQuery = `
    INSERT INTO ips (store, ip, ipSource, model, articleKey) VALUES 
    ('F622', '192.168.0.1', 'CAJA', 'Modelo1', '12345'),
    ('D423', '192.168.0.2', 'VENTAS1', 'Modelo2', '67890'),
    ('MERCADO', '192.168.0.3', 'JEFE DE TIENDA', 'Modelo3', '11223'),
    ('I810', '192.168.0.4', 'VENTAS2', 'Modelo4', '44556'),
    ('TULTITLAN', '192.168.0.5', 'VENTAS3', 'Modelo5', '78901')
    ON CONFLICT DO NOTHING;
    `;
    
    client.query(createTableQuery)
        .then(() => client.query(insertDataQuery))
        .then(() => console.log('✅ Tabla creada y datos insertados'))
        .catch(err => console.error('❌ Error al ejecutar las consultas:', err))
        .finally(() => client.end());
    