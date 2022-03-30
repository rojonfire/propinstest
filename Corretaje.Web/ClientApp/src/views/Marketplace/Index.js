import React from "react";
import { connect } from "react-redux";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
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
initGA();
logPageView();
document.querySelector("body").scrollTo(0, 0);
export class Marketplace extends React.Component {
  render() {
    return (
      <Container fluid="true" className="pa0 paMobile">
        <section className="bg-light section-space">
          <Container>
            <div className="title-section text-center">
              <h4 className="h4">Partners</h4>
              <span className="h5">
                Conoce los servicios de nuestros partners
              </span>
            </div>
            <Row>
              <Col md="3" className="pabox w-table-100">
                <Card className="shadow marketplace">
                  <div className="cont-foto">
                    <Card.Img variant="top" src={icon.mudangoPortada} />
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <Card.Img
                        className="logos"
                        variant="top"
                        src={icon.mudangologo}
                      />
                    </Card.Title>
                    <Card.Text>
                      Mudarse nunca fue tan fácil. <br />
                      Más simple, más transparente y menos estresante.
                    </Card.Text>
                    <a
                      href="https://www.mudango.com/bot/moving?ref=propins"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary">Conocer más</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className="pabox w-table-100">
                <Card className="shadow marketplace">
                  <div className="cont-foto">
                    <Card.Img variant="top" src={icon.arenasPortada} />
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <Card.Img
                        className="logos"
                        variant="top"
                        src={icon.arenaslogo}
                      />
                    </Card.Title>
                    <Card.Text>Tasaciones online, por expertos</Card.Text>
                    <a
                      href="https://cl.acnet.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary">Conocer más</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className="pabox w-table-100">
                <Card className="shadow marketplace">
                  <div className="cont-foto">
                    <Card.Img variant="top" src={icon.rematimePortada} /> {""}
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <Card.Img
                        className="logos"
                        variant="top"
                        src={icon.rematimelogo}
                      />
                    </Card.Title>
                    <Card.Text>
                      Muebles e iluminación de diseño a través de un nuevo
                      sistema de comercio online.
                    </Card.Text>
                    <a
                      href="https://my.matterport.com/show/?m=ZXSS8CfEnyi&brand=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary">Conocer más</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className="pabox w-table-100">
                <Card className="shadow marketplace">
                  <div className="cont-foto">
                    <Card.Img variant="top" src={icon.neatPortada} /> {""}
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <Card.Img
                        className="small-size-logo"
                        variant="top"
                        src={icon.neatlogo}
                      />
                    </Card.Title>
                    <Card.Text>
                      Paga tu arriendo con tarjeta de crédito y usa sus
                      beneficios.
                    </Card.Text>
                    <a
                      href="https://neat.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary">Conocer más</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    );
  }
  componentDidMount() {
    initGA();
    logPageView();
  }
}

export default Marketplace;
