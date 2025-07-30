import { Router } from 'express';
import * as rolesController from '../controllers/Roles.controller.js';
import { createRoleValidator, updateRoleValidator } from '../validators/Roles.validator.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import role from '../middlewares/Role.middleware.js';

const router = Router();

router.get('/', authMiddleware, role(['Administrador']), rolesController.findAll);
router.get('/:id', authMiddleware, role(['Administrador']), rolesController.findById);
router.post('/', authMiddleware, role(['Administrador']), createRoleValidator, rolesController.create);
router.put('/:id', authMiddleware, role(['Administrador']), updateRoleValidator, rolesController.update);
router.delete('/:id', authMiddleware, role(['Administrador']), rolesController.remove);

export default router;
