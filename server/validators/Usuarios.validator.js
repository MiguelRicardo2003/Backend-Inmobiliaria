import { check } from 'express-validator';

export const createUsuarioValidator = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('apellido').notEmpty().withMessage('El apellido es requerido'),
  check('correo').isEmail().withMessage('Correo inválido'),
  check('contrasenia').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('rol_id').isInt().withMessage('El rol es requerido'),
];

export const updateUsuarioValidator = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  check('apellido').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  check('correo').optional().isEmail().withMessage('Correo inválido'),
  check('contrasenia').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('rol_id').optional().isInt().withMessage('El rol debe ser un número'),
]; 