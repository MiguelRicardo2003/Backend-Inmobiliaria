// controllers/tipoPropiedadController.js (o donde lo necesites)

import { TipoPropiedad } from '../models/TipoPropiedad.js'; // Asegúrate que esté bien importado

// Obtener todos los tipos de propiedad
const obtenerTiposPropiedad = async (req, res) => {
  try {
    const tipos = await TipoPropiedad.findAll();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de propiedad:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export { obtenerTiposPropiedad };
