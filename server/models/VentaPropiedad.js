import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const VentaPropiedad = sequelize.define("VentaPropiedad", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  comprador_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha_venta: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  precio_final: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "ventas_propiedades",
  timestamps: false,
});

export default VentaPropiedad;
