# Endpoints para Organización Trello-like de Propiedades

## Base URL
```
http://localhost:3000/api/v1
```

## 1. Proyectos (Sedes)

### Crear Proyecto
```http
POST /projects
Content-Type: application/json

{
  "nombre": "Sede Principal Medellín",
  "direccion": "Calle 10 # 45-67, Poblado",
  "ciudad": "Medellín",
  "descripcion": "Sede principal de la empresa en Medellín",
  "estado": "activo",
  "fecha_inicio": "2024-01-15",
  "fecha_fin_estimada": "2024-12-31",
  "presupuesto": 500000000,
  "responsable_id": "uuid-del-responsable",
  "coordenadas": {
    "lat": 6.2442,
    "lng": -75.5812
  },
  "imagen_principal": "https://example.com/imagen.jpg"
}
```

### Obtener Todos los Proyectos
```http
GET /projects?page=1&limit=10&estado=activo
```

### Obtener Proyecto por ID
```http
GET /projects/{id}
```

### Actualizar Proyecto
```http
PUT /projects/{id}
Content-Type: application/json

{
  "nombre": "Sede Principal Medellín Actualizada",
  "estado": "en_desarrollo"
}
```

### Eliminar Proyecto
```http
DELETE /projects/{id}
```

### Obtener Estructura Completa del Proyecto
```http
GET /projects/{id}/structure
```

## 2. Listas

### Crear Lista
```http
POST /lists
Content-Type: application/json

{
  "nombre": "Propiedades Disponibles",
  "descripcion": "Propiedades listas para mostrar a clientes",
  "color": "#10B981",
  "orden": 1,
  "project_id": "uuid-del-proyecto",
  "estado": "activo"
}
```

### Obtener Todas las Listas
```http
GET /lists?page=1&limit=10&project_id=uuid&estado=activo
```

### Obtener Lista por ID
```http
GET /lists/{id}
```

### Actualizar Lista
```http
PUT /lists/{id}
Content-Type: application/json

{
  "nombre": "Propiedades Disponibles Actualizada",
  "color": "#059669"
}
```

### Eliminar Lista
```http
DELETE /lists/{id}
```

### Reordenar Listas
```http
PUT /lists/reorder/lists
Content-Type: application/json

{
  "lists": [
    { "id": "uuid-lista-1", "orden": 1 },
    { "id": "uuid-lista-2", "orden": 2 },
    { "id": "uuid-lista-3", "orden": 3 }
  ]
}
```

## 3. Propiedades (Funcionalidad Trello)

### Crear Propiedad
```http
POST /propiedades/trello/create
Content-Type: application/json

{
  "titulo": "Apartamento en Poblado",
  "descripcion": "Hermoso apartamento en el corazón del Poblado",
  "precio": 250000000,
  "direccion": "Calle 10 # 45-67, Poblado",
  "metros_cuadrados": 85.5,
  "habitaciones": 2,
  "banos": 2,
  "tipo_id": 1,
  "estado_id": 1,
  "dueno_id": "uuid-del-dueno",
  "list_id": "uuid-de-la-lista",
  "orden": 1
}
```

### Obtener Todas las Propiedades
```http
GET /propiedades/trello/all?page=1&limit=10&list_id=uuid&estado_id=1&tipo_id=1
```

### Obtener Propiedad por ID
```http
GET /propiedades/trello/{id}
```

### Actualizar Propiedad
```http
PUT /propiedades/trello/{id}
Content-Type: application/json

{
  "titulo": "Apartamento en Poblado Actualizado",
  "precio": 260000000
}
```

### Eliminar Propiedad
```http
DELETE /propiedades/trello/{id}
```

### Mover Propiedad entre Listas
```http
PUT /propiedades/trello/{id}/move
Content-Type: application/json

{
  "list_id": "uuid-nueva-lista",
  "orden": 1
}
```

### Reordenar Propiedades
```http
PUT /propiedades/trello/reorder/properties
Content-Type: application/json

{
  "properties": [
    { "id": "uuid-propiedad-1", "list_id": "uuid-lista-1", "orden": 1 },
    { "id": "uuid-propiedad-2", "list_id": "uuid-lista-1", "orden": 2 },
    { "id": "uuid-propiedad-3", "list_id": "uuid-lista-2", "orden": 1 }
  ]
}
```

### Obtener Propiedades por Proyecto
```http
GET /propiedades/trello/project/{project_id}?page=1&limit=10
```

## 4. Respuestas de Ejemplo

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Proyecto creado exitosamente",
  "data": {
    "id": "uuid-del-proyecto",
    "nombre": "Sede Principal Medellín",
    "direccion": "Calle 10 # 45-67, Poblado",
    "ciudad": "Medellín",
    "estado": "activo",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Respuesta con Paginación
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-del-proyecto",
      "nombre": "Sede Principal Medellín",
      "lists": [
        {
          "id": "uuid-de-la-lista",
          "nombre": "Propiedades Disponibles",
          "color": "#10B981",
          "properties": [...]
        }
      ]
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Proyecto no encontrado"
}
```

## 5. Estados y Tipos

### Estados de Proyecto
- `activo`: Proyecto en funcionamiento
- `inactivo`: Proyecto pausado
- `en_desarrollo`: Proyecto en desarrollo

### Estados de Lista
- `activo`: Lista visible y funcional
- `inactivo`: Lista oculta

### Colores de Lista
Usar códigos hexadecimales válidos (ej: `#10B981`, `#F59E0B`, `#EF4444`)

## 6. Flujo de Trabajo Recomendado

1. **Crear Proyecto**: Primero crear la sede/proyecto
2. **Crear Listas**: Crear las listas dentro del proyecto
3. **Crear Propiedades**: Crear propiedades y asignarlas a listas
4. **Mover Propiedades**: Usar drag & drop para mover entre listas
5. **Reordenar**: Actualizar el orden de listas y propiedades

## 7. Notas Importantes

- Las propiedades pueden existir sin estar en una lista (`list_id` puede ser `null`)
- Al eliminar una lista, las propiedades se mantienen pero pierden su `list_id`
- El orden se maneja con números enteros (0, 1, 2, 3...)
- Las coordenadas se almacenan como JSON con `lat` y `lng`
- Todas las fechas deben estar en formato ISO 8601 