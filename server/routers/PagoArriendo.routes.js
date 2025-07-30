import { Router } from 'express';
import * as pagoArriendoController from '../controllers/PagoArriendo.controller.js';
import { createPagoArriendoValidator, updatePagoArriendoValidator } from '../validators/PagoArriendo.validator.js';
import auth from '../middlewares/Auth.middleware.js';

const router = Router();

router.get('/', auth, pagoArriendoController.findAll);
router.get('/:id', auth, pagoArriendoController.findById);
router.post('/', auth, createPagoArriendoValidator, pagoArriendoController.create);
router.put('/:id', auth, updatePagoArriendoValidator, pagoArriendoController.update);
router.delete('/:id', auth, pagoArriendoController.remove);

export default router; 