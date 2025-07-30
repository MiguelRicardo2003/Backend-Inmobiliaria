import { Router } from 'express';
import * as propiedadController from '../controllers/Propiedad.controller.js';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  movePropertyToList,
  reorderProperties,
  getPropertiesByProject
} from '../controllers/Property.controller.js';
import { createPropiedadValidator, updatePropiedadValidator } from '../validators/Propiedad.validator.js';
import auth from '../middlewares/Auth.middleware.js';

const router = Router();

// Rutas existentes (mantener compatibilidad)
router.get('/', propiedadController.findAll);
router.get('/:id', auth, propiedadController.findById);
router.post('/', auth, createPropiedadValidator, propiedadController.create);
router.put('/:id', auth, updatePropiedadValidator, propiedadController.update);
router.delete('/:id', auth, propiedadController.remove);
router.put('/:id/reactivar', auth, propiedadController.reactivar);

// Nuevas rutas para funcionalidad Trello-like
router.get('/trello/all', getAllProperties);
router.get('/trello/:id', getPropertyById);
router.post('/trello/create', createProperty);
router.put('/trello/:id', updateProperty);
router.delete('/trello/:id', deleteProperty);
router.put('/trello/:id/move', movePropertyToList);
router.put('/trello/reorder/properties', reorderProperties);
router.get('/trello/project/:project_id', getPropertiesByProject);

export default router; 