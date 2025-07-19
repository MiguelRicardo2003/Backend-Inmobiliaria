import { Router } from 'express';
import * as servicioController from '../controllers/Servicio.controller.js';
import { createServicioValidator, updateServicioValidator } from '../validators/Servicio.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', servicioController.findAll);
router.get('/:id', servicioController.findById);
router.post('/', auth, createServicioValidator, servicioController.create);
router.put('/:id', auth, updateServicioValidator, servicioController.update);
router.delete('/:id', auth, servicioController.remove);

export default router; 