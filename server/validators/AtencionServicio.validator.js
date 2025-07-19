import { check } from 'express-validator';

export const createAtencionServicioValidator = [
  check('solicitud_id').notEmpty().withMessage('La solicitud es requerida'),
  check('observaciones').optional().isString(),
  check('resultado').optional().isString(),
];

export const updateAtencionServicioValidator = [
  check('observaciones').optional().isString(),
  check('resultado').optional().isString(),
]; 