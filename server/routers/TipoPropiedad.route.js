// routes/tipoPropiedad.js

import express from 'express';
import TipoPropiedad from '../models/TipoPropiedad.js';

const router = express.Router();

// GET /api/tipo-propiedades
router.get('/', async (req, res) => {
  try {
    const tipos = await TipoPropiedad.findAll();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de propiedad:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

export default router;
