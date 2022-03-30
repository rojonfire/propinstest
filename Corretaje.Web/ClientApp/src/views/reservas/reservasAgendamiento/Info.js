import React, { Component } from "react";
import { Container, Button, Card } from "react-bootstrap";

import icon from "../../../utils/images";

export class Info extends Component {
  render() {
    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Card className="text-center">
            <Card.Body className="pa0">
              <Card.Img variant="top" src={icon.icon360Foto} />
              <Card.Title>
                {" "}
                <div className="title-section text-center">
                  <h4 className="h4">
                    Agenda y reserva visita con fotógrafo(a)
                  </h4>
                </div>
              </Card.Title>
              <Card.Text>
                Nuestros fotógrafos 3D captura todo el interior de tu propiedad,
                haz clic en agendar hora
              </Card.Text>
              <Button size="lg" variant="primary" onClick={this.props.nextStep}>
                AGENDAR HORA
              </Button>
            </Card.Body>
          </Card>
        </section>
      </Container>
    );
  }
}

export default Info;
