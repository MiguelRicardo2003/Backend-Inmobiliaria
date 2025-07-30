import Usuario from '../models/Usuario.js';
import TipoRol from '../models/TipoRol.js';
import { validationResult } from 'express-validator';
import { hashPassword } from '../utils/usuarioUtils.js';

export const findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: TipoRol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasenia'] }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const findById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{ model: TipoRol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasenia'] }
    });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error', error });
  }
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { nombre, apellido, correo, celular, contrasenia, rol_id } = req.body;
    const usuarioAuth = req.usuario;
    // Obtener el nombre del rol solicitado
    const rol = await TipoRol.findByPk(rol_id);
    if (!rol) return res.status(400).json({ message: 'Rol no válido' });
    // Si el usuario autenticado no es admin, solo puede crear Cliente
    if (!usuarioAuth || usuarioAuth.rol !== 'Administrador') {
      if (rol.nombre !== 'Cliente') {
        return res.status(403).json({ message: 'Solo un administrador puede crear usuarios con rol distinto de Cliente' });
      }
    }
    // Verificar si el correo ya existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) return res.status(409).json({ message: 'El correo ya está registrado' });
    // Hash de contraseña
    const hash = await hashPassword(contrasenia);
    const nuevo = await Usuario.create({ nombre, apellido, correo, celular, contrasenia: hash, rol_id });
    const usuarioRes = await Usuario.findByPk(nuevo.id, {
      include: [{ model: TipoRol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasenia'] }
    });
    res.status(201).json(usuarioRes);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { nombre, apellido, correo, celular, contrasenia, rol_id } = req.body;
    let updateData = { nombre, apellido, correo, celular, rol_id };
    // Si se actualiza la contraseña, hashearla
    if (contrasenia) {
      updateData.contrasenia = await hashPassword(contrasenia);
    }
    await usuario.update(updateData);
    const usuarioRes = await Usuario.findByPk(usuario.id, {
      include: [{ model: TipoRol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasenia'] }
    });
    res.status(200).json(usuarioRes);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    await usuario.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};
