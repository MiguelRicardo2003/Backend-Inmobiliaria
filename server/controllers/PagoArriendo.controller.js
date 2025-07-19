import PagoArriendo from '../models/PagoArriendo.js';
import Arriendo from '../models/Arriendo.js';
import { validationResult } from 'express-validator';
import { puedeVerPago, puedeCrearPago, puedeConfirmarPago, puedeEliminarPago } from '../utils/pagoArriendoUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuario = req.usuario;
    let pagos;
    if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') {
      pagos = await PagoArriendo.findAll();
    } else if (usuario.rol === 'Cliente') {
      // Buscar arriendos del cliente
      const arriendos = await Arriendo.findAll({ where: { inquilino_id: usuario.id } });
      const arriendoIds = arriendos.map(a => a.id);
      pagos = await PagoArriendo.findAll({ where: { arriendo_id: arriendoIds } });
    } else {
      return res.status(403).json({ message: 'No tienes permisos para ver pagos' });
    }
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos', details: error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = req.usuario;
    const pago = await PagoArriendo.findByPk(req.params.id);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    const arriendo = await Arriendo.findByPk(pago.arriendo_id);
    if (!puedeVerPago(usuario, pago, arriendo)) {
      return res.status(403).json({ message: 'No tienes permisos para ver este pago' });
    }
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pago', details: error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    const { arriendo_id, fecha_pago, monto, comprobante_url } = req.body;
    const arriendo = await Arriendo.findByPk(arriendo_id);
    if (!arriendo) return res.status(404).json({ message: 'Arriendo no encontrado' });
    if (!puedeCrearPago(usuario, arriendo)) {
      return res.status(403).json({ message: 'No tienes permisos para registrar este pago' });
    }
    // El cliente solo puede crear pagos para sus propios arriendos
    const estado_pago = 'Pendiente';
    const nuevo = await PagoArriendo.create({ arriendo_id, fecha_pago, monto, comprobante_url, estado_pago });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar pago', details: error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = req.usuario;
    if (!puedeConfirmarPago(usuario)) {
      return res.status(403).json({ message: 'Solo un asesor o administrador puede confirmar pagos' });
    }
    const pago = await PagoArriendo.findByPk(req.params.id);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    await pago.update(req.body);
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pago', details: error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = req.usuario;
    if (!puedeEliminarPago(usuario)) {
      return res.status(403).json({ message: 'Solo un administrador puede eliminar pagos' });
    }
    const pago = await PagoArriendo.findByPk(req.params.id);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    await pago.destroy();
    res.status(200).json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pago', details: error });
  }
}; 