import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Row,
  CardGroup,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { aceptarOferta, declinarOferta } from "../../action";
import AccountSidebar from "../../components/AccountSidebar";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class OfertasEmitidas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monto: 0,
      ofertaId: null,
      montoOferta: 0,
      showConfirmarAceptarOferta: false,
      ofertaLastAction: null,
      showConfirmarDeclinarOferta: false,
    };
  }

  confirmarAceptarOfertaHide = () => {
    this.setState({ showConfirmarAceptarOferta: false });
  };

  confirmarDeclinarOfertaHide = () => {
    this.setState({ showConfirmarDeclinarOferta: false });
  };

  confirmarAceptarOferta = (id, montoOferta) => {
    this.setState({
      ofertaId: id,
      montoOferta: montoOferta,
      showConfirmarAceptarOferta: true,
    });
  };

  confirmarDeclinarOferta = (id, montoOferta) => {
    this.setState({
      ofertaId: id,
      montoOferta: montoOferta,
      showConfirmarDeclinarOferta: true,
    });
  };

  aceptarOferta = (id) => {
    this.setState({
      ofertaLastAction: "Aceptar",
    });
    const { aceptarOferta } = this.props;
    aceptarOferta(id);
  };

  declinarOferta = (id) => {
    this.setState({
      ofertaLastAction: "Declinar",
    });
    const { declinarOferta } = this.props;
    declinarOferta(id);
  };

  renderMessageByStatus = (estado, sapo, perro, id) => {
    let message = "";

    if (sapo === perro) {
      switch (estado) {
        case 0:
          message = "Oferta aceptada";
          break;
        case 2:
          message =
            "Oferta pendiente, recibirás una respuesta en un plazo máximo de 48 horas";
          break;
        case 3:
          message = "Contraoferta pendiente, tienes 48 horas para responderla";
          break;
        default:
          message = "Oferta rechazada";
      }
    } else {
      switch (estado) {
        case 0:
          message = "Contraoferta aceptada";
          break;
        case 2:
          message =
            "Oferta pendiente, recibirás una respuesta en un plazo máximo de 48 horas";
          break;
        case 3:
          message = "Contraoferta pendiente, tienes 48 horas para responderla";
          break;
        default:
          message = "Contraoferta rechazada";
      }
    }

    return message;
  };

  getColorByStatus = (estado) => {
    if (estado === 0 || estado === 2) {
      //aceptada o recibida
      return "green";
    } else if (estado === 3) {
      //contraoferta
      return "yellow";
    } else {
      return "red";
    }
  };

  feedback = () => {
    const { requestUpdateOferta } = this.props;

    if (requestUpdateOferta === "SUCCESS") {
      let message = "";
      if (this.state.ofertaLastAction === "Aceptar") {
        message =
          "Se ha aceptado la oferta. Nos pondremos en contacto contigo para coordinar los pasos a seguir";
      } else {
        message = "Has rechazado la oferta";
      }

      swal(message, {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }

    if (requestUpdateOferta === "ERROR") {
      const { errorMessage } = this.props;

      swal(errorMessage, {
        icon: "error",
        buttons: {
          cancel: false,
          confirm: true,
        },
      });
    }
  };

  render() {
    const { requestUpdateOferta, requestOfertasEmitidas, ofertasEmitidas } =
      this.props;
    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        {this.feedback()}
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">Ofertas</div>
          <div className="sub-titulo-perfil-flex">Ofertas emitidas</div>
          {requestOfertasEmitidas === "LOADING" && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
          {ofertasEmitidas &&
            ofertasEmitidas.data &&
            ofertasEmitidas.data.length === 0 &&
            "No has realizado ninguna oferta hasta el momento"}

          {(requestOfertasEmitidas === "IDLE" ||
            requestOfertasEmitidas === "SUCCESS") &&
            ofertasEmitidas &&
            ofertasEmitidas.data &&
            ofertasEmitidas.data.map((oferta) => {
              let fechaVencimiento = moment(oferta.fechaVencimiento);

              return (
                <div>
                  <Card className="w-100 mb-4">
                    <Card.Body className="card-ofertamobiiile">
                      <div className="cirulogrishora text-center">
                        {moment(oferta.fechaOferta).format(
                          "DD-MM-yyyy HH:mm:ss"
                        )}
                      </div>
                      <div className="titulooferta">
                        <Row className="mb-4">
                          <Col>
                            {this.renderMessageByStatus(
                              oferta.estado,
                              oferta.montoMinimo,
                              oferta.montoDeOferta,
                              oferta.id
                            )}{" "}
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Card
                            className={
                              (oferta.estado === 0 || oferta.estado === 2) &&
                              oferta.montoDeOferta === oferta.montoMinimo
                                ? "ofertarecibida"
                                : "ofertaopaca ofertarecibida"
                            }
                          >
                            <div className="ofertarecibidatext">
                              OFERTA REALIZADA
                            </div>
                            <p className="ofertaUF">
                              {`UF ${oferta.montoMinimo} `}
                            </p>
                          </Card>
                        </Row>
                        <Row>
                          {[0, 1, 3, 4, 5].includes(oferta.estado) &&
                            oferta.montoDeOferta !== oferta.montoMinimo && (
                              <Card
                                className={
                                  oferta.estado === 3
                                    ? "ofertaopaca ofertarecibida"
                                    : "ofertarecibida"
                                }
                              >
                                <div className="ofertarecibidatext">
                                  CONTRAOFERTA RECIBIDA
                                </div>
                                <p className="ofertaUF">
                                  {`UF ${oferta.montoDeOferta} `}
                                </p>
                              </Card>
                            )}
                        </Row>
                        <Row>
                          {moment().isBefore(moment(fechaVencimiento)) &&
                            oferta.estado === 3 && (
                              <div className="botonesmobileoferta center ">
                                <Button
                                  onClick={() =>
                                    this.confirmarAceptarOferta(
                                      oferta.id,
                                      oferta.montoDeOferta
                                    )
                                  }
                                  variant="btn1oferta"
                                  className="w-100"
                                >
                                  Aceptar
                                </Button>
                                <Button
                                  onClick={() =>
                                    this.confirmarDeclinarOferta(
                                      oferta.id,
                                      oferta.montoDeOferta
                                    )
                                  }
                                  variant="btn1oferta3"
                                  className="w-100"
                                >
                                  Rechazar
                                </Button>
                              </div>
                            )}
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <div className="tituloperfil">Ofertas</div>
              <div className="sub-titulo-perfil">
                Recuerda que el vendedor tiene 48 horas para aceptar,
                contraofertar o rechazar tu oferta.
              </div>
              {requestOfertasEmitidas === "LOADING" && (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
              {ofertasEmitidas &&
                ofertasEmitidas.data &&
                ofertasEmitidas.data.length === 0 &&
                "No has realizado ninguna oferta hasta el momento"}

              {(requestOfertasEmitidas === "IDLE" ||
                requestOfertasEmitidas === "SUCCESS") &&
                ofertasEmitidas &&
                ofertasEmitidas.data &&
                ofertasEmitidas.data.map((oferta) => {
                  let fechaVencimiento = moment(oferta.fechaVencimiento);
                  return (
                    <Row>
                      <CardGroup>
                        <Card
                          className={
                            oferta.estado === 0
                              ? "border-tarjeta-oferta-aceptada tarjetaOferta" // borde verde si es aceptada
                              : "tarjetaOferta" // esta es la tarjeta grande completa
                          }
                        >
                          <Row className="w-100 mb-4">
                            <Col md="9">
                              <Row>
                                <Col
                                  lg="6"
                                  className="cirulogrishora margin-circulogrisahora text-center w-25"
                                >
                                  {moment(oferta.fechaOferta).format(
                                    "DD-MM-yyyy HH:mm:ss"
                                  )}
                                </Col>
                                <Col lg="6">
                                  {oferta.propiedadGlosa},{" "}
                                  {oferta.propiedadComuna}
                                </Col>
                              </Row>

                              <div className="titulooferta mb-4">
                                <Row>
                                  <Col className="dot" md="1">
                                    <Icon
                                      color={this.getColorByStatus(
                                        oferta.estado
                                      )}
                                      name="circle"
                                    />
                                  </Col>
                                  <Col>
                                    {this.renderMessageByStatus(
                                      oferta.estado,
                                      oferta.montoMinimo,
                                      oferta.montoDeOferta,
                                      oferta.id
                                    )}{" "}
                                  </Col>
                                </Row>
                              </div>
                              <div>
                                <Row>
                                  <Col md="5">
                                    <Card
                                      className={
                                        (oferta.estado === 0 ||
                                          oferta.estado === 2) &&
                                        oferta.montoDeOferta ===
                                          oferta.montoMinimo
                                          ? "ofertarecibida h-100" // se ve normal
                                          : "ofertaopaca ofertarecibida h-100" //opaca, puede existir contraoferta o puede estar rechazada
                                      }
                                    >
                                      <div
                                        className={
                                          oferta.estado === 5 ||
                                          oferta.estado === 1 ||
                                          oferta.estado === 6
                                            ? "ofertarecibidatext-sad" // texto gris cuando oferta o contraoferta es rechazada
                                            : "ofertarecibidatext"
                                        }
                                      >
                                        OFERTA REALIZADA
                                      </div>
                                      <p
                                        className={
                                          oferta.estado === 5 ||
                                          oferta.estado === 1 ||
                                          oferta.estado === 6
                                            ? "ofertaUF-sad" // UF gris cuando oferta o contraoferta es rechazada
                                            : "ofertaUF"
                                        }
                                      >
                                        {`UF ${oferta.montoMinimo} `}
                                      </p>
                                    </Card>
                                  </Col>
                                  {[0, 3, 4].includes(oferta.estado) &&
                                    oferta.montoDeOferta !==
                                      oferta.montoMinimo && (
                                      <Col md="6">
                                        <Card
                                          className={
                                            oferta.estado === 3
                                              ? "ofertarecibida h-100"
                                              : "ofertarecibida h-100"
                                          }
                                        >
                                          <div className="ofertarecibidatext">
                                            CONTRAOFERTA RECIBIDA
                                          </div>
                                          <p className="ofertaUF">
                                            {`UF ${oferta.montoDeOferta}`}
                                          </p>
                                        </Card>
                                      </Col>
                                    )}
                                  {[1, 5].includes(oferta.estado) &&
                                  oferta.montoDeOferta !== oferta.montoMinimo ? ( //ojo que 5 tambien es oferta
                                    <Col md="6">
                                      <Card className=" ofertaopaca ofertarecibida h-100">
                                        <div className="ofertarecibidatext-sad">
                                          CONTRAOFERTA RECIBIDA
                                        </div>
                                        <p className="ofertaUF-sad">
                                          {`UF ${oferta.montoDeOferta}`}
                                        </p>
                                      </Card>
                                    </Col>
                                  ) : null}
                                </Row>
                              </div>
                            </Col>
                            <Col md="3">
                              <div>
                                {moment().isBefore(moment(fechaVencimiento)) &&
                                  oferta.estado === 3 && (
                                    <div>
                                      <Button
                                        onClick={() =>
                                          this.confirmarAceptarOferta(
                                            oferta.id,
                                            oferta.montoDeOferta
                                          )
                                        }
                                        variant="btn1oferta"
                                        className="w-100"
                                      >
                                        Aceptar
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          this.confirmarDeclinarOferta(
                                            oferta.id,
                                            oferta.montoDeOferta
                                          )
                                        }
                                        variant="btn1oferta3"
                                        className="w-100"
                                      >
                                        Rechazar
                                      </Button>
                                    </div>
                                  )}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </CardGroup>
                    </Row>
                  );
                })}
            </Col>
          </Row>
        </div>
        <Modal
          className="paMobile"
          show={this.state.showConfirmarAceptarOferta}
          onHide={this.confirmarAceptarOfertaHide}
        >
          <Modal.Header closeButton closeLabel=" ">
            <Modal.Title>Aceptar Contraoferta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {requestUpdateOferta === "LOADING" && (
              <LoadingModal porcentaje={0} finish={() => void 0} />
            )}
            <div className="simulator bg-light">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">
                  CONTRAOFERTA RECIBIDA
                </div>
                <div className="margin-abajo-oferta-1 fondo-valorplan-center">
                  {`UF ${this.state.montoOferta}`}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn1oferta2"
              onClick={() => this.aceptarOferta(this.state.ofertaId)}
            >
              Aceptar contraoferta
            </Button>
            <Button variant="secondary" onClick={this.ofertaHide}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="paMobile"
          show={this.state.showConfirmarDeclinarOferta}
          onHide={this.confirmarDeclinarOfertaHide}
        >
          <Modal.Header closeButton closeLabel=" ">
            <Modal.Title>Rechazar Contraoferta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {requestUpdateOferta === "LOADING" && (
              <LoadingModal porcentaje={0} finish={() => void 0} />
            )}
            <div className="simulator bg-light">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">
                  CONTRAOFERTA RECIBIDA
                </div>
                <div className="margin-abajo-oferta-1 fondo-valorplan-center">
                  {`UF ${this.state.montoOferta} `}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn1oferta2"
              onClick={() => this.declinarOferta(this.state.ofertaId)}
            >
              Rechazar contraoferta
            </Button>
            <Button
              variant="secondary"
              onClick={this.confirmarDeclinarOfertaHide}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ofertasEmitidas: state.app.ofertasEmitidas,
  requestOfertasEmitidas: state.app.requestOfertasEmitidas,
  requestUpdateOferta: state.app.requestUpdateOferta,
  errorMessage: state.app.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  aceptarOferta: (id) => dispatch(aceptarOferta(id)),
  declinarOferta: (id) => dispatch(declinarOferta(id)),
});

OfertasEmitidas = connect(mapStateToProps, mapDispatchToProps)(OfertasEmitidas);

export default OfertasEmitidas;
