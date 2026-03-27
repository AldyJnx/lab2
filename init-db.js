require('dotenv').config();
const { Pool } = require('pg');

const initDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('Iniciando configuracion de base de datos...');

    // Verificar conexión
    await pool.query('SELECT NOW()');
    console.log('Conectado a PostgreSQL');

    // Eliminar tabla si existe
    await pool.query('DROP TABLE IF EXISTS usuarios');
    console.log('Tabla usuarios eliminada (si existia)');

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
    console.log('Tabla usuarios creada');

    // Insertar datos de ejemplo
    await pool.query(`
      INSERT INTO usuarios (nombre, email, edad) VALUES
      ('Juan Perez', 'juan@example.com', 25),
      ('Maria Garcia', 'maria@example.com', 30),
      ('Carlos Lopez', 'carlos@example.com', 28)
    `);
    console.log('Datos de ejemplo insertados');

    console.log('Base de datos inicializada correctamente');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar base de datos:', error.message);
    console.error('Stack completo:', error.stack);
    await pool.end();
    process.exit(1);
  }
};

initDatabase();
