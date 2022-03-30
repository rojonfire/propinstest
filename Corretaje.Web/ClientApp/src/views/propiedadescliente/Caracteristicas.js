import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import AccountSidebar from "../../components/AccountSidebar";
import utilfunc from "../../utils/utilsFunc";
import { connect } from "react-redux";
import { fetchGetUF } from "../../action";
import { Row, Col } from "antd";

class Caracteristicas extends React.Component {
  constructor(props) {
    super(props);
    const {
      valor,
      tipoPrecio,
      direccion,
      direccion2,
      comuna,
      tipoPropiedad,
      anoConstruccion,
      dormitorios,
      banos,
      metrosUtiles,
      metrosTotales,
      codigoPropiedad,
      estado,
    } = this.props.location.state;
    this.state = {
      valor,
      tipoPrecio,
      direccion,
      direccion2,
      comuna,
      tipoPropiedad,
      anoConstruccion,
      dormitorios,
      banos,
      metrosUtiles,
      metrosTotales,
      codigoPropiedad,
      estado,
    };
    const { getUf } = this.props;
    getUf();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }

  render() {
    const {
      valor,
      tipoPrecio,
      direccion,
      direccion2,
      comuna,
      tipoPropiedad,
      anoConstruccion,
      dormitorios,
      banos,
      metrosUtiles,
      metrosTotales,
      codigoPropiedad,
      estado,
    } = this.state;

    const { uf } = this.props;
    let valorUf = 0;
    if (uf) {
      valorUf = parseFloat(uf.replace(".", "").replace(",", "."));
    } else {
      valorUf = 31180;
    }
    

    let valorEnUF = 0;
    let valorEnCLP = 0;
    
    if (tipoPrecio == "CLP") {
      valorEnUF = utilfunc.formatToThousandSeparator(
        Math.round(valor / valorUf)
      );
      valorEnCLP = utilfunc.formatToThousandSeparator(valor);
    } else {
      valorEnUF = utilfunc.formatToThousandSeparator(valor);
      valorEnCLP = utilfunc.formatToThousandSeparator(
        Math.trunc(valor * valorUf)
      );
    }    

    return (
      <div className="fondo-perfil">
        <AccountSidebar />
        <Row justify="start">
          <Col xs={5} sm={5} md={5} lg={6} xl={6} />
          <Col xs={18} sm={18} md={16} lg={13} xl={9}>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 className="mt-4">
                  Propiedad {direccion !== null ? direccion : direccion2}
                </h2>
              </Col>
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardGroup>
                  <Card>
                    <Card.Body className="card-carct-perfil-status">
                      <Card.Title className="mb-0">
                        <span className="profile-card-subtitle">
                          STATUS PROPIEDAD
                        </span>                        
                      </Card.Title>
                      <p className="comfortaa-font">
                        {utilfunc.getNombreEstadoPropiedad(estado)}
                      </p>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body className="card-carct-perfil-status">
                      <Card.Title>
                        <span className="profile-card-subtitle">VALOR</span>
                      </Card.Title>
                      <Card.Text>
                        <p className="fondo-valorplan">UF {valorEnUF}</p>
                        <div>{valorEnCLP} CLP</div>
                      </Card.Text>
                    </Card.Body> 
                  </Card>
                </CardGroup>
              </Col>  
            </Row>
            <Row justify="start">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardGroup>
                  <Card>
                    <Card.Body className="card-carct-perfil">
                      <Row justify="space-between" className="mb-3">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              DIRECCION
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">
                            {`${ direccion !== null ? direccion : direccion2 }, ${comuna}`}
                          </p>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              TIPO DE PROPIEDAD
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">{tipoPropiedad}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              AÑO DE CONSTRUCCIÓN
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">{anoConstruccion}</p>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">DORMITORIOS</span>
                          </Card.Title>
                          <p className="comfortaa-font">{dormitorios}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">BAÑOS</span>
                          </Card.Title>
                          <p className="comfortaa-font">{banos}</p>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              METROS ÚTILES
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">{metrosUtiles}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-3">
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              METROS TOTALES
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">{metrosTotales}</p>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Card.Title className="mb-0">
                            <span className="profile-card-subtitle">
                              CÓDIGO PROPIEDAD
                            </span>
                          </Card.Title>
                          <p className="comfortaa-font">{codigoPropiedad}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Col>
            </Row>            
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  uf: state.app.uf,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
});

Caracteristicas = connect(mapStateToProps, mapDispatchToProps)(Caracteristicas);

export default Caracteristicas;
