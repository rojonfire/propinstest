import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import Info from "./Info";
import ReservaDia from "./ReservaDia";
import ReservaHora from "./ReservaHora";
import Confirmacion from "./Confirmacion";
import {
  fetchPostHorarioFoto,
  fetchGetHorarioFoto,
  fetchCleanMsjFoto,
} from "../../../action";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}
initGA();
logPageView();

export class IndexReservaAgendamiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteId: "",
      diaElegido: "",
      bloquesDia: [],
      diaReserva: "",
      tramoReserva: "",
    };
  }

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

  sendToMisVisitas = params => {
    const { history } = this.props;
    history.push("/signin");
  };

  render() {
    const { diaElegido, bloquesDia } = this.state;
    return (
      <Container className="bg-light" fluid={true}>
        <Container className="pa0">
          <div className="overflow-hidden">
            <StepWizard>
              <Info />
              <ReservaDia changeStep={this.changeStepChooseDay} />
              <ReservaHora
                diaElegido={diaElegido}
                bloquesDia={bloquesDia}
                onSetDayAndTramo={this.onSetDayAndTramo}
              />
              <Confirmacion
                sendToMisVisitas={this.sendToMisVisitas}
                diaReserva={this.state.diaReserva}
                tramoReserva={this.state.tramoReserva}
              />
            </StepWizard>
          </div>
        </Container>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  mensajeFotografo: state.app.mensajeFoto,
  horariosFoto: state.app.horariosFoto,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({
  addHorario: values => dispatch(fetchPostHorarioFoto(values)),
  getHorarios: values => dispatch(fetchGetHorarioFoto(values)),
  cleanMsjFoto: () => dispatch(fetchCleanMsjFoto()),
});

IndexReservaAgendamiento = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexReservaAgendamiento);

export default IndexReservaAgendamiento;
