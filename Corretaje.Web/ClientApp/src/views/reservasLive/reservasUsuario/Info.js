import React, { Component } from "react";
import { Container, Row, Card } from "react-bootstrap";
import api from "../../../api";
import config from "./ConfigDays";
import visitaPropiedad from "../../../assets/img/visita-propiedad.svg";

export class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonFirts: [],
    };
  }

  componentDidMount = async () => {
    const { proyectoId } = this.props;
    console.log("proyectoId info:", proyectoId)
    let bloques;
    if (proyectoId === undefined || proyectoId === null || proyectoId === "") {
      let proyectoIdUnidef = window.location.href.split("reserva-usuario/")[1].split("/")[1];
      bloques = await api.apiGetAgendaAllBLoquesProyecto(proyectoIdUnidef);
    } else {
      bloques = await api.apiGetAgendaAllBLoquesProyecto(proyectoId);
    }
    if (bloques && bloques.data && bloques.data.length !== 0) {
      this.setState({
        buttonFirts: config.firts3Button(this.changeDay, bloques.data[0]),
      });
    }
  };

  changeDay = (day, bloques) => {
    this.props.changeStep(day, bloques, this.props.nextStep);
  };

  render() {
    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Container>
            <Card className="text-center">
              <Card.Body className="pa0">
                <Card.Img variant="top" src={visitaPropiedad} />
                <Card.Title>
                  {" "}
                  <div className="title-section text-center">
                    {/*<h4 className="h4"/>*/}
                  </div>
                </Card.Title>
                <Card.Text>
                  {this.state.buttonFirts.length > 0 &&
                    "Seleccione un día para su visita virtual"}
                </Card.Text>
                <Row>
                  <div className="pa0-proyectos col-md-4 col-sm-12 center">
                    <div className="cont-btn">{this.state.buttonFirts}</div>
                  </div>
                </Row>
                {this.state.buttonFirts.length <= 0 && (
                  <Row>
                    <div className="pa0-proyectos col-md-4 col-sm-12 center">
                      <div className="cont-text">
                        No hay horarios cargados aun por nuestro cliente,
                        intenta más tarde.
                      </div>
                    </div>
                  </Row>
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
