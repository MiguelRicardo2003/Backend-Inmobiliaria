import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Contrato = sequelize.define("Contrato", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  arriendo_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "arriendos", 
      key: "id"
    },
    onDelete: "CASCADE"
  },
  url_documento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_firma: {
    type: DataTypes.DATE,
  },
  firmado_por_dueno: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  firmado_por_inquilino: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "contratos",
  timestamps: false
});

export default Contrato;
