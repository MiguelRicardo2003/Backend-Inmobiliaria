import { Router } from 'express';
import * as arriendoController from '../controllers/Arriendo.controller.js';
import { createArriendoValidator, updateArriendoValidator } from '../validators/Arriendo.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, arriendoController.findAll);
router.get('/:id', auth, arriendoController.findById);
router.post('/', auth, createArriendoValidator, arriendoController.create);
router.put('/:id', auth, updateArriendoValidator, arriendoController.update);
router.delete('/:id', auth, arriendoController.remove);

export default router; 