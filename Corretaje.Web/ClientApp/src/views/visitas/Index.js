import React from "react";
import { connect } from "react-redux";
import { fetchGetHorarioFoto, fetchGetVisitas } from "../../action";
import { LoadingModal } from "../../components/Loading";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Badge,
  ButtonToolbar
} from "react-bootstrap";

import moment from "moment";
import icon from "../../utils/images";
import api from "../../api";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}


export class IndexVisitas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Load: false
    };
  }
  componentDidMount = () => {
    const { getVisitas, user } = this.props;

    if (user && user.email) {
      getVisitas(user.userId);
    }
    initGA();
    logPageView();
  };

  componentDidUpdate(prevProps, prevState) {
    const { getVisitas, user, hasDelete } = this.props;
    if (hasDelete && user && user.email) {
      getVisitas(user.userId);
    }
  }

  DeleteVisita = async (id, tipo, cliente, prop) => {
    try {
      this.setState({ Load: true });
      const { getVisitas, user, history } = this.props;
      if (id) {
        await api.apiDeleteVisita(id, tipo);
        if (tipo === "FOTO") {
          history.push("/reserva-fotografo");
        }

        if (tipo === "USER") {
          history.push(`/reserva-usuario?idCliente=${cliente}&idProp=${prop}`);
        }

        getVisitas(user.userId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ Load: false });
    }
  };

  render() {
    const { history, visitas, loading } = this.props;
    const { Load } = this.state;
    return (
      <Container fluid="true" className="bg-light">
        <Container>
          {(loading || Load) && (
            <LoadingModal porcentaje={0} finish={() => void 0} />
          )}
          <Row>
            <Col md="12" className="center-cont paMobile">
              <section className="section-space">
                <div className="title-section text-center">
                  <h4 className="h4">Mis Visitas Agendadas</h4>
                </div>
                {(visitas &&
                  ((visitas.Fotografo && visitas.Fotografo.length > 0) ||
                    (visitas &&
                      visitas.VisitaPropiedad &&
                      visitas.VisitaPropiedad.length > 0))) ||
                (visitas &&
                  visitas.VisitaUsuario &&
                  visitas.VisitaUsuario.length > 0) ? (
                  <ListGroup className="cont-ofertas">
                    <ListGroup.Item className="shadow header">
                      <Col md="12">
                        <Row>
                          <Col md="4" sm="8">
                            <div className="cont-text">
                              <span>Visita</span>
                            </div>
                          </Col>
                          <Col md="3">
                            <span>Anfitrión</span>
                          </Col>
                          <Col md="3">
                            <span>Fecha Agendada</span>
                          </Col>
                          <Col md="2">
                            <span>Acción</span>
                          </Col>
                        </Row>
                      </Col>
                    </ListGroup.Item>

                    {visitas &&
                      visitas.Fotografo.map((item, i) => {
                        return (
                          <ListGroup.Item key={i} className="shadow">
                            <Col md="12">
                              <Row>
                                <Col md="4" sm="8">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <Badge className="text-primary v-badge text-uppercase">
                                        <img
                                          src={icon.VFoto}
                                          alt="visita-fotografo"
                                        />
                                        Visita Fotógrafo
                                      </Badge>
                                      <h6>
                                        Fotografo:{" "}
                                        <strong>{item.nombre}</strong>
                                      </h6>
                                      <span className="adress">
                                        <img src={icon.iconGPS} alt="" />
                                        {item.direccion}
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text anfitrion">
                                      <img src={icon.anfitriones} alt="" />
                                      <span className="h6">SIN ANFITRIÓN</span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <span>
                                        {moment(item.fecha)
                                          .tz("America/Santiago")
                                          .format("LL")}
                                      </span>
                                      <span>
                                        {item.tramo}
                                        hrs
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="cont-data">
                                    <ButtonToolbar>
                                      <Button
                                        variant="warning"
                                        onClick={() =>
                                          this.DeleteVisita(item.id, "FOTO")
                                        }
                                      >
                                        {" "}
                                        Reagendar
                                        <img src={icon.iconCloseWhite} alt="" />
                                      </Button>
                                    </ButtonToolbar>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </ListGroup.Item>
                        );
                      })}

                    {visitas &&
                      visitas.VisitaUsuario.map((item, i) => {
                        return (
                          <ListGroup.Item key={i} className="shadow">
                            <Col md="12">
                              <Row>
                                <Col md="4" sm="8">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <Badge className="text-primary v-badge text-uppercase">
                                        <img
                                          src={icon.VProp}
                                          alt="visita-propiedad"
                                        />
                                        Visitar Propiedad
                                      </Badge>

                                      <span className="adress">
                                        <img src={icon.iconGPS} alt="" />
                                        {item.propiedadDireccion}
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text anfitrion">
                                      <img src={icon.anfitriones} alt="" />
                                      <span className="h6">
                                        {item.anfitrion
                                          ? "CON ANFITRIÓN"
                                          : "SIN ANFITRIÓN"}
                                      </span>
                                      <br />
                                      {item.anfitrion && (
                                        <span className="h6">
                                          Nombre:{" "}
                                          <strong>
                                            {item.anfitrion.nombre}
                                          </strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <span>
                                        {moment(item.fecha)
                                          .tz("America/Santiago")
                                          .format("LL")}
                                      </span>
                                      <span>
                                        {item.tramo}
                                        hrs
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="cont-data">
                                    <ButtonToolbar>
                                      <Button
                                        variant="warning"
                                        onClick={() =>
                                          this.DeleteVisita(
                                            item.id,
                                            "USER",
                                            item.clienteId,
                                            item.propiedadId
                                          )
                                        }
                                      >
                                        {" "}
                                        Reagendar
                                        <img src={icon.iconCloseWhite} alt="" />
                                      </Button>
                                    </ButtonToolbar>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </ListGroup.Item>
                        );
                      })}

                    {visitas &&
                      visitas.VisitaPropiedad.map((item, i) => {
                        return (
                          <ListGroup.Item key={i} className="shadow">
                            <Col md="12">
                              <Row>
                                <Col md="4" sm="8">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <Badge className="text-primary v-badge text-uppercase">
                                        <img
                                          src={icon.VMeProp}
                                          alt="visita-propiedad"
                                        />
                                        Visitan tu Propiedad
                                      </Badge>

                                      <span className="adress">
                                        <img src={icon.iconGPS} alt="" />
                                        {item.propiedadDireccion}
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text anfitrion">
                                      <img src={icon.anfitriones} alt="" />
                                      <span className="h6">
                                        {item.anfitrion
                                          ? "CON ANFITRIÓN"
                                          : "SIN ANFITRIÓN"}
                                      </span>
                                      <br />
                                      {item.anfitrion && (
                                        <span className="h6">
                                          Nombre:{" "}
                                          <strong>
                                            {item.anfitrion.nombre}
                                          </strong>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="cont-data">
                                    <div className="cont-text">
                                      <span>
                                        {moment(item.fecha)
                                          .tz("America/Santiago")
                                          .format("LL")}
                                      </span>
                                      <span>
                                        {item.tramo}
                                        hrs
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="cont-data">
                                    <ButtonToolbar>
                                      <Button
                                        variant="warning"
                                        onClick={() =>
                                          this.DeleteVisita(item.id, "")
                                        }
                                      >
                                        {" "}
                                        Reagendar
                                        <img src={icon.iconCloseWhite} alt="" />
                                      </Button>
                                    </ButtonToolbar>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </ListGroup.Item>
                        );
                      })}
                  </ListGroup>
                ) : (
                  <div className="sin-ofertas">
                    <div className="cont-text">
                      <img src={icon.error} alt="" />
                      <h6 className="h6">Sin visitas agendadas</h6>
                      <button
                        className="back btn"
                        onClick={() => history.push("/profile")}
                      >
                        Volver
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { app } = state;
  return {
    horariosFoto: app.horariosFoto,
    hasDelete: app.hasDelete,
    loading: app.loading,
    ...app
  };
};

const mapDispatchToProps = dispatch => ({
  getHorarios: values => dispatch(fetchGetHorarioFoto(values)),
  getVisitas: email => dispatch(fetchGetVisitas(email)),
  dispatch: action => {
    dispatch(action);
  }
});

IndexVisitas = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexVisitas);

export default IndexVisitas;
