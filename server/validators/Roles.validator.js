import { check } from 'express-validator';

export const createRoleValidator = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
];

export const updateRoleValidator = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
]; 