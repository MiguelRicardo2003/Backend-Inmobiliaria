import EstadoPropiedad from '../models/EstadoPropiedad.js';
import { validationResult } from 'express-validator';

export const findAll = async (req, res) => {
  try {
    const estados = await EstadoPropiedad.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const estado = await EstadoPropiedad.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ message: 'Estado de propiedad no encontrado' });
    res.status(200).json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { nombre } = req.body;
    // Verificar si el nombre ya existe
    const existe = await EstadoPropiedad.findOne({ where: { nombre } });
    if (existe) return res.status(409).json({ message: 'El nombre de estado de propiedad ya existe' });
    const nuevo = await EstadoPropiedad.create({ nombre });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear estado de propiedad', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const estado = await EstadoPropiedad.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ message: 'Estado de propiedad no encontrado' });
    const { nombre } = req.body;
    if (nombre) {
      // Verificar si el nombre ya existe en otro estado
      const existe = await EstadoPropiedad.findOne({ where: { nombre } });
      if (existe && existe.id !== estado.id) return res.status(409).json({ message: 'El nombre de estado de propiedad ya existe' });
      estado.nombre = nombre;
    }
    await estado.save();
    res.status(200).json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado de propiedad', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const estado = await EstadoPropiedad.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ message: 'Estado de propiedad no encontrado' });
    await estado.destroy();
    res.status(200).json({ message: 'Estado de propiedad eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estado de propiedad', details: error });
  }
}; 