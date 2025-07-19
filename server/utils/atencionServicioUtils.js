export function puedeVerAtencion(usuario, atencion, solicitud) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && solicitud && solicitud.usuario_id === usuario.id) return true;
  return false;
}

export function puedeCrearAtencion(usuario) {
  return usuario && usuario.rol === 'Asesor';
}

export function puedeActualizarAtencion(usuario, atencion) {
  return usuario && usuario.rol === 'Asesor' && atencion.atendido_por === usuario.id;
}

export function puedeEliminarAtencion(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 