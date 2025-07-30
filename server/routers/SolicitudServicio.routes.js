import { Router } from 'express';
import * as solicitudServicioController from '../controllers/SolicitudServicio.controller.js';
import { createSolicitudServicioValidator, updateSolicitudServicioValidator } from '../validators/SolicitudServicio.validator.js';
import auth from '../middlewares/Auth.middleware.js';

const router = Router();

router.get('/', auth, solicitudServicioController.findAll);
router.get('/:id', auth, solicitudServicioController.findById);
router.post('/', auth, createSolicitudServicioValidator, solicitudServicioController.create);
router.put('/:id', auth, updateSolicitudServicioValidator, solicitudServicioController.update);
router.delete('/:id', auth, solicitudServicioController.remove);

export default router; 