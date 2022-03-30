import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Card, Row, Col } from "react-bootstrap";
import { listOfData } from "./Testimonios";
import "react-alice-carousel/lib/alice-carousel.css";
import icon from "../../utils/images";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
}; // google analytics

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
}; // google analytics

export class Prueba extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responsive: { 1024: { items: 1 }, 1366: { items: 1 } },
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
  }

  render() {
    return (
      <div>
        <section className="container-fondo-home-vencer fondo-mobile">
          <div className="test-titulos">
            <div className="test-titulo1">
              Vende tu casa online y en tiempo récord.
            </div>
            <div className="test-titulo2">Desde 0% de comisión.</div>
          </div>
          <div className="bajarbotonestest ">
            <Row>
              <Col sm="12" md="4" lg="2" className="mobilecenter">
                <Link to={"/planes"}>
                  <Button className="botontesteo">Comencemos</Button>
                </Link>
              </Col>
              <Col sm="12" md="2" className="mobilecenter">
                <Link to={"/tasacion"}>
                  <Button className="botontesteo2">
                    Quiero tasar una propiedad
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>
        <section className="section-space-p1ex  bg-white">
          <Row className="soluciones-vender mobilecenter">
            <Col className="mobilecenter">
              ¿Cómo vender tu casa con Propins?
            </Col>
          </Row>
          <Row className="">
            <Col lg="4" sm="12" md="3" className="">
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter">
                  <Card.Img
                    variant="top"
                    className="mobilecenter icon-venderprop"
                    src={icon.imgpaso1vender}
                  />
                </div>
                <div className="pasos-vender">Paso 1</div>
                <div className="sol-vendere">Elige tu plan</div>
                <div className="soluciones-ventacol4">
                  Escoge el plan de venta (fast, singular y classic) que más se
                  acomode a tus necesidades.{" "}
                </div>
              </Card>
            </Col>
            <Col lg="4" sm="12" md="3">
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter">
                  <Card.Img
                    className="icon-venderprop"
                    variant="top"
                    src={icon.imgpaso2vender}
                  />
                </div>
                <div className="pasos-vender">Paso 2</div>
                <div className="sol-vendere">Regístrate</div>
                <div className="soluciones-ventacol4">
                  Ingresa tus datos y los de tu propiedad en simples pasos y
                  100% online.
                </div>
              </Card>
            </Col>
            <Col lg="4" sm="12" md="3">
              <Card className={"center mover-pasoss"}>
                <div className="mobilecenter">
                  <Card.Img
                    variant="top"
                    className="icon-venderprop"
                    src={icon.imgpaso3vender}
                  />
                </div>
                <div className="pasos-vender">Paso 3</div>
                <div className="sol-vendere">¡Relájate!</div>
                <div className="soluciones-ventacol4">
                  Nos encargamos de todo. Sí, de TODO.
                </div>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default Prueba;
