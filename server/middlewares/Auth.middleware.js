import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No autorizado. Falta token." });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Usa el JWT_SECRET de Supabase
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET 
    );
    req.usuario = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
