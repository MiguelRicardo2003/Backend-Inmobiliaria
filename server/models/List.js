import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const List = sequelize.define('List', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  color: {
    type: DataTypes.STRING(7), // Código hexadecimal del color
    defaultValue: '#3B82F6',
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id',
    },
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
  },
}, {
  tableName: 'lists',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default List; 