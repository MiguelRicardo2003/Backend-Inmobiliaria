import { check } from 'express-validator';

export const createPagoArriendoValidator = [
  check('arriendo_id').notEmpty().withMessage('El arriendo es requerido'),
  check('fecha_pago').isISO8601().withMessage('La fecha de pago es requerida y debe ser válida'),
  check('monto').isDecimal().withMessage('El monto es requerido y debe ser decimal'),
  check('comprobante_url').isURL().withMessage('El comprobante debe ser una URL válida'),
];

export const updatePagoArriendoValidator = [
  check('estado_pago').optional().isIn(['Pendiente', 'Pagado', 'Retrasado']).withMessage('Estado de pago inválido'),
  check('comprobante_url').optional().isURL().withMessage('El comprobante debe ser una URL válida'),
]; 