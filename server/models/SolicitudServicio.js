import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const SolicitudServicio = sequelize.define("SolicitudServicio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  servicio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "servicios",
      key: "id"
    }
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id"
    }
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En proceso', 'Finalizado'),
    defaultValue: 'Pendiente'
  }
}, {
  tableName: "solicitudes_servicio",
  timestamps: false
});

export default SolicitudServicio;
