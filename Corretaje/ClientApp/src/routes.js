// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import asyncComponent from "./componentes/AsyncComponent";

import Tables from "./views/Tables";

import IndexListarPropiedades from "./views/Propiedad/ListarPropiedad/Index";
import IndexDatosTasacion from "./views/DatosTasacion";
import ListarInmobiliaria from "./views/Inmobiliaria/ListarInmobiliaria";
import AgregarInmobiliaria from "./views/Inmobiliaria/AgregarInmobiliaria";
import PlanForm from "./views/Plan";
import { AddCliente } from "./views/Cliente/";
import IndexListCliente from "./views/Cliente/ListCliente/Index";
import ListPlan from "./views/Plan/ListPlan";
import IndexListUsuario from "./views/Usuario/ListUsuario/Index";
//import IndexAgregarPropiedad from "./views/Propiedad/AgregarPropiedad/Index";
import IndexUsuario from "./views/Usuario/IndexUsuario";
import Live from "./views/Live";
import Home from "./views/Home";
//AGENDAMIENTO LIVE
import LiveAgenda from "./views/Live/Agenda";
import agendaLive from "./views/Live/AgendaLive";

import IndexListarProyectos from "./views/Proyectos/ListarProyectos/Index";

//import UpdateUsuario from "./views/Usuario/UpdateUsuario";

import AgendaFotografo from "./views/Agendas/AgendaFotografo";
import EditPlan from "./views/Plan/EditPlan";
import FotoGrafo from "./views/Agendas/Fotografo";
import {
  ServiciosList,
  AgregarServicio,
  EditarServicio,
} from "./views/ServicioAdicional";

import { Anfitrion, Cliente } from "./views/Agendas";
import ServicioBase from "./views/ServicioBase";
import IndexSuscripcion from "./views/Suscripcion";
import AgregarEditarSuscripcion from "./views/Suscripcion/AgregarEditarSuscripcion/AgregarEditarSuscripcion";
import IndexReferir from "./views/Referir";
import IndexProximasVisitas from "./views/ProximasVisitas";
import IndexCalendario from "./views/Calendario";
import Leads from "./views/Leads";
import IndexPerfil from "./views/Perfil";
import IndexMisPropiedades from "./views/BrokerPropiedades";
import IndexVendedor from "./views/Vendedor";
import IndexPagos from "./views/Pagos";
import IndexMisEmbajadores from "./views/MisEmbajadores";
import IndexLandingInmobiliaria from "./views/LandingInmobiliarias";
import AgregarEditarLandingInmobiliaria from "./views/LandingInmobiliarias/AgregarEditarLandingInmobiliaria/AgregarEditarLandingInmobiliaria";

const UpdateCliente = asyncComponent(() =>
  import("./views/Cliente/UpdateCliente")
);
const IndexAgregarPropiedad = asyncComponent(() =>
  import("./views/Propiedad/AgregarPropiedad/Index")
);
const IndexAgregarProyecto = asyncComponent(() =>
  import("./views/Proyectos/AgregarProyecto/Index")
);
const UpdateUsuario = asyncComponent(() =>
  import("./views/Usuario/UpdateUsuario")
);

