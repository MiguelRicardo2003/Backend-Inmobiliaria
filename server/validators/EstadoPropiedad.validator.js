import { check } from 'express-validator';

export const createEstadoPropiedadValidator = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
];

export const updateEstadoPropiedadValidator = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
]; 