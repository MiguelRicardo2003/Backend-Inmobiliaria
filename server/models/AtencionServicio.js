import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const AtencionServicio = sequelize.define("AtencionServicio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solicitud_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "solicitudes_servicio",
      key: "id",
    },
    onDelete: "CASCADE"
  },
  atendido_por: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    }
  },
  fecha_atencion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  resultado: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "atenciones_servicio",
  timestamps: false,
});

export default AtencionServicio;
