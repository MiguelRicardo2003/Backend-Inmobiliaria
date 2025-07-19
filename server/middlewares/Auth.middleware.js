// middlewares/auth.middleware.js
// Preparado para JWT, pero con fallback para desarrollo
// Cuando implementes JWT, instala jsonwebtoken y descomenta la lógica

// import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado. Falta token.' });
  }

  // JWT real (descomentar cuando la vaya a usar)
  // const token = authHeader.split(' ')[1];
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.usuario = decoded;
  //   return next();
  // } catch (error) {
  //   return res.status(401).json({ message: 'Token inválido' });
  // }

  // Simulación para pruebas (usuario hardcodeado)
  req.usuario = {
    id: 'uuid-mock',
    rol: 'Administrador'
  };

  next();
}
  