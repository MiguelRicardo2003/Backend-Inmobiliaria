export function puedeVerSolicitud(usuario, solicitud) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && solicitud.usuario_id === usuario.id) return true;
  return false;
}

export function puedeCrearSolicitud(usuario, data) {
  if (!usuario) return false;
  if (usuario.rol === 'Cliente' && data.usuario_id === usuario.id) return true;
  return false;
}

export function puedeActualizarSolicitud(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeEliminarSolicitud(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 