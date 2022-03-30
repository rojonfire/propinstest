import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Collapse,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import icon from "../../utils/images";
import TutorialPopup from "../../components/Popups/TutorialPopup";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class IndexModelo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      open8: false,
      open9: false,
      showTutorialPopup: false,
    };
  }

  togglePopup = () => {
    this.setState({ showTutorialPopup: !this.state.showTutorialPopup });
  };

  componentDidMount() {
    initGA();
    logPageView();
  }

  render() {
    const {
      showTutorialPopup,
      open1,
      open2,
      open3,
      open4,
      open5,
      open6,
      open7,
      open8,
      open9,
      open10,
    } = this.state;
    return (
      <Container fluid="true" className="pa0 bg-light paMobile">
        <TutorialPopup
          show={showTutorialPopup}
          togglePopup={this.togglePopup}
        />
        <Col md="12" className="pa0 paMobile">
          <div className="container-modelo">
            <div className="title-section text-center">
              <h4 className="h4">Modelo Propins</h4>
              <span className="h5">
                “Entregamos todas las herramientas tecnológicas y humanas a los
                propietarios para una venta eficiente y segura de su propiedad
                sin intermediarios.”
              </span>
              <div className="center-cont">
                <div className="col url">
                  <a onClick={this.togglePopup}>
                    <img src={icon.iconPlay} alt="" />
                    Ver video: conoce nuestro Modelo Propins
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Container className="margin-negative">
          <Row>
            <Col md="3" sm="6" className="pabox w-table-100">
              <Card className="shadow card-pa">
                <div className="card-step">
                  <span>1</span>
                </div>
                <Col className="card-img-size">
                  <Card.Img src={icon.imgMod1} />
                </Col>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="transparent">
                    Escoge el plan <strong>Propins</strong> que se acomode a tus
                    necesidades.
                  </ListGroupItem>
                  <ListGroupItem className="transparent">
                    Si lo requieres, puedes contratar servicios adicionales.
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col md="3" sm="6" className="pabox w-table-100">
              <Card className="shadow card-pa">
                <div className="card-step">
                  <span>2</span>
                </div>
                <Col className="card-img-size">
                  <Card.Img src={icon.imgMod2} />
                </Col>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="transparent">
                    Visitamos tu propiedad y la preparamos para hacer el mejor
                    tour virtual 3D que existe en el mercado.
                  </ListGroupItem>
                  <ListGroupItem className="transparent">
                    ¿Necesitas vender algún mueble o accesorio? ¡Nuestros{" "}
                    <strong style={{ color: "green" }}>
                      {" "}
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            Ventanas informativas que describen el producto.
                          </Tooltip>
                        }
                      >
                        <span className="d-inline-block">Pins</span>
                      </OverlayTrigger>
                    </strong>{" "}
                    se encargarán indicando los detalles y precios!
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col md="3" sm="6" className="pabox w-table-100">
              <Card className="shadow card-pa">
                <div className="card-step">
                  <span>3</span>
                </div>
                <Col className="card-img-size">
                  <Card.Img src={icon.imgMod3} />
                </Col>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="transparent">
                    Nos posicionamos en los principales portales inmobiliarios,
                    bases de datos y redes sociales.
                  </ListGroupItem>
                  <ListGroupItem className="transparent">
                    Encontramos a los mejores candidatos para tu propiedad y, si
                    quieres, tú mismo puedes mostrarla.
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col md="3" sm="6" className="pabox w-table-100">
              <Card className="shadow card-pa">
                <div className="card-step">
                  <span>4</span>
                </div>
                <Col className="card-img-size">
                  <Card.Img src={icon.imgMod4} />
                </Col>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="transparent">
                    Recibe ofertas en línea 24/7, nosotros negociaremos el mejor
                    precio para ti.
                  </ListGroupItem>
                  <ListGroupItem className="transparent">
                    Nos encargamos de TODO! Redacción de contratos,
                    antecedentes, notarías, firmas, inventarios y entregas.
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <section id="questions" className="section-space">
          <Container>
            <div className="cont-collapse-preguntas">
              <div className="title-section text-center">
                <h4 className="h4">Preguntas Frecuentes</h4>
              </div>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open1: !open1 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open1}
                  className="backgroud-color-transparent"
                >
                  1. ¿Por qué el nombre Propins?
                </Button>
                <Collapse in={this.state.open1}>
                  <div id="example-collapse-text">
                    <p>
                      La marca Propins, es el resultado de la combinación de
                      palabras Property y Pin, esta última referida al ícono
                      universal de ubicación y, en este caso, además hace
                      referencia a las ventanas informativas de precios y
                      características de objetos que se requieran vender.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open2: !open2 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open2}
                  className="backgroud-color-transparent"
                >
                  2. ¿Cuánto cuesta el servicio Propins?
                </Button>
                <Collapse in={this.state.open2}>
                  <div id="example-collapse-text">
                    <p>
                      Sólo UF 55 + IVA en el caso que vendamos tu propiedad;
                      independiente del valor de la misma. En el caso que
                      quieras arrendarla UF 10 + IVA independiente cual sea el
                      valor de tu arriendo. Puedes ver el detalle en nuestra
                      sección Planes.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open3: !open3 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open3}
                  className="backgroud-color-transparent"
                >
                  3. ¿Cómo sé cuánto vale mi propiedad?
                </Button>
                <Collapse in={this.state.open3}>
                  <div id="example-collapse-text">
                    <p>
                      ¡Te ayudamos! En Propins contamos con el mejor servicio de
                      tasación online del mercado, a un precio insuperable para
                      nuestros clientes.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open4: !open4 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open4}
                  className="backgroud-color-transparent"
                >
                  4. ¿Se debe pagar por el tour virtual 3D?
                </Button>
                <Collapse in={this.state.open4}>
                  <div id="example-collapse-text">
                    <p>
                      ¡No, nada! Realizamos el tour virtual N°1 del mercado
                      totalmente GRATIS.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open5: !open5 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open5}
                  className="backgroud-color-transparent"
                >
                  5. ¿Quién muestra mi propiedad?
                </Button>
                <Collapse in={this.state.open5}>
                  <div id="example-collapse-text">
                    <p>
                      ¡Tú mismo! Eres el que mejor conoce tu propiedad y
                      entorno. Si no te acomoda, ¡no hay problema!, En Propins
                      tenemos anfitriones preparados para hacerlo por ti.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open6: !open6 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open6}
                  className="backgroud-color-transparent"
                >
                  6. ¿Cómo sé quién viene a visitar mi propiedad?
                </Button>
                <Collapse in={this.state.open6}>
                  <div id="example-collapse-text">
                    <p>
                      ¡Tranquilo/a, Propins tiene todo bajo control! Enviaremos
                      a tu dispositivo móvil los datos del cliente interesado
                      previamente, lo corroboraremos con nuestros sistemas de
                      identificación y seguridad.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open7: !open7 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open7}
                  className="backgroud-color-transparent"
                >
                  7. ¿Quién se encarga de la negociación?
                </Button>
                <Collapse in={this.state.open7}>
                  <div id="example-collapse-text">
                    <p>
                      En Propins validamos cada una de las ofertas que reciba tu
                      propiedad y negociamos el mejor precio para ti. Nuestro
                      objetivo es que puedas tomar la mejor decisión.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open8: !open8 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open8}
                  className="backgroud-color-transparent"
                >
                  8. ¿Quién se encarga de la documentación?
                </Button>
                <Collapse in={this.state.open8}>
                  <div id="example-collapse-text">
                    <p>En Propins nos encargamos completamente de TODO.</p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open9: !open9 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open9}
                  className="backgroud-color-transparent"
                >
                  9. ¿Qué puedo hacer con los muebles o artefactos que ya no voy
                  a necesitar?
                </Button>
                <Collapse in={this.state.open9}>
                  <div id="example-collapse-text">
                    <p>
                      ¡No te preocupes! Nuestros pins te ayudarán indicando los
                      detalles y precios de tus productos para que tus
                      potenciales compradores o arrendatarios se queden con
                      ellos.
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
              <ListGroup className="border-bottom">
                <Button
                  onClick={() => this.setState({ open10: !open10 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open10}
                  className="backgroud-color-transparent"
                >
                  10. Si no venden o arriendan mi propiedad, ¿me cobran algo?
                </Button>
                <Collapse in={this.state.open10}>
                  <div id="example-collapse-text">
                    <p>
                      Por supuesto que no, solo te cobramos si vendemos o
                      arrendamos tu propiedad y una vez finalizado el proceso
                    </p>
                  </div>
                </Collapse>
              </ListGroup>
            </div>
          </Container>
        </section>
      </Container>
    );
  }
}

IndexModelo = connect(null, null)(IndexModelo);

export default IndexModelo;
