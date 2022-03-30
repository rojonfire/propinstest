import React, { useState } from "react";
import { Container, Card, ListGroup, Form } from "react-bootstrap";
import { Row, Col, Carousel } from "antd";
import { Popover, Button } from "antd";
import "antd/dist/antd.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import icon from "../../utils/images";
import { placements } from "@popperjs/core";
import { Collapse } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { MinusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

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

export default ({ updateStep, updatePlan, features }) => {
  const [idSelected, setIdSelected] = useState(undefined);
  const [nameSelected, setNameSelected] = useState(undefined);
  const [showText, setShowText] = useState(undefined);
  const [isActive123, isActive1] = useState(undefined);
  const setCheck = (itemId, event) => {
    setIdSelected(itemId);
  };

  const onClick = (itemId, name) => {
    setShowText(itemId);
    setNameSelected(name);
  };

  const callback = () => {
    isActive1(true);
  };

  const tipo =
    features && features.length > 0 && features[0].esVenta
      ? "Venta"
      : "Arriendo";

  document.querySelector("body").scrollTo(0, 0);

  return (
    <section>
      <div className="planventanuevo">Planes de {tipo}</div>
      <div className="hideWEB2">
        <Carousel>
          {features
            ? features
                .sort((a, b) => a.precio - b.precio)
                .map((item, i) => {
                  return (
                    <div>
                      <h3>
                        {" "}
                        <Card className=" center lacard1">
                          <Card className="tarjetaPlanesForm">
                            <div className="tituloplanform">
                              Plan {item.nombre}{" "}
                            </div>
                            <div>
                              <Button
                                onClick={() => onClick(item.id, item.nombre)}
                                className="VerMasArriendo"
                              >
                                {" "}
                                Ver más{" "}
                              </Button>
                            </div>
                          </Card>

                          <div>
                            <Form>
                              <Form.Group controlId="formBasicChecbox">
                                <Form.Check
                                  type="checkbox"
                                  id={item.id}
                                  label=""
                                  className="aceptarcheck"
                                  checked={
                                    idSelected === item.id ? true : false
                                  }
                                  onChange={(e) => setCheck(item.id, e)}
                                />{" "}
                                <text className="conjustoaceptotermino">
                                  Acepto
                                  <a className="" href="/terminosycondiciones">
                                    <text className="terminoarreindo">
                                      Términos y condiciones
                                    </text>
                                  </a>
                                </text>
                              </Form.Group>
                            </Form>
                          </div>
                          <Row>
                            <Col span={12}>
                              {" "}
                              <Button
                                className={"botonbeio"}
                                onClick={() =>
                                  updateStep({
                                    cb: () =>
                                      updatePlan(
                                        item.nombre,
                                        item.precio,
                                        item.nombre,
                                        item.fast,
                                        idSelected
                                      ),
                                  })
                                }
                                disabled={idSelected === item.id ? false : true}
                                style={{
                                  opacity: idSelected === item.id ? 1 : 0.3,
                                }}
                              >
                                Contratar
                              </Button>
                            </Col>
                          </Row>
                        </Card>
                      </h3>
                    </div>
                  );
                })
            : ""}
        </Carousel>
      </div>
      <Row className="hide123" gutter={[80, 4]} justify="center">
        {features
          ? features
              .sort((a, b) => a.precio - b.precio)
              .map((item, i) => {
                return (
                  <div>
                    <Col lg={{ span: 8 }}>
                      <Card className="lacard1">
                        <Card className="tarjetaPlanesForm">
                          <div className="tituloplanform">
                            Plan {item.nombre}{" "}
                          </div>
                          <div>
                            <Button
                              onClick={() => onClick(item.id, item.nombre)}
                              className="VerMasArriendo"
                            >
                              {" "}
                              Ver más{" "}
                            </Button>
                          </div>
                        </Card>

                        <div>
                          <Form>
                            <Form.Group controlId="formBasicChecbox">
                              <Form.Check
                                type="checkbox"
                                id={item.id}
                                label=""
                                className="aceptarcheck"
                                checked={idSelected === item.id ? true : false}
                                onChange={(e) => setCheck(item.id, e)}
                              />{" "}
                              <text className="conjustoaceptotermino">
                                Acepto
                                <a className="" href="/terminosycondiciones">
                                  <text className="terminoarreindo">
                                    Términos y condiciones
                                  </text>
                                </a>
                              </text>
                            </Form.Group>
                          </Form>
                        </div>
                        <Row>
                          <Col span={12}>
                            {" "}
                            <Button
                              className={"botonbeio"}
                              onClick={() =>
                                updateStep({
                                  cb: () =>
                                    updatePlan(
                                      item.nombre,
                                      item.precio,
                                      item.nombre,
                                      item.fast,
                                      idSelected
                                    ),
                                })
                              }
                              disabled={idSelected === item.id ? false : true}
                              style={{
                                opacity: idSelected === item.id ? 1 : 0.3,
                              }}
                            >
                              Contratar
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </div>
                );
              })
          : ""}
      </Row>

      {features
        ? features
            .sort((a, b) => a.precio - b.precio)
            .map((item, i) => {
              return (
                <div>
                  {" "}
                  {showText == item.id ? (
                    <Container className="colorcontainer123">
                      <div className="tituloarriendodetalle">
                        {" "}
                        Plan {item.nombre}
                      </div>
                      <div className="subtitutlodap">Carácteristicas:</div>
                      <Row gutter={[24, 8]} key={i}>
                        {item.serviciosBase &&
                          item.serviciosBase.map((items, i) => (
                            <Col
                              lg={{ span: 8 }}
                              sm={{ span: 12 }}
                              className="entrerowses"
                            >
                              <Row className="mobile">
                                <Col span={2}>
                                  <img
                                    className="fondo-check44"
                                    src={icon.iconCheck}
                                    alt=""
                                  />
                                </Col>
                                <Col span={16} offset={2}>
                                  {" "}
                                  <text className="fondo-check2">
                                    {items.nombre}
                                  </text>
                                </Col>
                              </Row>
                            </Col>
                          ))}
                      </Row>

                      <div className="movermobiler12345 subtitutlodap">
                        ¿Por qué elegir este plan?
                      </div>
                      <Row>
                        <Col lg={{ span: 13 }} sm={{ span: 12 }}>
                          {PQ[tipo.toLowerCase()][nameSelected].map((paso) => (
                            <div className="pqarriendodp">{paso.a}</div>
                          ))}
                        </Col>

                        <Col lg={{ span: 6, offset: 5 }}>
                          <img
                            className="pequeperson"
                            src={icon.iconrelojito}
                            alt="Persona sentada con Reloj"
                          />
                        </Col>
                      </Row>

                      <div className="subtitutlodap">¿Cómo funciona?</div>
                      <Row
                        className="hide123"
                        gutter={[12, 8]}
                        justify="center"
                      >
                        {PLANES_PASOS[tipo.toLowerCase()][nameSelected].map(
                          (paso) => (
                            <Col md={{ span: 8 }}>
                              <Card className="tarjetamobilecomofunca">
                                <Row justify="center">
                                  <Col>
                                    {" "}
                                    <div className="fondoletracomofunca">
                                      <text className="letracomofunca">
                                        {paso.f}
                                      </text>
                                    </div>
                                  </Col>
                                </Row>
                                <div className="textocmar">{paso.q}</div>
                              </Card>
                            </Col>
                          )
                        )}
                      </Row>
                      <div className="hideWEB2">
                        <Carousel>
                          {PLANES_PASOS[tipo.toLowerCase()][nameSelected].map(
                            (paso) => (
                              <div className="dasdasd">
                                <h3>
                                  <Card className="center tarjetamobilecomofunca">
                                    <Row justify="center">
                                      <Col>
                                        {" "}
                                        <div className="fondoletracomofunca">
                                          <text className="letracomofunca">
                                            {paso.f}
                                          </text>
                                        </div>
                                      </Col>
                                    </Row>
                                    <div className="textocmar">{paso.q}</div>
                                  </Card>
                                </h3>
                              </div>
                            )
                          )}
                        </Carousel>
                      </div>
                      <div className="movermobiler12345">
                        <div className=" subtitutlodap">
                          Preguntas Frecuentes
                        </div>
                        <Row justify="center">
                          <Col span={24}>
                            {PLANES_QA[tipo.toLowerCase()][nameSelected].map(
                              (section) => (
                                <Collapse
                                  expandIconPosition="right"
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
                                  onChange={() => callback()}
                                  defaultActiveKey={["0"]}
                                  className="planescollapse"
                                >
                                  <Panel
                                    className="planescollapse-panel"
                                    header={`${section.q}`}
                                    key="1"
                                  >
                                    <p className="tamanoletracontenidocollapse">
                                      {section.a}
                                    </p>
                                  </Panel>
                                </Collapse>
                              )
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Container>
                  ) : null}
                </div>
              );
            })
        : ""}
    </section>
  );
};
const PQ = {
  venta: {
    FAST: [
      {
        a: "Este plan permite una venta inmediata y al contado de tu propiedad, evitando visitas, reparaciones, trámites y evaluaciones comerciales de los compradores. De requerirlo, también tendrás flexibilidad en la entrega de tu propiedad según tus propias necesidades.",
      },
    ],
    SINGULAR: [
      {
        a: "Este plan permite acceder a la tecnología y efectividad de nuestra gestión de venta con un 50% de descuento en su tarifa (0,5%+IVA).",
      },
    ],
    CLASSIC: [
      {
        a: "Este plan permite acceder a la tecnología y efectividad de nuestra gestión sin entregarnos la exclusividad en la venta. De requerirlo podrás cambiarte al Plan Fast en cualquier momento.",
      },
    ],
  },
  arriendo: {
    BASIC: [
      {
        a: "Este plan permite acceder a nuestra tecnología y efectividad en la gestión de arriendo de tu propiedad pagando por única vez y solo en caso de éxito, es decir, solo si arrendamos tu propiedad. Este plan es ideal para personas que NO necesitan la administración posterior de la propiedad ni un seguro de arriendo.",
      },
    ],
    PLUS: [
      {
        a: "Este plan permite acceder a nuestra tecnología y efectividad del Plan Basic más la administración del arriendo para que no te tengas que preocupar de nada. Este plan es ideal para personas que tienen propiedades de inversión o que no tienen tiempo para preocuparse de administrar su(s) departamento(s). ",
      },
    ],
    FULL: [
      {
        a: "Este plan permite acceder a nuestra tecnología y efectividad del Plan Plus (corretaje + administración) más un seguro de arriendo que cubre hasta 6 meses de no pago de arriendo y gastos de desalojo. Este plan es ideal para personas que tienen propiedades de inversión. ",
      },
    ],
  },
};

const PLANES_PASOS = {
  venta: {
    FAST: [
      {
        q: "Vas a la sección Planes, seleccionas el Plan Fast e ingresas tus datos y los de tu propiedad de forma 100% online.",
        f: "1",
      },
      {
        q: "En menos de 48 hrs. recibirás una oferta inicial por tu propiedad. Si la aceptas, nos pondremos en contacto contigo para seguir con el proceso.",
        f: "2",
      },
      {
        q: "Visitaremos tu propiedad para realizar una inspección técnica. De aprobarse firmaremos un cierre de negocio y nos encargaremos de todo.",
        f: "3",
      },
      {
        q: "Una vez inscrita la propiedad a nuestro nombre realizaremos el pago y correspondiente entrega de la propiedad.",
        f: "4",
      },
      {
        q: "Relájate y disfruta de una venta sin trámites ni comisiones.",
        f: "5",
      },
    ],
    SINGULAR: [
      {
        q: "Vas a la sección Planes, seleccionas el Plan Fast e ingresas tus datos y los de tu propiedad de forma 100% online.",
        f: "1",
      },
      {
        q: "En menos de 48 hrs. recibirás una oferta inicial por tu propiedad. Si la aceptas, nos pondremos en contacto contigo para seguir con el proceso.",
        f: "2",
      },
      {
        q: "Visitaremos tu propiedad para realizar una inspección técnica. De aprobarse firmaremos un cierre de negocio y nos encargaremos de todo.",
        f: "3",
      },
      {
        q: "Una vez inscrita la propiedad a nuestro nombre realizaremos el pago y correspondiente entrega de la propiedad.",
        f: "4",
      },
      {
        q: "Relájate y disfruta de una venta sin trámites ni comisiones.",
        f: "5",
      },
    ],
    CLASSIC: [
      {
        q: "Vas a la sección Planes, seleccionas el Plan Fast e ingresas tus datos y los de tu propiedad de forma 100% online.",
        f: "1",
      },
      {
        q: "En menos de 48 hrs. recibirás una oferta inicial por tu propiedad. Si la aceptas, nos pondremos en contacto contigo para seguir con el proceso.",
        f: "2",
      },
      {
        q: "Visitaremos tu propiedad para realizar una inspección técnica. De aprobarse firmaremos un cierre de negocio y nos encargaremos de todo.",
        f: "3",
      },
      {
        q: "Una vez inscrita la propiedad a nuestro nombre realizaremos el pago y correspondiente entrega de la propiedad.",
        f: "4",
      },
      {
        q: "Relájate y disfruta de una venta sin trámites ni comisiones.",
        f: "5",
      },
    ],
  },
  arriendo: {
    BASIC: [
      {
        q: "Seleccionas el Plan Basic e ingresas tus datos y los de tu propiedad de forma 100% online y gratuita.",
        f: "1",
      },
      {
        q: "Seleccionas día y hora disponible para que un fotógrafo visite tu propiedad y realice una sesión de fotos (considera una hora que tu propiedad tenga buena luz y pueda estar bien ordenada).",
        f: "2",
      },
      {
        q: "A través de Data Intelligence y nuestro sistema automatizado de referidos encontramos a los mejores candidatos para tu propiedad.",
        f: "3",
      },
      {
        q: "Nos encargamos de todo (visitas guiadas, negociación con candidatos, redacción de contratos, antecedentes legales y comerciales, entrega).",
        f: "4",
      },
      {
        q: "Relájate y disfruta mientras se multiplican tus opciones de arrendar.",
        f: "5",
      },
    ],
    PLUS: [
      {
        q: "Seleccionas el Plan Plus e ingresas tus datos y los de tu propiedad de forma 100% online y gratuita.",
        f: "1",
      },
      {
        q: "Seleccionas día y hora disponible para que un fotógrafo visite tu propiedad y realice una sesión de fotos (considera una hora que tu propiedad tenga buena luz y pueda estar bien ordenada).",
        f: "2",
      },
      {
        q: "A través de Data Intelligence y nuestro sistema automatizado de referidos encontramos a los mejores candidatos para tu propiedad.",
        f: "3",
      },
      {
        q: "Nos encargamos de todo (visitas guiadas, negociación con candidatos, redacción de contratos, antecedentes legales y comerciales, entrega y administración). ",
        f: "4",
      },
      {
        q: "Relájate y disfruta mientras se multiplican tus opciones de arrendar.",
        f: "5",
      },
    ],
    FULL: [
      {
        q: "Seleccionas el Plan Full e ingresas tus datos y los de tu propiedad de forma 100% online y gratuita.",
        f: "1",
      },
      {
        q: "Seleccionas día y hora disponible para que un fotógrafo visite tu propiedad y realice una sesión de fotos (considera una hora que tu propiedad tenga buena luz y pueda estar bien ordenada).",
        f: "2",
      },
      {
        q: "A través de Data Intelligence y nuestro sistema automatizado de referidos encontramos a los mejores candidatos para tu propiedad.",
        f: "3",
      },
      {
        q: "Nos encargamos de todo (visitas guiadas, negociación con candidatos, redacción de contratos, antecedentes legales y comerciales, entrega, administración asegurar el pago de tu arriendo siempre). ",
        f: "4",
      },
      {
        q: "Relájate y disfruta mientras se multiplican tus opciones de arrendar.",
        f: "5",
      },
    ],
  },
};

const PLANES_QA = {
  venta: {
    FAST: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Fast no pagas comisiones",
      },
      {
        q: "Cómo calculan el valor de mi propiedad?",
        a: "Contamos con tecnología que incluye toda la información del mercado inmobiliario y transacciones de ventas anteriores, lo que nos permite entregar una oferta inmediata por tu propiedad que luego confirmaremos con nuestra visita de inspección técnica.",
      },
      {
        q: "Quién se encarga de todos los trámites legales",
        a: "Nosotros nos encargamos de todos los trámites. Sólo te pediremos algunos documentos que, de no tenerlos, los solicitaremos nosotros y solo deberás reembolsarlos (escrituras, certificados municipales, etc.).",
      },
      {
        q: "Cuándo se debe entregar la propiedad?",
        a: "La fecha de entrega de la propiedad es a la inscripción de la propiedad en el Conservador de Bienes Raíces a nuestro nombre. De requerirlo, podremos acordar la extensión de este plazo según tus propias necesidades.",
      },
      {
        q: "Quien se encarga de la negociación?",
        a: "Por supuesto. Nos encargamos de gestionar el pago de la deuda con el banco acreedor.",
      },
      {
        q: "Que tan rapido es?",
        a: "En Propins validamos cada una de las ofertas que reciba tu propiedad y negociamos el mejor precio para ti. Nuestro objetivo es que puedas tomar la mejor decisión.",
      },
      {
        q: "Cuándo recibo el pago por la venta de mi propiedad?",
        a: "El pago de la propiedad se realiza al momento de firmar la compraventa de la misma y queda con instrucciones notariales para ser liberado una vez se inscriba la propiedad a nuestro nombre en el Conservador de Bienes Raíces respectivo.",
      },
      {
        q: "Qué tipo de propiedad compran?",
        a: "Compramos propiedades residenciales la Región Metropolitana. Pronto estaremos en otras regiones.",
      },
    ],
    SINGULAR: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Singular tiene un costo del 0,5% + IVA del precio de venta de la propiedad. Solo pagas si vendemos.",
      },
      {
        q: "Cómo se cuánto vale mi propiedad?",
        a: "¡Te ayudamos! En Propins contamos con el mejor servicio de tasación online del mercado, sin costo para nuestros clientes.",
      },
      {
        q: "Debo pagar por el servicio de tour virtual 3D y destacado en Portales?",
        a: "Si. El servicio de tour virtual 3D y destacado en portales es un servicio adicional que se contrata desde tu portal de propins o por whatsapps.",
      },
      {
        q: "Quién muestra mi propiedad?",
        a: "Nosotros nos encargamos de hacer las visitas guiadas de tu propiedad con el(la) anfitrión(a) que te asignaremos.",
      },
      {
        q: "Cuál es la vigencia del plan contratado?",
        a: "La vigencia del Plan Singular es de 60 días corridos y se podrá renovar o modificar según tu elijas.",
      },
      {
        q: "Quién se encarga de la negociación?",
        a: "En Propins validamos cada una de las ofertas que reciba tu propiedad y negociamos el mejor precio para ti. Nuestro objetivo es que puedas tomar la mejor decisión.",
      },
      {
        q: "Puede un Familiar o un amigo referir mi propiedad?",
        a: "Por supuesto, de hecho te entregamos todas las herramientas para que la puedan referir a través de sus redes sociales y ganar dinero.",
      },
    ],
    CLASSIC: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Classic tiene un costo del 1% + IVA del precio de venta de la propiedad. Solo pagas si vendemos.",
      },
      {
        q: "Cómo se cuánto vale mi propiedad?",
        a: "¡Te ayudamos! En Propins contamos con el mejor servicio de tasación online del mercado, sin costo para nuestros clientes.",
      },
      {
        q: "Debo pagar por el servicio de tour virtual 3D y destacado en Portales?",
        a: "Si. El servicio de tour virtual 3D y destacado en portales es un servicio adicional que se contrata desde tu portal de propins o por whatsapps.",
      },
      {
        q: "Me puedo cambiar de Plan una vez contratado el Plan Classic?",
        a: "Una vez contratado el Plan Classic te puedes cambiar en cualquier momento al Plan Fast.",
      },
      {
        q: "Quién muestra mi propiedad?",
        a: "Nosotros nos encargamos de hacer las visitas guiadas de tu propiedad con el(la) anfitrión(a) que te asignaremos.",
      },
      {
        q: "Cuál es la vigencia del plan contratado?",
        a: "La vigencia del contrato del Plan Classic es de 60 días corridos y se podrá renovar por el mismo período si no existiere aviso en contrario con a lo menos 15 días de anticipación a su vencimiento al correo: contacto@propins.cl.",
      },
      {
        q: "Quién se encarga de la negociación?",
        a: "En Propins validamos cada una de las ofertas que reciba tu propiedad y negociamos el mejor precio para ti. Nuestro objetivo es que puedas tomar la mejor decisión.",
      },
      {
        q: "Puede un Familiar o un amigo referir mi propiedad?",
        a: "Por supuesto, de hecho te entregamos todas las herramientas para que la puedan referir a través de sus redes sociales y ganar dinero.",
      },
    ],
  },
  arriendo: {
    BASIC: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Basic tiene un costo del 50% + IVA del primer canon de arriendo. Solo pagas si arrendamos.",
      },
      {
        q: "Pueden tasar mi propiedad?",
        a: "En Propins puedes tasar tu propiedad online y 100% gratis. Contamos con un algoritmo propio que toma como referencia más de 60.000 propiedades vigentes.",
      },
      {
        q: "Puedo modificar el plan contratado o incluir servicios adicionales?",
        a: "  Puedes modificar el plan contratado e incluir servicios adicionales en todo momento y 100% online. Si prefieres, te puedes contactar al whatsapp de nuestra plataforma para que nuestros ejecutivos te asesoren en todo momento y resuelvan tus dudas. ",
      },
      {
        q: "Qué es el sistema de referidos?",
        a: "El sistema de referidos es una automatización del clásico boca a boca. Sistematizamos este proceso para aumentar por x10 las posibilidades de arrendar tu propiedad. ",
      },
      {
        q: "Quién realiza la entrega de la propiedad?",
        a: "Nosotros nos encargamos de hacer entrega de tu propiedad y de levantar el acta que acredite su cumplimiento.",
      },
      {
        q: "Puedo contratar los servicios de Propins de manera offline?",
        a: "Por supuesto. Lo puedes hacer solicitando que te contacte nuestra jefa de ventas en el whatsapp de la plataforma o a los teléfonos que aparecen al final de nuestra página web. ",
      },
      {
        q: "Qué otros servicios provee Propins?",
        a: "Nuestro propósito es que nuestros clientes puedan tener un servicio integral desde una única plataforma. Por lo mismo hemos concretado alianzas con distintos proveedores relacionados (remodelaciones, arquitectos, pintores, mudanzas, compañías de seguro, etc) que los puedes encontrar en la sección partners y a solo un clic de distancia. ",
      },
    ],
    PLUS: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Plus tiene un costo mensual del 5,9% + IVA del canon de arriendo y lo empiezas a pagar a partir del segundo mes de contrato. El primer mes pagas lo correspondiente al servicio de corretaje que equivale al 50% + IVA del primer canon de arriendo. ",
      },
      {
        q: "Pueden tasar mi propiedad?",
        a: "En Propins puedes tasar tu propiedad online y 100% gratis. Contamos con un algoritmo propio que toma como referencia más de 60.000 propiedades vigentes.",
      },
      {
        q: "Puedo modificar el plan contratado o incluir servicios adicionales?",
        a: "Puedes modificar el plan contratado e incluir servicios adicionales en todo momento y 100% online. Si prefieres, te puedes contactar al whatsapp de nuestra plataforma para que nuestros ejecutivos te asesoren en todo momento y resuelvan tus dudas. ",
      },
      {
        q: "Qué es el sistema de referidos?",
        a: "El sistema de referidos es una automatización del clásico boca a boca. Sistematizamos este proceso para aumentar por x10 las posibilidades de arrendar tu propiedad. ",
      },
      {
        q: "Quién realiza la entrega de la propiedad?",
        a: "Nosotros nos encargamos de hacer entrega de tu propiedad y de levantar el acta que acredite su cumplimiento.",
      },
      {
        q: "Puedo contratar los servicios de Propins de manera offline?",
        a: "Por supuesto. Lo puedes hacer solicitando que te contacte nuestra jefa de ventas en el whatsapp de la plataforma o a los teléfonos que aparecen al final de nuestra página web. ",
      },
      {
        q: "Qué otros servicios provee Propins?",
        a: "Nuestro propósito es que nuestros clientes puedan tener un servicio integral desde una única plataforma. Por lo mismo hemos concretado alianzas con distintos proveedores relacionados (remodelaciones, arquitectos, pintores, mudanzas, compañías de seguro, etc) que los puedes encontrar en la sección partners y a solo un clic de distancia. ",
      },
    ],
    FULL: [
      {
        q: "Cuánto cuesta el servicio de PROPINS?",
        a: "El Plan Full tiene un costo mensual del 7,9% + IVA del canon de arriendo y lo empiezas a pagar a partir del segundo mes de contrato. El primer mes pagas lo correspondiente al servicio de corretaje que equivale al 50% + IVA del primer canon de arriendo.",
      },
      {
        q: "Cuantos meses de cobertura tiene el seguro de arriendo?",
        a: "El seguro cubre hasta 6 meses de no pago de arriendo, tiempo suficiente para tramitar el desalojo del arrendatario. Propins trabaja con las mejores compañías de seguros del país para entregar el mejor servicio a nuestros clientes, siempre.",
      },
      {
        q: "Tiene algún costo adicional para el cliente una vez que se activa la póliza de seguro?",
        a: "Ninguno. Todo está cubierto e incluido en el pago mensual de 7,9% + IVA.",
      },
      {
        q: "Pueden tasar mi propiedad?",
        a: "En Propins puedes tasar tu propiedad online y 100% gratis. Contamos con un algoritmo propio que toma como referencia más de 60.000 propiedades vigentes.",
      },
      {
        q: "Puedo modificar el plan contratado o incluir servicios adicionales?",
        a: "Puedes modificar el plan contratado e incluir servicios adicionales en todo momento y 100% online. Si prefieres, te puedes contactar al whatsapp de nuestra plataforma para que nuestros ejecutivos te asesoren en todo momento y resuelvan tus dudas. ",
      },
      {
        q: "Qué es el sistema de referidos?",
        a: "El sistema de referidos es una automatización del clásico boca a boca. Sistematizamos este proceso para aumentar por x10 las posibilidades de arrendar tu propiedad. ",
      },
      {
        q: "Quién realiza la entrega de la propiedad?",
        a: "Nosotros nos encargamos de hacer entrega de tu propiedad y de levantar el acta que acredite su cumplimiento.",
      },
      {
        q: "Puedo contratar los servicios de Propins de manera offline?",
        a: "Por supuesto. Lo puedes hacer solicitando que te contacte nuestra jefa de ventas en el whatsapp de la plataforma o a los teléfonos que aparecen al final de nuestra página web. ",
      },
      {
        q: "Qué otros servicios provee Propins?",
        a: "Nuestro propósito es que nuestros clientes puedan tener un servicio integral desde una única plataforma. Por lo mismo hemos concretado alianzas con distintos proveedores relacionados (remodelaciones, arquitectos, pintores, mudanzas, compañías de seguro, etc) que los puedes encontrar en la sección partners y a solo un clic de distancia. ",
      },
    ],
  },
};
