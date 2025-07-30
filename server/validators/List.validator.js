import { body } from 'express-validator';

export const createListValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre de la lista es requerido')
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('El color debe ser un código hexadecimal válido (ej: #3B82F6)'),
  
  body('orden')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero positivo'),
  
  body('project_id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isUUID()
    .withMessage('El ID del proyecto debe ser un UUID válido'),
  
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo'])
    .withMessage('El estado debe ser: activo o inactivo'),
];

export const updateListValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('El color debe ser un código hexadecimal válido (ej: #3B82F6)'),
  
  body('orden')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero positivo'),
  
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo'])
    .withMessage('El estado debe ser: activo o inactivo'),
]; 