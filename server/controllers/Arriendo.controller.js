import Arriendo from '../models/Arriendo.js';
import Propiedad from '../models/Propiedad.js';
import Usuario from '../models/Usuario.js';
import { validationResult } from 'express-validator';
import { puedeVerArriendo, puedeCrearArriendo, puedeActualizarArriendo, puedeEliminarArriendo } from '../utils/arriendoUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let arriendos;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      arriendos = await Arriendo.findAll();
    } else if (usuario.rol === 'Cliente') {
      arriendos = await Arriendo.findAll({ where: { inquilino_id: usuario.id } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver arriendos' });
    }
    res.status(200).json(arriendos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener arriendos', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const arriendo = await Arriendo.findByPk(req.params.id);
    if (!arriendo) return res.status(404).json({ message: 'Arriendo no encontrado' });
    if (!puedeVerArriendo(usuario, arriendo)) {
      return res.status(403).json({ message: 'No tienes permisos para ver este arriendo' });
    }
    res.status(200).json(arriendo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener arriendo', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const data = { ...req.body };
    // Si cliente, forzar inquilino_id = usuario.id
    if (usuario.rol === 'Cliente') data.inquilino_id = usuario.id;
    // Validar permisos
    if (!puedeCrearArriendo(usuario, data)) {
      return res.status(403).json({ message: 'No tienes permisos para crear este arriendo' });
    }
    // Validar propiedad
    const propiedad = await Propiedad.findByPk(data.propiedad_id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    // Validar inquilino
    const inquilino = await Usuario.findByPk(data.inquilino_id);
    if (!inquilino || inquilino.rol_id !== 1) return res.status(400).json({ message: 'El inquilino debe ser un cliente válido' });
    // Validar que no haya arriendo activo para la misma propiedad y fechas
    const arriendoExistente = await Arriendo.findOne({
      where: {
        propiedad_id: data.propiedad_id,
        estado: 'Activo',
      }
    });
    if (arriendoExistente) {
      return res.status(409).json({ message: 'Ya existe un arriendo activo para esta propiedad' });
    }
    data.estado = 'Activo';
    const nuevo = await Arriendo.create(data);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear arriendo', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeActualizarArriendo(usuario)) {
      return res.status(403).json({ message: 'No tienes permisos para actualizar arriendos' });
    }
    const arriendo = await Arriendo.findByPk(req.params.id);
    if (!arriendo) return res.status(404).json({ message: 'Arriendo no encontrado' });
    await arriendo.update(req.body);
    res.status(200).json(arriendo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar arriendo', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarArriendo(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar arriendos' });
    }
    const arriendo = await Arriendo.findByPk(req.params.id);
    if (!arriendo) return res.status(404).json({ message: 'Arriendo no encontrado' });
    await arriendo.destroy();
    res.status(200).json({ message: 'Arriendo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar arriendo', details: error });
  }
}; 