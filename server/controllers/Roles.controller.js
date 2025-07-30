import { TipoRol } from '../models/index.js';
import { validationResult } from 'express-validator';

export const findAll = async (req, res) => {
  try {
    const roles = await TipoRol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles', error });
  }
};

export const findById = async (req, res) => {
  try {
    const rol = await TipoRol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error', error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { nombre } = req.body;
    // Verificar si el nombre ya existe
    const existe = await TipoRol.findOne({ where: { nombre } });
    if (existe) return res.status(409).json({ message: 'El nombre de rol ya existe' });
    const nuevo = await TipoRol.create({ nombre });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol', error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const rol = await TipoRol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
    const { nombre } = req.body;
    if (nombre) {
      // Verificar si el nombre ya existe en otro rol
      const existe = await TipoRol.findOne({ where: { nombre } });
      if (existe && existe.id !== rol.id) return res.status(409).json({ message: 'El nombre de rol ya existe' });
      rol.nombre = nombre;
    }
    await rol.save();
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol', error });
  }
};

export const remove = async (req, res) => {
  try {
    const rol = await TipoRol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
    await rol.destroy();
    res.status(200).json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rol', error });
  }
};
