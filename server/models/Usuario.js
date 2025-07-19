import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      apellido: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      correo: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      celular: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      contrasenia: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles', 
          key: 'id'
        }
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'usuarios',
      timestamps: false
    })


export default Usuario;