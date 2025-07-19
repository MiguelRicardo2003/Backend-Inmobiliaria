import Usuario from '../models/Usuario.js';
import TipoRol from '../models/TipoRol.js';
import { validationResult } from 'express-validator';
import { hashPassword, comparePassword } from '../utils/usuarioUtils.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { nombre, apellido, correo, celular, contrasenia } = req.body;
    // Buscar el rol Cliente
    const rol = await TipoRol.findOne({ where: { nombre: 'Cliente' } });
    if (!rol) return res.status(500).json({ message: 'No se encontró el rol Cliente' });
    // Verificar si el correo ya existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) return res.status(409).json({ message: 'El correo ya está registrado' });
    // Hash de contraseña
    const hash = await hashPassword(contrasenia);
    const nuevo = await Usuario.create({ nombre, apellido, correo, celular, contrasenia: hash, rol_id: rol.id });
    res.status(201).json({ message: 'Usuario registrado correctamente', usuario: { id: nuevo.id, nombre, apellido, correo, celular, rol: 'Cliente' } });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const login = async (req, res) => {
  const { correo, contrasenia } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo }, include: [{ model: TipoRol, as: 'rol' }] });
    if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });
    const match = await comparePassword(contrasenia, usuario.contrasenia);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
    // Aquí deberías generar y devolver un JWT, pero para ejemplo solo devuelvo datos básicos
    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol ? usuario.rol.nombre : undefined
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
}; 