import { Router } from 'express';
import * as atencionServicioController from '../controllers/AtencionServicio.controller.js';
import { createAtencionServicioValidator, updateAtencionServicioValidator } from '../validators/AtencionServicio.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, atencionServicioController.findAll);
router.get('/:id', auth, atencionServicioController.findById);
router.post('/', auth, createAtencionServicioValidator, atencionServicioController.create);
router.put('/:id', auth, updateAtencionServicioValidator, atencionServicioController.update);
router.delete('/:id', auth, atencionServicioController.remove);

export default router; 