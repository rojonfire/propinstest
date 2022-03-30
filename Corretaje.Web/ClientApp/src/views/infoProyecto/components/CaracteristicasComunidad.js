import React from "react";
import { Container, Col, Collapse, Button } from "react-bootstrap";
import icon from "../../../utils/images";

class CaracteristicasComunidad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open1: false,
    };
  }
  render() {
    const { open1 } = this.state;
    const { proyecto } = this.props;

    return (
      <Container className="pa0 pa-mobile">
        <Col sm={12} className="pa0 paMobile">
          <div className="cont-collapse-preguntas caracteristicas-proyecto border-bottom">
            <Button
              onClick={() => this.setState({ open1: !open1 })}
              aria-controls="example-collapse-text"
              aria-expanded={open1}
              className="backgroud-color-transparent"
            >
              <h6>Características de la comunidad</h6>
            </Button>
            <Collapse in={open1}>
              <ul className="cont-dependencias-proyecto row">
                {proyecto &&
                  proyecto.carCom &&
                  proyecto.carCom.accesoControlado && (
                    <li>
                      <img src={icon.iconConserje} alt="" />
                      <span>Acceso controlado</span>
                    </li>
                  )}
                {proyecto && proyecto.carCom && proyecto.carCom.estVisita && (
                  <li>
                    <img src={icon.iconParkingVisita} alt="" />
                    <span>Estacionamiento visitas</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.portonElec && (
                  <li>
                    <img src={icon.iconPortonElectrico} alt="" />
                    <span>Portón eléctrico</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.salonDeJuegos && (
                  <li>
                    <img src={icon.iconGameRoom} alt="" />
                    <span>Sala de juegos</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.areasVerdes && (
                  <li>
                    <img src={icon.iconAireLibre} alt="" />
                    <span>Áreas verdes</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.quincho && (
                  <li>
                    <img src={icon.iconQuincho} alt="" />
                    <span>Quincho</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.sauna && (
                  <li>
                    <img src={icon.iconSauna} alt="" />
                    <span>Sauna</span>
                  </li>
                )}
                {proyecto &&
                  proyecto.carCom &&
                  proyecto.carCom.camaraSeguridad && (
                    <li>
                      <img src={icon.iconSecurityCamera} alt="" />
                      <span>Cámaras de seguridad</span>
                    </li>
                  )}
                {proyecto && proyecto.carCom && proyecto.carCom.salaDeCine && (
                  <li>
                    <img src={icon.iconCinema} alt="" />
                    <span>Sala de cine</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.citofono && (
                  <li>
                    <img src={icon.iconCitofono} alt="" />
                    <span>Citófono</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.juegosInf && (
                  <li>
                    <img src={icon.iconResbalin} alt="" />
                    <span>Juegos infantiles</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.piscina && (
                  <li>
                    <img src={icon.iconPiscina} alt="" />
                    <span>Piscina</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.salaDeEventos && (
                  <li>
                    <img src={icon.iconPiscina} alt="" />
                    <span>Sala de eventos</span>
                  </li>
                )}
                {proyecto && proyecto.carCom && proyecto.carCom.bicicletros && (
                  <li>
                    <img src={icon.iconBicicleros} alt="" />
                    <span>Bicicleros</span>
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

export default CaracteristicasComunidad;
