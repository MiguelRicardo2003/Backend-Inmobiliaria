// imports
import express from 'express';
import dotenv from 'dotenv'; 
import { testConnection } from './server/config/database.js';
import routes from './server/routers/index.js';
import errorHandler from './server/middlewares/ErrorHandler.middleware.js';
import morgan from 'morgan';
//const
const app = express() 

//config
dotenv.config()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.use(`${process.env.API_PREFIX}`, routes);

//route raiz
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JustHome API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

app.use(errorHandler);

testConnection()
app.listen(process.env.PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto: ${process.env.PORT_LOCAL}`);
  });
  