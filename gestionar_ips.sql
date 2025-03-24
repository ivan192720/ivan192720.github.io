-- Crear base de datos
CREATE DATABASE gestion_ips;

-- Usar la base de datos creada
USE gestion_ips;

-- Crear tabla para almacenar las IPs
CREATE TABLE ips (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- ID único para cada entrada
    store VARCHAR(100),                  -- Tienda
    ip VARCHAR(15),                      -- IP
    ipSource VARCHAR(100),               -- Origen de la IP (CAJA, VENTAS, etc.)
    model VARCHAR(100),                  -- Modelo
    articleKey VARCHAR(100)              -- Clave de artículo
);

-- Insertar algunas IPs de ejemplo
INSERT INTO ips (store, ip, ipSource, model, articleKey) VALUES 
('F622', '192.168.0.1', 'CAJA', 'Modelo1', '12345'),
('D423', '192.168.0.2', 'VENTAS1', 'Modelo2', '67890'),
('MERCADO', '192.168.0.3', 'JEFE DE TIENDA', 'Modelo3', '11223'),
('I810', '192.168.0.4', 'VENTAS2', 'Modelo4', '44556'),
('TULTITLAN', '192.168.0.5', 'VENTAS3', 'Modelo5', '78901');
