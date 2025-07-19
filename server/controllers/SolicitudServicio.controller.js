import SolicitudServicio from '../models/SolicitudServicio.js';
import { validationResult } from 'express-validator';
import { puedeVerSolicitud, puedeCrearSolicitud, puedeActualizarSolicitud, puedeEliminarSolicitud } from '../utils/solicitudServicioUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let solicitudes;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      solicitudes = await SolicitudServicio.findAll();
    } else if (usuario.rol === 'Cliente') {
      solicitudes = await SolicitudServicio.findAll({ where: { usuario_id: usuario.id } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver solicitudes' });
    }
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const solicitud = await SolicitudServicio.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    if (!puedeVerSolicitud(usuario, solicitud)) {
      return res.status(403).json({ message: 'No tienes permisos para ver esta solicitud' });
    }
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitud', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const data = { ...req.body };
    data.usuario_id = usuario.id;
    if (!puedeCrearSolicitud(usuario, data)) {
      return res.status(403).json({ message: 'No tienes permisos para crear esta solicitud' });
    }
    const nueva = await SolicitudServicio.create(data);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear solicitud', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeActualizarSolicitud(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede actualizar solicitudes' });
    }
    const solicitud = await SolicitudServicio.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    await solicitud.update(req.body);
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar solicitud', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarSolicitud(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar solicitudes' });
    }
    const solicitud = await SolicitudServicio.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    await solicitud.destroy();
    res.status(200).json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar solicitud', details: error });
  }
}; 