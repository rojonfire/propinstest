import React, { Component } from "react";
import { Container } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { connect } from "react-redux";
import Info from "./Info";
import ReservaHoras from "./ReservaHoras";
import Confirmacion from "./Confirmacion";
import { getAgendaClienteByPropiedadId, getPropiedad } from "../../../action";
import utilfunc from "../../../utils/utilsFunc";

export class IndexReservaAgendamientoUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteId: "",

      diaElegido: "",
      bloquesDia: [],

      diaReserva: "",
      tramoReserva: "",
    };
    const { getAgendaClienteByPropiedadId, getPropiedad } = this.props;
    let id = utilfunc.getUrlParameter("idprop");
    getAgendaClienteByPropiedadId(id);
    getPropiedad(id);
  }

  componentDidMount() {
    const { getAgendaClienteByPropiedadId, getPropiedad } = this.props;
    let id = utilfunc.getUrlParameter("idprop");
    getAgendaClienteByPropiedadId(id);
    getPropiedad(id);
  }

  sendToMisVisitas =() => {
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
    const { propiedad } = this.props;

    return (
      <Container fluid="true" className="pa0 paMobile bg-light">
        <StepWizard>
          <Info
            changeStep={this.changeStepChooseDay}
            agendaCliente={this.props.agendaCliente}
            requestState={this.props.requestAgendaCliente}
            hasBroker={propiedad && propiedad.data && propiedad.data.idBroker ? true : false}
          />
          <ReservaHoras
            diaElegido={diaElegido}
            bloquesDia={bloquesDia}
            onSetDayAndTramo={this.onSetDayAndTramo}
            propiedad={propiedad && propiedad.data}
          />
          <Confirmacion
            sendToMisVisitas={this.sendToMisVisitas}
            diaReserva={this.state.diaReserva}
            tramoReserva={this.state.tramoReserva}
          />
        </StepWizard>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.app,
  agendaCliente: state.app.agendaCliente,
  requestAgendaCliente: state.app.requestAgendaCliente,
  propiedad: state.app.propiedad
});

const mapDispatchToProps = dispatch => ({
  getAgendaClienteByPropiedadId: (propiedadId) => dispatch(getAgendaClienteByPropiedadId(propiedadId)),
  getPropiedad: (propiedadId) => dispatch(getPropiedad(propiedadId))
});

IndexReservaAgendamientoUsuario = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexReservaAgendamientoUsuario);

export default IndexReservaAgendamientoUsuario;
