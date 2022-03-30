import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Card, Button, Col, ListGroup } from "react-bootstrap";
import Calendar from "react-calendar";
import moment from "moment";
import funcs from "../../../utils/utilsFunc";
import api from "../../../api";
import { LoadingModal } from "../../../components/Loading";
import utilsFunc from "../../../utils/utilsFunc";
import { postAgendarVisita } from "../../../action";
import swal from "sweetalert";

export class ReservaHoras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daycalendar: "",
      day: new Date(),
      show: false,
      hora: "",
      bloques: [],
      tramosOcupados: []
    };
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { diaElegido } = this.props;
    const id = funcs.getUrlParameter("idCliente");
    if (prevProps.diaElegido !== diaElegido) {
      const datos = await api.apiGetVisitasClienteByFechaYId(
        id,
        moment(diaElegido).format("YYYY-MM-DD")
      );

      this.setState({
        tramosOcupados: datos.data
      });
    }
  };

  changeDay = async day => {
    const id = funcs.getUrlParameter("id");
    const datos = await api.apiGetVisitasClienteByFechaYId(
      id,
      moment(day).format("YYYY-MM-DD")
    );
    this.setState({
      daycalendar: moment(day),
      day,
      hora: "",
      tramosOcupados: datos.data
    });
  };

  onAddReserva = hora => {
    this.setState({ hora });
  };

  onToggle = () => {
    this.setState({ show: !this.state.show });
  };

  addReservaUsuario = () => {
      const { diaElegido, userId, propiedad, postAgendarVisita } = this.props;
      const { daycalendar, hora } = this.state;

      let dayShowcalendar = daycalendar === "" ? diaElegido : daycalendar;

      let horaInicio = hora.split("-")[0];
      let horaTermino = hora.split("-")[1];
      const { getVisitEventCalendarLink } = utilsFunc;

      let ubicacion = propiedad && `${propiedad.direccionReferencial}, ${propiedad.comuna}`;
      let linkAddToGoogleCalendar = getVisitEventCalendarLink(ubicacion, moment(dayShowcalendar).format("YYYY-MM-DD"), horaInicio, horaTermino, "google");
      let linkAddToOutlookCalendar = getVisitEventCalendarLink(ubicacion, moment(dayShowcalendar).format("YYYY-MM-DD"), horaInicio, horaTermino, "outlook");

      let data = {
        fecha: new Date(moment(dayShowcalendar)),
        clienteId: funcs.getUrlParameter("idCliente"),
        usuarioId: userId,
        dia: moment(dayShowcalendar).isoWeekday(),
        tramo: hora,
        propiedadId: funcs.getUrlParameter("idprop"),
        linkAgregarEventoAGoogleCalendar: linkAddToGoogleCalendar,
        linkAgregarEventoAOutlookCalendar: linkAddToOutlookCalendar
      };

      postAgendarVisita(data);
  };

  feedback = () => {
    const { diaElegido, errorMessage, requestAgendarVisita, onSetDayAndTramo, visitaAgendada } = this.props;
    const { daycalendar, hora } = this.state;

    if (requestAgendarVisita === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestAgendarVisita === "SUCCESS") {
      let dayShowcalendar = daycalendar === "" ? diaElegido : daycalendar;
      onSetDayAndTramo(dayShowcalendar, hora, this.props.nextStep);
    }

    if (requestAgendarVisita === "ERROR") {
      swal(errorMessage, {
        icon: "error",
        buttons: {
          cancel: false,
          confirm: true,
        },
      });
    }

    return null;
  };

  render() {
    const { diaElegido, bloquesDia } = this.props;

    const { daycalendar, tramosOcupados, hora } = this.state;

    let dayNumber = 0;
    let bloquesDay = [];

    dayNumber = moment(new Date(diaElegido)).isoWeekday();
    dayNumber = moment(daycalendar).isoWeekday();

    if (isNaN(dayNumber)) {
      dayNumber = moment(new Date(diaElegido)).isoWeekday();
    }

    if (dayNumber === 1) bloquesDay = bloquesDia.bloques["Lunes"];
    if (dayNumber === 2) bloquesDay = bloquesDia.bloques["Martes"];
    if (dayNumber === 3) bloquesDay = bloquesDia.bloques["Miercoles"];
    if (dayNumber === 4) bloquesDay = bloquesDia.bloques["Jueves"];
    if (dayNumber === 5) bloquesDay = bloquesDia.bloques["Viernes"];
    if (dayNumber === 6) bloquesDay = bloquesDia.bloques["Sabado"];
    if (dayNumber === 7) bloquesDay = bloquesDia.bloques["Domingo"];

    tramosOcupados !== null &&
      tramosOcupados.map(t => {
        bloquesDay = bloquesDay.filter(item => item.tramo !== t);
        return null;
      });

    let dayShowcalendar = diaElegido ? diaElegido : daycalendar;

    let dayOfWeek =
      daycalendar === ""
        ? moment(diaElegido).format("LL")
        : moment(daycalendar).format("LL");

    let HorasReservas = {
      bloques: bloquesDay
    };

    return (
      <Container fluid="true">
        { this.feedback() }
        <section className="section-space reservar-fotografo">
          <Container>
            <Card className="text-center">
              <Card.Body>
                <Card.Img variant="top" src="" />
                <Card.Title>
                  <div className="title-section text-center">
                    <h4 className="h4">Agendar hora de visita</h4>
                  </div>
                </Card.Title>
                <Card.Text>
                  Selecciona a que hora quieres visitar la propiedad
                </Card.Text>

                <Row>
                  <div className="col-md-6">
                    <div className="cont-pagination-arrow">
                      <span className="h4">{dayOfWeek}</span>
                    </div>
                    <div className="cont-btn">
                      {HorasReservas.bloques &&
                        HorasReservas.bloques.map((num, i) => (
                          <Button
                            key={i}
                            onClick={() => this.onAddReserva(num.tramo)}
                            variant="primary"
                            block
                          >
                            {num.tramo}
                          </Button>
                        ))}
                    </div>
                    {HorasReservas.bloques &&
                      HorasReservas.bloques.length <= 0 && (
                        <div className="cont-btn">
                          No hay tramos disponibles para este día
                        </div>
                      )}
                  </div>
                  <div className="col-md-6">
                    <Calendar
                      value={dayShowcalendar && new Date(dayShowcalendar)}
                      minDate={new Date()}
                      onChange={this.changeDay}
                    />
                    <Row>
                      <Col md={12}>
                        <ListGroup>
                          <ListGroup.Item active>Datos Reserva</ListGroup.Item>
                          <ListGroup.Item>Día: {dayOfWeek}</ListGroup.Item>
                          <ListGroup.Item>
                            Hora: {hora}
                          </ListGroup.Item>

                          <ListGroup.Item>
                            {HorasReservas.bloques && (
                              <Button disabled={hora == null || hora == ""} onClick={this.addReservaUsuario}>
                                Confirmar Visita
                              </Button>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  visitaAgendada: state.app.visitaAgendada,
  requestAgendarVisita: state.app.requestAgendarVisita,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = dispatch => ({
  postAgendarVisita: (data) => dispatch(postAgendarVisita(data))
});

ReservaHoras = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservaHoras);

export default ReservaHoras;
