import { validationResult } from 'express-validator';
import List from '../models/List.js';
import Project from '../models/Project.js';
import Propiedad from '../models/Propiedad.js';

export const createList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verificar que el proyecto existe
    const project = await Project.findByPk(req.body.project_id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    const list = await List.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Lista creada exitosamente',
      data: list
    });
  } catch (error) {
    console.error('Error al crear lista:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const { page = 1, limit = 10, project_id, estado } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (project_id) {
      whereClause.project_id = project_id;
    }
    if (estado) {
      whereClause.estado = estado;
    }

    const lists = await List.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'nombre', 'ciudad']
        },
        {
          model: Propiedad,
          as: 'properties',
          attributes: ['id', 'titulo', 'precio', 'estado_id'],
          required: false
        }
      ],
      order: [['orden', 'ASC'], ['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: lists.rows,
      pagination: {
        total: lists.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(lists.count / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener listas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const list = await List.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'nombre', 'ciudad', 'direccion']
        },
        {
          model: Propiedad,
          as: 'properties',
          order: [['orden', 'ASC']]
        }
      ]
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error('Error al obtener lista:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const updateList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const list = await List.findByPk(id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    await list.update(req.body);
    
    res.json({
      success: true,
      message: 'Lista actualizada exitosamente',
      data: list
    });
  } catch (error) {
    console.error('Error al actualizar lista:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findByPk(id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    // Verificar si hay propiedades en la lista
    const propertyCount = await Propiedad.count({
      where: { list_id: id }
    });

    if (propertyCount > 0) {
      return res.status(400).json({
        success: false,
        message: `No se puede eliminar la lista. Tiene ${propertyCount} propiedades asociadas.`
      });
    }

    await list.destroy();
    
    res.json({
      success: true,
      message: 'Lista eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar lista:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const reorderLists = async (req, res) => {
  try {
    const { lists } = req.body; // Array de objetos con id y orden
    
    if (!Array.isArray(lists)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de listas con id y orden'
      });
    }

    // Actualizar el orden de todas las listas
    for (const listItem of lists) {
      await List.update(
        { orden: listItem.orden },
        { where: { id: listItem.id } }
      );
    }
    
    res.json({
      success: true,
      message: 'Orden de listas actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al reordenar listas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}; 