import Servicio from '../models/Servicio.js';
import { validationResult } from 'express-validator';

export const findAll = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener servicios', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener servicio', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!usuario || usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Solo un administrador puede crear servicios' });
    }
    const { nombre, descripcion, precio } = req.body;
    const existe = await Servicio.findOne({ where: { nombre } });
    if (existe) return res.status(409).json({ message: 'El nombre del servicio ya existe' });
    const nuevo = await Servicio.create({ nombre, descripcion, precio });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear servicio', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!usuario || usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Solo un administrador puede actualizar servicios' });
    }
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
    await servicio.update(req.body);
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar servicio', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!usuario || usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar servicios' });
    }
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
    await servicio.destroy();
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar servicio', details: error });
  }
}; 