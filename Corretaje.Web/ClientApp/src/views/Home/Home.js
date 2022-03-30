import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Popover, Button, Row, Col, Carousel } from "antd";
import "antd/dist/antd.css";
import { QuestionCircleOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { listOfData } from "./Testimonios";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import icon from "../../utils/images";
import ReactGa from "react-ga";
import {
  setPlanDetails,
  fetchGetTodosLosPlanes,
  fetchGetServiciosAdicionales,
  setTipoPlanSeleccionado,
  setRegistered
} from "../../action";

const content = (
  <div>
    <p className="color-pop">No te cobramos comisión</p>
  </div>
);
const content2 = (
  <div>
    <p className="color-pop">
      Te cobramos el 0,5% + IVA del precio de la propiedad solo si vendemos.
    </p>
  </div>
);
const content3 = (
  <div>
    <p className="color-pop">
      Te cobramos el 1% + IVA del precio de la propiedad solo si vendemos.
    </p>
  </div>
);

const contentA1 = (
  <div>
    <p className="color-pop">
      Te cobramos el 50% + IVA del precio del arriendo al momento de ser
      arrendado.
    </p>
  </div>
);

const contentA11 = (
  <div>
    <p className="color-pop">No te cobramos comision mensual</p>
  </div>
);
const contentA2 = (
  <div>
    <p className="color-pop">
      Te cobramos el 5,9% + IVA del precio del arriendo al mes.
    </p>
  </div>
);
const contentA3 = (
  <div>
    <p className="color-pop">
      Te cobramos el 7,9% + IVA del precio del arriendo al mes.
    </p>
  </div>
);
const contentStyle = {
  height: "600px",
  width: "100vw",
  textAlign: "center",
  background: "transparent",
  slidesToShow: 3,
};

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
}; // google analytics

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
}; // google analytics
function onChange(a, b, c) {
  console.log(a, b, c);
}
export class Home extends React.Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      displayQuestions: false,
      displayQuestions2: false,
      responsive: { 1024: { items: 1 }, 1366: { items: 1 } },
      galleryItems: listOfData.map((item, index) => (
        <div key={index} className="carousel-nuevo fondo-mobile2">
          <div className="">
            <br />

            <div>
              <div className="quedicen">¿Qué dicen nuestros clientes?</div>

              <div className="quedicen1">{item.text}</div>

              <Row className={"quedicen2"}>
                <Col>
                  <div className={"tyty"}>{item.name} </div>
                  <br />
                  <span className={"ytyty"}>{item.comuna}.</span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )),
    };
    const { fetchGetTodosLosPlanes, setRegistered } = this.props;
    fetchGetTodosLosPlanes();
    setRegistered(true);

    console.log("home!4")
  }

  componentDidMount() {
    initGA();
    logPageView();
  }
  displayQuestion = () => {
    if (this.state.displayQuestions2 == true) {
      this.setState({
        displayQuestions2: !this.state.displayQuestions2,
      });
    }

    this.setState({
      displayQuestions: !this.state.displayQuestions,
    });
  };
  displayQuestion2 = () => {
    if (this.state.displayQuestions == true) {
      this.setState({
        displayQuestions: !this.state.displayQuestions,
      });
    }

    this.setState({
      displayQuestions2: !this.state.displayQuestions2,
    });
  };

  onBegin = (tipoPlan) => {
    const { setTipoPlanSeleccionado, history, isLoggedIn } = this.props;
    setTipoPlanSeleccionado(tipoPlan);
    if (isLoggedIn) {
      history.push("/planes");
    } else {
      history.push("/signin");
    }
  };

  render() {
    return (
      <div className="bg-white">
        <div className="helmet-container">
          <Helmet>
            ‍
            <title>
              Vender mi casa online y en tiempo récord. Desde 0% de comisión
            </title>
            ‍
            <meta
              name="description"
              content="Vende tu casa online y en tiempo récord. Desde 0% de comisión."
            />
          </Helmet>
          <div className="container-fondo-home-vencer fondo-mobile">
            <div>
              <div className="test-titulos">
                <div className="test-titulo1">
                  Vende o Arrienda tu casa online y en tiempo récord.
                </div>
                <div className="test-titulo2">
                  Desde <text className="supercero">0</text>% de comisión.
                </div>
              </div>
              <div className="bajarbotonestest ">
                <Row>
                  <Col sm={{ span: 12 }} md="1" className="">
                    <Link to={"/tasacion"}>
                      <Button className="botontesteo2"> QUIERO TASAR</Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>

        <div className="hideMOBILE">
          <Row justify="start">
            <Col span={2} />
            <Col>
              <div className="tituloarrienda0">Vende o arrienda </div>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={2} />
            <Col>
              <div className="tituloarrienda1">tu casa en 3 pasos.</div>
            </Col>
          </Row>
        </div>
        <div className="hideWEB2">
          <Row justify="center">
            <Col>
              <div className="margin123455 tituloarrienda0">
                Vende o arrienda{" "}
              </div>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <div className="tituloarrienda1">tu casa en 3 pasos.</div>
            </Col>
          </Row>
        </div>

        <section className="section-space-p1ex bg-white hideMOBILE">
          <Row className="hide123" justify="center">
            <Col xs={24} sm={24} md={16} lg={7} xl={7}>
              <Card className={"center"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-venderprop"
                    alt="apunto con el dedo"
                    src={icon.imgpaso1vender}
                  />
                </div>
                <div className="px-20">
                  <div className="sol-vendere margin-sol-vendere">
                    <span className="dot123"></span>Elige una operación
                  </div>
                  <div className="texto2planes-arriendo">
                    Escoge el plan de ventas o arriendo que más se acomode a tus
                    necesidades.{" "}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={16} lg={7} xl={7}>
              <Card className={"center mover-pasoss"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    className="icon-venderprop"
                    variant="top"
                    alt="saludo videollamada"
                    src={icon.imgpaso2vender}
                  />
                </div>
                <div className="px-2halfrem">
                  <div className="sol-vendere margin-sol-vendere">
                    {" "}
                    <span className="dot123"></span>Elige tu plan
                  </div>
                  <div className="texto2planes-arriendo">
                    De acuerdo a tus necesidades elige el plan que más se
                    acomode a tus objetivos.
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={16} lg={7} xl={7}>
              <Card className={"center mover-pasoss"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="icon-venderprop"
                    alt="me relajo"
                    src={icon.imgpaso3vender}
                  />
                </div>
                <div className="px-2halfrem">
                  <div className="sol-vendere margin-sol-vendere">
                    {" "}
                    <span className="dot123"></span>Registrate
                  </div>
                  <div className="texto2planes-arriendo">
                    Ingresa tus datos y los de tu propiedad en simples pasos,
                    gratis y 100% online.
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="hideWEB2">
          <Row>
            <Col xs={24} sm={24} md={12} lg={7} xl={7}>
              <Carousel className="homecarousel1" afterChange={onChange}>
                <div>
                  <h3>
                    <div className="tituloarrienda0">Elige una operación</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="apunto con el dedo"
                          src={icon.imgpaso1vender}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        Selecciona el tipo de operación:
                      </div>
                      <div className="textomobilearreindo center">
                        Si quieres vender o arrendar tu porpiedad.
                      </div>
                    </Card>
                  </h3>
                </div>
                <div>
                  <h3>
                    <div className="tituloarrienda0">Elige tu plan</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="Sonrio y miro pc"
                          src={icon.imgpaso2vender}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        De acuerdo a tus necesidades elige el plan
                      </div>
                      <div className="textomobilearreindo center">
                        que más se acomode a tus objetivos
                      </div>
                    </Card>
                  </h3>
                </div>
                <div>
                  <h3>
                    {" "}
                    <div className="tituloarrienda0">Regístrate</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="recostada leyendo"
                          src={icon.imgpaso3vender}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        Ingresa tus datos y los de tu propiedad en
                      </div>
                      <div className="textomobilearreindo center">
                        simples pasos, gratis y 100% online.
                      </div>
                    </Card>
                  </h3>
                </div>
              </Carousel>
            </Col>
          </Row>
        </section>

        <section className="margin12345 section-space-p1ex  bg-white">
          <div className="quenosdirenciatituloarriendo">
            <div className="tituloarrienda0">Conoce nuestro planes</div>
            <div className="tituloarrienda1">y elige el tuyo.</div>
          </div>
          <Row className="marginplanesbton">
            <Col lg={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
              <Button
                className={
                  this.state.displayQuestions == false
                    ? "compratuprop center compratupropmobile"
                    : "compratuprop2 center compratupropmobile "
                }
                onClick={this.displayQuestion}
              >
                VENDE TU PROPIEDAD
              </Button>
            </Col>
            <Col className="hideWEB2">
              {this.state.displayQuestions == true ? (
                <div>
                  {" "}
                  <Row justify="center">
                    <Col span={24}>
                      <Carousel>
                        <div>
                          <h3>
                            {" "}
                            <Card className="fondo-planes-static center ">
                              <div className="fondo-nombreplan">FAST</div>

                              <div className="margina29">
                                <div className="linea-tarjeta"></div>
                                <text className="comision">Comisión:</text>
                                <text className="fondo-valorplan-static">
                                  0%
                                </text>{" "}
                                <Popover content={content} placement="right">
                                  <Button
                                    shape="circle"
                                    type="text"
                                    className="mover-pregunta-arriba"
                                    icon={<QuestionCircleOutlined />}
                                  />{" "}
                                </Popover>
                                <div className="linea-tarjeta"></div>
                              </div>
                              <div className="opcionesplanes">
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        TASACIÓN ONLINE
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        OFERTA DE COMPRA EN 48 HRS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        PAGO AL CONTADO
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        ENTREGA FLEXIBLE
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        100% DE SEGURIDAD Y CERTEZA EN LA
                                        TRANSACCIÓN{" "}
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Card>
                          </h3>
                        </div>
                        <div>
                          <h3>
                            <Card className="fondo-planes-static center ">
                              <div className="fondo-nombreplan">SINGULAR</div>

                              <div className="margina29">
                                <div className="linea-tarjeta"></div>
                                <text className="comision">Comisión:</text>
                                <text className="fondo-valorplan-static">
                                  0,5%
                                </text>{" "}
                                <text className="comision">+ IVA </text>
                                <Popover content={content2} placement="right">
                                  <Button
                                    shape="circle"
                                    type="text"
                                    className="mover-pregunta-arriba2"
                                    icon={<QuestionCircleOutlined />}
                                  />{" "}
                                </Popover>
                                <div className="linea-tarjeta"></div>
                              </div>
                              <div className="opcionesplanes">
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        60 DíAS DE EXCLUSIVIDAD
                                      </text>
                                    </Col>
                                  </Row>
                                </div>

                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        FOTOGRAFíAS PROFESIONALES
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        TASACIÓN ONLINE
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        DESTACADO EN PORTALES
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        PUBLICACIÓN EN PRINCIPALES PORTALES
                                        INMOBILIARIOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        SISTEMA DE REFERIDOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        VISITAS GUIADAS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Card>
                          </h3>
                        </div>
                        <div>
                          <h3>
                            {" "}
                            <Card className="fondo-planes-static center ">
                              <div className="fondo-nombreplan">CLASSIC</div>

                              <div className="margina29">
                                <div className="linea-tarjeta"></div>
                                <text className="comision">Comisión:</text>
                                <text className="fondo-valorplan-static">
                                  1%
                                </text>{" "}
                                <text className="comision">+ IVA </text>
                                <Popover content={content3} placement="right">
                                  <Button
                                    shape="circle"
                                    type="text"
                                    className="mover-pregunta-arriba2"
                                    icon={<QuestionCircleOutlined />}
                                  />{" "}
                                </Popover>
                                <div className="linea-tarjeta"></div>
                              </div>
                              <div className="opcionesplanes">
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        SIN EXCLUSIVIDAD
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        TASACIÓN ONLINE
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        FOTOGRAFíAS PROFESIONALES
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        PUBLICACIÓN EN PRINCIPALES PORTALES
                                        INMOBILIARIOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        SISTEMA DE REFERIDOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        VISITAS GUIADAS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="movercaracplanes">
                                  <Row>
                                    <Col span={2}>
                                      <img
                                        className="ticketverdemobile"
                                        src={icon.iconCheck}
                                        alt=""
                                      />
                                    </Col>
                                    <Col span={16} offset={2}>
                                      {" "}
                                      <text className="letraTarjetaPlanes">
                                        ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                                      </text>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Card>
                          </h3>
                        </div>
                      </Carousel>
                    </Col>
                  </Row>
                  <Row justify="center">
                    {" "}
                    <Col>
                      <Link to={"/planes"}>
                        <Button
                          onClick={() => this.onBegin("venta")}
                          className="comencemosnuevo"
                        >
                          Comencemos
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Col>
            <Col lg={{ span: 6, offset: 4 }} sm={{ span: 12 }}>
              <Button
                className={
                  this.state.displayQuestions2 == false
                    ? "compratuprop"
                    : "compratuprop2"
                }
                onClick={this.displayQuestion2}
              >
                {" "}
                ARRIENDA TU PROPIEDAD
              </Button>
            </Col>
          </Row>

          {this.state.displayQuestions == true ? (
            <div className="hide123">
              <Row gutter={[16, 8]}>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">FAST</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión:</text>
                      <text className="fondo-valorplan-static">0%</text>{" "}
                      <Popover content={content} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              TASACIÓN ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              OFERTA DE COMPRA EN 48 HRS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PAGO AL CONTADO
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ENTREGA FLEXIBLE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              100% DE SEGURIDAD Y CERTEZA EN LA TRANSACCIÓN{" "}
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">SINGULAR</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión:</text>
                      <text className="fondo-valorplan-static">0,5%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={content2} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba2"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              60 DíAS DE EXCLUSIVIDAD
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              TASACIÓN ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>

                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FOTOGRAFíAS PROFESIONALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              DESTACADO EN PORTALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              SISTEMA DE REFERIDOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              VISITAS GUIADAS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">CLASSIC</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión:</text>
                      <text className="fondo-valorplan-static">1%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={content3} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba2"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              SIN EXCLUSIVIDAD
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              TASACIÓN ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FOTOGRAFíAS PROFESIONALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              SISTEMA DE REFERIDOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              VISITAS GUIADAS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row justify="center">
                {" "}
                <Col>
                  <Link to={"/planes"}>
                    <Button
                      onClick={() => this.onBegin("venta")}
                      className="comencemosnuevo"
                    >
                      Comencemos
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          ) : null}

          {this.state.displayQuestions2 == true ? (
            <div>
              <Row>
                <Col lg={{ span: 0 }} sm={{ span: 12 }}>
                  <Carousel>
                    <div>
                      <h3>
                        <Card className="fondo-planes-static center ">
                          <div className="fondo-nombreplan">BASIC</div>

                          <div className="margina29">
                            <div className="linea-tarjeta"></div>
                            <text className="comision">
                              Comisión primer mes:
                            </text>
                            <text className="fondo-valorplan-static">50%</text>{" "}
                            <text className="comision">+ IVA </text>
                            <Popover content={contentA1} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba4"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <text className="comision">Comisión mensual:</text>
                            <text className="fondo-valorplan-static">
                              0%
                            </text>{" "}
                            <Popover content={contentA11} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba31"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <div className="linea-tarjeta"></div>
                          </div>
                          <div className="opcionesplanes">
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FOTOGRAFíAS PROFESIONALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    PUBLICACIÓN EN PRINCIPALES PORTALES
                                    INMOBILIARIOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    VISITAS GUIADAS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    ANÁLISIS DE RIESGO CLIENTES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FIRMA DE CONTRATO ONLINE
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    GESTIÓN DE ARREGLOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    COBERTURA DE GASTOS GENERALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>
                      </h3>
                    </div>
                    <div>
                      <h3>
                        <Card className="fondo-planes-static center ">
                          <div className="fondo-nombreplan">PLUS</div>

                          <div className="margina29">
                            <div className="linea-tarjeta"></div>
                            <text className="comision">
                              Comisión primer mes:
                            </text>
                            <text className="fondo-valorplan-static">50%</text>{" "}
                            <text className="comision">+ IVA </text>
                            <Popover content={contentA1} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba4"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <text className="comision">Comisión mensual:</text>
                            <text className="fondo-valorplan-static">
                              5,9%
                            </text>{" "}
                            <text className="comision">+ IVA </text>
                            <Popover content={contentA2} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba3"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <div className="linea-tarjeta"></div>
                          </div>
                          <div className="opcionesplanes">
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FOTOGRAFíAS PROFESIONALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    PUBLICACIÓN EN PRINCIPALES PORTALES
                                    INMOBILIARIOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    VISITAS GUIADAS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    ANÁLISIS DE RIESGO CLIENTES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FIRMA DE CONTRATO ONLINE
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    GESTIÓN DE ARREGLOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheckGris}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes-gris">
                                    COBERTURA DE GASTOS GENERALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>
                      </h3>
                    </div>
                    <div>
                      <h3>
                        <Card className="fondo-planes-static center ">
                          <div className="fondo-nombreplan">FULL</div>

                          <div className="margina29">
                            <div className="linea-tarjeta"></div>
                            <text className="comision">
                              Comisión primer mes:
                            </text>
                            <text className="fondo-valorplan-static">50%</text>{" "}
                            <text className="comision">+ IVA </text>
                            <Popover content={contentA1} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba4"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <text className="comision">Comisión mensual:</text>
                            <text className="fondo-valorplan-static">
                              7,9%
                            </text>{" "}
                            <text className="comision">+ IVA </text>
                            <Popover content={contentA3} placement="right">
                              <Button
                                shape="circle"
                                type="text"
                                className="mover-pregunta-arriba3"
                                icon={<QuestionCircleOutlined />}
                              />{" "}
                            </Popover>
                            <div className="linea-tarjeta"></div>
                          </div>
                          <div className="opcionesplanes">
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FOTOGRAFíAS PROFESIONALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    PUBLICACIÓN EN PRINCIPALES PORTALES
                                    INMOBILIARIOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    VISITAS GUIADAS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    ANÁLISIS DE RIESGO CLIENTES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    FIRMA DE CONTRATO ONLINE
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    GESTIÓN DE ARREGLOS
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                            <div className="movercaracplanes">
                              <Row>
                                <Col span={2}>
                                  <img
                                    className="ticketverdemobile"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="letraTarjetaPlanes">
                                    COBERTURA DE GASTOS GENERALES
                                  </text>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>
                      </h3>
                    </div>
                  </Carousel>
                </Col>
              </Row>
              <Row className="hide123" gutter={[16, 8]}>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">BASIC</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión primer mes:</text>
                      <text className="fondo-valorplan-static">50%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={contentA1} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba4"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <text className="comision">Comisión mensual:</text>
                      <text className="fondo-valorplan-static">0%</text>{" "}
                      <Popover content={content} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba31"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FOTOGRAFíAS PROFESIONALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              VISITAS GUIADAS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ANÁLISIS DE RIESGO CLIENTES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FIRMA DE CONTRATO ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              GESTIÓN DE ARREGLOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              COBERTURA DE GASTOS GENERALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">PLUS</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión primer mes:</text>
                      <text className="fondo-valorplan-static">50%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={contentA1} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba4"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <text className="comision">Comisión mensual:</text>
                      <text className="fondo-valorplan-static">5,9%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={contentA2} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba3"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FOTOGRAFíAS PROFESIONALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              VISITAS GUIADAS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ANÁLISIS DE RIESGO CLIENTES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FIRMA DE CONTRATO ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              GESTIÓN DE ARREGLOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheckGris}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes-gris">
                              COBERTURA DE GASTOS GENERALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={{ span: 8 }} sm={{ span: 12 }}>
                  <Card className="fondo-planes-static center ">
                    <div className="fondo-nombreplan">FULL</div>

                    <div className="margina29">
                      <div className="linea-tarjeta"></div>
                      <text className="comision">Comisión primer mes:</text>
                      <text className="fondo-valorplan-static">50%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={contentA1} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba4"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <text className="comision">Comisión mensual:</text>
                      <text className="fondo-valorplan-static">7,9%</text>{" "}
                      <text className="comision">+ IVA </text>
                      <Popover content={contentA3} placement="right">
                        <Button
                          shape="circle"
                          type="text"
                          className="mover-pregunta-arriba3"
                          icon={<QuestionCircleOutlined />}
                        />{" "}
                      </Popover>
                      <div className="linea-tarjeta"></div>
                    </div>
                    <div className="opcionesplanes">
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FOTOGRAFíAS PROFESIONALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              VISITAS GUIADAS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              ANÁLISIS DE RIESGO CLIENTES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              FIRMA DE CONTRATO ONLINE
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              GESTIÓN DE COBRO Y PAGO DE ARRIENDOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              GESTIÓN DE ARREGLOS
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              SEGURO DE NO PAGO DE ARRIENDO POR 6 MESES
                            </text>
                          </Col>
                        </Row>
                      </div>
                      <div className="movercaracplanes">
                        <Row>
                          <Col span={2}>
                            <img
                              className="ticketverdemobile"
                              src={icon.iconCheck}
                              alt=""
                            />
                          </Col>
                          <Col span={16} offset={2}>
                            {" "}
                            <text className="letraTarjetaPlanes">
                              COBERTURA DE GASTOS GENERALES
                            </text>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row justify="center">
                {" "}
                <Col>
                  <Link to={"/planes"}>
                    <Button
                      onClick={() => this.onBegin("arriendo")}
                      className="comencemosnuevo"
                    >
                      Comencemos
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          ) : null}
        </section>

        <section className="section-space-p1ex hideMOBILE  bg-white ">
          <AliceCarousel
            items={this.state.galleryItems}
            responsive={this.state.responsive}
            autoPlayDirection="rtl"
            autoPlay={false}
            renderPrevButton={true}
            renderNextButton={true}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={false}
            disableAutoPlayOnAction={true}
            showSlideInfo={false}
            keysControlDisabled={true}
            dotsDisabled={false}
            buttonsDisabled={true}
          />
        </section>

        <section className="espacio-mas-largo bg-white">
          <div className="quenosdirenciatituloarriendo">
            ¿Qué nos <text className="primonmoreno">diferencia</text>?
          </div>

          <Row justify="cemter">
            <Col lg={{ span: 5, offset: 2 }} sm={{ span: 12 }} md={{ span: 3 }}>
              <Card className={"center mover-pasoss"}>
                <div className="center ">
                  <Card.Img
                    loading="lazy"
                    className="icon-venderdef"
                    variant="top"
                    alt="tecnologia digital"
                    src={icon.Logo1dif}
                  />
                </div>

                <div className="textodiferencii">Digital</div>
                <div className="centrado-quenosdiferencia">
                  Desarrollamos tecnología y automatizamos procesos para una
                  venta eficiente, transparente y sin fricciones.
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 5, offset: 2 }} sm={{ span: 12 }} md={{ span: 3 }}>
              <Card className={"center mover-pasoss"}>
                <div className="center ">
                  <Card.Img
                    loading="lazy"
                    className="icon-venderdef"
                    variant="top"
                    alt="equipo colaborativo"
                    src={icon.Logo2dif}
                  />
                </div>

                <div className="textodiferencii">Colaborativo</div>
                <div className="centrado-quenosdiferencia">
                  Digitalizamos el boca a boca aumentando exponencialmente la
                  visibilidad y demanda de tu propiedad.
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 5, offset: 2 }} sm={{ span: 12 }} md={{ span: 3 }}>
              <Card className={"center mover-pasoss"}>
                <div className="center ">
                  <Card.Img
                    loading="lazy"
                    className="icon-venderdef"
                    variant="top"
                    alt="equipos flexibles"
                    src={icon.Logo3dif}
                  />
                </div>

                <div className="textodiferencii">Flexible</div>
                <div className="centrado-quenosdiferencia">
                  Nuestros clientes son únicos, por eso creamos planes de venta
                  para distintos tipos de requerimientos.
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="hide123" justify="center">
            <Col>
              {" "}
              <img
                className="icono-propins-logo-color"
                src={icon.iconcolorlogo}
                alt=""
              />
            </Col>
          </Row>
        </section>

        {/*</Container>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  planes: state.app.planes,
});

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  fetchGetTodosLosPlanes: () => dispatch(fetchGetTodosLosPlanes()),
  setTipoPlanSeleccionado: (tipoPlan) =>
    dispatch(setTipoPlanSeleccionado(tipoPlan)),
});

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
