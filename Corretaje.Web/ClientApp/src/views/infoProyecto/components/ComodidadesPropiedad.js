import React from "react";
import { Container, Col, Collapse, Button } from "react-bootstrap";
import icon from "../../../utils/images";

class ComodiadesPropiedad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open2: false,
    };
  }
  render() {
    const { open2 } = this.state;
    const { proyecto } = this.props;

    return (
      <Container className="pa0 pa-mobile">
        <Col sm={12} className="pa0 paMobile">
          <div className="cont-collapse-preguntas caracteristicas-proyecto border-bottom">
            <Button
              onClick={() => this.setState({ open2: !open2 })}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
            >
              <h6>Comodidades del proyecto</h6>
            </Button>
            <Collapse in={open2}>
              <ul className="cont-dependencias-proyecto row">
                {proyecto &&
                  proyecto.proyCar.salaDeEstar && (
                    <li>
                      <img src={icon.iconLiving} alt="" />
                      <span>Sala de estar</span>
                    </li>
                  )}
                {proyecto &&
                  proyecto.proyCar.calefaccion && (
                    <li>
                      <img src={icon.iconCalefaccion} alt="" />
                      <span>
                        Calefacción:{" "}
                        {proyecto && proyecto
                          ? proyecto.proyCar.calefaccion
                          : ""}
                      </span>
                    </li>
                  )}
                {proyecto && proyecto.proyCar && proyecto.proyCar.alarma && (
                  <li>
                    <img src={icon.iconAlarm} alt="" />
                    <span>Alarma</span>
                  </li>
                )}
                {proyecto &&
                  proyecto.proyCar.cocinaAmo && (
                    <li>
                      <img src={icon.iconCocina} alt="" />
                      <span>Cocina amoblada</span>
                    </li>
                  )}
              </ul>
            </Collapse>
          </div>
        </Col>
      </Container>
    );
  }
}

export default ComodiadesPropiedad;
