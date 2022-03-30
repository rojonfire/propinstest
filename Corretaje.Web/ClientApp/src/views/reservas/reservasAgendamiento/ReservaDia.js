import React, { Component } from "react";
import { Container, Card, Row } from "react-bootstrap";

import api from "../../../api";
import icon from "../../../utils/images";
import config from "./ConfigDays";

export class ReservaDia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonFirts: [],
      show: false,
    };
  }

  componentDidMount = async () => {
    const bloques = await api.apiGetAgendaFotografo();
    console.log(bloques)
    this.setState({
      buttonFirts: config.firts3Button(this.changeDay, bloques.data),
    });
  };

  changeDay = (day, bloques) => {
    this.props.changeStep(day, bloques, this.props.nextStep);
  };

  render() {
    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Card className="text-center">
            <Card.Body className="pa0">
              <Card.Img variant="top" src={icon.imgCalendar} />
              <Card.Title>
                {" "}
                <div className="title-section text-center">
                  <h4 className="h4">Agendar día de visita</h4>
                </div>
              </Card.Title>
              <Card.Text>
                {this.state.buttonFirts.length > 0 &&
                  "Seleccione un día disponible para ir a visitar tu propiedad"}
              </Card.Text>
              <Row>
                <div className="pa0 col-md-4 col-sm-12 center">
                  <div className="cont-btn">{this.state.buttonFirts}</div>
                </div>
              </Row>
              {this.state.buttonFirts.length <= 0 && (
                <Row>
                  <div className="pa0 col-md-4 col-sm-12 center">
                    <div className="cont-text">
                      No hay dias cargados aun por nuestros fotografos, intenta
                      mas tarde.
                    </div>
                  </div>
                </Row>
              )}
            </Card.Body>
          </Card>
        </section>
      </Container>
    );
  }
}

export default ReservaDia;
