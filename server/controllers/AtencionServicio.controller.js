import AtencionServicio from '../models/AtencionServicio.js';
import SolicitudServicio from '../models/SolicitudServicio.js';
import { validationResult } from 'express-validator';
import { puedeVerAtencion, puedeCrearAtencion, puedeActualizarAtencion, puedeEliminarAtencion } from '../utils/atencionServicioUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let atenciones;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      atenciones = await AtencionServicio.findAll();
    } else if (usuario.rol === 'Cliente') {
      // Buscar solicitudes del cliente
      const solicitudes = await SolicitudServicio.findAll({ where: { usuario_id: usuario.id } });
      const solicitudIds = solicitudes.map(s => s.id);
      atenciones = await AtencionServicio.findAll({ where: { solicitud_id: solicitudIds } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver atenciones' });
    }
    res.status(200).json(atenciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener atenciones', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const atencion = await AtencionServicio.findByPk(req.params.id);
    if (!atencion) return res.status(404).json({ message: 'Atención no encontrada' });
    const solicitud = await SolicitudServicio.findByPk(atencion.solicitud_id);
    if (!puedeVerAtencion(usuario, atencion, solicitud)) {
      return res.status(403).json({ message: 'No tienes permisos para ver esta atención' });
    }
    res.status(200).json(atencion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener atención', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeCrearAtencion(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor puede crear atenciones' });
    }
    const { solicitud_id, observaciones, resultado } = req.body;
    const solicitud = await SolicitudServicio.findByPk(solicitud_id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    const nueva = await AtencionServicio.create({ solicitud_id, atendido_por: usuario.id, observaciones, resultado });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear atención', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const atencion = await AtencionServicio.findByPk(req.params.id);
    if (!atencion) return res.status(404).json({ message: 'Atención no encontrada' });
    if (!puedeActualizarAtencion(usuario, atencion)) {
      return res.status(403).json({ message: 'Solo el asesor que atendió puede actualizar esta atención' });
    }
    await atencion.update(req.body);
    res.status(200).json(atencion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar atención', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarAtencion(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar atenciones' });
    }
    const atencion = await AtencionServicio.findByPk(req.params.id);
    if (!atencion) return res.status(404).json({ message: 'Atención no encontrada' });
    await atencion.destroy();
    res.status(200).json({ message: 'Atención eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar atención', details: error });
  }
}; 