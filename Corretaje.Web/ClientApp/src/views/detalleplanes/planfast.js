import React, { Component } from "react";
import { ListGroup, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../../utils/images";
import { Popover, Button, Collapse } from "antd";
import "antd/dist/antd.css";
import { QuestionOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const content = (
  <div>
    <p className="color-pop">No te cobramos comisión</p>
  </div>
);

export class PlanFast extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {};
  }

  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);
  }

  render() {
    return (
      <div className="bg-white section-space-p1ex">
        <section className={"bg-white"}>
          <div className={"titulo-plan-detalle text-center center"}>
            PLAN FAST
          </div>
          <div className={"precio-pland-detalle text-center center"}>
            0%{" "}
            <Popover content={content} placement="right">
              <Button
                shape="circle"
                type="text"
                className="mover-pregunta-arriba"
                icon={<QuestionCircleOutlined />}
              />{" "}
            </Popover>
          </div>

          <Container className="center">
            <div className="que-plan-detalle">Que incluye:</div>
            <Row className="">
              <Col md="5" className="center">
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">TASACIÓN ONLINE</text>
                </div>
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    OFERTA DE COMPRA EN 48 HRS
                  </text>
                </div>
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
                  </text>
                </div>
              </Col>

              <Col md="5" className="center">
                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">PAGO AL CONTADO</text>
                </div>

                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">ENTREGA FLEXIBLE</text>
                </div>
                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    100% DE SEGURIDAD Y CERTEZA EN LA TRANSACCIÓN
                  </text>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="text-center center">
                <Link to={"/planes"}>
                  <button className="center btn-home-vender2">
                    Comencemos
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>

          <div className={"como-planes-detalle text-center center"}>
            ¿Por qué elegir Plan Fast?
          </div>
          <div className="center text-center porque-classic">
            Este plan permite una venta inmediata y al contado de tu propiedad,
            evitando visitas, reparaciones, trámites y evaluaciones comerciales
            de los compradores. De requerirlo, también tendrás flexibilidad en
            la entrega de tu propiedad según tus propias necesidades.
          </div>

          <div className={"como-planes-detalle text-center center"}>
            ¿Cómo funciona?
          </div>
          <div>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun1} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso1planfast} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Vas a la sección{" "}
                    <Link to="/planes" className="colorhiperlink">
                      Planes
                    </Link>
                    , seleccionas el Plan Fast e ingresas tus datos y los de tu
                    propiedad de forma 100% online.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle  text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun2} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso2planfast} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    En menos de 48 horas recibirás una oferta inicial por tu
                    propiedad. Si la aceptas nos pondremos en contacto contigo
                    para seguir con el proceso.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun3} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso3planfast} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Visitaremos tu propiedad para realizar una inspección
                    técnica. De aprobarse firmaremos un cierre de negocio y nos
                    encargaremos de todo.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun4} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso4planfast} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Una vez inscrita la propiedad a nuestro nombre realizaremos
                    el pago y correspondiente entrega de la propiedad.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun5} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso5plan} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Relájate y disfruta de una venta sin trámites ni comisiones.
                  </div>
                </Col>
              </Row>
            </Card>
          </div>

          <div className=" bg-white">
            <div className="como-planes-detalle">
              <div>Preguntas frecuentes</div>
            </div>
            <Container className="center">
              <Collapse accordion>
                <Panel
                  header="¿Cuánto cuesta el servicio ?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Con el Plan Fast no pagas comisiones.
                  </p>
                </Panel>
                <Panel
                  header="¿Cómo calculan el valor de mi propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Contamos con tecnología que incluye toda la información del
                    mercado inmobiliario y transacciones de ventas anteriores,
                    lo que nos permite entregar una oferta inmediata por tu
                    propiedad que luego confirmaremos con nuestra visita de
                    inspección técnica.
                  </p>
                </Panel>
                <Panel
                  header="¿Quién se encarga de todos los trámites legales?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Nosotros nos encargamos de todos los trámites. Sólo te
                    pediremos algunos documentos que, de no tenerlos, los
                    solicitaremos nosotros y solo deberás reembolsarlos
                    (escrituras, certificados municipales, etc.).
                  </p>
                </Panel>
                <Panel
                  header="¿Cuándo se debe entregar la propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    La fecha de entrega de la propiedad es a la inscripción de
                    la propiedad en el Conservador de Bienes Raíces a nuestro
                    nombre. De requerirlo, podremos acordar la extensión de este
                    plazo según tus propias necesidades.
                  </p>
                </Panel>
                <Panel
                  header="¿Puedo vender mi propiedad si está hipotecada?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Por supuesto. Nos encargamos de gestionar el pago de la
                    deuda con el banco acreedor.
                  </p>
                </Panel>
                <Panel
                  header="¿Quién se encarga de la negociación?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    En Propins validamos cada una de las ofertas que reciba tu
                    propiedad y negociamos el mejor precio para ti. Nuestro
                    objetivo es que puedas tomar la mejor decisión.
                  </p>
                </Panel>
                <Panel
                  header="¿Cuándo recibo el pago por la venta de mi propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    El pago de la propiedad se realiza al momento de firmar la
                    compraventa de la misma y queda con instrucciones notariales
                    para ser liberado una vez se inscriba la propiedad a nuestro
                    nombre en el Conservador de Bienes Raíces respectivo.
                  </p>
                </Panel>
                <Panel
                  header="¿Qué tipo de propiedad compran?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Compramos propiedades residenciales la Región Metropolitana.
                    Pronto estaremos en otras regiones.
                  </p>
                </Panel>
              </Collapse>
            </Container>
          </div>
        </section>
      </div>
    );
  }
}

export default PlanFast;
