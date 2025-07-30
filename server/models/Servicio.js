import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Servicio = sequelize.define("Servicio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  }
}, {
  tableName: "servicios",
  timestamps: false
});

export default Servicio;
