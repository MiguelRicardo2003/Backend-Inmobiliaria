import { check } from 'express-validator';

export const createServicioValidator = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('descripcion').optional().isString(),
  check('precio').optional().isDecimal().withMessage('El precio debe ser decimal'),
];

export const updateServicioValidator = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  check('descripcion').optional().isString(),
  check('precio').optional().isDecimal().withMessage('El precio debe ser decimal'),
]; 