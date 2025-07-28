import { validationResult } from 'express-validator';
import Project from '../models/Project.js';
import List from '../models/List.js';
import Usuario from '../models/Usuario.js';

export const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Proyecto creado exitosamente',
      data: project
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, estado } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (estado) {
      whereClause.estado = estado;
    }

    const projects = await Project.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Usuario,
          as: 'responsable',
          attributes: ['id', 'nombre', 'correo']
        },
        {
          model: List,
          as: 'lists',
          attributes: ['id', 'nombre', 'color', 'orden'],
          where: { estado: 'activo' },
          required: false
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: projects.rows,
      pagination: {
        total: projects.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(projects.count / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'responsable',
          attributes: ['id', 'nombre', 'correo', 'celular']
        },
        {
          model: List,
          as: 'lists',
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id', 'nombre']
            }
          ],
          order: [['orden', 'ASC']]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    await project.update(req.body);
    
    res.json({
      success: true,
      message: 'Proyecto actualizado exitosamente',
      data: project
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    await project.destroy();
    
    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getProjectStructure = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id, {
      include: [
        {
          model: List,
          as: 'lists',
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id', 'nombre']
            }
          ],
          order: [['orden', 'ASC']]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error al obtener estructura del proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}; 