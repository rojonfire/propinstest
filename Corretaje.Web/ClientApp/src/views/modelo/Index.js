import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import icon from "../../utils/images";
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
    document.querySelector("body").scrollTo(0, 0);
  }

  render() {
    return (
      <Container className="pa0 section-space-p1ex ">
        <Container className="pa0  bg-light3 paMobile">
          <Row>
            <Container className="pa01 ">
              <div className=" row ornament">
                <div className="col-sm-12 col-md-3 pa2 w-table-100">
                  <Card className="card-quienes pa01 ">
                    <Card.Body className="section-mobilee">
                      <Card.Title className="text-center center letra-quienes3">
                        ¿Quiénes somos?
                      </Card.Title>
                      <Card.Text className="parr-quienes parr-quienes-mov">
                        Somos una empresa tecnológica enfocada en el desarrollo
                        de soluciones digitales y estrategias de innovación para
                        el rubro inmobiliario.
                      </Card.Text>

                      <Card.Title className="letra-quienes2 text-center">
                        ¿Por qué?
                      </Card.Title>
                      <Card.Text className="parr-quienes2 parr-quienes-mov2 ">
                        Queremos democratizar la venta de propiedades a través
                        de la tecnología, con el propósito de dinamizar su
                        demanda y crear oportunidades de ingresos para todos.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-sm-9 pa1 foto-quienes">
                  <div className="cont-foto-home ">
                    <img src={icon.imgQuienes} alt="" />
                  </div>
                </div>
              </div>
            </Container>
          </Row>
        </Container>

        <Container className="pa0 center paMobile ipad-pro-noso">
          <Row className="marginrow center">
            <Col className="inline-block w-mobile-100 pabox w-table-100">
              <Container className="pa01 color-noso ">
                <br />
                <Card.Title className="letra-quienes text-center lqipad-pro">
                  Nuestros Valores
                </Card.Title>
                <Row className="center hideMOBILE">
                  <Col className="inline-block pabox w-table-100 ">
                    <Card className="text-center transparent card-mobileecard-mobilee card-mobile123 card-table">
                      <div className="icon-item2">
                        <Card.Img
                          className="mas-peque-foto-quien"
                          variant="top"
                          src={icon.Nosotros1}
                        />
                      </div>
                      <br />
                      <Card.Title className="text-primary2 pa0">
                        Innovación
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className=" texto-valores transparent">
                          Tomamos riesgos generando y explorando ideas que
                          entreguen valor.
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col className="inline-block w-mobile-100 pabox w-table-100">
                    <Card className="text-center transparent card-mobilee card-mobile123  card-table">
                      <div className="icon-item2">
                        <Card.Img
                          className="mas-peque-foto-quien"
                          variant="top"
                          src={icon.Nosotros2}
                        />
                      </div>
                      <br />
                      <Card.Title className="text-primary2 pa0">
                        Transparencia
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className="texto-valores transparent">
                          Ocupamos nuestra tecnología para entregar información
                          real y a tiempo.
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col className="inline-block w-mobile-100 pabox w-table-100">
                    <Card className="text-center transparent card-mobilee card-mobile123  card-table">
                      <div className="icon-item2">
                        <Card.Img
                          className="mas-peque-foto-quien"
                          variant="top"
                          src={icon.Nosotros3}
                        />
                      </div>
                      <br />
                      <Card.Title className="text-primary2 pa0">
                        Colaboración
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className="texto-valores transparent">
                          Creemos que la cooperación es el camino para generar
                          bienestar en nuestro entorno.
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col className="inline-block w-mobile-100 pabox w-table-100">
                    <Card className="text-center transparent card-mobilee card-mobile123 card-table">
                      <div className="icon-item2">
                        <Card.Img
                          className="mas-peque-foto-quien"
                          variant="top"
                          src={icon.Nosotros4}
                        />
                      </div>
                      <br />
                      <Card.Title className="text-primary2 pa0">
                        Impacto Social
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className="texto-valores transparent">
                          Creamos oportunidades de ingresos para todas y todos.
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col className="inline-block w-mobile-100 pabox w-table-100">
                    <Card className="text-center transparent card-mobilee card-mobile123 card-table">
                      <div className="icon-item2">
                        <Card.Img
                          className="mas-peque-foto-quien"
                          variant="top"
                          src={icon.Nosotros5}
                        />
                      </div>
                      <br />
                      <div className="loyo">
                        <Card.Title className="text-primary2 pa0">
                          Aprendizaje
                        </Card.Title>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem className="texto-valores transparent">
                            Revisamos continuamente lo que hacemos y aprendemos
                            de nuestros aciertos y errores.
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row className="hideWEB2 section-space-p1ex  center text-center">
                  <Row className="center text-center">
                    <Col className="nuestrosval center text-center">
                      Nuestros Valores
                    </Col>
                  </Row>

                  <Card className="text-center center transparent card-mobilee card-mobile123 card-table">
                    <div className="icon-item2">
                      <Card.Img
                        className="mas-peque-foto-quien"
                        variant="top"
                        src={icon.Nosotros1}
                      />
                    </div>
                    <br />
                    <Card.Title className="text-primary2 pa0">
                      Innovación
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className=" texto-valores transparent">
                        Tomamos riesgos generando y explorando ideas que
                        entreguen valor.
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                  <Card className="center text-center transparent card-mobilee card-mobile123  card-table">
                    <div className="icon-item2">
                      <Card.Img
                        className="mas-peque-foto-quien"
                        variant="top"
                        src={icon.Nosotros2}
                      />
                    </div>
                    <br />
                    <Card.Title className="text-primary2 pa0">
                      Transparencia
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className="texto-valores transparent">
                        Ocupamos nuestra tecnología para entregar información
                        real y a tiempo.
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                  <Card className=" center text-center transparent card-mobilee card-mobile123  card-table">
                    <div className="icon-item2">
                      <Card.Img
                        className="mas-peque-foto-quien"
                        variant="top"
                        src={icon.Nosotros3}
                      />
                    </div>
                    <br />
                    <Card.Title className="text-primary2 pa0">
                      Colaboración
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className="texto-valores transparent">
                        Creemos que la cooperación es el camino para generar
                        bienestar en nuestro entorno.
                      </ListGroupItem>
                    </ListGroup>
                  </Card>

                  <Card className="center text-center transparent card-mobilee card-mobile123 card-table">
                    <div className="icon-item2">
                      <Card.Img
                        className="mas-peque-foto-quien"
                        variant="top"
                        src={icon.Nosotros4}
                      />
                    </div>
                    <br />
                    <Card.Title className="text-primary2 pa0">
                      Impacto social
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className="texto-valores transparent">
                        Creamos oportunidades de ingresos para todas y todos.
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                  <Card className="center text-center transparent card-mobilee card-mobile123 card-table">
                    <div className="icon-item2">
                      <Card.Img
                        className="mas-peque-foto-quien"
                        variant="top"
                        src={icon.Nosotros5}
                      />
                    </div>
                    <br />
                    <div className="loyo">
                      <Card.Title className="text-primary2 pa0">
                        Aprendizaje
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className="texto-valores transparent">
                          Revisamos continuamente lo que hacemos y aprendemos de
                          nuestros aciertos y errores.
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  </Card>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

IndexModelo = connect(null, null)(IndexModelo);

export default IndexModelo;
