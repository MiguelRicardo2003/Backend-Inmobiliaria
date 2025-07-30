// routes/tipoPropiedad.js

import express from 'express';
import * as tipoPropiedadController from '../controllers/TipoPropiedad.controller.js';
import { createTipoPropiedadValidator, updateTipoPropiedadValidator } from '../validators/TipoPropiedad.validator.js';
import auth from '../middlewares/Auth.middleware.js';
import role from '../middlewares/Role.middleware.js';

const router = express.Router();

router.get('/', tipoPropiedadController.findAll);
router.get('/:id', tipoPropiedadController.findById);
router.post('/', auth, role(['Administrador']), createTipoPropiedadValidator, tipoPropiedadController.create);
router.put('/:id', auth, role(['Administrador']), updateTipoPropiedadValidator, tipoPropiedadController.update);
router.delete('/:id', auth, role(['Administrador']), tipoPropiedadController.remove);

export default router;
