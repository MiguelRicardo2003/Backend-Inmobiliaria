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
import AtencionServicio from "./AtencionServicio.js";
import VentaPropiedad from "./VentaPropiedad.js";
import Project from "./Project.js";
import List from "./List.js";

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

//Atencion servicio y sus relaciones
SolicitudServicio.hasOne(AtencionServicio, {
  foreignKey: 'solicitud_id',
  as: 'atencion',
  onDelete: 'CASCADE'
});
AtencionServicio.belongsTo(SolicitudServicio, {
  foreignKey: 'solicitud_id',
  as: 'solicitud'
});

Usuario.hasMany(AtencionServicio, {
  foreignKey: 'atendido_por',
  as: 'atenciones'
});
AtencionServicio.belongsTo(Usuario, {
  foreignKey: 'atendido_por',
  as: 'atendido'
});

//Venta propiedades y sus relaciones
Propiedad.hasOne(VentaPropiedad, {
  foreignKey: 'propiedad_id',
  as: 'venta',
  onDelete: 'CASCADE',
});
VentaPropiedad.belongsTo(Propiedad, {
  foreignKey: 'propiedad_id',
  as: 'propiedad',
});

Usuario.hasMany(VentaPropiedad, {
  foreignKey: 'comprador_id',
  as: 'ventasRealizadas',
});
VentaPropiedad.belongsTo(Usuario, {
  foreignKey: 'comprador_id',
  as: 'comprador',
});

// Relaciones para Project, List y Property (Trello-like)
Project.hasMany(List, {
  foreignKey: 'project_id',
  as: 'lists',
  onDelete: 'CASCADE',
});
List.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'project',
});

List.hasMany(Propiedad, {
  foreignKey: 'list_id',
  as: 'properties',
  onDelete: 'SET NULL',
});
Propiedad.belongsTo(List, {
  foreignKey: 'list_id',
  as: 'list',
});

Usuario.hasMany(Project, {
  foreignKey: 'responsable_id',
  as: 'projects',
});
Project.belongsTo(Usuario, {
  foreignKey: 'responsable_id',
  as: 'responsable',
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
  SolicitudServicio,
  AtencionServicio,
  VentaPropiedad,
  Project,
  List
};
