import express from 'express';
import {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
  reorderLists
} from '../controllers/List.controller.js';
import { createListValidator, updateListValidator } from '../validators/List.validator.js';

const router = express.Router();

// Rutas para listas
router.post('/', createListValidator, createList);
router.get('/', getAllLists);
router.get('/:id', getListById);
router.put('/:id', updateListValidator, updateList);
router.delete('/:id', deleteList);
router.put('/reorder/lists', reorderLists);

export default router; 