import React, { Component } from "react";
import { Container, Card, Button } from "react-bootstrap";
import icon from "../../../utils/images";
import moment from "moment";
import "moment/locale/es";

export class Confirmacion extends Component {
  render() {
    const { diaReserva, tramoReserva } = this.props;

    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Container>
            <Card className="text-center">
              <Card.Body className="pa0">
                <Card.Img variant="top" src={icon.imgMail} />
                <Card.Title>
                  <div className="title-section text-center">
                    <h4 className="h4">Tu visita está agendada</h4>
                  </div>
                </Card.Title>
                <Card.Text>
                  Enviaremos un mail a tu correo con la confirmación de la
                  visita para el día <br />
                  <strong>
                    {moment(diaReserva).format("LL")} {tramoReserva}
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </section>
      </Container>
    );
  }
}

export default Confirmacion;
