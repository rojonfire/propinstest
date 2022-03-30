import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import api from "../../../api";
import { setUser } from "../../../action";
import swal from "sweetalert";

const items = {
  Dia: ["Hora", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  Tramos: [
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00"
  ]
};

export class IndexReservaAgendamientoUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckBoxes: new Set(),
      feedbackCheck: {}
    };
  }

  componentDidMount = async () => {
    const { clienteId, userId, setUser } = this.props;

    if (!clienteId && userId) {
      const getUser = await api.apiGetUsuarioById(userId);
      const user = getUser.data;
      setUser(user);
    }

    const { feedbackCheck, selectedCheckBoxes } = this.state;
    let bloques = await api.apiGetAgendaCliente(clienteId);
    if (bloques && bloques.data) {
      let selected = selectedCheckBoxes;

      Object.keys(bloques.data.bloques).map(item => {
        let datos = bloques.data.bloques[item];

        datos.map(b => {
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
        feedbackCheck
      });
    }
  };

  getDayNumber = dia => {
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
      feedbackCheck
    });
    this.handleCheck(this.state.selectedCheckBoxes);
  };

  crearAgendaCliente = async () => {
    const { clienteId } = this.props;

    let selected = this.state.selectedCheckBoxes;
    let agendaTramos = [];
    selected.forEach(value => {
      let val = value.split(";");
      agendaTramos.push({
        tramo: val[0],
        dia: val[1],
        clienteId: clienteId
      });
    });

    if (agendaTramos.length <= 0) {
      swal({
        title: "Agenda",
        text: "Debe agregar al menos un tramo!",
        icon: "warning",
        dangerMode: false
      });
      return;
    }

    try {
      let res = await api.apiPostArmaAgendaCliente(agendaTramos);

      if (res && res.estado === 1) {
        swal({
          title: "Agenda",
          text: "Horario ingresado exitosamente!",
          icon: "success",
          dangerMode: false
        }).then(() => {
          const { history } = this.props;
          history.push("/profile");
        });
      } else if (res && res.estado === 0) {
        swal({
          title: "Agenda",
          text: "Error, vuelva a intertarlo",
          icon: "warning",
          dangerMode: false
        });
      }
    } catch (e) {
      swal({
        title: "Agenda",
        text: "Error, vuelva a intertarlo",
        icon: "warning",
        dangerMode: false
      });
    }
  };

  renderDias = () => {
    return items.Dia.map((item, i) => {
      return (
        <Col
          className="box-table bg-light week
        "
          key={i}
        >
          <span>{item}</span>
        </Col>
      );
    });
  };

  renderTramos = () => {
    const { feedbackCheck } = this.state;
    return items.Tramos.map((tramo, i) => {
      return (
        <Row key={i + tramo}>
          <Col className="box-table">
            <span>{tramo}</span>
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

  handleCheck = (values) => {
    console.log("check!!");
    this.props.onCheck(values);
  }

  render() {
    return (
      <Container>
        <section className="">
          <Card className="text-center">
            <Col md="9" className=" b-table">
                <Row>{this.renderDias()}</Row>
                {this.renderTramos()}

                { !this.props.hideButton && (
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.app.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

IndexReservaAgendamientoUsuario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexReservaAgendamientoUsuario);

export default IndexReservaAgendamientoUsuario;
