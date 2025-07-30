import { check } from 'express-validator';

export const createSolicitudServicioValidator = [
  check('servicio_id').notEmpty().withMessage('El servicio es requerido'),
  check('mensaje').optional().isString(),
];

export const updateSolicitudServicioValidator = [
  check('estado').optional().isIn(['Pendiente', 'En proceso', 'Finalizado']).withMessage('Estado inválido'),
  check('mensaje').optional().isString(),
]; 