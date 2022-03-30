import React from "react";
import { Container, Col, Collapse, Button } from "react-bootstrap";
import icon from "../../utils/images";

class ComodiadesPropiedad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open2: false,
    };
  }

  render() {
    const { open2 } = this.state;
    const { propiedad } = this.props;

    return (
      <Container className="pa0 pa-mobile">
        <Col sm={12} className="pa0 paMobile">
          <div className="cont-collapse-preguntas caracteristicas border-bottom">
            <Button
              onClick={() => this.setState({ open2: !open2 })}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
              className="backgroud-color-transparent"
            >
              <h6>Comodidades de la propiedad</h6>
            </Button>
            <Collapse in={open2}>
              <ul className="cont-dependencias row">
                {propiedad &&
                  propiedad.data &&
                  propiedad.data.propCar.salaDeEstar && (
                    <li>
                      <img src={icon.iconLiving} alt="" />
                      <span>Sala de estar</span>
                    </li>
                  )}
                {propiedad &&
                  propiedad.data &&
                  propiedad.data.propCar.calefaccion && (
                    <li>
                      <img src={icon.iconCalefaccion} alt="" />
                      <span>
                        Calefacción{" "}
                        {propiedad && propiedad.data
                          ? propiedad.data.propCar.calefaccion
                          : ""}
                      </span>
                    </li>
                  )}
                {propiedad && propiedad.data && propiedad.data.propCar.alarma && (
                  <li>
                    <img src={icon.iconAlarm} alt="" />
                    <span>Alarma</span>
                  </li>
                )}
                {propiedad &&
                  propiedad.data &&
                  propiedad.data.propCar.escritorio && (
                    <li>
                      <img src={icon.iconDesk} alt="" />
                      <span>Escritorio</span>
                    </li>
                  )}
                {propiedad && propiedad.data && propiedad.data.propCar.logia && (
                  <li>
                    <img src={icon.iconLogia} alt="" />
                    <span>Logia</span>
                  </li>
                )}
                {propiedad &&
                  propiedad.data &&
                  propiedad.data.propCar.portonAut && (
                    <li>
                      <img src={icon.iconPorton} alt="" />
                      <span>Portón automático</span>
                    </li>
                  )}
                {propiedad &&
                  propiedad.data &&
                  propiedad.data.propCar.cocinaAmo && (
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
