import Propiedad from '../models/Propiedad.js';
import { validationResult } from 'express-validator';
import { puedeEditarPropiedad, puedeBorrarPropiedad, puedeCrearPropiedad, puedeVerPropiedades } from '../utils/propiedadUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    const visibilidad = puedeVerPropiedades(usuario);
    const where = {};
    if (Propiedad.rawAttributes.activa && visibilidad === 'activas') where.activa = true;
    // Si asesor, puede filtrar por sus propias propiedades si lo desea (opcional)
    const propiedades = await Propiedad.findAll({ where });
    res.status(200).json(propiedades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener propiedades', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const visibilidad = puedeVerPropiedades(usuario);
    const propiedad = await Propiedad.findByPk(req.params.id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (Propiedad.rawAttributes.activa && propiedad.activa === false && visibilidad !== 'todas') {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }
    res.status(200).json(propiedad);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener propiedad', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const data = { ...req.body };
    // Si asesor, forzar asesor_id = usuario.id
    if (usuario.rol === 'Asesor') data.asesor_id = usuario.id;
    // Si admin, debe indicar asesor_id
    if (!puedeCrearPropiedad(usuario, data)) {
      return res.status(403).json({ message: 'No tienes permisos para crear propiedades para ese asesor' });
    }
    if (Propiedad.rawAttributes.activa) data.activa = true;
    const nueva = await Propiedad.create(data);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear propiedad', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const propiedad = await Propiedad.findByPk(req.params.id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (!puedeEditarPropiedad(usuario, propiedad)) {
      return res.status(403).json({ message: 'No tienes permisos para editar esta propiedad' });
    }
    await propiedad.update(req.body);
    res.status(200).json(propiedad);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar propiedad', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    const propiedad = await Propiedad.findByPk(req.params.id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (!puedeBorrarPropiedad(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede borrar o deshabilitar propiedades' });
    }
    if (Propiedad.rawAttributes.activa) {
      await propiedad.update({ activa: false });
      return res.status(200).json({ message: 'Propiedad deshabilitada correctamente' });
    } else {
      await propiedad.destroy();
      return res.status(200).json({ message: 'Propiedad eliminada permanentemente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar/deshabilitar propiedad', details: error });
  }
};

export const reactivar = async (req, res) => {
  try {
    const usuario = req.usuario;
    const propiedad = await Propiedad.findByPk(req.params.id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (!puedeBorrarPropiedad(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede reactivar propiedades' });
    }
    if (Propiedad.rawAttributes.activa) {
      await propiedad.update({ activa: true });
      return res.status(200).json({ message: 'Propiedad reactivada correctamente' });
    } else {
      return res.status(400).json({ message: 'No se puede reactivar: el modelo no soporta soft delete' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al reactivar propiedad', details: error });
  }
}; 