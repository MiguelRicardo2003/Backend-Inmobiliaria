import { sequelize, Sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import TipoUsuario from "./TipoUsuario.js";

const TipoRol = sequelize.define('TipoRol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  }  
}, {
   tableName: 'roles',
   timestamps: false 
})

TipoRol.hasMany(TipoUsuario, { foreignKey: 'rol_id', as: 'usuarios' });

export default TipoRol;