-- Crear base de datos
CREATE DATABASE gestion_ips;

-- Usar la base de datos creada
USE gestion_ips;

-- Crear tabla para almacenar las IPs
CREATE TABLE ips (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- ID único para cada entrada
    store VARCHAR(100),                  -- Tienda
    ip VARCHAR(15)                       -- IP
);

-- Insertar algunas IPs de ejemplo
INSERT INTO ips (store, ip) VALUES ('F622', '192.168.1.1');
INSERT INTO ips (store, ip) VALUES ('D423', '192.168.1.2');
INSERT INTO ips (store, ip) VALUES ('MERCADO', '192.168.1.3');
