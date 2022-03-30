import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import AccountSidebar from "../../components/AccountSidebar";
import {
  getAgendaClienteByPropiedadId,
  getUsuario,
  getVisitasByPropiedadId,
} from "../../action";
import Schedule from "../../components/Schedule";
import moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import utilsFunc from "../../utils/utilsFunc";
import { MESES, DIAS_SEMANA_CORTOS } from "../../utils/constants";
import { Row, Col } from "antd";

class CalendarioPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      isEdit: false,
      showEditModal: false,
      show: false,
      schedule: undefined,
      propiedadId: this.props.location.state.propiedadId,
      agendaCliente: this.props.agendaCliente,
      dateNow: moment(),
    };
    const { getUsuario } = this.props;
    getUsuario();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState({ propiedadId: this.props.location.state.propiedadId });
      const { getAgendaClienteByPropiedadId, getVisitasByPropiedadId } =
        this.props;
      getAgendaClienteByPropiedadId(this.props.location.state.propiedadId);
      getVisitasByPropiedadId(this.props.location.state.propiedadId);
    }
  }

  componentDidMount(props) {
    const { getAgendaClienteByPropiedadId, getVisitasByPropiedadId } =
      this.props;
    getAgendaClienteByPropiedadId(this.props.location.state.propiedadId);
    getVisitasByPropiedadId(this.props.location.state.propiedadId);
  }

  manejarmodal = async () => {
    this.setState({ show: !this.state.show });
  };

  handleCheck = (val) => {
    this.setState({ schedule: val });
  };

  formatVisitas = () => {
    const { visitasUsuario } = this.props;
    let visitasFormatted = [];
    if (
      visitasUsuario != null &&
      visitasUsuario.data != null &&
      visitasUsuario.data.length > 0
    ) {
      const { getWeekday } = utilsFunc;
      visitasUsuario.data.forEach((p) => {
        let fechaSinHora = p.fecha.split(" ")[0];
        let fechaComponents = fechaSinHora.split("-").reverse();
        if (fechaComponents[0].length === 2) {
          fechaComponents[0] = `20${fechaComponents[0]}`;
        }
        let newDateFormat = moment(fechaComponents.join("-"));
        if (newDateFormat.isSameOrAfter(moment().format("YYYY-MM-DD"))) {
          let visita = {
            dia: newDateFormat.date(),
            diaSemana: getWeekday(newDateFormat.day()),
            tramo: p.tramo,
            fechaObj: newDateFormat,
          };
          visitasFormatted.push(visita);
        }
      });
    }
    return visitasFormatted;
  };

  render() {
    const { requestVisitasUsuario } = this.props;
    let visitas = this.formatVisitas();
    let fechas = [];
    visitas.forEach((i) => fechas.push(i.fechaObj.toDate()));
    const { getMonthName } = utilsFunc;

    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        <Row justify="start">
          <Col xs={5} sm={5} md={5} lg={6} xl={6} />
          <Col xs={18} sm={18} md={16} lg={13} xl={9}>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 className="mt-4 mb-2">
                  Calendario
                </h2>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="sub-titulo-perfil">
                  Según la disponibilidad horaria que definas, se agendarán las
                  visitas a tu propiedad.
                </div>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button
                  onClick={() => {
                    this.manejarmodal();
                  }}
                  variant="editarperfil small-padding-buttons small-margin-buttons"
                >
                    Modificar disponibilidad
                </Button>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 className="mt-4 mb-2">
                Próximas visitas
                </h2>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="sub-titulo-perfil">
                  Te recordamos las próximas fechas de visitas a tu propiedad
                </div>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {requestVisitasUsuario === "LOADING" && (
                  <div className="text-center">
                    <Spinner animation="border" />
                  </div>
                )}
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {visitas &&
                visitas.length > 0 &&
                (requestVisitasUsuario === "IDLE" ||
                  requestVisitasUsuario === "SUCCESS") ? (
                  <Row justify="space-between">
                    <Col xs={24} sm={24} md={10} lg={10} xl={10} className="mb-3">
                        {visitas.map((p) => {
                          return (
                            <Card className="card-basic mb-3">
                              <Card.Body className="card-basic-body">
                                <div className="meciosugeri">
                                  {`${getMonthName(
                                    this.state.dateNow.month()
                                  )} ${this.state.dateNow.year()}`}
                                </div>
                                <p className="fondo-valorplan mb-0">
                                  {`${p.diaSemana} ${p.dia}`}
                                </p>
                                <Card.Text>
                                  <div>{p.tramo}</div>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          );
                        })}
                    </Col>
                    <Col xs={24} sm={24} md={13} lg={13} xl={13} >
                      <Card id="profile-calendar" className="card-basic">
                        <Card.Body className="card-basic-body text-center">
                          <DayPicker
                            initialMonth={new Date()}
                            selectedDays={fechas}
                            canChangeMonth={false}
                            months={MESES}
                            weekdaysShort={DIAS_SEMANA_CORTOS}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ) : (
                  <Row justify="start">
                    <Col>
                      <div
                        className={
                          requestVisitasUsuario === "LOADING" ? "d-none" : ""
                        }
                      >
                        No se han agendado visitas a tu propiedad
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={() => this.manejarmodal()}
        >
          <Modal.Header closeButton closeLabel="">
            <Modal.Title className="tituloperfil-modal">
              Horario preferente de visitas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Schedule
              propiedadId={this.state.propiedadId}
              hideButton={false}
              agendaCliente={this.props.agendaCliente}
              onCheck={this.handleCheck}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  userData: state.app.userData,
  agendaCliente: state.app.agendaCliente,
  visitasUsuario: state.app.visitasUsuario,
  requestVisitasUsuario: state.app.requestVisitasUsuario,
});

const mapDispatchToProps = (dispatch) => ({
  getUsuario: () => dispatch(getUsuario()),
  getAgendaClienteByPropiedadId: (propiedadId) =>
    dispatch(getAgendaClienteByPropiedadId(propiedadId)),
  getVisitasByPropiedadId: (idPropiedad) =>
    dispatch(getVisitasByPropiedadId(idPropiedad)),
});

CalendarioPerfil = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarioPerfil);

export default CalendarioPerfil;
