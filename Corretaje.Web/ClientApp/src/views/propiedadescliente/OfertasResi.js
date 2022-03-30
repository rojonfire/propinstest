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
import {
  fetchGetUF,
  getOfertasByPublicacionId,
  aceptarOferta,
  contraofertar,
  declinarOferta,
} from "../../action";
import AccountSidebar from "../../components/AccountSidebar";
import AutosizeInput from "react-input-autosize";
import utilfunc from "../../utils/utilsFunc";
import Alert from "react-bootstrap/Alert";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class OfertasPerfil extends React.Component {
  constructor(props) {
    super(props);
    const { valor, propiedadId } = this.props.location.state;
    this.state = {
      valor,
      showoferta: false,
      montoError: null,
      monto: 0,
      ofertaId: null,
      montoOferta: 0,
      showConfirmarAceptarOferta: false,
      ofertaLastAction: null,
      showConfirmarDeclinarOferta: false,
    };
    const { getUf, getOfertasByPublicacionId } = this.props;
    getUf();
    getOfertasByPublicacionId(propiedadId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      const { propiedadId } = this.props.location.state;
      const { getOfertasByPublicacionId } = this.props;
      getOfertasByPublicacionId(propiedadId);
    }
  }
  ofertaShow = (id, montoOfertado) => {
    this.setState({
      showoferta: true,
      monto: this.state.valor,
      montoOfertado,
      ofertaId: id,
      montoError: null,
    });
  };

  ofertaHide = () => {
    this.setState({ showoferta: false });
  };

  confirmarAceptarOfertaHide = () => {
    this.setState({ showConfirmarAceptarOferta: false });
  };

  confirmarDeclinarOfertaHide = () => {
    this.setState({ showConfirmarDeclinarOferta: false });
  };

  subirOferta = () => {
    this.setState({
      monto: this.state.monto + 100,
    });
  };

  onChangeMonto = (e) => {
    const { valor } = this.state;

    let {
      target: { value: monto },
    } = e;
    monto = +monto.replace(/\./g, "");

    const newState = { monto };
    // el valor original tiene que ser cambiado por el valor de la ofertarecibida por el cliente y ese es el que se tiene que jugar, ya que ahora estamos CONTRAOFERTANDO
    const orignalValue = valor;

    if (orignalValue && monto < orignalValue * 0.9) {
      newState.montoError =
        "La oferta no puede ser menor al 90% del precio de lista.";
    } else {
      newState.montoError = null;
    }

    this.setState(newState);
  };

  bajarOferta = () => {
    // let value = this.state.monto - 1;
    // if (value >= this.props.propiedad.data.valor) {
    this.setState({
      monto: this.state.monto - 100,
    });
    //}
  };

  sePuedeOfertar = (estadoOferta) => {
    //aceptada, declinada y rechazada respectivamente
    let estadosNoSePuedeOfertar = [0, 1, 3];
    if (estadosNoSePuedeOfertar.includes(estadoOferta)) {
      return false;
    }
    return true;
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

  contraofertar = (id, monto) => {
    this.setState({
      ofertaLastAction: "Contraofertar",
    });
    const { contraofertar } = this.props;
    contraofertar(id, monto);
  };

  declinarOferta = (id) => {
    this.setState({
      ofertaLastAction: "Declinar",
    });
    const { declinarOferta } = this.props;
    declinarOferta(id);
  };

  renderMessageByStatus = (estado, sapo, perro) => {
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
    const { requestUpdateOferta, requestOfertas } = this.props; //request ofertas no se que pasa si se borra

    if (requestUpdateOferta === "SUCCESS") {
      let message = "";
      if (this.state.ofertaLastAction === "Aceptar") {
        message =
          "Se ha aceptado la oferta. Nos pondremos en contacto contigo para coordinar los pasos a seguir";
      } else if (this.state.ofertaLastAction === "Contraofertar") {
        message =
          "Has realizado una contraoferta. El comprador tiene 48 horas para responder a tu contraoferta";
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
    const { requestUpdateOferta, requestOfertas, uf, ofertas } = this.props;
    const { valor, montoError } = this.state;
    let ufiva = 0;
    if (uf) {
      ufiva = valor * parseFloat(uf.replace(".", "").replace(",", "."));
      ufiva = Math.ceil(ufiva * 1.19);
    }

    const valorEnCLP = utilfunc.formatNumeros(ufiva);

    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        {this.feedback()}
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">Ofertas</div>
          <div className="sub-titulo-perfil-flex">
            Recuerda que tienes 48hrs para aceptar una oferta.
          </div>
          <div>
            <Card>
              <Card.Body className="card-carct-perfil-status">
                <Card.Title>
                  <span className="font-weight-bold">VALOR</span>
                </Card.Title>
                <Card.Text>
                  <p className="fondo-valorplan">UF {valor}</p>
                  <div>{valorEnCLP} CLP</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          {requestOfertas === "LOADING" && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
          {ofertas &&
            ofertas.data &&
            ofertas.data.length === 0 &&
            "Actualmente no existen ofertas para tu propiedad"}

          {(requestOfertas === "IDLE" || requestOfertas === "SUCCESS") &&
            ofertas &&
            ofertas.data &&
            ofertas.data.map((oferta) => {
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
                              oferta.montoDeOferta
                            )} de la propiedad
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
                              OFERTA RECIBIDA
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
                                    ? "ofertaopaca ofertarecibida" //opaca
                                    : "ofertarecibida"
                                }
                              >
                                <div className="ofertarecibidatext">
                                  CONTRAOFERTA REALIZADA
                                </div>
                                <p className="ofertaUF">
                                  {`UF ${oferta.montoDeOferta}`}
                                </p>
                              </Card>
                            )}
                        </Row>
                        <Row>
                          {moment().isBefore(fechaVencimiento) &&
                            this.sePuedeOfertar(oferta.estado) && (
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
                                    this.ofertaShow(
                                      oferta.id,
                                      oferta.montoDeOferta
                                    )
                                  }
                                  variant="btn1oferta2"
                                  className="w-100"
                                >
                                  Contraofertar
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
                Recuerda que tienes 48hrs para aceptar,
                contraofertar o rechazar una oferta.
              </div>
              <Row>
                <CardGroup>
                  <Card>
                    <Card.Body className="card-carct-perfil-status">
                      <Card.Title>
                        <span className="font-weight-bold">VALOR</span>
                      </Card.Title>
                      <Card.Text>
                        <p className="fondo-valorplan">UF {valor} </p>
                        <div>{valorEnCLP} CLP</div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Row>
              {requestOfertas === "LOADING" && (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
              {ofertas &&
                ofertas.data &&
                ofertas.data.length === 0 &&
                "Actualmente no existen ofertas para tu propiedad"}

              {(requestOfertas === "IDLE" ||
                requestOfertas === "SUCCESS") &&
                ofertas &&
                ofertas.data &&
                ofertas.data.map((oferta) => {
                  let fechaVencimiento = moment(oferta.fechaVencimiento);
                  return (
                    <Row className="mb-4">
                      <CardGroup>
                        <Card
                          className={
                            oferta.estado === 0
                              ? "border-tarjeta-oferta-aceptada tarjetaOferta"
                              : "tarjetaOferta"
                          }
                        >
                          <Row className="w-100">
                            <Col md="9">
                              <div className="cirulogrishora text-center w-25">
                                {moment(oferta.fechaOferta).format(
                                  "DD-MM-yyyy HH:mm:ss"
                                )}
                              </div>

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
                                    {this.renderMessageByStatus(oferta.estado,
                                      oferta.montoMinimo,
                                      oferta.montoDeOferta)}
                                  </Col>
                                </Row>
                              </div>
                              <div>
                                <Row>
                                  <Col md="5">
                                    {/* Cuando se haya realizado una contraoferta se debe agregar la clase: 
                                    ofertaopaca, dentro de la tarjeta oferta recibida  
                                  */}
                                    <Card
                                      className={
                                        (oferta.estado === 0 ||
                                          oferta.estado === 2) &&
                                        oferta.montoDeOferta ===
                                          oferta.montoMinimo
                                          ? "ofertarecibida h-100"
                                          : " ofertaopaca ofertarecibida h-100"
                                      }
                                    >
                                      <div className={
                                          oferta.estado === 5 ||
                                          oferta.estado === 1 ||
                                          oferta.estado === 6
                                            ? "ofertarecibidatext-sad" // texto gris cuando oferta o contraoferta es rechazada
                                            : "ofertarecibidatext"
                                        }>
                                        OFERTA RECIBIDA
                                      </div>
                                      <p className={
                                          oferta.estado === 5 ||
                                          oferta.estado === 1 ||
                                          oferta.estado === 6
                                            ? "ofertaUF-sad" // UF gris cuando oferta o contraoferta es rechazada
                                            : "ofertaUF"
                                        }>
                                        {`UF ${oferta.montoMinimo}`}
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
                                            CONTRAOFERTA REALIZADA
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
                                          CONTRAOFERTA REALIZADA
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
                                {moment().isBefore(fechaVencimiento) &&
                                  this.sePuedeOfertar(oferta.estado) && (
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
                                          this.ofertaShow(
                                            oferta.id,
                                            oferta.montoDeOferta
                                          )
                                        }
                                        variant="btn1oferta2"
                                        className="w-100"
                                      >
                                        Contraofertar
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
            <Modal.Title>Aceptar Oferta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {requestUpdateOferta === "LOADING" && (
              <LoadingModal porcentaje={0} finish={() => void 0} />
            )}
            <div className="simulator bg-light">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">OFERTA RECIBIDA</div>
                <div className="fondo-valorplan-center">
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
              Aceptar oferta
            </Button>
            <Button variant="secondary" onClick={this.ofertaHide}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="paMobile"
          show={this.state.showoferta}
          onHide={this.ofertaHide}
        >
          <Modal.Header closeButton closeLabel=" ">
            <Modal.Title>Realizar Contraoferta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {requestUpdateOferta === "LOADING" && (
              <LoadingModal porcentaje={0} finish={() => void 0} />
            )}
            <div className="simulator bg-light">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">
                  OFERTA RECIBIDA
                </div>
                <div className="margin-abajo-oferta-1 fondo-valorplan-center">
                  {`UF ${this.state.montoOfertado}`}
                </div>
              </div>
            </div>

            <div className="simulator colorpato">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">CONTRAOFERTA</div>
                <div>Ingresa monto:</div>
                <span>UF</span>
                <AutosizeInput
                  name="form-field-name"
                  value={utilfunc.formatNumeros(this.state.monto)}
                  onChange={this.onChangeMonto}
                  maxLength="12"
                />
              </div>
              <span className="contact-error" style={{ fontSize: ".8em" }}>
                {montoError}
              </span>
            </div>

            <Alert variant={"warning"}>
              El comprador(a) tiene 48 horas para responder tu contraoferta, te
              enviaremos por correo electrónico si la contraoferta fue aceptada
              o rechazada.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn1oferta2"
              disabled={this.state.loading || !!montoError}
              onClick={() =>
                this.contraofertar(this.state.ofertaId, this.state.monto)
              }
            >
              Contraofertar
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
            <Modal.Title>Rechazar Oferta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {requestUpdateOferta === "LOADING" && (
              <LoadingModal porcentaje={0} finish={() => void 0} />
            )}
            <div className="simulator bg-light">
              <div className="cont-simulator">
                <div className="ofertarecibidatext-peque">OFERTA RECIBIDA</div>
                <div className="fondo-valorplan-center">
                  {`UF ${this.state.montoOferta}`}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn1oferta2"
              onClick={() => this.declinarOferta(this.state.ofertaId)}
            >
              Rechazar oferta
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
  uf: state.app.uf,
  ofertas: state.app.ofertas,
  requestOfertas: state.app.requestOfertas,
  requestUpdateOferta: state.app.requestUpdateOferta,
  errorMessage: state.app.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  getOfertasByPublicacionId: (publicacionId) =>
    dispatch(getOfertasByPublicacionId(publicacionId)),
  aceptarOferta: (id) => dispatch(aceptarOferta(id)),
  contraofertar: (id, monto) => dispatch(contraofertar(id, monto)),
  declinarOferta: (id) => dispatch(declinarOferta(id)),
});

OfertasPerfil = connect(mapStateToProps, mapDispatchToProps)(OfertasPerfil);

export default OfertasPerfil;
