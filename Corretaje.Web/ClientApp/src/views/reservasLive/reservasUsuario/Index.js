import React, { Component } from "react";
import { Container } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import Info from "./Info";
import {
  setInmobiliariaIdState,
  setProyectoIdState,
  fetchGetInmobiliaria,
  cleanInmobiliaria,
  setProyectoData,
} from "../../../action";
import ReservaHoras from "./ReservaHoras";
import Confirmacion from "./Confirmacion";
import api from "../../../api";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

export class IndexReservaAgendamientoLive extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    let inmobiliariaId = props.match.params.id2;
    if (inmobiliariaId) {
      props.dispatch(fetchGetInmobiliaria(inmobiliariaId));
      props.dispatch(setInmobiliariaIdState(inmobiliariaId));
    } else {
      props.dispatch(cleanInmobiliaria());
    }

    this.state = {
      clienteId: "",

      diaElegido: "",
      bloquesDia: [],

      diaReserva: "",
      tramoReserva: "",
      ocupados: [],
      proyectoId: "",
      isInmoLoaded: false,
    };
  }

  componentDidMount = async () => {
    const { dispatch, match, proyectoData } = this.props;
    console.log(
      "IndexReservaAgendamientoLive -> componentDidMount -> match",
      match,
    );
    let proyectoId = match.params.id1;
    let inmobiliariaId = match.params.id2;
    if (proyectoData === undefined) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
    } else if (proyectoData.id !== proyectoId) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
    } else {
      dispatch(setProyectoIdState(proyectoId));
    }
    if (inmobiliariaId) {
      console.log(
        "IndexReservaAgendamientoLive -> componentDidMount -> inmobiliariaId",
        inmobiliariaId,
      );
      dispatch(setInmobiliariaIdState(inmobiliariaId));
      dispatch(fetchGetInmobiliaria(inmobiliariaId));
    } else {
      dispatch(cleanInmobiliaria());
    }
    const ocupados = await api.apiGetAllCitas(proyectoId);
    if (ocupados.length > 0) {
      ocupados.map((cita) => {
        cita.fullFecha = new Date(cita.fecha);
      });
    }
    this.setState({ ocupados });
    initGA();
    logPageView();
  };

  sendToMisVisitas = (params) => {
    const { history } = this.props;
    history.push("/visitas");
  };

  changeStepChooseDay = (day, bloques, cb) => {
    this.setState(
      {
        diaElegido: day,
        bloquesDia: bloques,
      },
      () => {
        cb && cb();
      },
    );
  };

  onSetDayAndTramo = (day, bloque, cb) => {
    this.setState(
      {
        diaReserva: day,
        tramoReserva: bloque,
      },
      () => {
        cb && cb();
      },
    );
  };

  render() {
    const { diaElegido, bloquesDia } = this.state;
    const { history, inmobiliariaId, match } = this.props;
    return (
      <Container fluid="true" className="pa0 paMobile bg-light">
        <StepWizard>
          <Info
            changeStep={this.changeStepChooseDay}
            proyectoId={match.params.id1}
          />
          <ReservaHoras
            diaElegido={diaElegido}
            bloquesDia={bloquesDia}
            onSetDayAndTramo={this.onSetDayAndTramo}
            inmobiliariaId={inmobiliariaId}
            proyectoId={match.params.id1}
            ocupados={this.state.ocupados}
          />
          <Confirmacion
            history={history}
            sendToMisVisitas={this.sendToMisVisitas}
            diaReserva={this.state.diaReserva}
            tramoReserva={this.state.tramoReserva}
            inmobiliariaId={inmobiliariaId}
            proyectoId={match.params.id1}
          />
        </StepWizard>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  inmobiliariaId: state.app.inmobiliariaId,
  proyectoId: state.app.proyectoId,
  proyectoData: state.app.proyectoData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexReservaAgendamientoLive = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexReservaAgendamientoLive);
IndexReservaAgendamientoLive = withLastLocation(IndexReservaAgendamientoLive);

export default IndexReservaAgendamientoLive;
