import { Router } from 'express';
import * as propiedadController from '../controllers/Propiedad.controller.js';
import { createPropiedadValidator, updatePropiedadValidator } from '../validators/Propiedad.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// GET: público, pero si quieres protección, agrega 'auth' aquí
router.get('/', propiedadController.findAll);
router.get('/:id', auth, propiedadController.findById);
// POST: asesor puede crear solo para sí mismo, admin para cualquier asesor
router.post('/', auth, createPropiedadValidator, propiedadController.create);
// PUT: asesor solo propias, admin cualquiera
router.put('/:id', auth, updatePropiedadValidator, propiedadController.update);
// DELETE: solo admin
router.delete('/:id', auth, propiedadController.remove);
// REACTIVAR: solo admin
router.put('/:id/reactivar', auth, propiedadController.reactivar);

export default router; 