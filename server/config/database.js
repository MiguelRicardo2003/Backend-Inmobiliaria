import { Sequelize } from "sequelize";  
import dotenv from 'dotenv';

dotenv.config()


const isProduction = process.env.NODE_ENV === 'production';


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // solo si no usas certificados válidos
        },
      }
    : {},
  logging: isProduction ? false : console.log, // Desactiva logging en prod
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔐 Conexión segura con PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default {sequelize, testConnection};
