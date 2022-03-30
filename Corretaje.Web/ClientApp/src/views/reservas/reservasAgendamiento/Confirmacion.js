import React, { Component } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import icon from "../../../utils/images";
import moment from "moment";

export class Confirmacion extends Component {

  render() {
    const { diaReserva, tramoReserva } = this.props;
    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Card className="text-center">
            <Card.Body className="pa0">
              <Card.Img variant="top" src={icon.imgMail} />
              <Card.Title>
                {" "}
                <div className="title-section text-center">
                  <h4 className="h4">Tu visita está agendada</h4>
                </div>
              </Card.Title>
              <Card.Text>
                Enviaremos un mail a tu correo con la confirmación de la visita
                con nuestro fotógrafo 3D para el día{" "}
                <strong>
                  {moment(diaReserva).format("LL")} {tramoReserva}
                </strong>
              </Card.Text>
              <LinkContainer to={"/"}>
                <Button variant="primary">VOLVER AL HOME</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </section>
      </Container>
    );
  }
}

export default Confirmacion;
