export function puedeModificarImagen(usuario, propiedad) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador') return true;
  if (usuario.rol === 'Asesor' && propiedad.asesor_id === usuario.id) return true;
  return false;
} 