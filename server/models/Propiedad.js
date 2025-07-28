import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Propiedad = sequelize.define('Propiedad', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  precio: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metros_cuadrados: {
    type: DataTypes.DECIMAL(6, 2),
  },
  habitaciones: {
    type: DataTypes.INTEGER,
  },
  banos: {
    type: DataTypes.INTEGER,
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipo_propiedades',
      key: 'id',
    },
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estado_propiedades',
      key: 'id',
    },
  },
  dueno_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },
  list_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'lists',
      key: 'id',
    },
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'propiedades',
  timestamps: false,
});

export default Propiedad;
