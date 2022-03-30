/** @format */

import React, { Component } from "react";
import {
  Container,
  Row,
  Button,
  Card,
  Badge,
  Col,
  Modal,
} from "react-bootstrap";
import { connect } from "react-redux";
import utilfunc from "../../../utils/utilsFunc";
import { fetchGetUF, setRegistered } from "../../../action";
import "react-alice-carousel/lib/alice-carousel.css";
import "moment-timezone";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import icon from "../../../utils/images";
import moment from "moment";
import "moment-timezone";
import CaracteristicasComunidad from "./CaracteristicasComunidad";
import EntornoPropiedad from "./EntornoPropiedad";
import ComodidadesPropiedad from "./ComodidadesPropiedad";
import Map from "../../../components/GoogleMap";
import { Marker } from "google-maps-react";
import { message } from 'antd';

export class DetallesModelo extends Component {
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
      showoferta: false,
      nearbyLocationsByType,
      proyecto: null,
      loading: false,
      montoError: null,
      open2: false,
      show: false,
      isVisible: false,
      selectedPlace: "Prueba",
      mapResults: [],
      responsive: {
        0: { items: 1 },
        1024: { items: 3 },
      },
    };

    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleMapMount = this.handleMapMount.bind(this);
    const { setRegistered } = this.props;
    setRegistered(true);
  }

  handleShow = (val) => {
    if (val !== undefined && val !== null && val !== "") {
      this.setState({ show: true });
    }
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  componentDidMount = async () => {
    const { getUf, match } = this.props;
    document.body.scrollTop = 0;
    let proyectoId = "";
    if (match && match.params) {
      proyectoId = match.params.id;
    }
    this.setState({
      proyectoId: proyectoId,
    });
    getUf();
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

  imagesCarrousel = (images) => {
    const { proyecto, modelNumber } = this.props;
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
              {proyecto &&
              proyecto.modelos &&
              proyecto.modelos[modelNumber] &&
              proyecto.modelos[modelNumber].urlMattePort !== "" &&
              proyecto.modelos[modelNumber].urlMattePort !== null ? (
                <div className="cont-play-tour">
                  {proyecto &&
                  proyecto.modelos &&
                  proyecto.modelos[modelNumber] &&
                  proyecto.modelos[modelNumber].urlMattePort !== "" ? (
                    <img
                      src={icon.imgPlayTour}
                      alt="tour"
                      onClick={() =>
                        this.handleShow(
                          proyecto.modelos[modelNumber].urlMattePort
                        )
                      }
                    />
                  ) : (
                    <img src={icon.imgPlayTour} alt="tour" />
                  )}

                  <br />
                  {proyecto &&
                  proyecto.modelos &&
                  proyecto.modelos[modelNumber] &&
                  proyecto.modelos[modelNumber].urlMattePort !== "" &&
                  proyecto.modelos[modelNumber].urlMattePort !== null ? (
                    <span
                      onClick={() =>
                        this.handleShow(
                          proyecto.modelos[modelNumber].urlMattePort
                        )
                      }
                      className="h1"
                    />
                  ) : (
                    <span className="h1">Tour Virtual</span>
                  )}
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
              <img
                src={item.downloadLink}
                className="carouselpropiedades"
                alt="First slide"
              />
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

  agendaShow = (idInmo, idProyecto) => {
    const { history } = this.props;
    history.push(`/live/reserva-usuario/${idInmo}/${idProyecto}`);
  };

  onMoreInfo = () => {
    const { history } = this.props;

    history.push(`/contacto`);
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
  ofertaHide = () => {
    this.setState({ showoferta: false });
  };

  copyLink = () => {
    let url = window.location.href;
    navigator.clipboard.writeText(url);
    message.info('Link del proyecto copiado al portapapeles');
  }

  render() {
    const { proyecto, uf, modelNumber, history, inmobiliariaId } = this.props;
    const { nearbyLocationsByType } = this.state;
    document.body.scrollTop = 0;
    const style = { width: "100%", height: "300px" };
    moment(new Date());
    let valor = uf ? uf.replace(".", "").split(",")[0] : 27565;
    let images = [];
    if (
      proyecto &&
      proyecto.modelos[modelNumber] &&
      proyecto.modelos[modelNumber].imagenes
    ) {
      images = proyecto.modelos[modelNumber].imagenes;
      images.sort((x, y) => (x.esPortada ? -1 : 0));
      if (images.length > 1) {
      }
    }
    if (images.length > 0) {
      images = this.imagesCarrousel(images);
    }

    const valorUf = parseFloat(uf.replace(".", "").replace(",", "."));

    let valorPorReferir = 0;
    let valorEnUF = 0;
    let valorEnCLP = 0;

    if (proyecto && proyecto.modelos) {
      if (proyecto.tipoPrecio === "UF") {
        valorPorReferir = utilfunc.formatToThousandSeparator(
          Math.trunc(
            proyecto.modelos[modelNumber].valorDesde * 0.0045 * valorUf
          )
        );
        valorEnUF = utilfunc.formatToThousandSeparator(
          proyecto.modelos[modelNumber].valorDesde
        );
        valorEnCLP = utilfunc.formatToThousandSeparator(
          Math.trunc(proyecto.modelos[modelNumber].valorDesde * valorUf)
        );
      } else {
        valorPorReferir = utilfunc.formatToThousandSeparator(
          Math.trunc(proyecto.modelos[modelNumber].valorDesde * 0.0045)
        );
        valorEnUF = utilfunc.formatToThousandSeparator(
          Math.round(proyecto.modelos[modelNumber].valorDesde / valorUf)
        );
        valorEnCLP = utilfunc.formatToThousandSeparator(
          proyecto.modelos[modelNumber].valorDesde
        );
      }
    }

    return (
      <Container fluid={true} className="bg-light">
        <Row>
          <Col sm={12} className="overflow-hidden bg-white bajar-realizar ">
            <Row className="hideWEB ">
              <Col className="text-center center">
                {proyecto.habilitarLive ? (
                  <Button
                    onClick={() => history.push(`/live/room/${proyecto.id}`)}
                    disabled={!(this.props.liveIsAllowed === true)}
                    variant="nada"
                  >
                    <div className="down14">
                      <img
                        className="down14"
                        src={icon.zoomi}
                        width="50%"
                        alt=""
                      />{" "}
                    </div>
                  </Button>
                ) : null}
              </Col>
            </Row>
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
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    preventEventOnTouchMove={true}
                  />
                </div>
              )}
            </div>
          </Col>

          <Col sm={12} className=" border-bottom cont-header-info">
            <Container className="bg-white">
              <Row>
                <Col sm="5" className="pa0">
                  <Badge variant="success">Propiedad en Venta</Badge>
                  <h3 className="h5">
                    {proyecto ? (
                      <span>
                        {proyecto.nombreCalle} {proyecto.numero},{" "}
                        {proyecto.comuna}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>

                  <h4 className="small">
                    <img src={icon.iconGPS} alt="gps" />{" "}
                    {proyecto ? <span>{proyecto.comuna}</span> : ""}
                  </h4>
                  <p className="small">
                    Nombre Inmobiliaria:{" "}
                    <strong>{proyecto.nombreInmobiliaria}</strong>
                  </p>

                  <h6 className="text-success">
                    Características de la propiedad
                  </h6>
                  <Row className="cont-dependencias hideMOBILE moove">
                    <Row>
                      <Col>
                        <img src={icon.m2contruidos} width="10%" alt="" />
                        <li>{proyecto.superficieUtilDesde}</li>
                        <div className="m2derecha5 peke3">m² Construidos</div>
                      </Col>
                      <Col>
                        <img src={icon.camas} width="15%" alt="" />
                        <li>{proyecto.modelos[modelNumber].dormitorio}</li>
                      </Col>
                    </Row>

                    <Row className="">
                      <Col>
                        <img src={icon.m2totales} width="10%" alt="" />
                        <li>{proyecto.superficieTotalesDesde}</li>
                        <div className="m2derecha5 peke3 ">m² Totales</div>
                      </Col>
                      <Col>
                        <img src={icon.banos} width="15%" alt="" />
                        <li>{proyecto.modelos[modelNumber].banio} </li>
                      </Col>
                    </Row>
                  </Row>
                  <Row className="cont-dependencias moove">
                    <Row className="hideWEB">
                      <Col>
                        <img src={icon.m2contruidos} width="30%" alt="" />
                        <div className="m2derecha4">
                          {" "}
                          {proyecto.superficieUtilDesde} m²
                        </div>
                        <div className="m2derecha4 peke"> Construidos</div>
                      </Col>

                      <Col>
                        <img src={icon.camas} width="30%" alt="" />
                        <div className="m2derecha4">
                          {proyecto.modelos[modelNumber].dormitorio}
                        </div>
                      </Col>
                    </Row>
                    <Row className="hideWEB">
                      <Col>
                        <img src={icon.m2totales} width="30%" alt="" />

                        <div className="m2derecha4">
                          {" "}
                          {proyecto.superficieTotalesDesde}
                          m²
                        </div>
                        <div className="m2derecha4 peke">Totales</div>
                      </Col>
                      <Col>
                        <img src={icon.banos} width="30%" alt="" />
                        <div className="m2derecha4 ">
                          {proyecto.modelos[modelNumber].banio}
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </Col>
                <Col sm="1" className="hideMOBILE">
                  {proyecto.habilitarLive ? (
                    <Button
                      onClick={() => history.push(`/live/room/${proyecto.id}`)}
                      disabled={!(this.props.liveIsAllowed === true)}
                      variant="nada"
                    >
                      <div className="down14">
                        <img
                          className="down14"
                          src={icon.zoomi}
                          width="%20"
                          alt=""
                        />{" "}
                      </div>
                    </Button>
                  ) : null}
                </Col>

                <Col sm="3" className="">
                  <Row className="moveremos">
                    <Col>
                      <Card className="Uf-card">
                        <div className="text-success">
                          Valor de la propiedad
                        </div>
                        <div className="text-success h3 ">UF {valorEnUF}</div>
                        <div>CLP {valorEnCLP}</div>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="moveremos">
                    <Col>
                      <Card className="gan-card ">
                        <div className="gannn">Ganancia por referir hasta</div>
                        <div className="adiosin">CLP {valorPorReferir}</div>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col className="center titulo-arriba2 text-center">
                  <Row>
                    {" "}
                    <Col sm="6">
                      {" "}
                      <Button variant="masinfo" onClick={this.onMoreInfo}>
                        <img src={icon.iconSearch} alt="calendar" /> Más
                        información
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    {" "}
                    <Col sm="6">
                      {" "}
                      {proyecto.habilitarLive ? (
                        <Button
                          variant="masinfo"
                          onClick={() =>
                            history.push(
                              inmobiliariaId
                                ? "/live/reserva-usuario/" +
                                    proyecto.id +
                                    "/" +
                                    inmobiliariaId
                                : "/live/reserva-usuario/" + proyecto.id
                            )
                          }
                        >
                          <img src={icon.iconSearch} alt="calendar" /> Agendar
                          live
                        </Button>
                      ) : null}
                    </Col>
                  </Row>

                  <Row>
                    {" "}
                    <Col sm="6">
                      <Button
                        variant="masinfoazul"
                        onClick={() => this.copyLink() }
                      >
                        <img src={icon.iconShare} alt="Compartir" />{" "} Compartir proyecto
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Container>
          <section className="section-space">
            <Container className="pa0">
              <Row>
                <Col sm={12} md={6} className="paMobile bg-white">
                  <Col sm="12">
                    {" "}
                    <div className="h5 text-success">
                      Descripción de la propiedad
                    </div>
                    <span>{proyecto.observacionesPublicas}</span>
                    <ComodidadesPropiedad
                      proyecto={proyecto}
                      modelNumber={modelNumber}
                    />
                    <CaracteristicasComunidad
                      proyecto={proyecto}
                      modelNumber={modelNumber}
                    />
                    <EntornoPropiedad
                      proyecto={proyecto}
                      locales={nearbyLocationsByType}
                      modelNumber={modelNumber}
                    />
                  </Col>
                </Col>
                <Col sm={6} className="paMobile padding-detalles-modelo">
                  <div style={style}>
                    {!proyecto && <div>Cargando...</div>}

                    {proyecto && (
                      <Map
                        className="google-map"
                        zoom={this.state.zoom}
                        onReady={this.handleMapMount}
                        initialCenter={{
                          lat: proyecto.loc.x,
                          lng: proyecto.loc.y,
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
                            lat: proyecto ? proyecto.loc.x : 0,
                            lng: proyecto ? proyecto.loc.y : 0,
                          }}
                        />
                      </Map>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>

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
              src={
                proyecto && proyecto.modelos
                  ? proyecto.modelos[modelNumber] &&
                    proyecto.modelos[modelNumber].urlMattePort
                  : ""
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
  inmobiliariaId: state.app.inmobiliariaId,
  proyectoId: state.app.proyectoId,
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  getUf: () => dispatch(fetchGetUF()),
});

DetallesModelo = connect(mapStateToProps, mapDispatchToProps)(DetallesModelo);

export default DetallesModelo;
