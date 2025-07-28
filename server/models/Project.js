import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo', 'en_desarrollo'),
    defaultValue: 'activo',
  },
  fecha_inicio: {
    type: DataTypes.DATE,
  },
  fecha_fin_estimada: {
    type: DataTypes.DATE,
  },
  presupuesto: {
    type: DataTypes.DECIMAL(15, 2),
  },
  responsable_id: {
    type: DataTypes.UUID,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },
  coordenadas: {
    type: DataTypes.JSON, // Para almacenar lat/lng
  },
  imagen_principal: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Project; 