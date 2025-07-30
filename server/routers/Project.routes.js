import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStructure
} from '../controllers/Project.controller.js';
import { createProjectValidator, updateProjectValidator } from '../validators/Project.validator.js';

const router = express.Router();

// Rutas para proyectos
router.post('/', createProjectValidator, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProjectValidator, updateProject);
router.delete('/:id', deleteProject);
router.get('/:id/structure', getProjectStructure);

export default router; 