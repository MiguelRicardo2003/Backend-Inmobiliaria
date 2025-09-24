import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      }
    : {},
  logging: isProduction ? false : console.log,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("🔐 Conexión con Supabase establecida correctamente.");
    process.exit(0);
  } catch (error) {
<<<<<<< HEAD
    console.error("❌ No se pudo conectar a la base de datos:", error.message);
    process.exit(1);
=======
    console.error("❌ No se pudo conectar a la base de datos:", error);
    
    // En producción, no salir del proceso para evitar que falle el despliegue
    if (isProduction) {
      console.log("⚠️ Continuando sin conexión a base de datos en producción...");
      return false;
    } else {
      // Solo salir en desarrollo
      process.exit(1);
    }
>>>>>>> cc116e0733f66232f1c7a57af89492e92d840fa6
  }
  return true;
};

export { sequelize, testConnection };
