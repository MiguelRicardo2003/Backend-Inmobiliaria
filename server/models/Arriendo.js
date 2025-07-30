import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Arriendo = sequelize.define("Arriendo", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, 
  },
  propiedad_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "propiedades",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  inquilino_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  precio_mensual: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  deposito: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Finalizado", "Cancelado"),
    allowNull: false,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "arriendos",
  timestamps: false,
});

export default Arriendo;
