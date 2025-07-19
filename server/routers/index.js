import { Router } from 'express';
import dotenv from 'dotenv';

import rolesRoutes from './Roles.routes.js';
import usuariosRoutes from './Usuarios.routes.js';
import tipoPropiedadRoutes from './TipoPropiedad.route.js';
import estadoPropiedadRoutes from './EstadoPropiedad.routes.js';
import propiedadRoutes from './Propiedad.routes.js';
import imagenPropiedadRoutes from './ImagenPropiedad.routes.js';
import arriendoRoutes from './Arriendo.routes.js';
import pagoArriendoRoutes from './PagoArriendo.routes.js';
import contratoRoutes from './Contrato.routes.js';
import servicioRoutes from './Servicio.routes.js';
import solicitudServicioRoutes from './SolicitudServicio.routes.js';
import atencionServicioRoutes from './AtencionServicio.routes.js';
import ventaPropiedadRoutes from './VentaPropiedad.routes.js';
import authRoutes from './Auth.routes.js';

dotenv.config();


const routes = Router();

routes.use('/roles', rolesRoutes);
routes.use('/usuarios', usuariosRoutes);
routes.use('/tipo_propiedades', tipoPropiedadRoutes);
routes.use('/estado_propiedades', estadoPropiedadRoutes);
routes.use('/propiedades', propiedadRoutes);
routes.use('/imagenes', imagenPropiedadRoutes);
routes.use('/arriendos', arriendoRoutes);
routes.use('/pagos', pagoArriendoRoutes);
routes.use('/contratos', contratoRoutes);
routes.use('/servicios', servicioRoutes);
routes.use('/solicitudes', solicitudServicioRoutes);
routes.use('/atenciones', atencionServicioRoutes);
routes.use('/ventas', ventaPropiedadRoutes);
routes.use('/auth', authRoutes);

//route info para ver facil lo que hay en cada ruta
const API_PREFIX = process.env.API_PREFIX || '';
routes.get('/info', (req, res) => {
  const prefix = API_PREFIX.endsWith('/') ? API_PREFIX.slice(0, -1) : API_PREFIX;
  res.json({
    endpoints: [
      { entity: 'roles', routes: [`${prefix}/roles`] },
      { entity: 'usuarios', routes: [`${prefix}/usuarios`] },
      { entity: 'tipo_propiedades', routes: [`${prefix}/tipo_propiedades`] },
      { entity: 'estado_propiedades', routes: [`${prefix}/estado_propiedades`] },
      { entity: 'propiedades', routes: [`${prefix}/propiedades`] },
      { entity: 'imagenes', routes: [`${prefix}/imagenes`], res: "Las imganes van con las propiedades" },
      { entity: 'arriendos', routes: [`${prefix}/arriendos`] },
      { entity: 'pagos', routes: [`${prefix}/pagos`] },
      { entity: 'contratos', routes: [`${prefix}/contratos`] },
      { entity: 'servicios', routes: [`${prefix}/servicios`] },
      { entity: 'solicitudes', routes: [`${prefix}/solicitudes`] },
      { entity: 'atenciones', routes: [`${prefix}/atenciones`] },
      { entity: 'ventas', routes: [`${prefix}/ventas`] },
      // { entity: 'auth', routes: [`${prefix}/auth/login`, `${prefix}/auth/register`] },
    ]
  });
});
// routes.use('/auth', authRoutes); // Se agregará después

export default routes;
