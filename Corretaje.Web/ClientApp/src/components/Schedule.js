import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import swal from "sweetalert";
import { updateAgendaCliente } from "../action";
import { connect } from "react-redux";
import { LoadingModal } from "./Loading";

const items = {
  Dia: ["Hra", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  Tramos: [
    "08:00-08:30",
    "08:30-09:00",
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "13:00-13:30",
    "13:30-14:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
    "18:00-18:30",
    "18:30-19:00",
    "19:00-19:30",
    "19:30-20:00",
  ],
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckBoxes: new Set(),
      feedbackCheck: {},
    };
  }

  componentDidMount = async () => {
    const { feedbackCheck, selectedCheckBoxes } = this.state;
    const { agendaCliente } = this.props;
    if (agendaCliente && agendaCliente.data) {
      let selected = selectedCheckBoxes;

      Object.keys(agendaCliente.data.bloques).map((item) => {
        let datos = agendaCliente.data.bloques[item];

        datos.map((b) => {
          let dianum = this.getDayNumber(item);
          feedbackCheck[b.tramo + dianum] = true;
          let label = b.tramo + ";" + dianum;
          if (selected.has(label)) {
            selected.delete(label);
          } else {
            selected.add(label);
          }
          return null;
        });

        return null;
      });

      this.setState({
        feedbackCheck,
      });
    }
  };

  getDayNumber = (dia) => {
    if (dia === "Lunes") return 1;
    if (dia === "Martes") return 2;
    if (dia === "Miercoles") return 3;
    if (dia === "Jueves") return 4;
    if (dia === "Viernes") return 5;
    if (dia === "Sabado") return 6;
    if (dia === "Domingo") return 0;
  };

  addTramo = (tramo, dia) => {
    const { feedbackCheck } = this.state;
    feedbackCheck[tramo + "" + dia] = !feedbackCheck[tramo + "" + dia];
    let selected = this.state.selectedCheckBoxes;
    let label = tramo + ";" + dia;
    if (selected.has(label)) {
      selected.delete(label);
    } else {
      selected.add(label);
    }
    this.setState({
      selectedCheckBoxes: selected,
      feedbackCheck,
    });
    this.props.onCheck(this.state.selectedCheckBoxes);
  };

  crearAgendaCliente = async () => {
    const { clienteId, propiedadId, updateAgendaCliente } = this.props;

    let selected = this.state.selectedCheckBoxes;
    let agendaTramos = [];
    selected.forEach((value) => {
      let val = value.split(";");
      agendaTramos.push({
        tramo: val[0],
        dia: val[1],
        clienteId: clienteId,
        propiedadId: propiedadId,
      });
    });

    if (agendaTramos.length <= 0) {
      swal({
        title: "Agenda",
        text: "Debe agregar al menos un tramo!",
        icon: "warning",
        dangerMode: false,
      });
      return;
    } else {
      updateAgendaCliente(agendaTramos);
    }
  };

  renderDias = () => {
    return items.Dia.map((item, i) => {
      return (
        <Col
          className="box-table letra-dias-semana bg-light week
        "
          key={i}
        >
          <div>{item}</div>
        </Col>
      );
    });
  };

  renderTramos = () => {
    const { feedbackCheck } = this.state;
    return items.Tramos.map((tramo, i) => {
      return (
        <Row key={i + tramo}>
          <Col className="box-table2">
            <text className="up-text-horario">{tramo}</text>
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 1] ? true : false}
              onChange={() => this.addTramo(tramo, 1)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 2] ? true : false}
              onChange={() => this.addTramo(tramo, 2)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 3] ? true : false}
              onChange={() => this.addTramo(tramo, 3)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 4] ? true : false}
              onChange={() => this.addTramo(tramo, 4)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 5] ? true : false}
              onChange={() => this.addTramo(tramo, 5)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 6] ? true : false}
              onChange={() => this.addTramo(tramo, 6)}
            />
          </Col>
          <Col className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 0] ? true : false}
              onChange={() => this.addTramo(tramo, 0)}
            />
          </Col>
        </Row>
      );
    });
  };

  feedback = () => {
    const { requestUpdateAgendaCliente } = this.props;

    if (requestUpdateAgendaCliente === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (requestUpdateAgendaCliente === "SUCCESS") {
      swal("Se han actualizado su horario", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }
  };

  render() {
    return (
      <div>
        {this.feedback()}
        {this.props.reservasLive ? (
          <section className="section-space reservar-fotografo">
            <Card className="text-center">
              <Card.Body className="cont-table-mobile">
                <Card.Title>
                  <div className="title-section">
                    <h4 className="h4 title-section">
                      Arma tu disponibilidad semanal
                    </h4>
                  </div>
                </Card.Title>
                <Card.Text>
                  Seleccione la hora y el día que tienes disponible
                </Card.Text>
                <Col md="9" className="center-cont b-table">
                  <Row>{this.renderDias()}</Row>
                  {this.renderTramos()}
                  <Button
                    className="btn btn-primary"
                    onClick={this.crearAgendaCliente}
                  >
                    Confirmar Agenda
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </section>
        ) : (
          <section className="">
            <Card className="text-center">
              <Col md="9" className="b-table w-100">
                <Row>{this.renderDias()}</Row>
                {this.renderTramos()}

                {!this.props.hideButton && (
                  <Button
                    className="btn btn-primary"
                    onClick={this.crearAgendaCliente}
                  >
                    Confirmar Agenda
                  </Button>
                )}
              </Col>
            </Card>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  requestUpdateAgendaCliente: state.app.requestUpdateAgendaCliente,
});

const mapDispatchToProps = (dispatch) => ({
  updateAgendaCliente: (data) => dispatch(updateAgendaCliente(data)),
});

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;
