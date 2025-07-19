import Contrato from '../models/Contrato.js';
import Arriendo from '../models/Arriendo.js';
import { validationResult } from 'express-validator';
import { puedeVerContrato, puedeCrearContrato, puedeActualizarContrato, puedeEliminarContrato } from '../utils/contratoUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let contratos;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      contratos = await Contrato.findAll();
    } else if (usuario.rol === 'Cliente') {
      // Buscar arriendos del cliente
      const arriendos = await Arriendo.findAll({ where: { inquilino_id: usuario.id } });
      const arriendoIds = arriendos.map(a => a.id);
      contratos = await Contrato.findAll({ where: { arriendo_id: arriendoIds } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver contratos' });
    }
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contratos', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });
    const arriendo = await Arriendo.findByPk(contrato.arriendo_id);
    if (!puedeVerContrato(usuario, contrato, arriendo)) {
      return res.status(403).json({ message: 'No tienes permisos para ver este contrato' });
    }
    res.status(200).json(contrato);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contrato', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeCrearContrato(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede crear contratos' });
    }
    const { arriendo_id, url_documento, fecha_firma, firmado_por_dueno, firmado_por_inquilino } = req.body;
    const arriendo = await Arriendo.findByPk(arriendo_id);
    if (!arriendo) return res.status(404).json({ message: 'Arriendo no encontrado' });
    const nuevo = await Contrato.create({ arriendo_id, url_documento, fecha_firma, firmado_por_dueno, firmado_por_inquilino });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contrato', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeActualizarContrato(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede actualizar contratos' });
    }
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });
    await contrato.update(req.body);
    res.status(200).json(contrato);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contrato', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarContrato(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar contratos' });
    }
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });
    await contrato.destroy();
    res.status(200).json({ message: 'Contrato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contrato', details: error });
  }
}; 