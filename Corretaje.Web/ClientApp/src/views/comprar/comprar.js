import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Col, Row, Carousel } from "antd";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../../utils/images";
import AliceCarousel from "react-alice-carousel";
import utilFunc from "../../utils/utilsFunc";
import { listOfData } from "./Testimonios";
import ReactGa from "react-ga";
import { Helmet } from "react-helmet";
import FormularioSuscripcion from "../../components/FormularioSuscripcion";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

export class comprar extends Component {
  constructor(props) {
    super(props);

    let ganancia = Math.round(200000000 * 0.003);

    this.state = {
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      montoAhorro: utilFunc.formatNumeros(ganancia),
      montoCalc: 400000000,
      porcentaje: 0.003,
      propiedad: utilFunc.formatNumeros(200000000),
      showModalSuscripcion: false,
      tipo_moneda: "CLP",
      galleryItems: listOfData.map((item, index) => (
        <div key={index} className="carousel-nuevo fondo-mobile2">
          <div className="">
            <br />

            <div>
              <Row className={"quedicen"}>
                <Col>¿Qué dicen nuestros clientes?</Col>
              </Row>
              <Row className={"quedicen1"}>
                <Col>{item.text}</Col>
              </Row>
              <Row className={"quedicen2"}>
                <Col>
                  <div className={"tyty"}>{item.name} </div>
                  <br />
                  <span className={"ytyty"}>{item.comuna}</span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )),
    };
  }

  componentDidMount() {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }

  toggleModalSuscripcion = () => {
    this.setState({ showModalSuscripcion: !this.state.showModalSuscripcion });
  };

