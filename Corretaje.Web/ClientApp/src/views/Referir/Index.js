import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import icon from "../../utils/images";
import utilFunc from "../../utils/utilsFunc";
import { Collapse, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { PlusOutlined } from "@ant-design/icons";
import { setRegistered } from "../../action";
import { connect } from "react-redux";

import { MinusOutlined } from "@ant-design/icons";

import "react-alice-carousel/lib/alice-carousel.css";
import { listOfData } from "./Testimonios";

import ReactGa from "react-ga";

import { Helmet } from "react-helmet";
export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};
const { Panel } = Collapse;
class IndexRef extends React.Component {
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
      open7: false,
      montoAhorro: utilFunc.formatNumeros(ganancia),
      montoCalc: 200000000,
      porcentaje: 0.003,
      propiedad: utilFunc.formatNumeros(200000000),
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

    const { setRegistered } = this.props;
    setRegistered(false);
  }

  subirValorProp = () => {
    let monto = this.state.montoCalc;

    monto += 5000000;

    let agencia = Math.round(monto * this.state.porcentaje);

    if (agencia < 0) return 0;

    this.setState({
      propiedad: utilFunc.formatNumeros(monto),
      montoAhorro: utilFunc.formatNumeros(agencia),
      montoCalc: monto,
    });
  };

  bajarValorProp = () => {
    let monto = this.state.montoCalc;

    monto -= 5000000;

    let agencia = Math.round(monto * this.state.porcentaje);

    this.setState({
      propiedad: utilFunc.formatNumeros(monto),
      montoAhorro: utilFunc.formatNumeros(agencia),
      montoCalc: monto,
    });
  };

  componentDidMount() {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }

  render() {
    const { open2, open3, open4, open5, open6, open7 } = this.state;

    return (
      <div className="bg-white">
        <Helmet>
          ‍
          <title>
            Gana refiriendo propiedades o compradores de propiedades
          </title>
          ‍
          <meta
            name="description"
            content="Maneja tus propios horarios, sin jefes, ni inversiones"
          />
        </Helmet>

        <section className="container-fondo-home-referir hideWEB2 fondo-mobile">
          <div className="test-titulos">
            <div className="test-titulo1">Gana refiriendo propiedades.</div>
            <div className="test-titulo2">
              {" "}
              Maneja tus propios horarios, sin jefes, ni inversiones.
            </div>
          </div>
          <div className="bajarbotonestest ">
            <Row>
              <Col sm="12" md="4" lg="2" className="mobilecenter">
                <Link to={"/signin"}>
                  <button className="btn-home-referir">Registrarme</button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>
        <section className="container-fondo-home-referir hideMOBILE fondo-mobile">
          <div>
            {" "}
            <div className="">
              <div className="letra-home1-inmo ">
                Gana refiriendo propiedades.
              </div>
              <div className="letra-home1-inmo-2  ">
                Maneja tus propios horarios, sin jefes, ni inversiones.
              </div>
              <div>
                <Link to={"/signin"}>
                  <button
                    className="btn-home-referir"
                  >
                    Registrarme
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Card className={" hide-ipad card-simulador"}>
              <Row className={"titulo-card-simula"}>
                <Col>SIMULA cuánto ganas si tu referido vende/compra</Col>
              </Row>

              <Row className="center">
                <Col md="12" className="center text-center">
                  <div className="valorProp center">
                    <div className="simulator home-simulator">
                      <div className="cont-simulator">
                        <h5 className="h5">Valor de la propiedad</h5>
                        <Row justify="center">
                          <Col span={3}>
                            <Button
                              className="fondo  prev"
                              onClick={this.bajarValorProp}
                            >
                              <img src={icon.iconlessP} alt="" />
                            </Button>
                          </Col>
                          <Col span={12}>
                            {" "}
                            <text>
                              <input
                                className="center simu-letra"
                                type="text"
                                value={this.state.propiedad + " CLP"}
                                readOnly
                              />
                            </text>
                          </Col>
                          <Col span={3}>
                            <Button
                              className=" fondo next"
                              onClick={this.subirValorProp}
                            >
                              <img src={icon.iconMoreP} alt="" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="center">
                <Col md="12" className="center text-center">
                  <div className=" center ganancia-por-referir">
                    <h5 className="h5">Ganancia por referir desde</h5>
                    <span>
                      <input
                        type="text"
                        value={this.state.montoAhorro + " CLP"}
                        readOnly
                      />
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </section>

        <section
          className={
            "bg-white center text-center hide-ipad hideWEB2 section-space-p1ex"
          }
        >
          <Row className=" simula-comprar text-center center">
            <Col className="">
              SIMULA CUÁNTO GANAS SI TU REFERIDO VENDE/COMPRA
            </Col>
          </Row>
          <Row className=" center">
            <Col className="center text-center">
              <div className="valorProp center">
                <div className="simulator home-simulator">
                  <div className="cont-simulator">
                    <h5 className="h5">Valor de la propiedad</h5>
                    <div className="btn-prop">
                      <Row justify="center">
                        <Col span={3}>
                          <Button
                            className="fondo  prev"
                            onClick={this.bajarValorProp}
                          >
                            <img src={icon.iconlessP} alt="" />
                          </Button>
                        </Col>
                        <Col span={12}>
                          {" "}
                          <text>
                            <input
                              className="center simu-letra2"
                              type="text"
                              value={this.state.propiedad + " CLP"}
                              readOnly
                            />
                          </text>
                        </Col>
                        <Col span={3}>
                          <Button
                            className=" fondo next"
                            onClick={this.subirValorProp}
                          >
                            <img src={icon.iconMoreP} alt="" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className=" center">
            <Col className="center text-center">
              <div className=" center ganancia-por-referir">
                <h5 className="h5">Ganancia por referir desde</h5>
                <span>
                  <input
                    type="text"
                    value={this.state.montoAhorro + " CLP"}
                    readOnly
                  />
                </span>
              </div>
            </Col>
          </Row>
        </section>

        <section className="bg-white  section-space-p1ex hideWEB2 hideMOBILE ">
          <div className={"simulacuento text-centerc center"}>
            SIMULA CUÁNTO GANAS SI TU REFERIDO VENDE/COMPRA
          </div>

          <Row className="bg-white center text-center">
            <Col md="6" className="">
              <div className="valorProp center text-center ">
                <div className="simulator home-simulator">
                  <div className="cont-simulator">
                    <h5 className="h5">Valor de la propiedad</h5>
                    <div className="btn-prop">
                      <Button
                        className=" fondo simulator-btn prev"
                        onClick={this.bajarValorProp}
                      >
                        <img src={icon.iconlessP} alt="" />
                      </Button>
                      <Button
                        className="fondo simulator-btn next"
                        onClick={this.subirValorProp}
                      >
                        <img src={icon.iconMoreP} alt="" />
                      </Button>
                      <div>
                        <input
                          className="simu-letra2"
                          type="text"
                          value={this.state.propiedad + " CLP"}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={"6"} className="center text-center">
              <div className="ganancia-por-referir">
                <h5 className="h5">Ganancia por referir desde</h5>
                <div>
                  <input
                    type="text"
                    value={this.state.montoAhorro + " CLP"}
                    readOnly
                  />
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="bg-white hideWEB2 hide-ipad section-space-p1ex ">
          <div className={"comooreferir"}> ¿Cómo referir?</div>
          <div className="center text-center posthome">
            Sigue el paso a paso para referir a vendedores o compradores que
            puedas conocer o encontrar en tus redes de contacto. Es muy fácil,
            entre más refieres, más dinero ganas.
          </div>

          <div className={"comoreftitulo center text-center"}>
            Referir Vendedores
          </div>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso1refvend} />

              <div className="pasosnuevo1">Creas Tu cuenta!</div>

              <Row>
                <Col className="center text-center">
                  <div className={"center pasosnuevo2"}>
                    Solo necesitas registrarte como Embajador y podrás empezar a
                    formar parte de nuestro equipo.
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso2refvend} />

              <div className="pasosnuevo1">Agregar un referido</div>

              <Row>
                <Col className="center text-center">
                  <div className={"center pasosnuevo2"}>
                    En tu cuenta de Embajador tendrás a disposición la opción de
                    agregar un referido, solo debes ingresar sus datos.
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso3refvend} />

              <div className="pasosnuevo1">Nos contratan</div>

              <Row>
                <Col className="center text-center">
                  <div className={"center pasosnuevo2"}>
                    Nosotros nos encargamos de contactar al vendedor y cerrar el
                    trato con él.
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso4refvend} />

              <div className="pasosnuevo1">Vendemos</div>

              <Row>
                <Col className="center text-center">
                  <div className={"center pasosnuevo2"}>
                    Una vez firmada la promesa de compra venta, ¡te depositamos
                    tu dinero!
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section className="bg-light hideWEB2 hide-ipad section-space-p1ex ">
          <div className={"comoreftitulo center text-center"}>
            Referir Compradores
          </div>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso1refcomp} />

              <div className="pasosnuevo1">Creas Tu cuenta!</div>

              <div className={"center pasosnuevo2"}>
                Solo necesitas registrarte como Embajador y podrás empezar a
                formar parte de nuestro equipo.
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso2refcomp} />

              <div className="pasosnuevo1">Agregar un referido</div>

              <div className={"center pasosnuevo2"}>
                En tu cuenta de Embajador tendrás a disposición la opción de
                agregar un referido, solo debes ingresar sus datos o comparte tu
                código Embajador (por Redes sociales) con potenciales
                compradores.
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso3refcomp} />

              <div className="pasosnuevo1">Referimos</div>

              <div className={"center pasosnuevo2"}>
                Podrás seleccionar las propiedades que creas interesantes para
                tu referido y ¡Listo!
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={"center text-center"}>
              <Card.Img className={"imgpaso1"} src={icon.paso4refcomp} />

              <div className="pasosnuevo1">Vendemos</div>

              <div className={"center pasosnuevo2"}>
                Una vez tu referido firma la promesa de compra venta, te
                depositamos tu dinero.
              </div>
            </Col>
          </Row>
        </section>

        <section className="bg-white hideMOBILE section-space-p1ex">
          <div className={"comooreferir"}> ¿Cómo referir?</div>
          <div className="center text-center posthome">
            ¿Conoces a alguien que quiera vender o comprar una propiedad? Como
            Embajador tendrás la oportunidad de referirles las mejores opciones
            a cada uno, a continuación te mostramos cómo:
          </div>

          <div className={"comoreftitulo"}>Referir Vendedores</div>

          <Row gutter={[8, 8]} justify="center">
            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso1refvend}
                  />
                </div>
                <div className="pasosnuevo1">Creas Tu cuenta!</div>
                <div className="pasosnuevo2">
                  Solo necesitas registrarte como Embajador y podrás empezar a
                  formar parte de nuestro equipo.
                </div>
              </Card>
            </Col>
            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso2refvend}
                  />
                </div>
                <div className="pasosnuevo1">Agregar un referido</div>
                <div className="pasosnuevo2">
                  En tu cuenta de Embajador tendrás a disposición la opción de
                  agregar un referido, solo debes ingresar sus datos.
                </div>
              </Card>
            </Col>

            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso3refvend}
                  />
                </div>
                <div className="pasosnuevo1">Nos contratan</div>
                <div className="pasosnuevo2">
                  Nosotros nos encargamos de contactar al vendedor y cerrar el
                  trato con él.
                </div>
              </Card>
            </Col>

            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso4refvend}
                  />
                </div>
                <div className="pasosnuevo1">Vendemos</div>
                <div className="pasosnuevo2">
                  Una vez firmada la promesa de compra venta, ¡te depositamos tu
                  dinero!
                </div>
              </Card>
            </Col>
          </Row>
        </section>

        <section className={"hideMOBILE up-we-go section-space-p1ex bg-light"}>
          <div className={"comoreftitulo"}>Referir Compradores</div>
          <Row justify="center" gutter={[8, 8]}>
            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso1refcomp}
                  />
                </div>
                <div className="pasosnuevo1">Creas Tu cuenta!</div>
                <div className="pasosnuevo2">
                  Solo necesitas registrarte como Embajador y podrás empezar a
                  formar parte de nuestro equipo.
                </div>
              </Card>
            </Col>

            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso2refcomp}
                  />
                </div>
                <div className="pasosnuevo1">Agregar un referido</div>
                <div className="pasosnuevo2">
                  En tu cuenta de Embajador tendrás a disposición la opción de
                  agregar un referido, solo debes ingresar sus datos o comparte
                  tu código Embajador (por Redes sociales) con potenciales
                  compradores.
                </div>
              </Card>
            </Col>

            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso3refcomp}
                  />
                </div>
                <div className="pasosnuevo1">Referimos</div>
                <div className="pasosnuevo2">
                  Podrás seleccionar las propiedades que creas interesantes para
                  tu referido y ¡Listo!
                </div>
              </Card>
            </Col>

            <Col md={{ span: 6 }}>
              <Card className={"TarjetaReferir"}>
                <div className="text-center">
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    className="mobilecenter icon-referirimg"
                    alt="imagen paso uno referir vender"
                    src={icon.paso4refcomp}
                  />
                </div>
                <div className="pasosnuevo1">Vendemos</div>
                <div className="pasosnuevo2">
                  Una vez tu referido firma la promesa de compra venta, te
                  depositamos tu dinero.
                </div>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="section-space-p1ex hideMOBILE">
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

        <Container className="section-space-p1ex bg-white ">
          <Row className="titulo-preguntas-ref ">
            {" "}
            <div className=" subtitutlodap">Preguntas Frecuentes</div>
          </Row>
          <Collapse
            expandIcon={({ isActive }) => (
              <div>
                {isActive === true ? (
                  <MinusOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <PlusOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  ></PlusOutlined>
                )}
              </div>
            )}
            expandIconPosition="right"
            defaultActiveKey={["1"]}
            className="referircollapse"
          >
            <Panel
              header="¿Qué gano siendo Embajador?"
              className="referircollapse-panel"
            >
              <p className="tamanoletracontenidocollapse">
                {" "}
                Desde un 15% hasta un 30% de la comisión que recibe propins por
                cada venta.
              </p>
            </Panel>

            <Panel
              header="¿Debo cumplir algún requisito para ser Embajador?"
              className="referircollapse-panel"
            >
              <p className="tamanoletracontenidocollapse">
                {" "}
                Solo debes ser mayor de edad, darte el tiempo de buscar a
                personas interesadas en propiedades y referirlas a través de
                nuestra página.
              </p>
            </Panel>

            <Panel
              header="  ¿Que vigencia tiene el referido desde que confirma su registro?"
              className="referircollapse-panel"
            >
              <p className="tamanoletracontenidocollapse">
                <div>
                  {" "}
                  • Vendedor: Tu referido tendrá una vigencia de 30 días
                  corridos para contratar alguno de nuestros planes. Terminado
                  este tiempo, dejará de ser tu referido.
                </div>
                <div>
                  {" "}
                  • Comprador: Tus referidos tendrán hasta 90 días corridos para
                  firmar la promesa de compraventa. Terminado este tiempo,
                  dejará de ser tu referido.
                </div>
              </p>
            </Panel>

            <Panel
              header="¿Puedo referir a una persona más de una vez?"
              className="referircollapse-panel"
            >
              <p className="tamanoletracontenidocollapse">
                Concluidos los periodos de vigencia respectivos, podrás referir
                a una persona nuevamente.
              </p>
            </Panel>

            <Panel
              header=" ¿Debo pagar impuestos por el dinero recibido?"
              className="referircollapse-panel"
            >
              <p className="tamanoletracontenidocollapse">
                Por supuesto. Para recibir el pago, debes emitir una boleta de
                honorarios por el monto bruto correspondiente al 0,3% del precio
                de venta de la propiedad.
              </p>
            </Panel>
          </Collapse>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  return { ...app, registered: app.registered };
};

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
});

IndexRef = connect(mapStateToProps, mapDispatchToProps)(IndexRef);

export default IndexRef;
