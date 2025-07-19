import { check } from 'express-validator';

export const createVentaPropiedadValidator = [
  check('propiedad_id').notEmpty().withMessage('La propiedad es requerida'),
  check('comprador_id').notEmpty().withMessage('El comprador es requerido'),
  check('fecha_venta').isISO8601().withMessage('La fecha de venta es requerida y debe ser válida'),
  check('precio_final').isDecimal().withMessage('El precio final es requerido y debe ser decimal'),
  check('observaciones').optional().isString(),
];

export const updateVentaPropiedadValidator = [
  check('fecha_venta').optional().isISO8601().withMessage('La fecha de venta debe ser válida'),
  check('precio_final').optional().isDecimal().withMessage('El precio final debe ser decimal'),
  check('observaciones').optional().isString(),
]; 