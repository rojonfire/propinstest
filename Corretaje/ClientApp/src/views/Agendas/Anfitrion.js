/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Col,
  Row,
  Alert,
  Card,
  CardBody,
  CardHeader,
} from "shards-react";

import {
  fetchGetAllAgendas,
  fetchUpdateAgendasWithAnfitrion,
  initializeMensaje,
} from "../../action";
import PageTitle from "../../components/common/PageTitle";
class Anfitrion extends Component {
  state = { update: false };

  diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  componentDidMount() {
    const { getAgendas, initMensaje } = this.props;
    getAgendas();
    initMensaje();
  }

  userFeedBack = () => {
    const { mensaje } = this.props;

    if (!mensaje || Object.keys(mensaje).length === 0) {
      return null;
    }
    if (mensaje === "Secuencia correcta") {
      return <Alert bsStyle={"success"}>Horarios agendados</Alert>;
    } else {
      return <Alert bsStyle={"danger"}>Ocurrio un error</Alert>;
    }
  };

  agendaAnfitrion = (params) => {
    const { usr, updateAgenda } = this.props;
    params.anfitrion = {
      id: usr.Usr.userId,
      nombre: usr.Usr.Nombres,
      rut: usr.Usr.Rut,
    };

    let tramos = [];
    tramos.push(params);

    updateAgenda(tramos);
  };

  renderButtons = () => {
    const { agendas } = this.props;

    if (agendas.length > 0) {
      return agendas.map((agenda) => {
        if (!agenda.anfitrion) {
          const fechaFormateada =
            new Date(agenda.fecha).getDate() +
            "/" +
            new Date(agenda.fecha).getFullYear();
          return (
            <tr key={agenda.id} theme="info" value={agenda}>
              <td>{this.diasSemana[agenda.dia]}</td>
              <td>{fechaFormateada}</td>
              <td>{agenda.tramo}</td>
              <td>
                <Button
                  theme="warning"
                  onClick={() => this.agendaAnfitrion(agenda)}
                >
                  Tomar Tramo
                </Button>
              </td>
            </tr>
          );
        }

        return null;
      });
    } else {
      return null;
    }
  };

  render() {
    const { agendas } = this.props;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Toma Tramo Anfitrión"
            subtitle="Anfitrión"
            className="text-sm-left"
          />
        </Row>

        {agendas && agendas.length > 0 ? (
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Favor seleccione un dia disponible</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          Dia
                        </th>

                        <th scope="col" className="border-0">
                          Fecha
                        </th>
                        <th scope="col" className="border-0">
                          Tramo
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>{this.renderButtons()}</tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <label>No hay días agendados</label>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agendas: state.app.agendas,
    usr: state.app.itemUsuario[0],
    mensaje: state.app.mensaje,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAgendas: () => dispatch(fetchGetAllAgendas()),
    updateAgenda: (agenda) => dispatch(fetchUpdateAgendasWithAnfitrion(agenda)),
    initMensaje: () => dispatch(initializeMensaje()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Anfitrion);
