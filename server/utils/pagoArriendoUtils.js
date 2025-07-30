export function puedeVerPago(usuario, pago, arriendo) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && arriendo && arriendo.inquilino_id === usuario.id) return true;
  return false;
}

export function puedeCrearPago(usuario, arriendo) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && arriendo && arriendo.inquilino_id === usuario.id) return true;
  return false;
}

export function puedeConfirmarPago(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeEliminarPago(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 