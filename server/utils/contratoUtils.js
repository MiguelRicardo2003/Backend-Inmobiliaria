export function puedeVerContrato(usuario, contrato, arriendo) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && arriendo && arriendo.inquilino_id === usuario.id) return true;
  return false;
}

export function puedeCrearContrato(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeActualizarContrato(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeEliminarContrato(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 