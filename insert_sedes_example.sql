-- Script para insertar datos de ejemplo de sedes/proyectos
-- Ejecutar después de crear las tablas con Sequelize

-- Insertar proyectos/sedes de ejemplo
INSERT INTO projects (id, nombre, direccion, ciudad, descripcion, estado, fecha_inicio, fecha_fin_estimada, presupuesto, responsable_id, coordenadas, imagen_principal, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  'Sede Principal Medellín',
  'Calle 10 # 45-67, Poblado',
  'Medellín',
  'Sede principal de la empresa en Medellín, ubicada en el corazón del Poblado. Oficinas modernas con excelente ubicación comercial.',
  'activo',
  '2024-01-15',
  '2024-12-31',
  500000000,
  NULL,
  '{"lat": 6.2442, "lng": -75.5812}',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Bogotá Norte',
  'Carrera 15 # 93-45, Chapinero',
  'Bogotá',
  'Sede en Bogotá ubicada en la zona norte, cerca de centros comerciales y zonas residenciales de alto nivel.',
  'activo',
  '2024-02-01',
  '2024-11-30',
  750000000,
  NULL,
  '{"lat": 4.7109, "lng": -74.0721}',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Cali Centro',
  'Calle 15 # 30-45, Granada',
  'Cali',
  'Sede en el centro de Cali, zona comercial y financiera. Excelente conectividad y acceso a servicios.',
  'activo',
  '2024-03-01',
  '2024-10-31',
  400000000,
  NULL,
  '{"lat": 3.4516, "lng": -76.5320}',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Cartagena Histórica',
  'Calle de la Media Luna # 10-15, Centro Histórico',
  'Cartagena',
  'Sede ubicada en el centro histórico de Cartagena, perfecta para turismo y propiedades de lujo.',
  'en_desarrollo',
  '2024-04-01',
  '2025-03-31',
  600000000,
  NULL,
  '{"lat": 10.3932, "lng": -75.4792}',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Barranquilla Norte',
  'Calle 85 # 45-123, Riomar',
  'Barranquilla',
  'Sede en la zona norte de Barranquilla, área residencial de alto nivel con vista al río.',
  'activo',
  '2024-01-01',
  '2024-12-31',
  350000000,
  NULL,
  '{"lat": 10.9685, "lng": -74.7813}',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Bucaramanga Moderna',
  'Calle 45 # 30-67, Cabecera',
  'Bucaramanga',
  'Sede moderna en Bucaramanga, zona de crecimiento empresarial y residencial.',
  'activo',
  '2024-02-15',
  '2024-11-30',
  450000000,
  NULL,
  '{"lat": 7.1253, "lng": -73.1370}',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Pereira Centro',
  'Carrera 8 # 20-45, Centro',
  'Pereira',
  'Sede en el centro de Pereira, zona comercial y de servicios. Excelente ubicación estratégica.',
  'inactivo',
  '2023-06-01',
  '2024-05-31',
  300000000,
  NULL,
  '{"lat": 4.8143, "lng": -75.6946}',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Sede Manizales Universitaria',
  'Calle 66 # 23-45, Palogrande',
  'Manizales',
  'Sede cerca de la Universidad de Caldas, zona universitaria y cultural de Manizales.',
  'activo',
  '2024-01-01',
  '2024-12-31',
  280000000,
  NULL,
  '{"lat": 5.0689, "lng": -75.5174}',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
  NOW(),
  NOW()
);

-- Insertar listas de ejemplo para cada sede
-- Nota: Necesitarás reemplazar los project_id con los IDs reales generados arriba

-- Para obtener los IDs de los proyectos insertados:
-- SELECT id, nombre FROM projects;

-- Ejemplo de inserción de listas (reemplaza PROJECT_ID con el ID real):
/*
INSERT INTO lists (id, nombre, descripcion, color, orden, project_id, estado, created_at, updated_at) VALUES
(
  gen_random_uuid(),
  'Propiedades Disponibles',
  'Propiedades listas para mostrar a clientes',
  '#10B981',
  1,
  'PROJECT_ID_AQUI',
  'activo',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'En Negociación',
  'Propiedades en proceso de negociación',
  '#F59E0B',
  2,
  'PROJECT_ID_AQUI',
  'activo',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Vendidas/Arrendadas',
  'Propiedades ya vendidas o arrendadas',
  '#EF4444',
  3,
  'PROJECT_ID_AQUI',
  'activo',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'En Mantenimiento',
  'Propiedades que requieren mantenimiento',
  '#6B7280',
  4,
  'PROJECT_ID_AQUI',
  'activo',
  NOW(),
  NOW()
);
*/

-- Comentario: Para insertar las listas, primero ejecuta este script para crear las sedes,
-- luego obtén los IDs de las sedes creadas y reemplaza PROJECT_ID_AQUI en el script de listas. 