export function puedeVerArriendo(usuario, arriendo) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && arriendo.inquilino_id === usuario.id) return true;
  return false;
}

export function puedeCrearArriendo(usuario, data) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && data.inquilino_id === usuario.id) return true;
  return false;
}

export function puedeActualizarArriendo(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeEliminarArriendo(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 