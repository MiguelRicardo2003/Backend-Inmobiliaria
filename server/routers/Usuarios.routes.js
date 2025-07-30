import { Router } from 'express';
import * as usuariosController from '../controllers/Usuarios.controller.js';
import { createUsuarioValidator, updateUsuarioValidator } from '../validators/Usuarios.validator.js';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/Role.middleware.js';

const router = Router();

router.get('/', auth, usuariosController.findAll);
router.get('/:id', auth, usuariosController.findById);
router.post('/', createUsuarioValidator, usuariosController.create);
router.put('/:id', auth, role('admin'), updateUsuarioValidator, usuariosController.update);
router.delete('/:id', auth, role('admin'), usuariosController.remove);

export default router;
