import React from "react";
import { connect } from "react-redux";

import { Card, Container  } from "react-bootstrap";
import CountUp from "react-countup";
import sweetalert from "sweetalert";
import api from "../../api";
import { Helmet } from "react-helmet";
import ReactGa from "react-ga";
import icon from "../../utils/images";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

export class IndexInmo extends React.Component {
  async onSubmit(values, opts) {
    try {
      await api.apiPostTicket(values);

      sweetalert({
        title: "Enviado con éxito",
        text: "Uno de nuestros ejecutivos se comunicará a la brevedad con usted.",
        icon: "success",
        dangerMode: false,
      });
    } catch (error) {
      console.log("error: ", error);

      sweetalert({
        title: "Ups!",
        text: "Algo no resulto del todo bien, intentelo nuevamente",
        icon: "warning",
        dangerMode: true,
      });
    } finally {
      opts.resetForm({
        Nombre: "",
        Apellido: "",
        NombreEmpresa: "",
        Email: "",
        Telefono: "",
        Pregunta: "",
      });
    }
  }
  componentDidMount() {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Helmet>
          ‍<title>Herramientas aumentar ventas inmobiliarias</title>
          ‍
          <meta
            name="description"
            content="Dinamiza la demanda y aumenta la visibilidad de tus proyectos inmobiliarios"
          />
        </Helmet>
        <section className="container-fondo-home-inmo fondo-mobile">
          <div className="test-titulos">
            <div className="test-titulo1">
              Dinamiza la demanda y aumenta la visibilidad de tus proyectos
            </div>
            <div className="test-titulo2">
              ¿Sabías que el boca a boca es 10 veces más eficaz que la
              publicidad tradicional?
            </div>
          </div>
          <div className="bajarbotonestest ">
            <Row>
              <Col sm="12" md="4" lg="2" className="mobilecenter">
                <Link to={"/contacto"}>
                  <button className="btn-home-inmo">Contáctanos</button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>

        <section className="pa0 bg-info">
          <Row gutter={16} justify="space-between" className="pa0">
            <Col xs={24} sm={24} md={12} lg={8} xl={8} className="px-6rem text-center gutter-row">
              <div className="py-1rem">
                <div className="Numero">
                  <CountUp start={0} end={300} delay={0} duration={7}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />%
                      </div>
                    )}
                  </CountUp>
                </div>
                <div className="txt-inmobiliaria-featured">
                  {" "}
                  Aumenta la probabilidad de conversión si es referido
                </div>
              </div>    
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} className="px-6rem lineasborde text-center gutter-row">
              <div className="py-1rem">
                <div className="Numero">
                  {" "}
                  <CountUp start={0} end={81} delay={0} duration={7}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />%
                      </div>
                    )}
                  </CountUp>
                </div>
                <div className="txt-inmobiliaria-featured">
                  {" "}
                  De los clientes de las inmobiliarias usó alguna herramienta
                  digital para su búsqueda
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} className="px-6rem text-center gutter-row">
              <div className="py-1rem">
                <div className="Numero">
                    {" "}
                    <CountUp start={0} end={79} delay={0} duration={7}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />%
                        </div>
                      )}
                    </CountUp>
                </div>
                <div className="txt-inmobiliaria-featured">
                  {" "}
                  De los clientes requiere vender su propiedad para comprarse una
                  nueva
                </div>
              </div>              
            </Col>
          </Row>
        </section>
        <section className="section-space-p1ex hideMOBILE bg-white">
          <Row className="soluciones-inmo">
            <Col>Soluciones</Col>
          </Row>
          <Row justify="space-around">
            <Col md={12} lg={8} className="px-6rem">
              <div className="mb-3rem">
                <Card.Img
                  className="icon-item21"
                  variant="left"
                  src={icon.logomanoainmo}
                />
              </div>
              <div className="sol-ventacol-titulo mb-3rem">Venta colaborativa</div>
              <div className="soluciones-ventacol">
                Integramos y automatizamos el sistema de referidos para ampliar
                exponencialmente tú fuerza de ventas.
              </div>
            </Col>
            <Col md={12} lg={8} className="px-6rem">
              <div className="mb-3rem">
                <Card.Img
                  className="icon-item21"
                  variant="left"
                  src={icon.logocamarainmo}
                />
              </div>
              <div className="sol-ventacol-titulo mb-3rem">Sala de venta virtual</div>
              <div className="soluciones-ventacol">
                Llevamos tus salas de venta a clientes potenciales de forma
                interactiva, a cualquier hora, lugar y etapa del proyecto.
              </div>
            </Col>
            <Col md={12} lg={8} className="px-6rem">
              <div className="mb-3rem">
                <Card.Img
                  className="icon-item21"
                  variant="left"
                  src={icon.logoestreainmo}
                />
              </div>
              <div className="sol-ventacol-titulo mb-3rem">
                Recibo de propiedades usadas
              </div>
              <div className="soluciones-ventacol">
                Mejoramos la experiencia de tus clientes y aumentamos tus ventas
                gestionando (sin costo) la venta de las propiedades usadas de
                los compradores de tus proyectos.
              </div>
            </Col>
          </Row>
        </section>

        <section className="section-space-p1ex hideWEB2 hide-ipad bg-white">
          <Row className="">
            <Col className="center soluciones-inmo text-center">Soluciones</Col>
          </Row>
          <Row>
            <Col className="text-center center ">
              <div className="icon-item2">
                <Card.Img variant="top" src={icon.logomanoainmo} />
              </div>
              <div className="center text-center sol-ventacol-titulo">
                Venta colaborativa
              </div>
              <div className="soluciones-ventacol center text-center">
                Integramos y automatizamos el sistema de referidos para ampliar
                exponencialmente tú fuerza de ventas.
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="icon-item2">
                <Card.Img variant="top" src={icon.logocamarainmo} />
              </div>
              <div className=" center text-center sol-ventacol-titulo">
                Sala de venta virtual
              </div>
              <div className=" center text-center soluciones-ventacol">
                Llevamos tus salas de venta a clientes potenciales de forma
                interactiva, a cualquier hora, lugar y etapa del proyecto.
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="icon-item2">
                <Card.Img variant="top" src={icon.logoestreainmo} />
              </div>
              <div className=" center text-center sol-ventacol-titulo">
                Recibo de propiedades usadas
              </div>
              <div className=" center text-center soluciones-ventacol">
                Mejoramos la experiencia de tus clientes y aumentamos tus ventas
                gestionando (sin costo) la venta de las propiedades usadas de
                los compradores de tus proyectos.
              </div>
            </Col>
          </Row>
        </section>
      </div>
    );
  }

  componentDidMount() {
    initGA();
    logPageView();
  }
}

const mapStateToProps = (state) => {
  const { app } = state;

  return { ticket: app.ticket, user: app.user };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

const validate = (values) => {
  let errors = {};
  if (values.Pregunta === "") {
    errors.Pregunta = "Completa este campo";
  }
};

IndexInmo = connect(mapStateToProps, mapDispatchToProps)(IndexInmo);

export default IndexInmo;
