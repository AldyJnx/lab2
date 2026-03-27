require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./usuariosRoutes');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Ruta de información de la API
app.get('/api', (req, res) => {
  res.json({
    message: 'API CRUD de Usuarios',
    version: '1.0.0',
    endpoints: {
      'GET /api/usuarios': 'Obtener todos los usuarios',
      'GET /api/usuarios/:id': 'Obtener un usuario por ID',
      'POST /api/usuarios': 'Crear un nuevo usuario',
      'PUT /api/usuarios/:id': 'Actualizar un usuario',
      'DELETE /api/usuarios/:id': 'Eliminar un usuario'
    }
  });
});

// Rutas de la API
app.use('/api/usuarios', usuariosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurada' : 'No configurada'}`);
});

module.exports = app;
