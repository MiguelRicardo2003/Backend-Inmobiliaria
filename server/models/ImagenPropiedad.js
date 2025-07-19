import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const ImagenPropiedad = sequelize.define("ImagenPropiedad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  propiedad_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: "propiedades",
      key: "id",
    },
    onDelete: 'CASCADE' 
  },
  url_imagen: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'imagenes_propiedad',
  timestamps: false
});

export default ImagenPropiedad;
