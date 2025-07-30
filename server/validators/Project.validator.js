import { body } from 'express-validator';

export const createProjectValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido')
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
  
  body('direccion')
    .trim()
    .notEmpty()
    .withMessage('La dirección es requerida')
    .isLength({ min: 5 })
    .withMessage('La dirección debe tener al menos 5 caracteres'),
  
  body('ciudad')
    .trim()
    .notEmpty()
    .withMessage('La ciudad es requerida')
    .isLength({ min: 2, max: 100 })
    .withMessage('La ciudad debe tener entre 2 y 100 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder 1000 caracteres'),
  
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo', 'en_desarrollo'])
    .withMessage('El estado debe ser: activo, inactivo o en_desarrollo'),
  
  body('fecha_inicio')
    .optional()
    .isISO8601()
    .withMessage('La fecha de inicio debe ser una fecha válida'),
  
  body('fecha_fin_estimada')
    .optional()
    .isISO8601()
    .withMessage('La fecha de fin estimada debe ser una fecha válida'),
  
  body('presupuesto')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto debe ser un número positivo'),
  
  body('responsable_id')
    .optional()
    .isUUID()
    .withMessage('El ID del responsable debe ser un UUID válido'),
  
  body('coordenadas')
    .optional()
    .isObject()
    .withMessage('Las coordenadas deben ser un objeto válido'),
  
  body('imagen_principal')
    .optional()
    .isURL()
    .withMessage('La imagen principal debe ser una URL válida'),
];

export const updateProjectValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
  
  body('direccion')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('La dirección debe tener al menos 5 caracteres'),
  
  body('ciudad')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('La ciudad debe tener entre 2 y 100 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder 1000 caracteres'),
  
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo', 'en_desarrollo'])
    .withMessage('El estado debe ser: activo, inactivo o en_desarrollo'),
  
  body('fecha_inicio')
    .optional()
    .isISO8601()
    .withMessage('La fecha de inicio debe ser una fecha válida'),
  
  body('fecha_fin_estimada')
    .optional()
    .isISO8601()
    .withMessage('La fecha de fin estimada debe ser una fecha válida'),
  
  body('presupuesto')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto debe ser un número positivo'),
  
  body('responsable_id')
    .optional()
    .isUUID()
    .withMessage('El ID del responsable debe ser un UUID válido'),
  
  body('coordenadas')
    .optional()
    .isObject()
    .withMessage('Las coordenadas deben ser un objeto válido'),
  
  body('imagen_principal')
    .optional()
    .isURL()
    .withMessage('La imagen principal debe ser una URL válida'),
]; 