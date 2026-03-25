require('dotenv').config();
const pool = require('./db');

const initDatabase = async () => {
  try {
    console.log('🔄 Iniciando configuración de base de datos...');

    // Eliminar tabla si existe
    await pool.query('DROP TABLE IF EXISTS usuarios');
    console.log('✓ Tabla usuarios eliminada (si existía)');

    // Crear tabla usuarios
    await pool.query(`
      CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        edad INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Tabla usuarios creada');

    // Insertar datos de ejemplo
    await pool.query(`
      INSERT INTO usuarios (nombre, email, edad) VALUES
      ('Juan Pérez', 'juan@example.com', 25),
      ('María García', 'maria@example.com', 30),
      ('Carlos López', 'carlos@example.com', 28)
    `);
    console.log('✓ Datos de ejemplo insertados');

    console.log('✅ Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message);
    process.exit(1);
  }
};

initDatabase();
