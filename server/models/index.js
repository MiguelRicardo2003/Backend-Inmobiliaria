// models/index.js
import TipoRol from "./TipoRol.js";
import TipoUsuario from "./TipoUsuario.js";
import Propiedad from "./Propiedad.js"
import Arriendo from "./Arriendo.js"

// Definir las relaciones de las tablas
TipoRol.hasMany(TipoUsuario, { foreignKey: "rol_id", as: "usuarios" });
TipoUsuario.belongsTo(TipoRol, { foreignKey: "rol_id", as: "rol" });
Propiedad.belongsTo(TipoPropiedad, { foreignKey: "tipo_id", as: "tipo" });
Propiedad.belongsTo(EstadoPropiedad, { foreignKey: "estado_id", as: "estado" });
Propiedad.belongsTo(TipoUsuario, {
  foreignKey: "dueno_id",
  as: "dueno",
});

Propiedad.hasMany(ImagenPropiedad, {
  foreignKey: "propiedad_id",
  as: "imagenes",
  onDelete: "CASCADE",
});

ImagenPropiedad.belongsTo(Propiedad, {
  foreignKey: "propiedad_id",
  as: "propiedad",
});

// Arriendos y relaciones
Arriendo.belongsTo(Propiedad, {
  foreignKey: 'propiedad_id',
  as: 'propiedad',
  onDelete: 'CASCADE',
});
Propiedad.hasMany(Arriendo, {
  foreignKey: 'propiedad_id',
  as: 'arriendos',
  onDelete: 'CASCADE',
});

Arriendo.belongsTo(TipoUsuario, {
  foreignKey: 'inquilino_id',
  as: 'inquilino',
});
TipoUsuario.hasMany(Arriendo, {
  foreignKey: 'inquilino_id',
  as: 'arriendos',
});

// Exportar modelos
export { TipoRol, TipoUsuario, TipoPropiedad, EstadoPropiedad, ImagenPropiedad };
