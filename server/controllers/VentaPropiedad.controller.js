import VentaPropiedad from '../models/VentaPropiedad.js';
import Propiedad from '../models/Propiedad.js';
import Usuario from '../models/Usuario.js';
import { validationResult } from 'express-validator';
import { puedeVerVenta, puedeCrearVenta, puedeActualizarVenta, puedeEliminarVenta } from '../utils/ventaPropiedadUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let ventas;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      ventas = await VentaPropiedad.findAll();
    } else if (usuario.rol === 'Cliente') {
      ventas = await VentaPropiedad.findAll({ where: { comprador_id: usuario.id } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver ventas' });
    }
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const venta = await VentaPropiedad.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    if (!puedeVerVenta(usuario, venta)) {
      return res.status(403).json({ message: 'No tienes permisos para ver esta venta' });
    }
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeCrearVenta(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede registrar ventas' });
    }
    const { propiedad_id, comprador_id, fecha_venta, precio_final, observaciones } = req.body;
    const propiedad = await Propiedad.findByPk(propiedad_id);
    if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });
    const comprador = await Usuario.findByPk(comprador_id);
    if (!comprador || comprador.rol_id !== 1) return res.status(400).json({ message: 'El comprador debe ser un cliente válido' });
    const nueva = await VentaPropiedad.create({ propiedad_id, comprador_id, fecha_venta, precio_final, observaciones });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar venta', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeActualizarVenta(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede actualizar ventas' });
    }
    const venta = await VentaPropiedad.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    await venta.update(req.body);
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar venta', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarVenta(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar ventas' });
    }
    const venta = await VentaPropiedad.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    await venta.destroy();
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta', details: error });
  }
}; 