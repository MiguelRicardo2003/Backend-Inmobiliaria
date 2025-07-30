import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";


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

export default TipoRol;