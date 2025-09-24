import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado. Falta token.' });
  }

  // JWT real
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
    req.usuario = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
  