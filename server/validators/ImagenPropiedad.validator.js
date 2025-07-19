import { check } from 'express-validator';

export const createImagenPropiedadValidator = [
  check('url_imagen').isURL().withMessage('La URL de la imagen es requerida y debe ser válida'),
  check('propiedad_id').notEmpty().withMessage('La propiedad es requerida'),
]; 