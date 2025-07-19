import { Router } from 'express';
import * as ventaPropiedadController from '../controllers/VentaPropiedad.controller.js';
import { createVentaPropiedadValidator, updateVentaPropiedadValidator } from '../validators/VentaPropiedad.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, ventaPropiedadController.findAll);
router.get('/:id', auth, ventaPropiedadController.findById);
router.post('/', auth, createVentaPropiedadValidator, ventaPropiedadController.create);
router.put('/:id', auth, updateVentaPropiedadValidator, ventaPropiedadController.update);
router.delete('/:id', auth, ventaPropiedadController.remove);

export default router; 