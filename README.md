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
  vercel.json       # Configuración para despliegue en Vercel
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

### Desarrollo Local
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Configura variables de entorno:
   ```bash
   cp env.example .env
   # Edita .env con tus valores locales
   ```
3. Variables de entorno requeridas:
   - `API_PREFIX=/api` (o el prefijo que desees)
   - `PORT=3000`
   - `NODE_ENV=development`
   - Configuración de PostgreSQL (PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD)
4. Ejecuta el backend:
   ```bash
   npm run dev
   ```
5. Accede a:
   - `http://localhost:3000/` → Estado del backend
   - `http://localhost:3000/api/info` → Endpoints disponibles

### Despliegue en Vercel

1. **Preparación:**
   - El proyecto ya está configurado para Vercel con `vercel.json`
   - Usa `serverless-http` para funcionamiento serverless

2. **Configuración de variables de entorno en Vercel:**
   - Ve al dashboard de Vercel
   - En tu proyecto, ve a Settings > Environment Variables
   - Agrega las siguientes variables:
     ```
     API_PREFIX=/api
     NODE_ENV=production
     PG_HOST=tu_host_produccion
     PG_PORT=5432
     PG_DATABASE=tu_database_produccion
     PG_USERNAME=tu_usuario_produccion
     PG_PASSWORD=tu_password_produccion
     ```

3. **Despliegue:**
   ```bash
   vercel --prod
   ```

4. **Verificación:**
   - Tu API estará disponible en: `https://tu-proyecto.vercel.app/`
   - Endpoints en: `https://tu-proyecto.vercel.app/api/info`

---

## Notas y Futuro
- El middleware de autenticación está listo para JWT (solo descomenta y configura cuando lo requieras).
- El backend está preparado para producción con configuración serverless.
- Puedes extender los permisos y lógica de negocio fácilmente en `/utils` y controladores.

---

¡Listo para escalar y conectar con tu frontend JustHome! 🚀 