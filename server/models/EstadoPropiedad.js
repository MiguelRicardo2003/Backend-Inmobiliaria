import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const EstadoPropiedad = sequelize.define('EstadoPropiedad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'estado_propiedades',
  timestamps: false
});

export default EstadoPropiedad;