  render() {
    return (
      <Row>
        <Helmet>
          ”
          <title>
            Compra propiedades de forma asistida, digital y transparente
          </title>
          ”
          <meta
            name="description"
            content="Compra tu casa o departamento sin complicaciones"
          />
        </Helmet>
        <section className="container-fondo-home-comprar fondo-mobile">
          <div className="test-titulos">
            <div className="test-titulo1">Oportunidades exclusivas para tí</div>
            <div className="test-titulo2">
              {" "}
              Busca, encuentra y oferta 100% online.
            </div>
          </div>
          <div className="bajarbotonestest ">
            <Row>
              <Col sm="12" md="4" lg="2" className="mobilecenter">
                <Link to={"/resultado-busqueda"}>
                  <Button className="comprar">Ver Propiedades</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>
        <section className="section-space-p1ex  bg-white">
          <div className="soluciones-vender">Lo encontramos por ti!</div>

          <div className="lohacemorporti">
            Utilizamos la inteligencia de datos para encontrar tu propiedad
            ideal.
          </div>

          <div>
            <Row className="bajarbotonestest121 ">
              <Col sm={{ span: 12 }}>
                <Button
                  onClick={() => {
                    this.toggleModalSuscripcion();
                  }}
                  className="comprar"
                >
                  Ingresar búsqueda
                </Button>
              </Col>
            </Row>{" "}
            <Modal
              title="Formulario de suscripción"
              centered
              visible={this.state.showModalSuscripcion}
              width={900}
              footer={null}
              onCancel={() => this.toggleModalSuscripcion()}
            >
              <div className="formsussub">
                Completa los datos para notificarte sobre nuevas propiedades con
                características similares a las que buscas
              </div>
              <FormularioSuscripcion submitButtonText="Enviar" />
            </Modal>
          </div>
          <Row gutter={[24, 8]}>
            <Col md={{ span: 7, offset: 1 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className="icon-venderprop">
                  <Card.Img
                    className="center img1suscri"
                    variant="top"
                    src={icon.suscri1}
                  />
                </div>
                <div className="scrapingtitulo">Scrapping</div>
                <div className="scrapsubtitulo">
                  Recopilamos y ordenamos el 100% de la oferta vigente en el
                  mercado.
                </div>
              </Card>
            </Col>
            <Col md={{ span: 7, offset: 1 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className="icon-venderprop">
                  <Card.Img
                    className="img1suscri center"
                    variant="top"
                    src={icon.suscri2}
                  />
                </div>

                <div className="scrapingtitulo">Perfilamiento</div>
                <div className="scrapsubtitulo">
                  Buscamos y analizamos las mejores propiedades vigentes que
                  coinciden con tus criterios de búsqueda.
                </div>
              </Card>
            </Col>
            <Col md={{ span: 7, offset: 1 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className=" icon-venderprop">
                  <Card.Img
                    className="img1suscri center"
                    variant="top"
                    src={icon.suscri3}
                  />
                </div>

                <div className="movermatch scrapingtitulo">Match</div>
                <div className="scrapsubtitulo">
                  Te conectamos en tiempo real con la propiedad que buscas.
                </div>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="section-space-p1ex hideWEB2  bg-white">
          <Row className="soluciones-vender">
            <Col>¿Porque comprar tu casa con Propins?</Col>
          </Row>{" "}
          <Row>
            <Col md={{ span: 0 }} sm={{ span: 6 }}>
              <Carousel className="homecarousel1234">
                <div>
                  <h3>
                    <div className="tituloarrienda0">Compra asistida</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="apunto con el dedo"
                          src={icon.paso1comprar}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        Proveemos asesoría comercial, financiera
                      </div>
                      <div className="textomobilearreindo center">
                        y legal durante todo el proceso de compra.
                      </div>
                    </Card>
                  </h3>
                </div>
                <div>
                  <h3>
                    <div className="tituloarrienda0">Digital</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="Sonrio y miro pc"
                          src={icon.paso2comprar}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        Busca, encuentra y oferta 100% online.
                      </div>
                    </Card>
                  </h3>
                </div>
                <div>
                  <h3>
                    {" "}
                    <div className="tituloarrienda0">Transparente</div>
                    <Card className={"center"}>
                      <div className="mobilecenter">
                        <Card.Img
                          loading="lazy"
                          variant="top"
                          className="mobilecenter icon-venderprop"
                          alt="recostada leyendo"
                          src={icon.paso3comprar}
                        />
                      </div>

                      <div className="textomobilearreindo center">
                        Ocupamos nuestra tecnología para
                      </div>
                      <div className="textomobilearreindo center">
                        entregar información real y a tiempo.
                      </div>
                    </Card>
                  </h3>
                </div>
              </Carousel>
            </Col>
          </Row>
        </section>
        <section className="section-space-p1ex hide123  bg-white">
          <Row className="soluciones-vender">
            <Col>¿Porque comprar tu casa con Propins?</Col>
          </Row>{" "}
          <Row justify="">
            <Col lg={{ span: 6, offset: 2 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter ">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-venderprop"
                    alt="apunto con el dedo"
                    src={icon.paso1comprar}
                  />
                </div>

                <div className="sol-vendere margin-sol-vendere">
                  <span className="dot1234"></span>Compra asistida
                </div>
                <div className="texto2planes-arriendo">
                  Proveemos asesoría comercial, financiera y legal durante todo
                  el proceso de compra.
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 6, offset: 1 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter">
                  <Card.Img
                    loading="lazy"
                    className="icon-venderprop"
                    variant="top"
                    alt="saludo videollamada"
                    src={icon.paso2comprar}
                  />
                </div>

                <div className="sol-vendere margin-sol-vendere">
                  <span className="dot1234"></span>Digital
                </div>
                <div className="texto2planes-arriendo">
                  Busca, encuentra y oferta 100% online.
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 6, offset: 1 }} sm={{ span: 12 }}>
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="icon-venderprop"
                    alt="me relajo"
                    src={icon.paso3comprar}
                  />
                </div>

                <div className="sol-vendere margin-sol-vendere">
                  <span className="dot1234"></span>Transparente
                </div>
                <div className="texto2planes-arriendo">
                  Ocupamos nuestra tecnología para entregar información real y a
                  tiempo.
                </div>
              </Card>
            </Col>
          </Row>
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
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});
comprar = connect(mapStateToProps, mapDispatchToProps)(comprar);

export default comprar;
