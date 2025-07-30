// imports
import express from 'express';
import dotenv from 'dotenv'; 
import { testConnection } from './server/config/database.js';
import routes from './server/routers/index.js';
import errorHandler from './server/middlewares/ErrorHandler.middleware.js';
import morgan from 'morgan';
import serverless from 'serverless-http';
import cors from 'cors';

//const
const app = express() 

//config
dotenv.config()

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://justhome-frontend.vercel.app/','https://backend-inmobiliaria.vercel.app/'] // Cambiar por tu dominio de frontend
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// routes
app.use(`${process.env.API_PREFIX}`, routes);

//route raiz
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JustHome API funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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

// Test database connection
testConnection();

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
}

// Para Vercel serverless
export default app;
export const handler = serverless(app);
