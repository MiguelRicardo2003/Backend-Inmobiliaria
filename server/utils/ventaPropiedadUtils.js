export function puedeVerVenta(usuario, venta) {
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return true;
  if (usuario.rol === 'Cliente' && venta.comprador_id === usuario.id) return true;
  return false;
}

export function puedeCrearVenta(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeActualizarVenta(usuario) {
  return usuario && (usuario.rol === 'Administrador' || usuario.rol === 'Asesor');
}

export function puedeEliminarVenta(usuario) {
  return usuario && usuario.rol === 'Administrador';
} 