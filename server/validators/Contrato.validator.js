import { check } from 'express-validator';

export const createContratoValidator = [
  check('arriendo_id').notEmpty().withMessage('El arriendo es requerido'),
  check('url_documento').isURL().withMessage('El contrato PDF es requerido y debe ser una URL válida'),
];

export const updateContratoValidator = [
  check('url_documento').optional().isURL().withMessage('El contrato PDF debe ser una URL válida'),
  check('firmado_por_dueno').optional().isBoolean(),
  check('firmado_por_inquilino').optional().isBoolean(),
]; 