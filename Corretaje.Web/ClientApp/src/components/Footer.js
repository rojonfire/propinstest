import React, { Component } from "react";
import { Nav, Card } from "react-bootstrap";
import icon from "../utils/images";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col } from "antd";

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
  }

  searchQuery = (value) => {
    this.setState({
      query: value.currentTarget.value,
    });
  };

  checkEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      window.location = "/resultado-busqueda?query=" + this.state.query;
    }
  };

  render() {
    const { location } = this.props;
    let propiedadesPath = "/propiedad/";
    if (location.pathname.includes("/propiedad/")) {
      propiedadesPath = location.pathname;
    }

    const FootToggle =
      location &&
      (location.pathname === "/login" ||
        location.pathname === "/Login" ||
        location.pathname === "/tasacion" ||
        location.pathname === "/resultadostasacion" ||
        location.pathname === "/PlanFastContratado" ||
        location.pathname === "/planes" ||
        location.pathname === "/PlanContratado" ||
        location.pathname === "/loginnuevo" ||
        location.pathname === "/login2" ||
        location.pathname === "/payment" ||
        location.pathname === "/registro-proper" ||
        location.pathname === "/registro-referido" ||
        location.pathname === "/registronormal" ||
        location.pathname === "/registroproper" ||
        location.pathname === "/registro" ||
        location.pathname === "/perfil" ||
        location.pathname === "/resultado-busqueda" ||
        location.pathname === propiedadesPath ||
        location.pathname === "/signin" ||
        location.pathname.includes("/landing/"))
        ? "none"
        : "";

    return (
      <div style={{ display: FootToggle }} className={"bg-light center"}>
        <section className="hide-ipad hideMOBILE bg-light section-space-logos card-pa0">
          <Row justify="space-around">
            <Col className="">
              <Card className="">
                <div className="icon-item">
                  <Card.Img src={icon.logoCorfo} />
                </div>
              </Card>
            </Col>
            <Col>
              <Card>
                <div className="icon-item">
                  <Card.Img variant="top" src={icon.logoMagical} />
                </div>
              </Card>
            </Col>
            <Col>
              <Card>
                <div className="icon-item">
                  <Card.Img variant="top" src={icon.logoMatterport} />
                </div>
              </Card>
            </Col>
            <Col>
              <Card>
                <div className="icon-item">
                  <Card.Img variant="top" src={icon.logoMicrosoft} />
                </div>
              </Card>
            </Col>

            <Col>
              <Card>
                <div className="icon-item">
                  <Card.Img variant="top" src={icon.logoUai} />
                </div>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="bg-gray1 hideMOBILE">
          <Row justify="center">
            <Col sm={12} md={12} lg={2} xl={2} className="contacto96 margin94">
              Contacto
            </Col>
            <Col sm={12} md={12} lg={6} xl={6} className="margin94">
              <Row justify="start" align="middle" className="mb-2rem">
                <Col span={4} className="text-center">
                  <a
                    href="https://www.google.cl/maps/place/La+Capitan%C3%ADa+80,+Ofc+108,+Las+Condes,+Regi%C3%B3n+Metropolitana/@-33.4107507,-70.5738618,17z/data=!3m1!4b1!4m5!3m4!1s0x9662cedfcfb4ac25:0x31f4335c9bbc6f39!8m2!3d-33.4107552!4d-70.5716731"
                    target="__blank"
                  >
                    <img
                      className="mover-ubi"
                      src={icon.IcnoUbicacionFooter}
                      alt=""
                    />
                  </a>
                </Col>
                <Col className="letra-ubilgo">
                  La Capitanía 80, of 108. Las condes
                </Col>
              </Row>
              <Row justify="start" align="middle" className="mb-2rem">
                <Col span={4} className="text-center">
                  <img src={icon.Icontelfoo} alt="" />
                </Col>
                <Col className="letra-ubilgo">+569 7854 2618</Col>
              </Row>
              <Row justify="start" align="middle" className="mb-2rem">
                <Col span={4} className="text-center">
                  <img src={icon.Iconmail} alt="" />
                </Col>
                <Col className="letra-ubilgo">contacto@propins.cl</Col>
              </Row>
            </Col>
            <Col sm={0} md={1} lg={3} xl={3} />
            <Col sm={12} md={12} lg={3} xl={3} className="nosotros98 margin94">
              Nosotros
            </Col>
            <Col sm={12} md={12} lg={6} xl={6} className="margin90">
              {" "}
              <div>
                <LinkContainer to={"/modelo"}>
                  <Nav.Link className="footerlink"> ¿Quiénes Somos? </Nav.Link>
                </LinkContainer>
              </div>
              <div>
                <LinkContainer to={"/marketplace"}>
                  <Nav.Link className="footerlink">
                    {" "}
                    Nuestros Partners{" "}
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div>
                {" "}
                <LinkContainer to={"/terminosycondiciones"}>
                  <Nav.Link className="footerlink">
                    {" "}
                    Términos y Condiciones
                  </Nav.Link>
                </LinkContainer>
              </div>
            </Col>
          </Row>
          <div className="siguenos123">Síguenos!</div>
          <div className="iconos-siguenos123">
            <a
              href="https://www.facebook.com/propinscl/?modal=admin_todo_tour"
              target="__blank"
            >
              <img className="iconofb123" src={icon.iconFacebook} alt="" />
            </a>
            <a href="https://www.instagram.com/propinscl/" target="__blank">
              <img className="iconoin123" src={icon.iconInstagram} alt="" />
            </a>
          </div>
        </section>
        <section className="bg-gray1 hideWEB2 py-2rem">
          <Row justify="center">
            <Col span={8} className="text-center">
              <a
                href="https://www.google.cl/maps/place/La+Capitan%C3%ADa+80,+Ofc+108,+Las+Condes,+Regi%C3%B3n+Metropolitana/@-33.4107507,-70.5738618,17z/data=!3m1!4b1!4m5!3m4!1s0x9662cedfcfb4ac25:0x31f4335c9bbc6f39!8m2!3d-33.4107552!4d-70.5716731"
                target="__blank"
              >
                <img
                  className="icon-margin"
                  src={icon.IcnoUbicacionFooter}
                  alt=""
                />
              </a>
            </Col>
          </Row>
          <Row justify="center" className="mb-3">
            <Col className="letra-ubilgo text-center">
              La Capitanía 80, of 108.
              <br /> Las condes
            </Col>
          </Row>
          <Row justify="center">
            <Col md={2}>
              <img className="icon-margin" src={icon.Icontelfoo} alt="" />
            </Col>
          </Row>
          <Row justify="center" className="mb-3">
            <Col className="letra-ubilgo">+569 7854 2618</Col>
          </Row>
          <Row justify="center">
            <Col>
              <img className="icon-margin" src={icon.Iconmail} alt="" />
            </Col>
          </Row>
          <Row justify="center" className="mb-3">
            <Col className="letra-ubilgo">
              contacto@<strong>propins</strong>.cl
            </Col>
          </Row>
          <Row justify="center">
            <Col className="text-center">
              <div className="mr-1rem d-inline">
                <a
                  className="icon-margin"
                  href="https://www.facebook.com/propinscl/?modal=admin_todo_tour"
                  target="__blank"
                >
                  <img src={icon.iconFacebook} alt="" />
                </a>
              </div>
              <a
                className="icon-margin"
                href="https://www.instagram.com/propinscl/"
                target="__blank"
              >
                <img src={icon.iconInstagram} alt="" />
              </a>
            </Col>
          </Row>
          <Row justify="center" className="mb-2rem">
            <Col className="letra-ubilgo">Síguenos</Col>
          </Row>
          <Row justify="center">
            <Col>
              <img src={icon.logoColor} alt="" className="w-35vw" />
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}
