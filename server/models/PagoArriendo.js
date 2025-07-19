import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const PagosArriendo = sequelize.define("PagosArriendo", {
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
      key: "id",
    },
    onDelete: "CASCADE",
  },
  fecha_pago: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.ENUM("Pendiente", "Pagado", "Retrasado"),
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "pagos_arriendo",
  timestamps: false,
});

export default PagosArriendo;
