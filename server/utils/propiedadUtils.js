export function puedeEditarPropiedad(usuario, propiedad) {
  // Admin puede editar todo, asesor solo si es el asignado
  if (!usuario) return false;
  if (usuario.rol === 'Administrador') return true;
  if (usuario.rol === 'Asesor' && propiedad.asesor_id === usuario.id) return true;
  return false;
}

export function puedeBorrarPropiedad(usuario) {
  return usuario && usuario.rol === 'Administrador';
}

export function puedeCrearPropiedad(usuario, data) {
  // Admin puede crear para cualquier asesor, asesor solo para sí mismo
  if (!usuario) return false;
  if (usuario.rol === 'Administrador') return true;
  if (usuario.rol === 'Asesor' && data.asesor_id === usuario.id) return true;
  return false;
}

export function puedeVerPropiedades(usuario) {
  // Admin y asesor pueden ver todas, cliente solo activas
  if (!usuario) return false;
  if (usuario.rol === 'Administrador' || usuario.rol === 'Asesor') return 'todas';
  if (usuario.rol === 'Cliente') return 'activas';
  return 'activas';
} 