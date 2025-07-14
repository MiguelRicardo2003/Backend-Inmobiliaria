import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const TipoPropiedad = sequelize.define('TipoPropiedad', {
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
  tableName: 'tipo_propiedades',
  timestamps: false
});

export default TipoPropiedad;