export default [
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/propiedades",
    layout: DefaultLayout,
    component: IndexListarPropiedades,
  },
  {
    path: "/inmobiliarias",
    layout: DefaultLayout,
    component: ListarInmobiliaria,
  },
  {
    path: "/addinmobiliaria",
    layout: DefaultLayout,
    component: AgregarInmobiliaria,
  },
  {
    path: "/updateinmobiliaria/:id",
    layout: DefaultLayout,
    component: AgregarInmobiliaria,
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables,
  },
  {
    path: "/clientes",
    layout: DefaultLayout,
    component: IndexListCliente,
  },
  {
    path: "/planes",
    layout: DefaultLayout,
    component: ListPlan,
  },
  {
    path: "/usuarios",
    layout: DefaultLayout,
    component: IndexListUsuario,
  },
  ,
  {
    path: "/agentes",
    layout: DefaultLayout,
    component: IndexListUsuario,
  },
  {
    path: "/addpropiedad",
    layout: DefaultLayout,
    component: IndexAgregarPropiedad,
  },
  {
    path: "/updatepropiedad/:id",
    layout: DefaultLayout,
    component: IndexAgregarPropiedad,
  },
  {
    path: "/updateCliente/:id",
    layout: DefaultLayout,
    component: UpdateCliente,
  },
  {
    path: "/addcliente",
    layout: DefaultLayout,
    component: AddCliente,
  },
  {
    path: "/addusuario",
    layout: DefaultLayout,
    component: IndexUsuario,
  },
  {
    path: "/updateplan/:id",
    layout: DefaultLayout,
    component: EditPlan,
  },
  {
    path: "/addplan",
    layout: DefaultLayout,
    component: PlanForm,
  },
  {
    path: "/horafoto",
    layout: DefaultLayout,
    component: FotoGrafo,
  },
  {
    path: "/horaanfi",
    layout: DefaultLayout,
    component: Anfitrion,
  },
  {
    path: "/agendas/cliente/:clienteId",
    layout: DefaultLayout,
    component: Cliente,
  },
  {
    path: "/servicioAdicional/list",
    layout: DefaultLayout,
    component: ServiciosList,
  },
  {
    path: "/servicioAdicional/editar/:id",
    layout: DefaultLayout,
    component: EditarServicio,
  },
  {
    path: "/servicioAdicional/agregar",
    layout: DefaultLayout,
    component: AgregarServicio,
  },
  {
    path: "/servicioBase/agregar",
    layout: DefaultLayout,
    component: ServicioBase,
  },
  {
    path: "/updateUsuario/:id",
    layout: DefaultLayout,
    component: UpdateUsuario,
  },
  {
    path: "/agendafoto",
    layout: DefaultLayout,
    component: AgendaFotografo,
  },
  {
    path: "/live",
    layout: DefaultLayout,
    component: Live,
  },
  {
    path: "/liveAgenda",
    layout: DefaultLayout,
    component: LiveAgenda,
  },
  {
    path: "/agendaLive",
    layout: DefaultLayout,
    component: agendaLive,
  },
  {
    path: "/proyectos",
    layout: DefaultLayout,
    component: IndexListarProyectos,
  },
  {
    path: "/addproyecto",
    layout: DefaultLayout,
    component: IndexAgregarProyecto,
  },
  {
    path: "/updateproyecto/:id",
    layout: DefaultLayout,
    component: IndexAgregarProyecto,
  },
  {
    path: "/datostasacion/",
    layout: DefaultLayout,
    component: IndexDatosTasacion,
  },
  {
    path: "/suscripcion/",
    layout: DefaultLayout,
    component: IndexSuscripcion,
  },
  {
    path: "/addsuscripcion",
    layout: DefaultLayout,
    component: AgregarEditarSuscripcion,
  },
  {
    path: "/updatesuscripcion/:id",
    layout: DefaultLayout,
    component: AgregarEditarSuscripcion,
  },
  {
    path: "/referir/",
    layout: DefaultLayout,
    component: IndexReferir,
  },
  {
    path: "/proximas-visitas/",
    layout: DefaultLayout,
    component: IndexProximasVisitas,
  },
  {
    path: "/calendario/",
    layout: DefaultLayout,
    component: IndexCalendario,
  },
  {
    path: "/leads/",
    layout: DefaultLayout,
    component: Leads,
  },
  {
    path: "/perfil/",
    layout: DefaultLayout,
    component: IndexPerfil,
  },
  {
    path: "/mispropiedades/",
    layout: DefaultLayout,
    component: IndexMisPropiedades,
  },
  {
    path: "/vendedores/",
    layout: DefaultLayout,
    component: IndexVendedor,
  },
  {
    path: "/pagos/",
    layout: DefaultLayout,
    component: IndexPagos,
  },
  {
    path: "/misembajadores/",
    layout: DefaultLayout,
    component: IndexMisEmbajadores,
  },
  {
    path: "/landinginmobiliaria/",
    layout: DefaultLayout,
    component: IndexLandingInmobiliaria,
    exact: true,
  },
  {
    path: "/landinginmobiliaria/add",
    layout: DefaultLayout,
    component: AgregarEditarLandingInmobiliaria,
    exact: true,
  },
  {
    path: "/landinginmobiliaria/:id",
    layout: DefaultLayout,
    component: AgregarEditarLandingInmobiliaria,
    exact: true,
  },
];
