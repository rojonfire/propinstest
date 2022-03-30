import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import api from "./api";
import { Layout } from "./components/Layout";
// Paginas Principales
import { Home } from "./views/Home/Home";
import Whatsapp from "./../src/components/whatsapplink";
import PersonalBroker from "./views/PersonalBroker";
import NavMenu from "./../src/components/NavMenu";
import NavMenuLive from "./../src/components/NavMenuLive";
import { Footer } from "./../src/components/Footer";
import { FooterLive } from "./components/FooterLive";
import { withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import { IndexResultadoBusqueda } from "./views/resultadoBusqueda/Index";
import { IndexInfoProyecto } from "./views/infoProyecto/Index";
import { IndexInfoPropiedad } from "./views/infoPropiedad/Index";
import { IndexReservaAgendamiento } from "./views/reservas/reservasAgendamiento/Index";
import Planes from "./views/Planes";
import Zoom from "./views/Zoom";
import Live from "./views/Live";
import Tour from "./views/Tour";
import IndexContacto from "./views/contacto/Index";
import { IndexPayment } from "./views/payment/success/Index";
import { IndexCompra } from "./views/payment/success/IndexCompra";
import { IndexFail } from "./views/payment/fail/Index";
import IndexModelo from "./views/modelo/Index";

import { IndexInmo } from "./views/Inmobiliarias/index";
import TerminosCondiciones from "./views/TerminosCondiciones/Index";

import IndexReOfertar from "./views/contraOferta/IndexReOfertar";

import Login3 from "./views/LoginNUEVO";
import Login4 from "./views/LoginNUEVOregistro";
import { Marketplace } from "./views/Marketplace/Index";
import { IndexVisitas } from "./views/visitas/Index";
import Tasaciones from "./views/Tasaciones/Index";
import ListaTasaciones from "./views/Tasaciones/lista-tasaciones";
import IndexProfile from "./views/profile/Index";
import IndexReservaAgendamientoUsuario from "./views/reservas/reservasUsuario/Index";
import IndexReservaAgendamientoLive from "./views/reservasLive/reservasUsuario/Index";
import IndexSubirAgenda from "./views/reservas/subirAgenda/Index";
import RateLive from "./views/RateLive/Index";
import IndexRef from "./views/Referir/Index";
import PlanContratado from "./views/gracias/PlanContratado";
import PlanFastContratado from "./views/gracias/PlanFastContratado";
import Prueba from "./views/Test/prueba";

import ProperHome from "./views/ProperHome";
import ReferidoHome from "./views/ReferidoHome";
import Promesa from "./views/ReferidoHome/promesa";
import vender from "./views/vender/index";
import PlanFast from "./views/detalleplanes/planfast";
import PlanSingular from "./views/detalleplanes/plansingular";
import PlanClassic from "./views/detalleplanes/planclassic";
import comprar from "./views/comprar/comprar";
import { setInmobiliariaIdState, fetchGetInmobiliaria } from "./action";
import Error404 from "./views/404/404";
import { pruebapagina } from "./views/pruebapagina/pruebapagina";
import Webpay from "./views/Planes/Webpay";
import MisReferidos from "./views/misReferidos";
import referidosdetalle from "./views/misReferidos/detalle";
import Perfil from "./views/perfil/perfil";
import Caracteristicas from "./views/propiedadescliente/Caracteristicas";
import CalendarioPerfil from "./views/propiedadescliente/Calendario";
import MetricasPerfil from "./views/propiedadescliente/Metricas";
import OfertasPerfil from "./views/propiedadescliente/OfertasResi";
import PlanContratadoPerfil from "./views/propiedadescliente/PlanContratadoPerfil";
import Contrato from "./views/propiedadescliente/Contrato";
import Tasar from "./views/tasar";
import ResultadosTasar from "./views/tasar/resultados";
import OfertasEmitidas from "./views/propiedadescliente/OfertasEmitidas";
import MisDatosBancarios from "./views/embajador/misDatosBancarios";
import ReferirComprador from "./views/embajador/referirComprador";
import ReferirVendedor from "./views/embajador/referirVendedor";
import IndexSignIn from "./views/SignIn";
import LandingInmo from "./views/landingInmo/index";
import graciaslanding from "./views/landingInmo/gracias";

const PrivateRoute = (props) => {
  const { isLoggedIn, path, render } = props;
  let prevURL = window.location.href;
  return isLoggedIn ? (
    <Route path={path} render={render} />
  ) : path.includes("live") ? (
    <Redirect
      to={{
        reinfo: {
          prevURL: "/live" + prevURL.split("/live")[1],
        },
        pathname: "/registronormal",
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/signin",
      }}
    />
  );
};

const publicRoutes = [
  { path: "/", Component: Home },
  { path: "/tasacion", Component: Tasar },
  { path: "/resultado-busqueda", Component: IndexResultadoBusqueda },
  { path: "/quiero-vender", Component: vender },
  { path: "/info-propiedad", Component: IndexInfoPropiedad },
  { path: "/contacto", Component: IndexContacto },
  { path: "/modelo", Component: IndexModelo },
  { path: "/inmobiliarias", Component: IndexInmo },
  { path: "/login", Component: Login3 },
  { path: "/prueba", Component: pruebapagina },
  { path: "/comprar", Component: comprar },
  { path: "/planfast", Component: PlanFast },
  { path: "/planclassic", Component: PlanClassic },
  { path: "/plansingular", Component: PlanSingular },
  { path: "/personalbroker", Component: PersonalBroker },
  { path: "/landing/:pathname", Component: LandingInmo, exact: true },
  { path: "/graciaslanding", Component: graciaslanding },

  { path: "/testeo", Component: Prueba },
  { path: "/registronormal", Component: Login4 },

  { path: "/marketplace", Component: Marketplace },
  { path: "/Referir", Component: IndexRef },
  { path: "/terminosycondiciones", Component: TerminosCondiciones },
  { path: "/success", Component: IndexCompra },
  { path: "/Referir", Component: IndexRef },
  { path: "/fail", Component: IndexFail },
  { path: "/payment", Component: IndexPayment },
  { path: "/webpay", Component: Webpay },
  { path: "/live", Component: Live },
  { path: "/Tour", Component: Tour },
  { path: "/live/:id", Component: Live },
  { path: "/live/info-proyecto/:id1", Component: IndexInfoProyecto },
  { path: "/live/info-proyecto/:id1/:id2", Component: IndexInfoProyecto },
  { path: "/signin", Component: IndexSignIn },
];

const privateRoutes = [
  { path: "/perfil", Component: Perfil },
  { path: "/propiedad/:id/caracteristicas", Component: Caracteristicas },
  { path: "/propiedad/:id/calendario", Component: CalendarioPerfil },
  { path: "/propiedad/:id/metricas", Component: MetricasPerfil },
  { path: "/propiedad/:id/contrato", Component: Contrato },
  { path: "/propiedad/:id/plancontratado", Component: PlanContratadoPerfil },
  { path: "/propiedad/:id/Oferta", Component: OfertasPerfil },
  { path: "/tasaciones", Component: Tasaciones },
  { path: "/PlanContratado", Component: PlanContratado },
  { path: "/PlanFastContratado", Component: PlanFastContratado },
  { path: "/mis-referidos", Component: MisReferidos },
  { path: "/proper-home", Component: ProperHome },
  { path: "/referido-home", Component: ReferidoHome },
  { path: "/promesa", Component: Promesa },
  { path: "/list-tasaciones", Component: ListaTasaciones },
  { path: "/reserva-fotografo", Component: IndexReservaAgendamiento },
  //{ path: "/contraoferta", Component: contraOferta },
  { path: "/reofertar", Component: IndexReOfertar },
  { path: "/visitas", Component: IndexVisitas },
  { path: "/profile", Component: Perfil },
  { path: "/reserva-usuario", Component: IndexReservaAgendamientoUsuario },
  { path: "/subir-agenda", Component: IndexSubirAgenda },
  { path: "/live/room", Component: Zoom },
  { path: "/live/room/:id", Component: Zoom },
  { path: "/live/rate", Component: RateLive },
  { path: "/live/rate/:id1", Component: RateLive },
  { path: "/live/rate/:id1/:id2", Component: RateLive },
  { path: "/live/reserva-usuario", Component: IndexReservaAgendamientoLive },
  { path: "/mis-referidos/detalle", Component: referidosdetalle },
  { path: "/ofertas", Component: OfertasEmitidas },

  {
    path: "/live/reserva-usuario/:id1",
    Component: IndexReservaAgendamientoLive,
  },
  {
    path: "/live/reserva-usuario/:id1/:id2",
    Component: IndexReservaAgendamientoLive,
  },
  { path: "/resultadostasacion", Component: ResultadosTasar },
  { path: "/datos-bancarios", Component: MisDatosBancarios },
  { path: "/referir-vendedor", Component: ReferirVendedor },
  { path: "/referir-comprador", Component: ReferirComprador },
  { path: "/planes", Component: Planes },
];

export class Container extends Component {
  static displayName = Container.name;

  constructor(props) {
    super(props);

    if (props.location && props.location.pathname) {
      let inmobiliariaId = props.location.pathname.split("/");
      if (inmobiliariaId[4]) {
        props.dispatch(fetchGetInmobiliaria(inmobiliariaId[4]));
      }
    }

    this.state = {
      bearerSet: false,
      isSetId: false,
      isSetPId: false,
    };
  }

  componentDidMount = async () => {
    const { location, dispatch } = this.props;

    if (location && location.pathname) {
      let inmobiliariaId = location.pathname.split("/");
      if (inmobiliariaId[4]) {
        dispatch(fetchGetInmobiliaria(inmobiliariaId[4]));
      } else if (inmobiliariaId[3] && inmobiliariaId[2] === "room") {
        const proyecto = await api.apiGetUnProyecto(inmobiliariaId[3]);
        dispatch(fetchGetInmobiliaria(proyecto.inmobiliariaId));
        dispatch(setInmobiliariaIdState(proyecto.inmobiliariaId));
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      auth: { accessToken },
    } = this.props;
    const { bearerSet } = this.state;

    if (accessToken && !bearerSet) {
      this.setState({ bearerSet: true }, () => {
        api.setBearer(accessToken);
      });
    } else if (!accessToken && bearerSet) {
      this.setState({ bearerSet: false }, () => {
        api.setBearer(null);
      });
    }
  }

  render() {
    const {
      auth: { isLoggedIn },
      location,
    } = this.props;

    return (
      <Layout>
        {!location.pathname.includes("live") &&
          !location.pathname.includes("room") && <NavMenu {...this.props} />}
        {location.pathname.includes("live") &&
          !location.pathname.includes("login") &&
          !location.pathname.includes("room") && (
            <NavMenuLive {...this.props} />
          )}
        <Switch>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              exact
              path={path}
              render={(props) => <Component {...props} />}
            />
          ))}

          {privateRoutes.map(({ path, Component }) => (
            <PrivateRoute
              key={path}
              exact
              isLoggedIn={isLoggedIn}
              path={path}
              render={(props) => <Component {...props} />}
            />
          ))}

          <Route path="*" render={() => <Error404 />} />
        </Switch>
        <Whatsapp></Whatsapp>
        {/* {showBot && <ChatBot />} */}
        {!location.pathname.includes("live") &&
          !location.pathname.includes("room") && <Footer {...this.props} />}
        {location.pathname.includes("live/:id") &&
          !location.pathname.includes("login") &&
          !location.pathname.includes("room") && <FooterLive {...this.props} />}
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

export default withLastLocation(
  withRouter(connect((state) => state, mapDispatchToProps)(Container))
);
