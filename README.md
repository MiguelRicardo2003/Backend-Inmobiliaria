# JustHome Backend

## Descripción
Backend modular y profesional para una inmobiliaria, construido con Node.js, Express y Sequelize. Implementa arquitectura RESTful, clean code, middlewares robustos y control de acceso por roles.

---

## Estructura de Carpetas
```
Backend-Inmobiliaria/
  server/
    controllers/    # Lógica de negocio por entidad
    models/         # Modelos Sequelize
    routers/        # Rutas RESTful por entidad
    validators/     # Validaciones con express-validator
    middlewares/    # Autenticación, roles, error handler, logger
    utils/          # Lógica auxiliar y permisos
  app.js            # Configuración principal Express
  README.md         # (Este archivo)
```

---

## Entidades y Endpoints REST

| Entidad              | Endpoints principales (prefijo: `${API_PREFIX}`) |
|----------------------|--------------------------------------------------|
| roles                | GET, POST, PUT, DELETE /roles                    |
| usuarios             | GET, POST, PUT, DELETE /usuarios                 |
| auth                 | POST /auth/login, POST /auth/register            |
| tipo_propiedades     | GET, POST, PUT, DELETE /tipo_propiedades         |
| estado_propiedades   | GET, POST, PUT, DELETE /estado_propiedades       |
| propiedades          | GET, POST, PUT, DELETE, PUT /reactivar           |
| imagenes             | POST, DELETE /imagenes, GET /imagenes/propiedad/:propiedad_id |
| arriendos            | GET, POST, PUT, DELETE /arriendos                |
| pagos_arriendo       | GET, POST, PUT, DELETE /pagos                    |
| contratos            | GET, POST, PUT, DELETE /contratos                |
| servicios            | GET, POST, PUT, DELETE /servicios                |
| solicitudes_servicio | GET, POST, PUT, DELETE /solicitudes              |
| atenciones_servicio  | GET, POST, PUT, DELETE /atenciones               |
| ventas_propiedades   | GET, POST, PUT, DELETE /ventas                   |

- Consulta `/info` para ver todos los endpoints y rutas disponibles.

---

## Roles y Permisos
- **Administrador:** Acceso total a todas las entidades y acciones.
- **Asesor:** Puede gestionar propiedades propias, atender solicitudes, registrar ventas, etc.
- **Cliente:** Puede ver propiedades, solicitar arriendos y servicios, subir comprobantes de pago, etc.

---

## Middlewares
- **auth.middleware.js:** Verifica autenticación (preparado para JWT, actualmente simulado para desarrollo).
- **role.middleware.js:** Restringe acceso a rutas según roles permitidos.
- **ErrorHandler.middleware.js:** Manejo global de errores.
- **Logger (morgan):** Logging HTTP de todas las peticiones.

---

## Validaciones
- Todas las rutas POST/PUT usan validadores robustos con express-validator.
- Lógica de permisos y validaciones de negocio en `/utils` y controladores.

---

## Imágenes y Archivos
- Las imágenes de propiedades y comprobantes de pago se manejan como URLs (subidas a un bucket desde el frontend).
- Contratos se almacenan como URLs a PDFs.

---

## Ejecución y Uso
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Configura variables de entorno (`.env`):
   - `API_PREFIX=/api` (o el prefijo que desees)
   - `PORT=3000`
   - `PORT_LOCAL=3000`
   - (y las de tu base de datos)
3. Ejecuta el backend:
   ```bash
   node app.js
   ```
4. Accede a:
   - `http://localhost:3000/` → Estado del backend
   - `http://localhost:3000/api/info` → Endpoints disponibles

---

## Notas y Futuro
- El middleware de autenticación está listo para JWT (solo descomenta y configura cuando lo requieras).
- El backend está preparado para producción, solo agrega CORS, HTTPS y JWT según tus necesidades.
- Puedes extender los permisos y lógica de negocio fácilmente en `/utils` y controladores.

---

¡Listo para escalar y conectar con tu frontend JustHome! 🚀 