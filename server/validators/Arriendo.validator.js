import { check } from 'express-validator';

export const createArriendoValidator = [
  check('propiedad_id').notEmpty().withMessage('La propiedad es requerida'),
  check('fecha_inicio').isISO8601().withMessage('La fecha de inicio es requerida y debe ser válida'),
  check('precio_mensual').isDecimal().withMessage('El precio mensual es requerido y debe ser decimal'),
];

export const updateArriendoValidator = [
  check('fecha_fin').optional().isISO8601().withMessage('La fecha de fin debe ser válida'),
  check('estado').optional().isIn(['Activo', 'Finalizado', 'Cancelado']).withMessage('Estado inválido'),
]; 