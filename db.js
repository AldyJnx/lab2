const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Prueba de conexión
pool.on('connect', () => {
  console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error en la conexion a PostgreSQL:', err.message);
  console.error('Stack:', err.stack);
});

// Verificar conexión al iniciar
pool.query('SELECT NOW()')
  .then(() => console.log('Base de datos lista'))
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err.message);
    console.error('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'No configurada');
  });

module.exports = pool;
