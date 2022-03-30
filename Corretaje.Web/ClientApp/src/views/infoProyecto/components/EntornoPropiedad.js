/** @format */

import React from 'react';
import { Container, Col, Collapse, Button } from 'react-bootstrap';
import icon from '../../../utils/images';

class EntornoPropiedad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open3: false
    };
  }
  render() {
    const { open3 } = this.state;

    const { locales } = this.props;

    const stylo = { width: 28, height: 28 };

    return (
      <Container className="pa0 pa-mobile">
        <Col sm={12} className="pa0 paMobile">
          <div className="cont-collapse-preguntas caracteristicas-proyecto">
            <Button
              onClick={() => this.setState({ open3: !open3 })}
              aria-controls="example-collapse-text"
              aria-expanded={open3}
            >
              <h6>Entorno del proyecto</h6>
            </Button>
            <Collapse in={open3}>
              <ul className="cont-dependencias-proyecto row">
                {locales.bank && (
                  <li>
                    <img style={stylo} src={icon.iconBanco} alt="" />
                    <span>Bancos</span>
                  </li>
                )}

                {locales.hospital && (
                  <li>
                    <img style={stylo} src={icon.hospital} alt="" />
                    <span>Consultorios médicos</span>
                  </li>
                )}

                {locales.park && (
                  <li>
                    <img style={stylo} src={icon.iconAireLibre} alt="" />
                    <span>Otros lugares al aire libre</span>
                  </li>
                )}
                {(locales.restaurant || locales.food) && (
                  <li>
                    <img style={stylo} src={icon.restoran} alt="" />
                    <span>Restaurantes</span>
                  </li>
                )}
                {(locales.store ||
                  locales.clothing_store ||
                  locales.home_goods_store) && (
                  <li>
                    <img style={stylo} src={icon.supermercado} alt="" />
                    <span>Supermercado</span>
                  </li>
                )}
                {locales.cafe && (
                  <li>
                    <img style={stylo} src={icon.cafe} alt="" />
                    <span>Cafeteria</span>
                  </li>
                )}

                {locales.embassy && (
                  <li>
                    <img style={stylo} src={icon.bandera} alt="" />
                    <span>Embajadas</span>
                  </li>
                )}

                {locales.florist && (
                  <li>
                    <img style={stylo} src={icon.flores} alt="" />
                    <span>Floreria</span>
                  </li>
                )}

                {locales.shopping_mall && (
                  <li>
                    <img style={stylo} src={icon.iconComercio} alt="" />
                    <span>Centros comerciales</span>
                  </li>
                )}

                {(locales.travel_agency || locales.tourist_attraction) && (
                  <li>
                    <img style={stylo} src={icon.hotel} alt="" />
                    <span>Turismo o Hoteles</span>
                  </li>
                )}

                {(locales.zoo || locales.spa || locales.museum) && (
                  <li>
                    <img style={stylo} src={icon.iconEntretenimiento} alt="" />
                    <span>Entretenimiento general</span>
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

export default EntornoPropiedad;
