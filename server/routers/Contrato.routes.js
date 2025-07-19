import { Router } from 'express';
import * as contratoController from '../controllers/Contrato.controller.js';
import { createContratoValidator, updateContratoValidator } from '../validators/Contrato.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, contratoController.findAll);
router.get('/:id', auth, contratoController.findById);
router.post('/', auth, createContratoValidator, contratoController.create);
router.put('/:id', auth, updateContratoValidator, contratoController.update);
router.delete('/:id', auth, contratoController.remove);

export default router; 