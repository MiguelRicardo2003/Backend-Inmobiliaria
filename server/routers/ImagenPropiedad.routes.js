import { Router } from 'express';
import * as imagenPropiedadController from '../controllers/ImagenPropiedad.controller.js';
import { createImagenPropiedadValidator } from '../validators/ImagenPropiedad.validator.js';
import auth from '../middlewares/Auth.middleware.js';

const router = Router();

// GET público: imágenes de una propiedad
router.get('/propiedad/:propiedad_id', imagenPropiedadController.findByPropiedad);
// GET: imágenes de la aplicación
router.get('/', (req, res) => {
  const prefix = process.env.API_PREFIX || '';
  res.json({
    entity: 'imagenes',
    routes: [`${prefix}/imagenes`],
    res: 'Las imagenes van con las propiedades'
  });
});
// POST: solo admin o asesor asignado
router.post('/', auth, createImagenPropiedadValidator, imagenPropiedadController.create);
// DELETE: solo admin o asesor asignado
router.delete('/:id', auth, imagenPropiedadController.remove);

export default router; 