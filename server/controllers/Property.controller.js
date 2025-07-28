import { validationResult } from 'express-validator';
import Propiedad from '../models/Propiedad.js';
import List from '../models/List.js';
import Project from '../models/Project.js';
import TipoPropiedad from '../models/TipoPropiedad.js';
import EstadoPropiedad from '../models/EstadoPropiedad.js';
import Usuario from '../models/Usuario.js';
import ImagenPropiedad from '../models/ImagenPropiedad.js';

export const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const property = await Propiedad.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Propiedad creada exitosamente',
      data: property
    });
  } catch (error) {
    console.error('Error al crear propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, list_id, estado_id, tipo_id } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (list_id) {
      whereClause.list_id = list_id;
    }
    if (estado_id) {
      whereClause.estado_id = estado_id;
    }
    if (tipo_id) {
      whereClause.tipo_id = tipo_id;
    }

    const properties = await Propiedad.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: TipoPropiedad,
          as: 'tipo',
          attributes: ['id', 'nombre']
        },
        {
          model: EstadoPropiedad,
          as: 'estado',
          attributes: ['id', 'nombre']
        },
        {
          model: Usuario,
          as: 'dueno',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: List,
          as: 'list',
          attributes: ['id', 'nombre', 'color'],
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id', 'nombre', 'ciudad']
            }
          ]
        },
        {
          model: ImagenPropiedad,
          as: 'imagenes',
          attributes: ['id', 'url', 'descripcion'],
          required: false
        }
      ],
      order: [['orden', 'ASC'], ['fecha_publicacion', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: properties.rows,
      pagination: {
        total: properties.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(properties.count / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Propiedad.findByPk(id, {
      include: [
        {
          model: TipoPropiedad,
          as: 'tipo',
          attributes: ['id', 'nombre']
        },
        {
          model: EstadoPropiedad,
          as: 'estado',
          attributes: ['id', 'nombre']
        },
        {
          model: Usuario,
          as: 'dueno',
          attributes: ['id', 'nombre', 'email', 'telefono']
        },
        {
          model: List,
          as: 'list',
          attributes: ['id', 'nombre', 'color'],
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id', 'nombre', 'ciudad', 'direccion']
            }
          ]
        },
        {
          model: ImagenPropiedad,
          as: 'imagenes',
          attributes: ['id', 'url', 'descripcion']
        }
      ]
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error al obtener propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const property = await Propiedad.findByPk(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    await property.update(req.body);
    
    res.json({
      success: true,
      message: 'Propiedad actualizada exitosamente',
      data: property
    });
  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Propiedad.findByPk(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    await property.destroy();
    
    res.json({
      success: true,
      message: 'Propiedad eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const movePropertyToList = async (req, res) => {
  try {
    const { id } = req.params;
    const { list_id, orden } = req.body;

    if (!list_id) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la lista es requerido'
      });
    }

    const property = await Propiedad.findByPk(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    // Verificar que la lista existe
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    // Actualizar la propiedad
    const updateData = { list_id };
    if (orden !== undefined) {
      updateData.orden = orden;
    }

    await property.update(updateData);
    
    res.json({
      success: true,
      message: 'Propiedad movida exitosamente',
      data: property
    });
  } catch (error) {
    console.error('Error al mover propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const reorderProperties = async (req, res) => {
  try {
    const { properties } = req.body; // Array de objetos con id, list_id y orden
    
    if (!Array.isArray(properties)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de propiedades con id, list_id y orden'
      });
    }

    // Actualizar el orden de todas las propiedades
    for (const propertyItem of properties) {
      await Propiedad.update(
        { 
          orden: propertyItem.orden,
          list_id: propertyItem.list_id 
        },
        { where: { id: propertyItem.id } }
      );
    }
    
    res.json({
      success: true,
      message: 'Orden de propiedades actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al reordenar propiedades:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export const getPropertiesByProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Obtener todas las listas del proyecto
    const lists = await List.findAll({
      where: { project_id, estado: 'activo' },
      include: [
        {
          model: Propiedad,
          as: 'properties',
          include: [
            {
              model: TipoPropiedad,
              as: 'tipo',
              attributes: ['id', 'nombre']
            },
            {
              model: EstadoPropiedad,
              as: 'estado',
              attributes: ['id', 'nombre']
            },
            {
              model: ImagenPropiedad,
              as: 'imagenes',
              attributes: ['id', 'url'],
              required: false
            }
          ],
          order: [['orden', 'ASC']]
        }
      ],
      order: [['orden', 'ASC']]
    });

    res.json({
      success: true,
      data: lists
    });
  } catch (error) {
    console.error('Error al obtener propiedades por proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}; 