import { Router } from 'express';
import * as estadoPropiedadController from '../controllers/EstadoPropiedad.controller.js';
import { createEstadoPropiedadValidator, updateEstadoPropiedadValidator } from '../validators/EstadoPropiedad.validator.js';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/Role.middleware.js';

const router = Router();

router.get('/', estadoPropiedadController.findAll);
router.get('/:id', estadoPropiedadController.findById);
router.post('/', auth, role(['Administrador']), createEstadoPropiedadValidator, estadoPropiedadController.create);
router.put('/:id', auth, role(['Administrador']), updateEstadoPropiedadValidator, estadoPropiedadController.update);
router.delete('/:id', auth, role(['Administrador']), estadoPropiedadController.remove);

export default router; 