import React, { Component } from "react";
import { Container, Row, Card, Spinner } from "react-bootstrap";
import config from "./ConfigDays";
import icon from "../../../utils/images";

export class Info extends Component {
  changeDay = (day, bloques) => {
    this.props.changeStep(day, bloques, this.props.nextStep);
  };

  render() {
    let buttons = [];
    const bloques = this.props.agendaCliente;
    if (bloques && bloques.data) {
      buttons = config.firts3Button(this.changeDay, bloques.data);
    }

    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Container>
            <Card className="text-center">
              <Card.Body className="pa0">
                <Card.Img variant="top" src={icon.imgCalendar} />
                <Card.Title>
                  {" "}
                  <div className="title-section text-center">
                    <h4 className="h4">Agendar día de visita</h4>
                  </div>
                </Card.Title>
                {this.props.hasBroker ? (
                  <div>
                    {this.props.requestState === "LOADING" && (
                      <div className="text-center">
                        <Spinner animation="border" />
                      </div>
                    )}

                    {buttons.length > 0 &&
                      this.props.requestState !== "LOADING" && (
                        <div>
                          <Card.Text>
                            Seleccione un día disponible para ir a visitar tu
                            propiedad
                          </Card.Text>
                          <Row>
                            <div className="pa0 col-md-4 col-sm-12 center">
                              <div className="cont-btn marginbtnagenda">
                                {buttons}
                              </div>
                            </div>
                          </Row>
                        </div>
                      )}

                    {buttons.length <= 0 &&
                      this.props.requestState !== "LOADING" && (
                        <Row>
                          <div className="pa0 col-md-4 col-sm-12 center">
                            <div className="cont-text">
                              No hay horarios cargados aun por nuestro cliente,
                              intenta mas tarde.
                            </div>
                          </div>
                        </Row>
                      )}
                  </div>
                ) : (
                  <div>
                    <Row>
                      <div className="pa0 col-md-4 col-sm-12 center">
                        <div className="cont-text">
                          Esta propiedad aún no tiene un broker asignado. Si
                          estás interesado en agendar una visita, contáctanos
                          por Whatsapp.
                        </div>
                      </div>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Container>
        </section>
      </Container>
    );
  }
}

export default Info;
