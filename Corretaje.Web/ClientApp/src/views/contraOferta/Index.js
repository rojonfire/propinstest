import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Badge,
  ButtonToolbar
} from "react-bootstrap";
import icon from "../../utils/images";
import utilfunc from "../../utils/utilsFunc";
import api from "../../api";
import swal from "sweetalert";
import Countdown from "react-countdown-now";
import moment from "moment";
import { LoadingModal } from "../../components/Loading";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}


export class contraOferta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ofertas: [],
      feedbackByOfertaId: {},
      toggleByOfertaId: {},
      loading: true,
      ofertasFetched: false
    };
  }

  componentDidMount = async () => {
    this.getOfertasById();
    initGA();
    logPageView();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { idCliente } = this.props;

    const { ofertasFetched } = this.state;
    if (idCliente && !ofertasFetched) {
      await this.getOfertasById();
    }
  };

  getOfertasById = async () => {
    const { idCliente } = this.props;

    if (idCliente) {
      this.setState({ loading: true, ofertasFetched: true }, async () => {
        try {
          const { data: ofertas } = await api.apiGetOfertasPropiedades(
            idCliente
          );

          this.setState({ ofertas });
        } catch (error) {
          console.error("error: ", error);
        } finally {
          this.setState({ loading: false });
        }
      });
    }else{
      this.setState({ loading: false });
    }
  };

  actualizarOferta = async (ofertaId, estado, tipoContrato) => {
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
          this.getOfertasById();
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

  getContrato = async params => {
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

  toggleButton = id => {
    const { toggleByOfertaId } = this.state;
    let toggle = toggleByOfertaId[id];
    if (toggle === "undefined") toggle = true;
    else toggle = !toggle;
    toggleByOfertaId[id] = toggle;
    this.setState({ toggleByOfertaId });
  };

  renderOfertas = () => {
    const { feedbackByOfertaId, ofertas, toggleByOfertaId } = this.state;

    return ofertas.map(item => {
      const {
        id,
        descripcion,
        propiedadGlosa,
        propiedadComuna,
        ofertadorNombre,
        montoDeOferta,
        estado,
        createdAt
      } = item;

      let cur = moment(new Date());
      let end = moment(createdAt).add({ days: 2 });

      const countdown = end.diff(cur);

      return (
        <ListGroup.Item key={id} className="shadow">
          <Col md="12">
            <Row>
              <Col md="2" sm="8">
                <div className="cont-data">
                  <div className="cont-text">
                    <Badge variant="primary">{descripcion}</Badge>
                    <h2 className="h6">
                      {propiedadGlosa}
                      <br />
                      {propiedadComuna}
                    </h2>
                  </div>
                </div>
              </Col>
              <Col md="2">
                <div className="cont-data">
                  <div className="cont-text">
                    <span className="h6">{ofertadorNombre}</span>
                    <br />
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
              <Col md="4">
                {!feedbackByOfertaId[item.id] && (
                  <div className="cont-data">
                    {estado === 0 || estado === 4 || estado === 5 ? (
                      <div className="cont-text">
                        <Button
                          variant="primary"
                          onClick={() => this.getContrato(item)}
                        >
                          <img src={icon.download} alt="" /> Obtener{" "}
                          {estado === 0 || estado === 4
                            ? "Borrador"
                            : "Contrato"}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="cont-data">
                          <ButtonToolbar>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() =>
                                this.actualizarOferta(id, 0, descripcion)
                              }
                            >
                              Aceptar Oferta{" "}
                              <img src={icon.iconCheckWhite} alt="" />
                            </Button>

                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => this.toggleButton(id)}
                            >
                              Contra Oferta{" "}
                              <img src={icon.iconCloseWhite} alt="" />
                            </Button>
                            {toggleByOfertaId[item.id] && (
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="agregar nueva oferta (UF)"
                                  onBlur={this.changeMonto}
                                />
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() =>
                                    this.actualizarOferta(id, 3, descripcion)
                                  }
                                >
                                  Ofertar{" "}
                                  <img src={icon.iconCheckWhite} alt="" />
                                </Button>
                              </div>
                            )}

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() =>
                                this.actualizarOferta(id, 1, descripcion)
                              }
                            >
                              Rechazar Oferta{" "}
                              <img src={icon.iconDislikeWhite} alt="" />
                            </Button>
                          </ButtonToolbar>
                        </div>
                      </div>
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
                          onComplete={() =>
                            this.actualizarOferta(id, 1, descripcion)
                          }
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
      <Container fluid="true" className="bg-light vh-70">
        {loading ? (
          <LoadingModal />
        ) : (
          <Container>
            <Row>
              <Col md="12" className="center-cont paMobile">
                <section className="section-space">
                  <div className="title-section text-center">
                    <h4 className="h4">Ofertas Recibídas</h4>
                  </div>
                  {ofertas && ofertas.length > 0 ? (
                    <ListGroup className="cont-ofertas">
                      <ListGroup.Item className="shadow header">
                        <Col md="12">
                          <Row>
                            <Col md="2" sm="8">
                              <div className="cont-text">
                                <span>Datos de la Propiedad</span>
                              </div>
                            </Col>
                            <Col md="2">
                              <span>Datos de Ofertante</span>
                            </Col>
                            <Col md="2">
                              <span>Oferta Realizada</span>
                            </Col>
                            <Col md="4">
                              <span>Acción</span>
                            </Col>
                            <Col md="2">
                              <span>Oferta Expira</span>
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
                        <h6 className="h6">Sin ofertas recibidas</h6>
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
  ...state.app,
  ...state.auth
});

contraOferta = connect(
  mapStateToProps,
  null
)(contraOferta);

export default contraOferta;
