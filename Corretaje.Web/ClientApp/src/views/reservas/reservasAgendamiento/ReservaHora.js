import React, { Component } from "react";
import {Container, Button, Card, Row, ListGroup, Col, Form} from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import Calendar from "react-calendar";
import sweetalert from "sweetalert";
import { fetchClienteId } from "../../../action";
import api from "../../../api";
import { LoadingModal } from "../../../components/Loading";



export class ReservaHora extends Component {
  constructor(props) {
    super(props);
   

    this.state = {
      selectedProps: [],
      buttonSelected: [],
      daycalendar: "",
      day: new Date(),
      show: false,
      hora: "",
      bloques: [],
      idFotografo: "",
      direccion: "",
      tramosOcupados: [],
      loading: false
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.onAddReserva= this.onAddReserva.bind(this);
  }

  componentDidMount() {
    const { datosProps } = this.props;
    console.log(
      "TCL: ReservaHora -> componentDidMount -> datosProps",
      datosProps
    );

    if (datosProps) {
      this.setState({
        direccion:
          datosProps.direccion.calle.nombre +
          " " +
          datosProps.direccion.calle.numero +
          ", " +
          datosProps.direccion.comunaNombre +
          ", " +
          datosProps.direccion.regionNombre
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { diaElegido } = this.props;
    if (prevProps.diaElegido !== diaElegido) {
      const datos = await api.apiGetVisitasFotografoByFecha(
        moment(diaElegido).format("YYYY-MM-DD")
      );

      this.setState({
        tramosOcupados: datos.data
      });
    }
  };

  handleDropdownChange(e) {
  
  }

  changeDay = async day => {
    const datos = await api.apiGetVisitasFotografoByFecha(
      moment(day).format("YYYY-MM-DD")
    );

    this.setState(
      {
        daycalendar: moment(day),
        day,
        hora: "",
        tramosOcupados: datos.data
      },
      async () => {}
    );
  };

  onAddReserva = (e) => {
    let bloque1 = document.getElementById("bloqueshora").value;
    this.setState({hora:e.target.value});
  };

  onChangeDireccion = params => {
    this.setState({
      direccion: params.currentTarget.value
    });
  };

  addReservaUsuario = async () => {
    try {
      this.setState({ loading: true });
      const {
        diaElegido,
        idCliente,
        onSetDayAndTramo,
        userId,
        setClienteId
      } = this.props;
      const { daycalendar, hora, idFotografo, direccion } = this.state;

      if (direccion !== "" && hora !== "") {
        let dayShowcalendar = daycalendar === "" ? diaElegido : daycalendar;

        let ClienteID = "";
        
        if (idCliente) {
          ClienteID = idCliente;
        } else {
          ClienteID = userId;
        }

        let datos = {
          fecha: new Date(moment(dayShowcalendar)),
          fotografoId: idFotografo,
          clienteId: ClienteID,
          dia: moment(dayShowcalendar).isoWeekday(),
          tramo: hora,
          direccion: direccion
        };

        let res = await api.apiPostAgendaVisitaFotografo(datos);

        if (res.estado === 1) {
          onSetDayAndTramo(dayShowcalendar, hora, this.props.nextStep);
        }
      } else {
        sweetalert({
          title: "Error",
          text: "Falta incluir una dirección o un tramo horario! ",
          icon: "warning",
          dangerMode: true
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { tramosOcupados } = this.state;
    const { diaElegido, bloquesDia } = this.props;

    const diasSemana = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo"
    ];

    let diasFoto = [];
    bloquesDia.forEach(item => {
      diasSemana.forEach(it => {
        if (item.bloques[it] && item.bloques[it].length > 0) {
          diasFoto.push({
            tramos: item.bloques[it],
            dia: it,
            idFotografo: item.id
          });
        }
      });
    });

    const { daycalendar } = this.state;

    let dayNumber = 0;
    let bloquesDay = "";
    let BloquesForChooseDay = [];

    dayNumber = moment(new Date(diaElegido)).isoWeekday();
    dayNumber = moment(daycalendar).isoWeekday();

    if (isNaN(dayNumber)) {
      dayNumber = moment(new Date(diaElegido)).isoWeekday();
    }

    if (dayNumber === 1) bloquesDay = "Lunes";
    if (dayNumber === 2) bloquesDay = "Martes";
    if (dayNumber === 3) bloquesDay = "Miercoles";
    if (dayNumber === 4) bloquesDay = "Jueves";
    if (dayNumber === 5) bloquesDay = "Viernes";
    if (dayNumber === 6) bloquesDay = "Sabado";
    if (dayNumber === 7) bloquesDay = "Domingo";

    let bloquesChoose = diasFoto.filter(function(diaFoto) {
      return diaFoto.dia === bloquesDay;
    });

    bloquesChoose.forEach(item => {
      item.tramos.forEach(t => {
        BloquesForChooseDay.push({
          tramo: t.tramo,
          id: item.idFotografo
        });
      });
    });

    tramosOcupados !== null &&
      tramosOcupados.map(t => {
        BloquesForChooseDay = BloquesForChooseDay.filter(
          item => item.tramo !== t
        );
        return null;
      });

    let dayShowcalendar = diaElegido ? diaElegido : daycalendar;

    let dayOfWeek =
      daycalendar === ""
        ? moment(diaElegido).format("LL")
        : moment(daycalendar).format("LL");

    let HorasReservas = {
      bloques: BloquesForChooseDay.sort((a, b) =>
        a.tramo > b.tramo ? 1 : b.tramo > a.tramo ? -1 : 0
      )
    };
    console.log(this.props.tramo);

    return (
      <Container fluid="true">
        {this.state.loading && (
          <LoadingModal porcentaje={0} finish={() => void 0} />
        )}
        <section className="section-space reservar-fotografo">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                {" "}
                <div className="title-section text-center">
                  <h4 className="h4">Agendar hora de visita</h4>
                </div>
              </Card.Title>
              <Card.Text>
                Selecciona a que hora quieres que nuestros fotografos visiten tu
                propiedad
              </Card.Text>
              <Row>
                <div className="col-md-6">
                  <div className="cont-pagination-arrow">
                    <span className="h4">{dayOfWeek}</span>
                  </div>

                  <Form.Group
                      className="form-group2 center-box"
                      id="Dormitorios"
                  >
                    <div className="box-select">
                      <Form.Control  as="select" id="bloqueshora"  onChange={(e) => this.onAddReserva(e)}>
                        {HorasReservas.bloques &&
                        HorasReservas.bloques.map((num, i) => (
                                <option key={"id"} value={num.tramo} >
                                  {num.tramo}
                                </option>
                              ))}
                        {console.log(HorasReservas)}
                      </Form.Control>

                    </div>
                  </Form.Group>
                  
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
                        <ListGroup.Item>Hora: {this.state.hora}</ListGroup.Item>
                        <ListGroup.Item>
                          Dirección:{" "}
                          <input
                            type="text"
                            value={this.state.direccion}
                            onChange={this.onChangeDireccion}
                          />{" "}
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Button
                            onClick={this.addReservaUsuario}
                            disabled={this.state.loading}
                          >
                            Confirmar Visita
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.app
});

const mapDispatchToProps = dispatch => ({
  setClienteId: id => dispatch(fetchClienteId(id))
});

ReservaHora = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservaHora);

export default ReservaHora;
