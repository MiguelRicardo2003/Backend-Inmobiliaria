import TipoRol from "./TipoRol.js";
import Usuario from "./Usuario.js";
import TipoPropiedad from "./TipoPropiedad.js";
import Propiedad from "./Propiedad.js";
import Arriendo from "./Arriendo.js";
import EstadoPropiedad from "./EstadoPropiedad.js";
import Contrato from "./Contrato.js";
import PagosArriendo from "./PagoArriendo.js";
import Servicio from "./Servicio.js";
import SolicitudServicio from "./SolicitudServicio.js";
import ImagenPropiedad from "./ImagenPropiedad.js";

// Definir las relaciones de las tablas
TipoRol.hasMany(Usuario, { foreignKey: "rol_id", as: "usuarios" });
Usuario.belongsTo(TipoRol, { foreignKey: "rol_id", as: "rol" });

//Propiedad y sus relaciones
Propiedad.belongsTo(TipoPropiedad, { foreignKey: "tipo_id", as: "tipo" });
Propiedad.belongsTo(EstadoPropiedad, { foreignKey: "estado_id", as: "estado" });
Propiedad.belongsTo(Usuario, {
  foreignKey: "dueno_id",
  as: "dueno",
});

//Imagen_propiedad  y sus relaciones
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
  foreignKey: "propiedad_id",
  as: "propiedad",
  onDelete: "CASCADE",
});
Propiedad.hasMany(Arriendo, {
  foreignKey: "propiedad_id",
  as: "arriendos",
  onDelete: "CASCADE",
});

Arriendo.belongsTo(Usuario, {
  foreignKey: "inquilino_id",
  as: "inquilino",
});
Usuario.hasMany(Arriendo, {
  foreignKey: "inquilino_id",
  as: "arriendos",
});

//Pagos arriendo y sus relaciones
Arriendo.hasMany(PagosArriendo, {
  foreignKey: "arriendo_id",
  as: "pagos",
  onDelete: "CASCADE",
});
PagosArriendo.belongsTo(Arriendo, {
  foreignKey: "arriendo_id",
  as: "arriendo",
});

//Contratos y sus relaciones
Arriendo.hasOne(Contrato, {
  foreignKey: "arriendo_id",
  as: "contrato",
  onDelete: "CASCADE",
});
Contrato.belongsTo(Arriendo, { foreignKey: "arriendo_id", as: "arriendo" });

//Servicios y sus relaciones
Servicio.hasMany(SolicitudServicio, {
  foreignKey: "servicio_id",
  as: "solicitudes",
});
SolicitudServicio.belongsTo(Servicio, {
  foreignKey: "servicio_id",
  as: "servicio",
});

Usuario.hasMany(SolicitudServicio, {
  foreignKey: "usuario_id",
  as: "solicitudes",
});
SolicitudServicio.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  as: "usuario",
});

// Exportar modelos
export {
  TipoRol,
  Usuario,
  TipoPropiedad,
  EstadoPropiedad,
  ImagenPropiedad,
  Arriendo,
  Contrato,
  PagosArriendo,
  Servicio,
  SolicitudServicio
};
