import { check } from 'express-validator';

export const createTipoPropiedadValidator = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
];

export const updateTipoPropiedadValidator = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
]; 