/** @format */

import React, { Component } from "react";

import {
  Alert,
  Modal,
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";

import utilfunc from "../../utils/utilsFunc";
import AutosizeInput from "react-input-autosize";
import { Marker } from "google-maps-react";
import Map from "../../components/GoogleMap";
import swal from "sweetalert";
import { fetchGetUF, postIncrementarVisitasVirtuales, setRegistered } from "../../action";
import icon from "../../utils/images";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ComodiadesPropiedad from "./ComodidadesPropiedad";
import CaracteristicasComunidad from "./CaracteristicasComunidad";
import EntornoPropiedad from "./EntornoPropiedad";
import { DescripcionPropiedad } from "./DescripcionPropiedad";
import { Descri } from "./descri";
import api from "../../api";
import moment from "moment";
import "moment-timezone";
import Countdown from "react-countdown-now";
import ReactGa from "react-ga";
import utilsFunc from "../../utils/utilsFunc";
import { message, Tooltip } from "antd";

export const initGA = () => {
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

const { formatToThousandSeparator } = utilsFunc;

export class IndexInfoPropiedad extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.types = [
      "restaurant",
      "bank",
      "school",
      "hospital",
      "shopping_mall",
      "casino",
      "spa",
      "stadium",
      "park",
      "museum",
      "gym",
      "zoo",

      "colloquial_area",
      "locality",
      "political",
      "lodging",
      "food",
      "establishment",
      "cafe",
      "store",
      "clothing_store",
      "general_contractor",
      "tourist_attraction",
      "embassy",
      "home_goods_store",
      "travel_agency",
      "florist",
    ];

    const nearbyLocationsByType = {};
    this.types.forEach((t) => (nearbyLocationsByType[t] = false));

    this.state = {
      black: true,

      propiedad: null,
      isVisible: false,
      show: false,
      showreferido: false,
      showoferta: false,
      selectedPlace: "Prueba",
      zoom: 15,
      rutIn: "",
      showRutInv: false,
      marker: [
        {
          title: "Santiago",
          name: "Chile",
          position: { lat: -33.4372, lng: -70.6506 },
        },
      ],
      monto: 0,
      montoError: null,
      loading: false,
      nearbyLocationsByType,
      mapResults: [],
      responsive: {
        0: { items: 1 },
        1024: { items: 3 },
      },
    };

    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleMapMount = this.handleMapMount.bind(this);

    let currentMonth = moment().month() + 1;
    currentMonth =
      currentMonth.toString().length === 1
        ? `0${currentMonth.toString()}`
        : currentMonth.toString();
    let currentYear = moment().year().toString();
    let currentMonthAndYear = currentYear.concat(currentMonth);

    let id = utilfunc.getUrlParameter("idprop");

    const { postIncrementarVisitasVirtuales, setRegistered } = this.props;
    const data = {
      idPropiedad: id,
      mesAnioVisita: currentMonthAndYear,
    };
    postIncrementarVisitasVirtuales(data);
    setRegistered(true);
  }

  componentDidMount = async () => {
    document.querySelector("body").scrollTo(0, 0);
    const { idCliente, getUf, descripcion } = this.props;
    let id = utilfunc.getUrlParameter("idprop");
    getUf();
    initGA();
    logPageView();
    const propiedad = await api.apiGetPropiedadInfo(id, idCliente, descripcion);
    this.setState({ propiedad });
  };

  async select(id, e) {
    let idButton = document.getElementById(e.target.id);
    let array = JSON.parse(localStorage["Props"]);

    if (!array.includes(id)) {
      array.push(id);
      idButton.setAttribute("class", "btn btn-chekeado");
    } else {
      array.splice(id);

      idButton.setAttribute("class", "btn btn-referir-detalles");
    }
    localStorage["Props"] = JSON.stringify(array);
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  ofertaShow = (isLogged) => {
    if (isLogged) {
      this.setState({
        showoferta: true,
        monto: this.state.propiedad.data.valor,
        montoError: null,
      });
    } else {
      this.props.history.push(`/signin`);
    }
  };
  agendaShow = (isLogged, idCliente, idprop) => {
    const { history } = this.props;
    if (isLogged) {
      history.push(`/reserva-usuario?idCliente=${idCliente}&idprop=${idprop}`);
    } else {
      this.props.history.push(`/signin`);
    }
  };

  ofertaHide = () => {
    this.setState({ showoferta: false });
  };
  referiHide = () => {
    this.setState({ showreferido: false });
  };

  agendaHide = () => {
    this.setState({ showagenda: false });
  };

  onMapClicked(props, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
      marker: [
        {
          title: "Casa",
          name: "Casa",
          position: { lat, lng },
        },
      ],
    });
  }

  handleMapMount(mapProps, map) {
    const {
      initialCenter: { lat, lng },
    } = mapProps;
    const service = new window.google.maps.places.PlacesService(map);
    const pyrmont = { lat, lng };

    let request = {
      location: pyrmont,
      radius: 500,
      type: this.types,
    };
    service.nearbySearch(
      request,
      function (mapResults, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const todasTiendas = [
            ...new Set(mapResults.map((x) => x.types).flat()),
          ];
          const filtro = this.types.map((o) => ({
            [o]: todasTiendas.includes(o),
          }));
          const resul = {};
          filtro.map((x) => {
            Object.assign(resul, x);
          });
          this.setState({ mapResults, nearbyLocationsByType: resul });
        }
      }.bind(this)
    );
  }

  onChangeRun = (p) => {
    this.setState({
      rutIn: p.currentTarget.value,
    });
  };

  onSubmit = async () => {
    const { user, userId } = this.props;
    const { propiedad } = this.state;

    let rut;
    let res;
    if (user.rut === "") {
      rut = this.state.rutIn.replace(/\./g, "");
      res = utilfunc.checkRut(rut);
    } else {
      rut = user.rut;
      res = utilfunc.checkRut(rut);
    }

    if (res == null) {
      let values = {
        montoDeOferta: this.state.monto,
        montoDePublicacion: propiedad.data.valor,
        mensajes: [
          {
            fechaEmision: new Date(),
            emitidoPorUsuarioId: user.email,
            texto: "",
          },
        ],
        descripcion: propiedad.data.operacion,
        ofertadorNombre: user.name,
        ofertadorRut: rut,
        ofertadorId: userId,
        oferenteRut: propiedad.data.rutCliente,
        oferenteNombre: propiedad.data.nombreCliente,
        propiedadGlosa: propiedad.data.glosa,
        propiedadComuna: propiedad.data.comuna,
        propietarioId: propiedad.data.idCliente,
        publicacionId: propiedad.data.id,
      };

      this.setState({ loading: true, showRutInv: false }, async () => {
        try {
          const { data } = await api.apiAddOferta(values);

          if (data && data.id) {
            swal({
              title: "¡Tu oferta fue enviada con éxito!",
              text: "Dentro de 48 horas llegará a tu correo electrónico, si la oferta fue aceptada o rechazada por el propietario(a)",
              icon: "success",
              dangerMode: false,
            });
            const { idCliente } = this.props;
            let id = utilfunc.getUrlParameter("idprop");
            const propiedad = await api.apiGetPropiedadInfo(id, idCliente);
            this.setState({ propiedad });
          } else {
            swal({
              title: "Precaución",
              text: "Oferta bloqueada ya exista otra oferta activa",

              icon: "warning",
              dangerMode: false,
            });
          }
        } catch (error) {
          swal({
            title: "Ups! Hay un error",
            text: "Tal véz ingresaste mal tu RUT o la oferta es menor al 90% del valor total de la propiedad",
            icon: "error",
            dangerMode: false,
          });
        } finally {
          this.setState({ loading: false, showoferta: false });
        }
      });
    } else {
      this.setState({
        showRutInv: true,
      });
      swal({
        title: "¡UPS! Hay un error",
        text: "Tal véz ingresaste mal tu RUT ",
        icon: "error",
        dangerMode: false,
      });
    }
  };

  subirOferta = () => {
    this.setState({
      monto: this.state.monto + 100,
    });
  };

  bajarOferta = () => {
    // let value = this.state.monto - 1;
    // if (value >= this.props.propiedad.data.valor) {
    this.setState({
      monto: this.state.monto - 100,
    });
    //}
  };

  onChangeMonto = (e) => {
    const { propiedad } = this.state;

    let {
      target: { value: monto },
    } = e;
    monto = +monto.replace(/\./g, "");

    const newState = { monto };

    const orignalValue = propiedad && propiedad.data ? propiedad.data.valor : 0;

    if (orignalValue && monto < orignalValue * 0.9) {
      newState.montoError =
        "La oferta no puede ser menor al 90% del precio de lista.";
    } else {
      newState.montoError = null;
    }

    this.setState(newState);
  };

  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return (
        <div lg="12" className="margin-pantallanormal time">
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

  handleOnDragStart = (e) => {
    e.preventDefault();
  };

  imagesCarrousel = (images) => {
    const { propiedad } = this.state;
    let list;
    list = images.map((item, i) => {
      let div;
      if (i === 0) {
        div = (
          <Col md={12} className="paMobile">
            <div
              key={i}
              className="cont-foto"
              onDragStart={this.handleOnDragStart}
            >
              {propiedad.data.urlMattePort !== "" &&
              propiedad.data.urlMattePort !== null ? (
                <div className="cont-play-tour">
                  <img
                    src={icon.imgPlayTour}
                    alt="tour"
                    onClick={() => this.handleShow()}
                  />
                  <span className="h1">Realizar tour virtual</span>
                </div>
              ) : null}
              <img
                src={item.downloadLink}
                className="carouselpropiedades"
                alt="First slide"
              />
            </div>
          </Col>
        );
      } else {
        div = (
          <Col md={12}>
            <div
              key={i}
              className="cont-foto"
              onDragStart={this.handleOnDragStart}
            >
              <img src={item.downloadLink} className="carouselpropiedades" />
            </div>
          </Col>
        );
      }

      return div;
    });

    if (!utilfunc.mobilecheck()) {
      if (list.length > 1) {
        list = utilfunc.array_move(list, 0, 1);
      }
    }

    return list;
  };

  onMoreInfo = () => {
    const { history } = this.props;
    const {
      propiedad: {
        data: { codigoPropiedad },
      },
    } = this.state;
    history.push(`/contacto?codprop=${codigoPropiedad}`);
  };

  copyLink = () => {
    let url = window.location.href;
    navigator.clipboard.writeText(url);
    message.info("Link de la propiedad copiado al portapapeles");
  };

  render() {
    const renderSlideInfo = ({ item, itemsCount }) => {
      return `${item}\\${itemsCount}`;
    };

    const renderDotsItem = ({ isActive }) => {
      return isActive ? "x" : "o";
    };

    const renderPrevButton = ({ isDisabled }) => {
      return <span style={{ opacity: isDisabled ? "0.5" : 1 }}>&lt;</span>;
    };

    const renderNextButton = ({ isDisabled }) => {
      return <span style={{ opacity: isDisabled ? "0.5" : 1 }}>&gt;</span>;
    };

    const renderPlayPauseButton = ({ isPlaying }) => {
      return isPlaying ? "PAUSE" : "PLAY";
    };
    const style = { width: "100%", height: "100%", position: "relative" };

    const { isLoggedIn, uf, rut, user } = this.props;

    const { propiedad, montoError, nearbyLocationsByType } = this.state;
    let cur = moment(new Date());
    let end = null;
    let countdown = 0;
    // let slideIndex = 0;
    if (propiedad && propiedad.data && propiedad.data.fechaOferta) {
      end = moment(propiedad.data.fechaOferta).add({ days: 2 });
      countdown = end.diff(cur);
    }

    let images = [];
    if (propiedad && propiedad.data && propiedad.data.imagenes) {
      images = propiedad.data.imagenes;
      images.sort((x) => (x.esPortada ? -1 : 0));
      // if (images.length > 1) {
      //   slideIndex = images.length / 2;
      //   slideIndex += 1;
      // }
    }

    const RutUser = rut ? rut : "";
    const valorUf = parseFloat(uf.replace(".", "").replace(",", "."));

    let valorPorReferir = 0;
    let valorEnUF = 0;
    let valorEnCLP = 0;

    if (propiedad && propiedad.data) {
      if (propiedad.data.tipoPrecio === "UF") {
        valorPorReferir = formatToThousandSeparator(
          Math.trunc(propiedad.data.valor * 0.0045 * valorUf)
        );
        valorEnUF = formatToThousandSeparator(propiedad.data.valor);
        valorEnCLP = formatToThousandSeparator(
          Math.trunc(propiedad.data.valor * valorUf)
        );
      } else {
        valorPorReferir = formatToThousandSeparator(
          Math.trunc(propiedad.data.valor * 0.0045)
        );
        valorEnUF = formatToThousandSeparator(
          Math.round(propiedad.data.valor / valorUf)
        );
        valorEnCLP = formatToThousandSeparator(propiedad.data.valor);
      }
    }

    if (images.length > 0) {
      images = this.imagesCarrousel(images);
    }

    return (
      <Container fluid={true} className="bg-light">
        <Row>
          <Col sm={12} className="bg-white bajar-realizar overflow-hidden">
            <div className="swiper-propiedad">
              {images.length > 0 && (
                <div>
                  <AliceCarousel
                    responsive={this.state.responsive}
                    items={images}
                    autoPlayDirection="rtl"
                    autoPlayInterval={5000}
                    autoPlay={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={false}
                    disableAutoPlayOnAction={true}
                    showSlideInfo={false}
                    keysControlDisabled={true}
                    dotsDisabled={false}
                    buttonsDisabled={false}
                    preventEventOnTouchMove={true}
                    keyboardNavigation={true}
                    renderSlideInfo={renderSlideInfo}
                    renderDotsItem={renderDotsItem}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                    renderPlayPauseButton={renderPlayPauseButton}
                  />
                </div>
              )}
            </div>
          </Col>
          <Col sm={12} className=" border-bottom cont-header-info">
            <Container className="bg-white">
              <Row>
                <Col sm="6" className="pa0">
                  <Badge variant="success">
                    Propiedad en{" "}
                    {propiedad && propiedad.data
                      ? propiedad.data.operacion
                      : ""}
                  </Badge>

                  <h3 className="h5">
                    {propiedad && propiedad.data ? propiedad.data.glosa : ""} -{" "}
                    {propiedad && propiedad.data ? propiedad.data.comuna : ""}
                  </h3>
                  <h4 className="small">
                    <img src={icon.iconGPS} alt="gps" />{" "}
                    {propiedad && propiedad.data ? propiedad.data.comuna : ""}
                  </h4>
                  <p className="small">
                    código propiedad:{" "}
                    <strong>
                      {propiedad && propiedad.data
                        ? propiedad.data.codigoPropiedad
                        : ""}
                    </strong>
                  </p>

                  <DescripcionPropiedad
                    descripcion={
                      propiedad && propiedad.data
                        ? propiedad.data.observacionesPublicas
                        : ""
                    }
                    propiedad={propiedad}
                  />
                </Col>

                <Col sm="12" lg="3" className="">
                  <div lg="12">
                    <Card className="Uf-card">
                      <div className="text-success">Valor de la propiedad</div>
                      <div className="text-success h3 ">UF {valorEnUF}</div>
                      <div> CLP {valorEnCLP}</div>
                    </Card>
                  </div>

                  <div lg="12">
                    <Card className="gan-card">
                      <div className="gannn">Ganancia por referir hasta</div>
                      <div className="adiosin">CLP {valorPorReferir}</div>
                    </Card>
                  </div>
                </Col>

                {user && user.tipoCuenta !== 7 ? (
                  <Col
                    sm="3"
                    className="pa0 arribamob mobile-space center text-center pt-8px"
                  >
                    <Row>
                      <Col sm="6">
                        {" "}
                        <Button variant="masinfo" onClick={this.onMoreInfo}>
                          <img src={icon.iconSearch} alt="calendar" /> Más
                          información
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        {propiedad && propiedad.data && propiedad.data.idBroker ? (                          
                          <Button
                            variant="masinfo"
                            onClick={() =>
                              this.agendaShow(
                                isLoggedIn,
                                propiedad.data.idCliente,
                                propiedad.data.id
                              )
                            }
                          >
                            <img src={icon.iconCalendar} alt="calendar" /> Agendar
                            Visita
                          </Button>
                        ) : (
                          <Tooltip title="Esta propiedad aún no tiene un broker asignado. Si estás interesado en agendar una visita, contáctanos por Whatsapp">
                            <Button
                              variant="masinfo"
                            >
                              <img src={icon.iconCalendar} alt="calendar" /> Agendar
                              Visita
                            </Button>
                          </Tooltip>
                        ) }
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Button
                          variant="masoferta"
                          onClick={() => this.copyLink()}
                        >
                          <img src={icon.iconShare} alt="Compartir" /> Compartir
                          propiedad
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="6">
                        {propiedad &&
                          propiedad.data &&
                          propiedad.data.puedeSerOfertada && (
                            <Button
                              variant="masoferta"
                              onClick={() => this.ofertaShow(isLoggedIn)}
                            >
                              <img src={icon.iconOferta} alt="oferta" />{" "}
                              Realizar Oferta
                            </Button>
                          )}

                        {propiedad &&
                          propiedad.data &&
                          !propiedad.data.puedeSerOfertada && (
                            <Countdown
                              date={Date.now() + countdown}
                              renderer={this.renderer}
                            />
                          )}
                      </Col>
                    </Row>

                    <Modal
                      className="paMobile"
                      show={this.state.showoferta}
                      onHide={this.ofertaHide}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Realizar Oferta</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="simulator bg-light">
                          <div className="cont-simulator">
                            <span>UF</span>{" "}
                            <AutosizeInput
                              name="form-field-name"
                              value={utilfunc.formatNumeros(this.state.monto)}
                              onChange={this.onChangeMonto}
                              maxLength="12"
                            />
                          </div>
                          <span
                            className="contact-error"
                            style={{ fontSize: ".8em" }}
                          >
                            {montoError}
                          </span>
                        </div>

                        {RutUser === "" ? (
                          <div>
                            <div className="form-group">
                              <label>Ingresar RUT</label>
                              <input
                                type="text"
                                name="rut"
                                className="form-control"
                                maxLength="10"
                                onKeyUp={this.onChangeRun}
                                placeholder="11111111-1"
                              />
                            </div>
                            {this.state.showRutInv ? (
                              <Alert variant={"danger"}>Rut inválido</Alert>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}

                        <Alert variant={"warning"}>
                          El vendedor(a) tiene 48 horas para responder tu
                          oferta, te enviaremos por correo electrónico si la
                          oferta fue aceptada o rechazada.
                        </Alert>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          disabled={this.state.loading || !!montoError}
                          onClick={this.onSubmit}
                        >
                          Enviar Oferta
                        </Button>
                        <Button variant="secondary" onClick={this.ofertaHide}>
                          Cancelar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                ) : null}
              </Row>
            </Container>
          </Col>
          <section className="section-space">
            <Container className="pa0">
              <Row>
                <Col sm={12} md={6} className="paMobile bg-white">
                  <Card className="card-propiedad">
                    {propiedad &&
                      propiedad.data &&
                      propiedad.data.exclusividad && (
                        <Alert variant="success" className="exclusive-propins">
                          <Alert.Heading>
                            <img src={icon.exclusive} alt="exclusive" />{" "}
                            Propiedad exclusiva Propins
                          </Alert.Heading>
                        </Alert>
                      )}

                    <Descri
                      descripcion={
                        propiedad && propiedad.data
                          ? propiedad.data.observacionesPublicas
                          : ""
                      }
                    />

                    <ComodiadesPropiedad propiedad={propiedad} />
                    <CaracteristicasComunidad propiedad={propiedad} />
                    <EntornoPropiedad
                      propiedad={propiedad}
                      locales={nearbyLocationsByType}
                    />
                  </Card>
                </Col>
                <Col sm={12} md={6} className="">
                  <div style={style}>
                    {(!propiedad || !propiedad.data) && <div>Cargando...</div>}

                    {propiedad && propiedad.data && (
                      <Map
                        className="google-map"
                        zoom={this.state.zoom}
                        onReady={this.handleMapMount}
                        initialCenter={{
                          lat: propiedad.data.loc.x,
                          lng: propiedad.data.loc.y,
                        }}
                      >
                        {/* {mapResults.map(r => {
                          return (
                            <Marker
                              key={r.id}
                              position={{
                                lat: r.geometry.location.lat(),
                                lng: r.geometry.location.lng(),
                              }}
                            />
                          );
                        })} */}
                        <Marker
                          icon={icon.propingoole}
                          position={{
                            lat:
                              propiedad && propiedad.data
                                ? propiedad.data.loc.x
                                : 0,
                            lng:
                              propiedad && propiedad.data
                                ? propiedad.data.loc.y
                                : 0,
                          }}
                        />
                      </Map>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <Modal
            className="tour-propiedad"
            show={this.state.show}
            onHide={this.handleHide}
            size="lg"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton />
            <Modal.Body className="paAll">
              <iframe
                title="vr"
                width="100%"
                height="100%"
                //src="https://my.matterport.com/show/?m=JGPnGQ6hosj&play=1&qs=1"
                src={
                  propiedad && propiedad.data ? propiedad.data.urlMattePort : ""
                }
                allow="vr"
              />
              <Card className="instructions">
                <div className="d-web">
                  <Row>
                    <Col>
                      Mover <img src={icon.Rotate} alt="Rotate" />
                    </Col>
                    <Col>
                      Girar <img src={icon.Move} alt="Move" />
                    </Col>
                    <Col>
                      Play <img src={icon.Play} alt="Play" />
                    </Col>
                  </Row>
                </div>
                <div className="d-mobile">
                  <Row>
                    <Col>
                      Mover <img src={icon.MoveTap} alt="Rotate" />
                    </Col>
                    <Col>
                      Zoom <img src={icon.ZoomTap} alt="Move" />
                    </Col>
                    <Col>
                      Play <img src={icon.PlayTap} alt="Play" />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  uf: state.app.uf,
  mensajeOferta: state.app.mensajeOferta,
  ...state.app,
  ...state.auth,
  requestIncrementarVisitasVirtuales:
    state.app.requestIncrementarVisitasVirtuales,
});

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  getUf: () => dispatch(fetchGetUF()),
  postIncrementarVisitasVirtuales: (data) =>
    dispatch(postIncrementarVisitasVirtuales(data)),
});

IndexInfoPropiedad = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexInfoPropiedad);

export default IndexInfoPropiedad;
