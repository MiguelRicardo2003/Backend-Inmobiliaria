// controllers/tipoPropiedadController.js (o donde lo necesites)

import TipoPropiedad from '../models/TipoPropiedad.js';
import { validationResult } from 'express-validator';

export const findAll = async (req, res) => {
  try {
    const tipos = await TipoPropiedad.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const tipo = await TipoPropiedad.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'Tipo de propiedad no encontrado' });
    res.status(200).json(tipo);
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
    const existe = await TipoPropiedad.findOne({ where: { nombre } });
    if (existe) return res.status(409).json({ message: 'El nombre de tipo de propiedad ya existe' });
    const nuevo = await TipoPropiedad.create({ nombre });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de propiedad', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const tipo = await TipoPropiedad.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'Tipo de propiedad no encontrado' });
    const { nombre } = req.body;
    if (nombre) {
      // Verificar si el nombre ya existe en otro tipo
      const existe = await TipoPropiedad.findOne({ where: { nombre } });
      if (existe && existe.id !== tipo.id) return res.status(409).json({ message: 'El nombre de tipo de propiedad ya existe' });
      tipo.nombre = nombre;
    }
    await tipo.save();
    res.status(200).json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tipo de propiedad', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const tipo = await TipoPropiedad.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'Tipo de propiedad no encontrado' });
    await tipo.destroy();
    res.status(200).json({ message: 'Tipo de propiedad eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tipo de propiedad', details: error });
  }
};
