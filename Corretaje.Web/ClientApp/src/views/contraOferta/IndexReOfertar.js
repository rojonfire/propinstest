import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Badge,
  ButtonToolbar,
  Alert
} from "react-bootstrap";
import icon from "../../utils/images";
import { LoadingModal } from "../../components/Loading";
import utilfunc from "../../utils/utilsFunc";
import ModalAval from "./ModalAval";
import api from "../../api";
import swal from "sweetalert";
import Countdown from "react-countdown-now";
import moment from "moment";
import "moment-timezone";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}


export class IndexReOfertar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monto: 0,
      montoFormat: 0,
      show: false,
      ofertas: [],
      ofertasFetched: false,
      feedbackByOfertaId: {},
      loading: true
    };
  }

  componentDidMount = async () => {
    this.ofertasPropiedades();
    initGA();
    logPageView();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { user } = this.props;
    const { ofertasFetched } = this.state;
    if (Object.entries(user).length && !ofertasFetched) {
      await this.ofertasPropiedades();
    }
  };

  ofertasPropiedades = async () => {
    const { user } = this.props;

    if (Object.entries(user).length) {
      this.setState({ loading: true, ofertasFetched: true }, async () => {
        try {
          const {
            data: ofertas
          } = await api.apiGetOfertasPropiedadesByOfertador(user.userId);
          this.setState({ ofertas });
        } catch (error) {
          console.error("error: ", error);
        } finally {
          this.setState({ loading: false });
        }
      });
    }
  };

  aceptarOfertaUsuario = async (ofertaId, estado, tipoContrato) => {
    const { feedbackByOfertaId } = this.state;
    feedbackByOfertaId[ofertaId] = "Loading...";

    this.setState({ feedbackByOfertaId }, async () => {
      try {
        let data;
        if (estado === 3) {
          data = await api.apiUpdateOfertaMonto(ofertaId, this.state.monto, 0);
        } else {
          data = await api.apiUpdateOferta(ofertaId, estado, tipoContrato);
        }

        if (data && data.estado === 1) {
          this.ofertasPropiedades();
          delete feedbackByOfertaId[ofertaId];
        } else if (data && data.estado === 0) {
          swal({
            title: "Oferta",
            text: data.mensaje,
            icon: "warning",
            dangerMode: true
          });
          delete feedbackByOfertaId[ofertaId];
        } else {
          feedbackByOfertaId[ofertaId] = "No se pudo completar la solicitud";
        }
      } catch (error) {
        console.error("error: ", error);
        feedbackByOfertaId[ofertaId] = "Error al procesar la solicitud!";
      } finally {
        this.setState({ feedbackByOfertaId });
      }
    });
  };

  aceptarOferta = async ofertaId => {
    const { feedbackByOfertaId } = this.state;
    feedbackByOfertaId[ofertaId] = "Loading...";

    this.setState({ feedbackByOfertaId }, async () => {
      try {
        let dato = await api.apiUpdateOfertaMonto(
          ofertaId,
          this.state.monto,
          1
        );

        if (dato && dato.estado === 1) {
          this.ofertasPropiedades();
          delete feedbackByOfertaId[ofertaId];
        } else if (dato && dato.estado === 0) {
          swal({
            title: "Oferta",
            text: dato.mensaje,
            icon: "warning",
            dangerMode: true
          });
          delete feedbackByOfertaId[ofertaId];
        } else {
          feedbackByOfertaId[ofertaId] = "No se pudo completar la solicitud";
        }
      } catch (error) {
        console.error("error: ", error);
        feedbackByOfertaId[ofertaId] = "Error al procesar la solicitud!";
      } finally {
        this.setState({ feedbackByOfertaId });
      }
    });
  };

  declinarOfertas = async ofertaId => {
    const { feedbackByOfertaId } = this.state;
    feedbackByOfertaId[ofertaId] = "Loading...";

    this.setState({ feedbackByOfertaId }, async () => {
      try {
        const { data } = await api.apiUpdateOferta(ofertaId, 1);

        if (data && data.id) {
          this.ofertasPropiedades();
          delete feedbackByOfertaId[ofertaId];
        } else {
          feedbackByOfertaId[ofertaId] = "No se pudo completar la solicitud";
        }
      } catch (error) {
        console.error("error: ", error);
        feedbackByOfertaId[ofertaId] = "Error al procesar la solicitud!";
      } finally {
        this.setState({ feedbackByOfertaId });
      }
    });
  };

  changeMonto = cp => {
    let value = cp.currentTarget.value;
    if (value.indexOf(".") > -1) value = value.replace(/./g, "");

    if (/^[0-9]+$/.exec(value)) {
      this.setState({ monto: cp.currentTarget.value });
      cp.currentTarget.value = utilfunc.formatNumeros(cp.currentTarget.value);
    } else {
      this.setState({ monto: 0 });
      cp.currentTarget.value = 0;
    }
  };

  getContrato = params => {
    const { feedbackByOfertaId } = this.state;
    feedbackByOfertaId[params.id] = "Loading...";

    let fechaTermino = new Date();
    fechaTermino = fechaTermino.setDate(fechaTermino.getDate() + 360);

    let dato = {
      fechaInicio: new Date(),
      fechaTermino: new Date(fechaTermino),
      montoGarantiaArriendo: 0,
      montoUf: params.montoDeOferta,
      idCliente: params.propietarioId,
      idPropiedad: params.publicacionId,
      idUsuario: params.ofertadorId,
      idTipoContrato: params.descripcion,
      mesesPeriodoDeRenovacion: "12",
      idOferta: params.id
    };

    this.setState({ feedbackByOfertaId }, async () => {
      try {
        let data = null;
        if (params.descripcion === "Venta") {
          data = await api.apiGetContratoVenta(dato);
        } else {
          data = await api.apiGetContratoArriendo(dato);
        }

        if (data && data.value && data.value.estado === 1) {
          utilfunc.downloadPDFfromBase64({
            base64: data.value.data,
            filename: params.descripcion
          });
          delete feedbackByOfertaId[params.id];
        } else {
          feedbackByOfertaId[params.id] = "No se pudo completar la solicitud";
        }
      } catch (error) {
        console.error("error: ", error);
        feedbackByOfertaId[params.id] = "Error al procesar la solicitud!";
      } finally {
        this.setState({ feedbackByOfertaId });
      }
    });
  };

  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "Expiró";
    } else {
      // Render a countdown
      return (
        <div className="time">
          <span>
            {days}
            <span>D</span>
          </span>
          <span>
            {hours}
            <span>H</span>
          </span>
          <span>
            {minutes}
            <span>M</span>
          </span>
          <span>
            {seconds}
            <span>S</span>
          </span>
        </div>
      );
    }
  };

  renderOfertas = () => {
    const { ofertas, feedbackByOfertaId } = this.state;

    return ofertas.map(item => {
      const {
        id,
        descripcion,
        propiedadGlosa,
        propiedadComuna,
        montoDePublicacion,
        oferenteNombre,
        oferenteRut,
        montoDeOferta,
        estado,
        emitidaPor,
        createdAt
      } = item;

      let cur = moment(new Date());
      let end = moment(createdAt).add({ days: 2 });

      const countdown = end.diff(cur);

      return (
        <ListGroup.Item key={id} className="shadow">
          <Col md="12">
            <Row>
              <Col md="3" sm="8">
                <div className="cont-data">
                  <div className="cont-text">
                    <Badge variant="primary">{descripcion}</Badge>
                    <h2 className="h5">{propiedadGlosa}</h2>
                    <span>{propiedadComuna}</span>
                    <span className="text-success">
                      UF {utilfunc.formatNumeros(montoDePublicacion)}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md="2" sm="8">
                <div className="cont-data">
                  <div className="cont-text">
                    <span className="text-transform h6">{oferenteNombre}</span>
                    <span>RUT: {oferenteRut}</span>
                  </div>
                </div>
              </Col>
              <Col md="2">
                <div className="cont-data">
                  <div className="cont-text">
                    <span className="h5 text-success">
                      UF {utilfunc.formatNumeros(montoDeOferta)}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md="3">
                {!feedbackByOfertaId[item.id] && (
                  <div className="cont-data">
                    {estado === 5 || estado === 4 ? (
                      <div className="cont-text">
                        <Button
                          variant="primary"
                          onClick={() => this.getContrato(item)}
                        >
                          Obtener Contrato
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                    {estado === 1 ? (
                      <div className="cont-text">
                        <Alert variant="danger">Oferta Declinada</Alert>
                      </div>
                    ) : (
                      ""
                    )}

                    {estado === 3 || estado === 2 ? (
                      <div className="cont-text">
                        <div className="cont-monto">
                          <ButtonToolbar>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="agregar nueva oferta (UF)"
                              onBlur={this.changeMonto}
                            />
                            <div className="btn-box-oferta">
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => this.aceptarOferta(id)}
                              >
                                Contra Oferta{" "}
                                <img src={icon.iconCloseWhite} alt="" />
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => this.declinarOfertas(id)}
                              >
                                Rechazar Oferta{" "}
                                <img src={icon.iconDislikeWhite} alt="" />
                              </Button>
                              {emitidaPor === 0 && (
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() =>
                                    this.aceptarOfertaUsuario(
                                      id,
                                      0,
                                      descripcion
                                    )
                                  }
                                >
                                  Aceptar Oferta{" "}
                                  <img src={icon.iconCheckWhite} alt="" />
                                </Button>
                              )}
                            </div>
                          </ButtonToolbar>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {feedbackByOfertaId[id] && (
                  <div>
                    <div className="cont-data">{feedbackByOfertaId[id]}</div>
                  </div>
                )}
              </Col>
              <Col md="2">
                <div className="cont-data">
                  <div className="cont-text">
                    <span>
                      {estado === 1 ||
                      estado === 0 ||
                      estado === 4 ||
                      estado === 5 ? (
                        "Terminada"
                      ) : (
                        <Countdown
                          date={Date.now() + countdown}
                          renderer={this.renderer}
                          onComplete={() => this.declinarOfertas(id)}
                        />
                      )}
                    </span>
                    <span className="date">
                      <span className="small">fecha oferta realizada</span>
                      <span>
                        {moment(createdAt)
                          .tz("America/Santiago")
                          .format("DD-MM-YYYY HH:MM")}
                      </span>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </ListGroup.Item>
      );
    });
  };

  render() {
    const { history } = this.props;
    const { ofertas, loading } = this.state;
    return (
      <Container fluid="true" className="bg-light">
        <ModalAval
          show={this.state.show}
          onhide={() => this.setState({ show: false })}
          idOferta={this.state.idOferta}
          getOfertas={this.ofertasPropiedades}
          userId={this.props.user.userId}
        />
        {loading ? (
          <LoadingModal />
        ) : (
          <Container>
            <Row>
              <Col md="12" className="center-cont paMobile">
                <section className="section-space">
                  <div className="title-section text-center">
                    <h4 className="h4">Ofertas Realizadas</h4>
                  </div>
                  {ofertas && ofertas.length > 0 ? (
                    <ListGroup className="cont-ofertas">
                      <ListGroup.Item className="shadow header">
                        <Col md="12">
                          <Row>
                            <Col md="3" sm="8">
                              <div className="cont-text">
                                <span>Datos de la Propiedad</span>
                              </div>
                            </Col>
                            <Col md="2" sm="8">
                              <div className="cont-text">
                                <span>Datos Propietario </span>
                              </div>
                            </Col>
                            <Col md="2">
                              <div className="cont-text">
                                <span>Oferta Realizada</span>
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="cont-text">
                                <span>Acción</span>
                              </div>
                            </Col>
                            <Col md="2">
                              <div className="cont-text">
                                <span>Oferta Expira</span>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </ListGroup.Item>
                      {this.renderOfertas()}
                    </ListGroup>
                  ) : (
                    <div className="sin-ofertas">
                      <div className="cont-text">
                        <img src={icon.error} alt="" />
                        <h6 className="h6">No haz hecho ofertas</h6>
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
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.app
});

IndexReOfertar = connect(
  mapStateToProps,
  null
)(IndexReOfertar);

export default IndexReOfertar;
