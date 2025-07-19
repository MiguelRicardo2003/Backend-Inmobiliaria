import { Router } from 'express';
import { register, login } from '../controllers/Auth.controller.js';
import { createUsuarioValidator } from '../validators/Usuarios.validator.js';

const router = Router();

// Registro público de clientes
router.post('/register', createUsuarioValidator, register);
// Login
router.post('/login', login);

export default router; 