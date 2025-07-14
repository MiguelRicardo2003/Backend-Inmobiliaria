// imports
import express from 'express';
import dotenv from 'dotenv'; 
import { testConnection } from './server/config/database.js';

//const
const app = express() 

//const routes
import tipoPropiedadRoutes from './server/routers/TipoPropiedad.route.js';

//config
dotenv.config()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(`${process.env.API_PREFIX}/tipo_propiedad`, tipoPropiedadRoutes);

testConnection()
app.listen(process.env.PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto: ${process.env.PORT_LOCAL}`);
  });
  