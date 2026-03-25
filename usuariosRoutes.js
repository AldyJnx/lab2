const express = require('express');
const router = express.Router();
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require('./usuariosController');

// Rutas CRUD
router.get('/', getAllUsuarios);          // GET /api/usuarios
router.get('/:id', getUsuarioById);       // GET /api/usuarios/:id
router.post('/', createUsuario);          // POST /api/usuarios
router.put('/:id', updateUsuario);        // PUT /api/usuarios/:id
router.delete('/:id', deleteUsuario);     // DELETE /api/usuarios/:id

module.exports = router;
