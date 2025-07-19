import ImagenPropiedad from '../models/ImagenPropiedad.js';
import Propiedad from '../models/Propiedad.js';
import { validationResult } from 'express-validator';
import { puedeModificarImagen } from '../utils/imagenPropiedadUtils.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const { propiedad_id, url_imagen, orden } = req.body;
    const propiedad = await Propiedad.findByPk(propiedad_id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (!puedeModificarImagen(usuario, propiedad)) {
      return res.status(403).json({ message: 'No tienes permisos para modificar imágenes de esta propiedad' });
    }
    const nueva = await ImagenPropiedad.create({ propiedad_id, url_imagen, orden });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar imagen', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    const imagen = await ImagenPropiedad.findByPk(req.params.id);
    if (!imagen) return res.status(404).json({ message: 'Imagen no encontrada' });
    const propiedad = await Propiedad.findByPk(imagen.propiedad_id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    if (!puedeModificarImagen(usuario, propiedad)) {
      return res.status(403).json({ message: 'No tienes permisos para eliminar imágenes de esta propiedad' });
    }
    await imagen.destroy();
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar imagen', details: error });
  }
};

export const findByPropiedad = async (req, res) => {
  try {
    const { propiedad_id } = req.params;
    const imagenes = await ImagenPropiedad.findAll({ where: { propiedad_id } });
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener imágenes', details: error });
  }
}; 