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
    <p className="color-pop">
      Digitalizamos el boca a boca aumentando exponencialmente la visibilidad y
      demanda de tu propiedad.
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

export class PlanClassic extends Component {
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
            PLAN CLASSIC
          </div>
          <div className={"precio-pland-detalle text-center center"}>
            1% + IVA{" "}
            <Popover content={content3} placement="right">
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
                  <text className="fondo-check2a">SIN EXCLUSIVIDAD</text>
                </div>
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">TASACIÓN ONLINE</text>
                </div>
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">FOTOS PROFESIONALES</text>
                </div>
                <div className="check-plan-detalle2">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    PUBLICACIÓN EN PRINCIPALES PORTALES INMOBILIARIOS
                  </text>
                </div>
              </Col>

              <Col md="5" className="center">
                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    AUTOMATIZACIÓN DE REFERIDOS{" "}
                    <Popover content={content} placement="right">
                      <Button
                        shape="circle"
                        type="text"
                        className="mover-pregunta-arriba"
                        icon={<QuestionCircleOutlined />}
                      />{" "}
                    </Popover>
                  </text>
                </div>
                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">VISITAS GUIADAS</text>
                </div>
                <div className="check-plan-detalle">
                  <img className="fondo-check45" src={icon.iconCheck} alt="" />
                  <text className="fondo-check2a">
                    ASESORÍA LEGAL Y REDACCIÓN DE CONTRATOS
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
            ¿Por qué elegir Plan Classic?
          </div>
          <div className="center text-center porque-classic">
            Este plan permite acceder a la tecnología y efectividad de nuestra
            gestión sin entregarnos la exclusividad en la venta. De requerirlo
            podrás cambiarte al Plan Fast en cualquier momento.
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
                    <Card.Img variant="left" src={icon.iconpaso1plan} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Vas a la sección{" "}
                    <Link to="/planes" className="colorhiperlink">
                      Planes
                    </Link>
                    , seleccionas el Plan Classic e ingresas tus datos y los de
                    tu propiedad de forma 100% online.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle  text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun2} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso2plan} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Seleccionas día y hora disponible para que un fotógrafo
                    visite tu propiedad y la preparas para que le saque el mejor
                    partido posible.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun3} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso3plan} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    A través de Data Intelligence y nuestro sistema automatizado
                    de referidos encontramos a los mejores candidatos para tu
                    propiedad.
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className={"fondo-tarjeta-plan-detalle text-center center"}>
              <Card.Img className="center comofunc1" src={icon.comofun4} />
              <Row>
                <Col md="3">
                  <div className="planimg">
                    <Card.Img variant="left" src={icon.iconpaso4plan} />
                  </div>
                </Col>
                <Col md="9">
                  <div className="text-tarj-planes center text-center">
                    Nos encargamos de todo (visitas guiadas, negociación con
                    candidatos, redacción de contratos, antecedentes legales,
                    entrega).
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
                    Relájate y disfruta mientras se multiplican tus opciones de
                    vender.
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
                  header="¿Cuánto cuesta el servicio?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    El Plan Classic tiene un costo del 1% + IVA del precio de
                    venta de la propiedad. Solo pagas si vendemos.
                  </p>
                </Panel>
                <Panel
                  header="¿Cómo se cuánto vale mi propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    ¡Te ayudamos! En Propins contamos con el mejor servicio de
                    tasación online del mercado, sin costo para nuestros
                    clientes.
                  </p>
                </Panel>
                <Panel
                  header="¿Puedo contratar el servicio de tour virtual 3D?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Por supuesto. Cuando contrates el plan, nuestra plataforma
                    te dará la opción de contratar algunos servicios adicionales
                    de forma opcional, entre ellos el tour virtual 3D para que
                    podamos acelerar la venta y darle mejor visibilidad a tu
                    propiedad.
                  </p>
                </Panel>
                <Panel
                  header="¿Me puedo cambiar de Plan una vez contratado el Plan Classic?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Una vez contratado el Plan Classic te puedes cambiar en
                    cualquier momento al Plan Fast.
                  </p>
                </Panel>
                <Panel
                  header="¿Quién muestra mi propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Nosotros nos encargamos de hacer las visitas guiadas de tu
                    propiedad con el(la) anfitrión(a) que te asignaremos.
                  </p>
                </Panel>
                <Panel
                  header="¿Cuál es la vigencia del plan contratado?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    La vigencia del contrato del Plan Classic es de 60 días
                    corridos y se podrá renovar por el mismo período si no
                    existiere aviso en contrario con a lo menos 15 días de
                    anticipación a su vencimiento al correo:
                    contacto@propins.cl.
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
                  header="¿Puede un familiar o un amigo referir mi propiedad?"
                  className="tama-ven"
                >
                  <p className="color-contenido-faq">
                    Por supuesto, de hecho te entregamos todas las herramientas
                    para que la puedan referir a través de sus redes sociales y
                    ganar dinero.
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

export default PlanClassic;
