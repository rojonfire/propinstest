import React, { Component } from "react";
import {
  Button,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Row, Col } from "antd";
import { Marker, InfoWindow } from "google-maps-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../api";
import Map from "../../components/GoogleMap";
import { fetchGetPropiedades, fetchGetProperById } from "../../action";
import icon from "../../utils/images";
import { CardlItem } from "../../components/Card";
import { CarrouselItem } from "../../components/Carrousel";
import { FiltroHeader } from "../../components/FiltroHeader";
import { Sidebar } from "../../components/Sidebar";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";
import utilsFunc from "../../utils/utilsFunc";
import ReactGa from "react-ga";
import { Field, Formik, ErrorMessage } from "formik";
import {
  fetchGetUF,
  postAddSuscripcion,
  fetchGetTodosLosPlanes,
} from "../../action";
import swal from "sweetalert";
import FormularioSuscripcion from "../../components/FormularioSuscripcion";
import { Modal } from "antd";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

const { mobilecheck, formatNumeros, formatToThousandSeparator } = utilsFunc;

export class IndexResultadoBusqueda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      show2: false,
      show: false,
      show3: false,
      show4: false,
      showsuscri: false,
      black: true,
      selectedProps: [],
      buttonSelected: [],
      total: 0,
      selectValue: "",
      allPropiedades: [],
      referidos: [],
      currentPropiedades: [],
      currentPage: null,
      totalPages: null,
      countPropiedades: 0,
      sidebar: false,
      zoom: 13,
      lugar: "Santiago",
      showingInfoWindow: false,
      imagen: "",
      glosa: "",
      porcentaje: 0,
      showModalSuscripcion: false,
      estacionamiento: "",
      bodega: "",
      amoblado: "",
      usado: "",
      activeMarkerLink: "",
      Dormitorio_Desde1: "",
      tiipo_moneda: "CLP",
      comuna: "",
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.NombreRef = React.createRef();
    this.onPageChanged = this.onPageChanged.bind(this);
    this.searchPropiedhabldechades = this.searchPropiedades.bind(this);
  }

  changeColor() {
    this.setState({ black: !this.state.black });
  }
  handleChange = (Dormitorio_Desde1) => {
    this.setState({ Dormitorio_Desde1 });
  };
  handleChangemoneda = (tiipo_moneda) => {
    this.setState({ tiipo_moneda });
  };
  selectProp = async (id, e) => {
    let { selectedProps, buttonSelected } = this.state;
    let idButton = document.getElementById(e.target.id);

    if (!selectedProps.includes(id)) {
      await selectedProps.push(id);
      this.setState({ selectedProps: selectedProps });
      await buttonSelected.push(idButton.id);
      this.setState({ buttonSelected: buttonSelected });

      //this.setState({ black: !this.state.black });
      idButton.setAttribute("class", "btn btn-chekeado");
    } else {
      await selectedProps.splice(id);
      this.setState({ selectedProps: selectedProps });
      await buttonSelected.splice(idButton.id);
      idButton.setAttribute("class", "btn btn-referiragregar");
    }

    localStorage["Props"] = JSON.stringify(selectedProps);
    localStorage["BtnSelected"] = JSON.stringify(buttonSelected);
  };

  componentDidMount = async () => {
    const { user, getUf, getPlanes } = this.props;

    getUf();

    let referidosSelect = [];

    const urlQuery = utilsFunc.getUrlParameter("query");

    if (user && user.tipoCuenta === 7) {
      await api.apiGetProperById(user.properId).then((result) => {
        if (result !== null && result !== undefined) {
          referidosSelect = result.referidos;
        }
      });
      this.referirshow();
      this.setState({ referidos: referidosSelect });
    }
    this.searchPropiedades(urlQuery);
    getPlanes();

    initGA();
    logPageView();
  };

  toggleModalSuscripcion = () => {
    const { showModalSuscripcion } = this.state;
    this.setState({ showModalSuscripcion: !showModalSuscripcion });
  };

  referirshow = () => {
    let props = [];
    localStorage["Props"] === undefined ||
    JSON.parse(localStorage["Props"]).length === 0
      ? (props = [])
      : (props = JSON.parse(localStorage["Props"]));

    if (localStorage.getItem("BtnSelected") !== null) {
      let buttonSelected = JSON.parse(localStorage["BtnSelected"]);
      setTimeout(() => {
        buttonSelected.forEach((e) => {
          if (props.length !== 0 && buttonSelected.length !== 0) {
            let btn = document.getElementById(e);
            if (btn != null) {
              btn.setAttribute("class", "btn btn-chekeado");
            }
          }
        });
      }, 1000);
    }
  };
  referir = async () => {
    const { selectedProps } = this.state;
    const { user } = this.props;

    let mailReferido = document.getElementById("referido").value;
    let mailReferidoElemento = document.getElementById("referido");
    let nombreReferido =
      mailReferidoElemento.options[mailReferidoElemento.selectedIndex].text;
    let propiedades =
      selectedProps.length === 0
        ? JSON.parse(localStorage["Props"])
        : selectedProps;
    // let modelos = localStorage['Modelos']!==undefined || JSON.parse(localStorage['Modelos']).length===0?[]:JSON.parse(localStorage['Modelos'])
    //console.log(modelos)

    let referir = {
      Email: mailReferido,
      Referencias: propiedades,
      NombreProper: user.name,
      Nombres: nombreReferido,
      ProperId: user.properId,
      paso1: true,
    };
    this.setState({ selectValue: nombreReferido });
    await api.apiReferir(referir);
  };

  manejarmodal = async () => {
    this.setState({ show: !this.state.show });
  };
  manejarmodal4 = async () => {
    this.setState({ show4: !this.state.show4 });
  };
  toggleModalAgregarReferido = () => {
    this.setState({
      showModalAgregarReferido: !this.state.showModalAgregarReferido,
    });
  };
  manejarmodalsucripcion = () => {
    this.setState({ showsuscri: !this.state.showsuscri });
  };

  esPlanTipoVenta = (idPlan) => {
    const { planes } = this.props;
    let plan;
    if (planes != null && planes.length > 0) {
      plan = planes.filter((p) => p.id == idPlan).pop();
      if (plan != null && !plan.esVenta) {
        return false;
      }
    }
    return true;
  };

  onPageChanged(data) {
    let query = document.getElementById("txtQuery").value;
    let tipo = document.getElementById("txtTipoPro").value;
    let tipoOperacion = document.getElementById("txtTipoOperacion").value;

    const { currentPage, totalPages, pageLimit } = data;

    let offset = (currentPage - 1) * pageLimit;
    offset < 9 ? (offset = 9) : (offset = 0);
    // if (offset < 0) offset = 9;

    const datos = {
      limit: 0,
      skip: 0,
      direccion: query,
      isFirts: false,
      tipoPropiedad: tipo,
      codPRopiedad: "",
      banioDes: 0,
      banioHas: 0,
      dormitoriosDes: 0,
      dormitoriosHas: 0,
      tipoOperacion: tipoOperacion
    };

    const { getPropiedades } = this.props;
    getPropiedades(datos, totalPages, currentPage);
  }

  onMarkerClick = (props, marker) => {
    let p = props.title;

    this.setState({
      activeMarker: marker,
      glosa: p,
      propId: props.propId,
      showingInfoWindow: true,
      activeMarkerLink: props.usado
        ? `info-propiedad?idprop=${props.propId}`
        : `live/info-proyecto/${props.propId}`,
    });
  };

  searchPropiedades = (urlQuery) => {
    urlQuery =
      typeof urlQuery === "string" && urlQuery !== "" ? urlQuery : null;
    const { getPropiedades } = this.props;

    let comuna = document.getElementById("txtComuna").value;
    let tipo = document.getElementById("txtTipoPro").value;
    let tipoOperacion = document.getElementById("txtTipoOperacion").value;

    const data = {
      limit: 0,
      skip: 0,
      comuna: urlQuery || comuna,
      isFirts: false,
      tipoPropiedad: tipo,
      banioDes: 0,
      banioHas: 0,
      dormitoriosDes: 0,
      dormitoriosHas: 0,
      tipoOperacion: tipoOperacion
    };

    getPropiedades(data, 0, 0);
  };

  toggleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
    });
  };

  onMapClicked = (params, map) => {
    let comuna = document.getElementById("txtComuna").value;
    let tipo = document.getElementById("txtTipoPro").value;

    let valorDesde = document.getElementById("txtValorDesde").value;
    let valorHasta = document.getElementById("txtValorHasta").value;
    let tipoOperacion = document.getElementById("txtTipoOperacion").value;
    const lat = map.center.lat();
    const lng = map.center.lng();
    const data = {
      limit: 0,
      skip: 0,
      comuna: comuna,
      isFirts: false,
      tipoPropiedad: tipo,
      tipoPrecio: "",
      valorDesde: valorDesde === "" ? 0 : valorDesde,
      valorHasta: valorHasta === "" ? 0 : valorHasta,
      lat,
      lng,
      banioDes: 0,
      banioHas: 0,
      dormitoriosDes: 0,
      dormitoriosHas: 0,
      tipoOperacion: tipoOperacion
    };
    const { getPropiedades } = this.props;
    getPropiedades(data, 0, 0);
  };

  searchPropiedadesAvanzada = () => {
    const { estacionamiento, bodega, amoblado, usado } = this.state;
    let comuna = document.getElementById("txtComuna").value;
    let tipo = document.getElementById("txtTipoPro").value;
    let tipoPrecio = "UF";
    let valorDesde = document.getElementById("txtValorDesde").value;
    let valorHasta = document.getElementById("txtValorHasta").value;
    let superficieDesde = document.getElementById("txtSuperficieUtilDes").value;
    let superficieHasta = document.getElementById("txtSuperficieUtilHas").value;
    let tipoOperacion = document.getElementById("txtTipoOperacion").value;

    // let banioDesHas = document.getElementById("banioDesHas");
    // var banioDesHasDesHasValue = banioDesHas.options[banioDesHas.selectedIndex].value;
    //
    // let dormitorioDesHas = document.getElementById("dormitorioDesHas");
    // var dormitorioDesHasValue = dormitorioDesHas.options[dormitorioDesHas.selectedIndex].value;
    //

    let dormitorioDesHas =
      this.dormitorioDesHas.value === "+5"
        ? 5
        : parseInt(this.dormitorioDesHas.value);

    let banioDesHas =
      this.banioDesHas.value === "+5" ? 5 : parseInt(this.banioDesHas.value);

    superficieDesde = superficieDesde ? parseInt(superficieDesde) : 0;
    superficieHasta = superficieHasta ? parseInt(superficieHasta) : 99999;

    const data = {
      limit: 0,
      skip: 0,
      comuna: comuna,
      isFirts: false,
      tipoPropiedad: tipo,
      tipoPrecio: tipoPrecio,
      valorDesde: valorDesde === "" ? 0 : valorDesde,
      valorHasta: valorHasta === "" ? 0 : valorHasta,
      filtrarEstacionamiento: estacionamiento !== "" ? true : false,
      filtrarBodega: bodega !== "" ? true : false,
      filtrarAmoblado: amoblado !== "" ? true : false,
      filtrarUsada: usado !== "" ? true : false,
      estacionamiento: estacionamiento === "si" ? true : false,
      bodega: bodega === "si" ? true : false,
      amoblado: amoblado === "si" ? true : false,
      usada: usado === "si" ? true : false,
      banioDes: banioDesHas,
      banioHas: banioDesHas,
      dormitoriosDes: dormitorioDesHas,
      dormitoriosHas: dormitorioDesHas,
      superficieUtilDes: superficieDesde,
      superficieUtilHas: superficieHasta,
      tipoOperacion: tipoOperacion
    };
    const { getPropiedades } = this.props;
    getPropiedades(data, 0, 0);

    mobilecheck() && this.toggleSidebar();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { properId } = this.props.user;

    let nombre = document.getElementById("nombres").value;
    let apellido = document.getElementById("apellidos").value;
    let mail = document.getElementById("mail").value;

    let proper = {
      ProperId: properId,
      Referidos: {
        Nombres: nombre,
        Apellido: apellido,
        Email: mail,
      },
    };
    let newref = await api.apiUpdateProper(proper);

    this.setState({ referidos: newref.data.referidos });

    try {
      sweetalert({
        title: "Enviado con éxito",
        text: "Referido Agregado.",
        icon: "success",
        dangeMode: false,
      });
      // this.setState({show: !this.state.show});
    } catch (error) {
      console.log("error: ", error);
    }
    this.toggleModalAgregarReferido();
  };

  onOpenSidebar = () => {
    this.setState({
      sidebar: true,
    });
  };

  onCloseSidebar = () => {
    this.setState({
      sidebar: false,
    });
  };

  handleDropdownChange(e) {
    this.setState({ selectedProps: [] });
    this.setState({ buttonSelected: [] });
    Array.from(document.getElementsByClassName("btn btn-chekeado")).forEach(
      (e) => {
        e.setAttribute("class", "btn btn-referiragregar");
      }
    );
  }

  handleSelectEstacionamiento = (e) => {
    this.setState({
      estacionamiento: e.target.value,
    });
  };

  handleSelectBodega = (e) => {
    this.setState({
      bodega: e.target.value,
    });
  };

  handleSelectAmoblado = (e) => {
    this.setState({
      amoblado: e.target.value,
    });
  };
  handleSelectUsado = (e) => {
    this.setState({
      usado: e.target.value,
    });
  };

  handleChangeComuna = (e) => {
    this.setState({
      comuna: e.target.value,
    });
  };

  render() {
    const { respuesta, loading, history, user, uf } = this.props;
    const {
      showModalSuscripcion,
      showModalAgregarReferido,
      selectedProps,
      referidos,
    } = this.state;

    let currentPropiedades = [];
    let countPropiedades = 0;

    if (respuesta && respuesta.estado === 1) {
      currentPropiedades = respuesta.data;

      let pDestacadas = currentPropiedades.filter((key) => key.destacar);
      let pNoDestacadas = currentPropiedades.filter((key) => !key.destacar);

      currentPropiedades = [...pDestacadas, ...pNoDestacadas];

      countPropiedades = respuesta.count;
    }

    let totalPropiedades = countPropiedades;

    const valorUf = uf
      ? parseFloat(uf.replace(".", "").replace(",", "."))
      : 29064;

    return (
      <section className="section-space-p1ex">
        {user && user.tipoCuenta === 7 ? (
          <section>
            <Row className="largo-agregar-refe">
              <Col md="4">
                <div className="modal-misreferidosA">Referir Propiedades</div>
              </Col>
              <Col />
              <Col md="4" className="hideMOBILE">
                <Button
                  variant="mis-referidos"
                  onClick={() => {
                    this.toggleModalAgregarReferido();
                  }}
                >
                  {" "}
                  Agregar Referido
                </Button>

                <Modal
                  title="Agregar referido"
                  centered
                  visible={showModalAgregarReferido}
                  width={300}
                  footer={null}
                  onCancel={() => this.toggleModalAgregarReferido()}
                >
                  <Formik
                    initialValues={{
                      Nombres: "",
                      Apellidos: "",
                      Mail: "",
                      Telefono: "",
                    }}
                    validate={valitate}
                    onSubmit={(e, opts) => this.EnviarData(e, opts)}
                  >
                    {({ isSubmitting }) => (
                      <Form onSubmit={this.EnviarData}>
                        <label>Nombre</label>
                        <Field
                          name="Nombres"
                          id="nombres"
                          className="color-border-modal form-control w-100"
                          ref={this.NombreRef}
                        />

                        <label>Apellido</label>
                        <Field
                          name="Apellidos"
                          id="apellidos"
                          className="color-border-modal form-control w-100"
                        />

                        <label>Correo</label>
                        <Field
                          name="Mail"
                          id="mail"
                          className="color-border-modal form-control w-100"
                          placeholder="example@example.cl"
                        />
                        <ErrorMessage
                          name="Mail"
                          className="contact-error"
                          component="div"
                        />
                        <div className="center text-center">
                          <Button
                            // type="submit"
                            variant="misreferidosmod"
                            onClick={this.onSubmit}
                          >
                            {isSubmitting ? "Enviando..." : "Enviado"}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal>
              </Col>
            </Row>
            <Row className="hideWEB2 center text-center topis">
              <Col>
                <Button
                  variant="mis-referidos"
                  onClick={() => {
                    this.toggleModalAgregarReferido();
                  }}
                >
                  {" "}
                  Agregar Referido
                </Button>
              </Col>
            </Row>
            <Row className=" center section-rodolfo hideWEB2">
              <Row>
                <Col>
                  <div className="text-center marginales">
                    {" "}
                    TRES SIMPLES PASOS PARA REFERIR
                  </div>
                </Col>
              </Row>

              <Row className="center marginnn">
                <Col>
                  <Card className="bg-white center card-pasos-res">
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">1</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center ">SELECCIONAR REFERIDO</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Selecciona entre los referidos que ya tienes guardados.
                        Si quieres incorporar uno nuevo, agrégalo en el botón
                        “Agregar referidos”.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row className="center">
                <Col>
                  <Card className="bg-white center card-pasos-res">
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">2</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">AGREGAR PROPIEDADES</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Selecciona las propiedades que coincidan con lo que tu
                        referido anda buscando.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row className="center">
                <Col>
                  <Card className="bg-white center card-pasos-res">
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">3</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">REFERIR PROPIEDADES</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Una vez seleccionadas las propiedades solo debes apretar
                        “referir” para que tu referido reciba tu propuesta.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Row>
            <Row className="section-rodolfo hideMOBILE">
              <Card className="alto-delcarmen2">
                <Row>
                  <Col>
                    <div className="text-center marginales">
                      {" "}
                      TRES SIMPLES PASOS PARA REFERIR
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">1</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center ">SELECCIONAR REFERIDO</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Selecciona entre los referidos que ya tienes guardados.
                        Si quieres incorporar uno nuevo, agrégalo en el botón
                        “Agregar referidos”.
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">2</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">AGREGAR PROPIEDADES</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Selecciona las propiedades que coincidan con lo que tu
                        referido anda buscando.
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="text-center pasosreferirmobile">
                        <img src={icon.circulito} alt="" />
                        <div className="colorpasos">3</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">REFERIR PROPIEDADES</Col>
                    </Row>
                    <Row>
                      <Col className="pasosrefimargen">
                        Una vez seleccionadas las propiedades solo debes apretar
                        “referir” para que tu referido reciba tu propuesta.
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Row>

            <Row className="section-rodolfo2 center text-center ">
              <Col
                md="6"
                className="bg-white colorseleccion center text-center "
              >
                <Col>
                  {" "}
                  <Row>
                    <Col md="6" className="tre2">
                      <div className=" color-referir text-center">
                        SELECCIONAR REFERIDO
                      </div>
                    </Col>
                    <Col md="6" className="tre2">
                      <div className="center">
                        <Form.Group
                          className="form-group2 center-box"
                          id="Dormitorios"
                        >
                          <div className="box-select">
                            <Form.Control
                              as="select"
                              id="referido"
                              onChange={(e) => this.handleDropdownChange(e)}
                            >
                              {referidos.length !== 0 ? (
                                referidos.map((value) => (
                                  <option value={value.email}>
                                    {value.nombres} {value.apellido}
                                  </option>
                                ))
                              ) : (
                                <option>No tiene referidos</option>
                              )}
                            </Form.Control>
                          </div>
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Col>

              <Col
                md="6"
                className="bg-white colorseleccion center text-center"
              >
                <Row>
                  <Col md={8}>
                    {" "}
                    <div className="tre2 color-referir text-center ">
                      REFERIR PROPIEDADES
                    </div>
                  </Col>
                  <Col md="3" className="">
                    {selectedProps.length !== 0 ? (
                      <Button
                        variant="referir30 gana3 center dudu"
                        onClick={() => {
                          this.manejarmodal();
                          this.referir();
                        }}
                      >
                        REFERIR
                      </Button>
                    ) : (
                      <Button
                        variant="referir30 gana3 dudu"
                        onClick={() => {
                          this.manejarmodal4();
                        }}
                      >
                        {" "}
                        REFERIR
                      </Button>
                    )}

                    <Modal
                      show={this.state.show4}
                      onHide={() => this.manejarmodal4()}
                    >
                      <Modal.Header closeButton>
                        <Row className="center text-center">
                          <Col>
                            <div className="modal-misreferidos">Referido</div>
                          </Col>
                        </Row>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          NO HAS SELEECIONADO NINGUNA PROPIEDAD, SELECCIONA AL
                          MENOS UNA Y VUELVE A INTENTARLO
                        </Row>
                      </Modal.Body>
                    </Modal>

                    <Modal
                      show={this.state.show}
                      onHide={() => this.manejarmodal()}
                    >
                      <Modal.Header closeButton>
                        <Row className="center text-center">
                          <Col>
                            <div className="modal-misreferidos">Referido</div>
                          </Col>
                        </Row>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          Se han referido {selectedProps.length} propiedades
                          para:
                        </Row>
                        <Row>{this.state.selectValue}</Row>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>

                <Row>
                  <Col md={8}>
                    {" "}
                    <div className="color-referir total-propiedades text-center">
                      <div className="hideWEB2">
                        Total de propiedades seleccionadas:{" "}
                        {selectedProps.length}
                      </div>
                      <div className="hideMOBILE">
                        Total de propiedades seleccionadas:
                      </div>
                      <div className="numerogrande hideMOBILE center text-center">
                        {selectedProps.length}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col md="1" />
            </Row>
          </section>
        ) : null}

        {loading && (
          <LoadingModal
            porcentaje={this.state.porcentaje}
            finish={() => this.setState({ porcentaje: 0 })}
          />
        )}

        <div className="bg-light section-space-p1ex">
          <div className="hideMOBILE bg-light-two navbar col-12">
            <div className="cont-buscador col-md-7 w-table-100">
              <FiltroHeader searchPropiedades={this.searchPropiedades} />

              <Button
                className="w-table-100"
                variant=""
                onClick={this.searchPropiedades}
              >
                {user && user.tipoCuenta === 7 ? (
                  <img src={icon.iconSearchColor2} alt="" />
                ) : (
                  <img src={icon.iconSearchColor} alt="" />
                )}
              </Button>
            </div>

            {user && user.tipoCuenta === 7 ? (
              <Button
                className="btn-filter"
                variant="hola"
                onClick={() => this.toggleSidebar()}
              >
                <img src={icon.iconFilter2} alt="" />{" "}
              </Button>
            ) : (
              <Button
                className="btn-filter verdito"
                variant="hola"
                onClick={() => this.toggleSidebar()}
              >
                <img src={icon.iconFilter} alt="" />{" "}
              </Button>
            )}
          </div>

          <Sidebar
            showSidebar={this.state.sidebar}
            onClose={() => this.onCloseSidebar()}
            onOpen={() => this.onOpenSidebar()}
            links={
              <div className="sidebar">
                <Form>
                  <Form.Group
                    className="form-group2"
                    controlId="UnidadDeFomento"
                  >
                    {/* <Form.Check
                      name="unidad"
                      custom
                      inline
                      label="UF"
                      type="radio"
                      id={"txtUf"}
                    />
                    <Form.Check
                      name="unidad"
                      custom
                      inline
                      label="Peso (CLP)"
                      type="radio"
                      id={"txtPeso"}
                    /> */}
                  </Form.Group>
                  <Form.Group className="form-group2" id="Precio">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="Desde"
                          id="txtValorDesde"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="Hasta"
                          id="txtValorHasta"
                        />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group className="form-group2" id="Superficie">
                    <Form.Label>Superficie m²:</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control
                          step="0.01"
                          min="0"
                          max="9999999999.99"
                          type="number"
                          placeholder="0,00"
                          name="superficieUtilDes"
                          id="txtSuperficieUtilDes"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          step="0.01"
                          min="0"
                          max="9999999999.99"
                          type="number"
                          placeholder="0,00"
                          name="superficieUtilHas"
                          id="txtSuperficieUtilHas"
                        />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Group className="form-group2" id="Dormitorios">
                        <Form.Label>Dormitorios</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            ref={(e) => (this.dormitorioDesHas = e)}
                          >
                            <option value={0}>Todos</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>+5</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="form-group2" controlId="Banios">
                        <Form.Label>Baños</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            ref={(e) => (this.banioDesHas = e)}
                          >
                            <option value={0}>Todos</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>+5</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group className="form-group2" controlId="Banios">
                        <Form.Label>Estacionamiento</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            name="bodega"
                            onChange={(e) =>
                              this.handleSelectEstacionamiento(e)
                            }
                            value={this.state.estacionamiento}
                          >
                            <option value="">Todos</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="form-group2" controlId="Banios">
                        <Form.Label>Bodega</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            name="bodega"
                            onChange={(e) => this.handleSelectBodega(e)}
                            value={this.state.bodega}
                          >
                            <option value="">Todos</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group className="form-group2" controlId="Banios">
                        <Form.Label>Amoblado</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            name="amoblado"
                            onChange={(e) => this.handleSelectAmoblado(e)}
                            value={this.state.amoblado}
                          >
                            <option value="">Todos</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="form-group2" controlId="Banios">
                        <Form.Label>Usado</Form.Label>
                        <div className="box-select">
                          <Form.Control
                            as="select"
                            name="usado"
                            onChange={(e) => this.handleSelectUsado(e)}
                            value={this.state.usado}
                          >
                            <option value="">Todos</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Group className="form-group2">
                    <Button
                      className="col-12"
                      variant="primary"
                      onClick={this.searchPropiedadesAvanzada}
                    >
                      Filtrar búsqueda
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            }
          />
          <Row gutter={[16, 8]}>
            <Col sm={{ span: 12 }} md={{ span: 18 }} className="bg-light">
              <div className="row row-cols-auto justify-content-center">
                {loading && (
                  <div className="sin-resultados bg-light">Cargando...</div>
                )}

                {!loading && (
                  <React.Fragment>
                    {currentPropiedades.length === 0 && (
                      <div className="sin-resultados bg-light">
                        <div>
                          <img src={icon.noResultados} alt="" />
                          <span>
                            Lo siento, no hay resultados con su búsqueda
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )}

                {currentPropiedades.map((item, i) => {
                  let linkNoProper = item.usado
                    ? "/info-propiedad?idprop=" + item.idUsados
                    : "/live/info-proyecto/" + item.idProyecto;

                  //belen
                  let classNameEtiqueta = !item.usado
                    ? "etiqueta-proyecto"
                    : this.esPlanTipoVenta(item.idPlan)
                    ? "etiqueta-venta"
                    : "etiqueta-arriendo";

                  let textoetiqueta = !item.usado
                    ? "PROYECTO"
                    : this.esPlanTipoVenta(item.idPlan)
                    ? "VENTA"
                    : "ARRIENDO";

                  let colorcodigopropiedad = this.esPlanTipoVenta(item.idPlan)
                    ? "text-success"
                    : "colorarriendo";
                  let botongananxref = this.esPlanTipoVenta(item.idPlan)
                    ? "ganxreferir-inmo"
                    : "ganxreferir-arriendo";

                  let botonverprp = this.esPlanTipoVenta(item.idPlan)
                    ? "referir33"
                    : "referirarriendo";

                  return (
                    <div
                      key={item.id}
                      className="center prop-alto pabox w-table-50"
                    >
                      <CardlItem
                        key={item.id}
                        header={
                          <CarrouselItem
                            key={item.id}
                            arrayOps={item.imagenes}
                            onChangePropiedad={() => history.push(linkNoProper)}
                          />
                        }
                        body={
                          <div>
                            <div className="etiquetas-propiedades">
                              <Card className={classNameEtiqueta}>
                                {textoetiqueta}
                              </Card>
                            </div>
                            <div
                              className="img-destacado"
                              style={item.destacar ? { display: "block" } : {}}
                            >
                              <img src={icon.imgDestacado} alt="" />
                            </div>

                            {item.exclusividad && (
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-disabled">
                                    Propiedad Exclusiva Propins
                                  </Tooltip>
                                }
                              >
                                <div className="exclusive-propins">
                                  <img src={icon.exclusive} alt="exclusive" />
                                </div>
                              </OverlayTrigger>
                            )}

                            <Card.Title className="titulo-arriba">
                              <Row>
                                <Col span={16}>
                                  {item.tipoPropiedad} {item.glosa}
                                </Col>
                                <Col span={8}>
                                  {
                                    item.usado ? (
                                      <text className="cod_prop">
                                        <div className={colorcodigopropiedad}>
                                          Código propiedad:{" "}
                                        </div>
                                      </text>
                                    ) : (
                                      // <Link to={"/live/info-proyecto/"+item.idProyecto}>
                                      <text className="cod_prop">
                                        <div className="text-inmo">
                                          Código propiedad:{" "}
                                        </div>
                                      </text>
                                    )
                                    // </Link>
                                  }
                                </Col>
                              </Row>
                              <Row className="marginabajoprovi">
                                <Col span={16}>
                                  <text>
                                    <span>{item.comuna}</span>
                                  </text>
                                </Col>
                                <Col span={8}>
                                  {
                                    item.usado ? (
                                      <strong>{item.codPropiedad}</strong>
                                    ) : (
                                      // <Link to={"/live/info-proyecto/"+item.idProyecto}>
                                      <text className="cod_prop">
                                        <strong>PROP_INMO</strong>
                                      </text>
                                    )
                                    // </Link>
                                  }
                                </Col>
                              </Row>
                              <Row className="">
                                <Col span={15}>
                                  {item.usado ? (
                                    <div className={colorcodigopropiedad}>
                                      <div className=" uf entre-letra">
                                        Valor
                                      </div>{" "}
                                      <text className="uf entre-letra">
                                        UF{" "}
                                        {item.valor
                                          ? formatNumeros(item.valor)
                                          : ""}
                                      </text>
                                    </div>
                                  ) : (
                                    <div className="text-inmo uf">
                                      {" "}
                                      Valor
                                      <div className="entre-letra">Desde</div>
                                      UF{" "}
                                      {item.valor
                                        ? formatNumeros(item.valor)
                                        : ""}{" "}
                                    </div>
                                  )}
                                </Col>
                                <Col span={9}>
                                  {item.usado ? (
                                    <Link to={"/referir"}>
                                      <Button variant={botongananxref}>
                                        <Row className={colorcodigopropiedad}>
                                          <div className="gana">
                                            Ganancia por referir desde
                                          </div>
                                        </Row>
                                        <Row> </Row>
                                        <Row>
                                          <div className="center gana2">
                                            {uf &&
                                              formatToThousandSeparator(
                                                Math.trunc(
                                                  item.valor * 0.0045 * valorUf
                                                )
                                              )}{" "}
                                            CLP
                                          </div>
                                        </Row>
                                      </Button>
                                    </Link>
                                  ) : (
                                    <Link to={"/referir"}>
                                      <Button variant="ganxreferir gana">
                                        <Row className="text-inmo center">
                                          Ganancia por Referir
                                        </Row>
                                        <Row>
                                          <div className="entre-letra center">
                                            desde
                                          </div>
                                        </Row>
                                        <Row>
                                          <div className="center gana2">
                                            {uf &&
                                              formatToThousandSeparator(
                                                Math.trunc(
                                                  item.valor * 0.0045 * valorUf
                                                )
                                              )}{" "}
                                            CLP
                                          </div>
                                        </Row>
                                      </Button>
                                    </Link>
                                  )}
                                </Col>
                              </Row>

                              <Row
                                justify="center"
                                className="letter-small cachucha"
                              >
                                <Col span={6}>
                                  <img src={icon.camas} alt="" />{" "}
                                  {item.dormitorio}
                                </Col>
                                <Col span={6}>
                                  <img src={icon.banos} alt="" /> {item.banos}
                                </Col>
                                <Col span={6}>
                                  <img src={icon.m2contruidos} alt="" />
                                  {item.m2Construidos}
                                  <div className="m2derecha peke">
                                    m² Construidos
                                  </div>
                                </Col>
                                <Col span={6}>
                                  <img src={icon.m2totales} alt="" />
                                  {item.m2Utiles}
                                  <div className="peke m2derecha ">
                                    m² Totales
                                  </div>
                                </Col>
                              </Row>
                            </Card.Title>
                            <Card.Footer>
                              {user && user.tipoCuenta !== 7 && item.usado ? (
                                <Link
                                  to={"/info-propiedad?idprop=" + item.idUsados}
                                >
                                  <Button type="button" variant={botonverprp}>
                                    Ver Propiedad
                                  </Button>
                                </Link>
                              ) : null}
                              {user && user.tipoCuenta !== 7 && !item.usado ? (
                                <Link
                                  to={"live/info-proyecto/" + item.idProyecto}
                                >
                                  <Button type="button" variant="referir34">
                                    Ver Proyectos
                                  </Button>
                                </Link>
                              ) : null}

                              {user && user.tipoCuenta === 7 && item.usado ? (
                                <div>
                                  <Row>
                                    <Col className="text-center micentro">
                                      <Link
                                        to={
                                          "/info-propiedad?idprop=" +
                                          item.idUsados
                                        }
                                      >
                                        <Button type="button" variant="vermas">
                                          Ver más
                                        </Button>
                                      </Link>
                                    </Col>
                                    <Col>
                                      {" "}
                                      <Button
                                        type="button"
                                        id={i}
                                        variant={
                                          this.state.black
                                            ? "referiragregar"
                                            : "chekeado"
                                        }
                                        onClick={(e) =>
                                          this.selectProp(item.idUsados, e)
                                        }
                                        // this.selectProp(item.idUsados, e)
                                      >
                                        Agregar
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : null}
                              {user && user.tipoCuenta === 7 && !item.usado ? (
                                <div>
                                  <Row>
                                    <Col>
                                      {" "}
                                      <Link
                                        to={
                                          "live/info-proyecto/" +
                                          item.idProyecto
                                        }
                                      >
                                        <Button
                                          type="button"
                                          variant="referirtransparente"
                                        >
                                          Ver Proyectos
                                        </Button>
                                      </Link>
                                    </Col>
                                    <Col className="letrachica text-center">
                                      {/*{" "}*/}
                                      {/** Este proyecto cuenta con x modelos*/}
                                      <Button
                                        type="button"
                                        id={i}
                                        variant="referiragregar"
                                        onClick={(e) =>
                                          this.selectProp(item.idProyecto, e)
                                        }
                                      >
                                        Agregar
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : null}
                            </Card.Footer>
                          </div>
                        }
                      />
                    </div>
                  );
                })}

                <div className="col-12 pabox">
                  <div className="flex-row pa0 col-12 d-table">
                    {currentPropiedades.length > 0 && (
                      <span>
                        <small className="align-middle">
                          Total de propiedades encontradas: {totalPropiedades}{" "}
                        </small>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col
              sm={{ span: 0 }}
              md={{ span: 6 }}
              className="bg-light   mapa col-md-3  map-position none-mobile"
            >
              <div>
                <Card className="cardsuscri">
                  <div className="suscrip-titulo">Personal Broker</div>
                  <div className="suscrip-sub">
                    Algoritmo que te avisa cuando hayan propiedades similares a
                    las que buscas
                  </div>
                  <div className=" text-center">
                    <Button
                      onClick={() => {
                        this.toggleModalSuscripcion();
                      }}
                      type="button"
                      variant="suscrip"
                    >
                      Buscar
                    </Button>
                    <Modal
                      title="Formulario de suscripción"
                      centered
                      visible={showModalSuscripcion}
                      width={900}
                      footer={null}
                      onCancel={() => this.toggleModalSuscripcion()}
                    >
                      <div className="formsussub">
                        Completa los datos para notificarte sobre nuevas
                        propiedades con características similares a las que
                        buscas
                      </div>
                      <FormularioSuscripcion submitButtonText="Enviar" />
                    </Modal>
                  </div>
                </Card>
              </div>
              <div>
                <Map
                  className="google-map"
                  google={window.google}
                  //onDragend={this.onMapClicked}
                  zoom={this.state.zoom}
                  initialCenter={{
                    lat: -33.443321676379696,
                    lng: -70.65447339104816,
                  }}
                >
                  {currentPropiedades.map((item) => {
                    if (item.loc) {
                      return (
                        <Marker
                          key={item.usado ? item.idUsados : item.idProyecto}
                          position={{ lat: item.loc.x, lng: item.loc.y }}
                          icon={icon.propingoole}
                          onClick={this.onMarkerClick}
                          title={item.glosa}
                          propId={item.usado ? item.idUsados : item.idProyecto}
                          usado={item.usado}
                        />
                      );
                    }
                  })}

                  <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={() => this.setState({ showingInfoWindow: false })}
                    visible={this.state.showingInfoWindow}
                  >
                    <div>
                      <h5>{this.state.glosa}</h5>
                      <a href={this.state.activeMarkerLink}>
                        <Button type="button">Ver Propiedad</Button>
                      </a>
                    </div>
                  </InfoWindow>
                </Map>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}
const validate2 = (formValues) => {
  let errors = {};

  if (formValues.Celular === "") {
    errors.Celular = "Por favor ingrese su Celular";
  } else if (isNaN(formValues.Celular)) {
    errors.Celular = "Por favor ingrese solo números";
  }
  if (isNaN(formValues.M2Utiles_Desde)) {
    errors.numero_completar = "Por favor ingrese solo números";
  }

  if (formValues.Nombre === "") {
    errors.Nombre = "Por favor ingrese su Nombre";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.Mail) &&
    formValues.Mail !== ""
  ) {
    errors.Mail = "Correo electrónico no valido";
  }

  return errors;
};
const valitate = (formValues) => {
  let errors = {};

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.Mail) &&
    formValues.Mail !== ""
  ) {
    errors.Mail = "Correo electrónico no valido";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  respuesta: state.app.respuesta,
  totalPages: state.app.totalPages,
  currentPage: state.app.currentPage,
  loading: state.app.loading,
  user: state.app.user,
  uf: state.app.uf,
  requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
  planes: state.app.planes,
});

const mapDispatchToProps = (dispatch) => ({
  getPropiedades: (query, totalPages, currentPage) =>
    dispatch(fetchGetPropiedades(query, totalPages, currentPage)),
  getPlanes: () => dispatch(fetchGetTodosLosPlanes()),
  getProperId: (properId) => dispatch(fetchGetProperById(properId)),
  getUf: () => dispatch(fetchGetUF()),
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexResultadoBusqueda = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexResultadoBusqueda);

export default IndexResultadoBusqueda;
