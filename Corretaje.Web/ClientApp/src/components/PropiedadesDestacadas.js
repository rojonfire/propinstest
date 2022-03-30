import React, { Component } from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import icon from "../utils/images";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGetPropiedadesDestacadas } from "../action";
import utilsFunc from "../utils/utilsFunc";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import utilfunc from "../utils/utilsFunc";

class PropiedadesDestacadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1199: { items: 3 },
        1366: { items: 4 },
      },
    };
    const { getPropiedades } = this.props;
    getPropiedades();
  }

  handleOnDragStart = (e) => {
    e.preventDefault();
  };

  renderCard = () => {
    const { propiedades, uf } = this.props;
    let listOfData = propiedades ? propiedades : [];
    const valorUf = uf
      ? parseFloat(uf.replace(".", "").replace(",", "."))
      : 29064;
    const { mobilecheck, formatNumeros, formatToThousandSeparator } = utilsFunc;

    return listOfData.map((propiedad, index) => (
      <Row className="">
        <Col className="anchou ">
          <Card
            sm="12"
            key={index}
            className=" center paFull carousel-ancho deri propiedad3 destacado bg-white "
          >
            <div className="img-destacado" style={{ display: "block" }}>
              <img src={icon.imgDestacado} alt="" />
            </div>
            {propiedad &&
            propiedad.imagenes &&
            propiedad.imagenes.length > 0 ? (
              <Link to={`info-propiedad?idprop=${propiedad && propiedad.id}`}>
                <Card.Img
                  variant="top"
                  src={
                    propiedad &&
                    propiedad.imagenes &&
                    propiedad.imagenes[0].downloadLink
                      ? propiedad.imagenes[0].downloadLink
                      : ""
                  }
                />
              </Link>
            ) : (
              <Link to={`info-propiedad?idprop=${propiedad && propiedad.id}`}>
                <Card.Img variant="top" src={icon.imgCasa} />
              </Link>
            )}
            <Card.Body className="">
              <div className="etiquetas-propiedades">
                <img src={icon.etiquetausado} alt="" />
              </div>

              <Card.Title className="titulo-arriba3">
                <Row>
                  <Col>
                    {propiedad && propiedad.tipoPropiedad}{" "}
                    {propiedad && propiedad.glosa}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>{propiedad && propiedad.comuna}</span>
                  </Col>
                  <Col>
                    <span className="cod_prop">
                      <div className="text-success">Código propiedad: </div>
                      <strong>
                        {" "}
                        {propiedad && propiedad.codigoPropiedad
                          ? propiedad.codigoPropiedad
                          : ""}
                      </strong>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="uf text-success">
                      <div className="entre-letra">Valor</div> UF{" "}
                      {propiedad && propiedad.valor
                        ? utilfunc.formatNumeros(propiedad.valor)
                        : ""}
                    </div>
                  </Col>
                  <Col>
                    <Link to={"/referir"}>
                      <Button variant="ganxreferir-inmo2">
                        <Row className="text-success center">
                          <div className="gana">Ganancia por Referir </div>
                        </Row>
                        <Row> </Row>
                        <Row>
                          {" "}
                          <div className="center gana2">
                            {" "}
                            {formatToThousandSeparator(
                              Math.trunc(propiedad.valor * 0.0045 * valorUf)
                            )}{" "}
                            CLP
                          </div>
                        </Row>
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row className="letter-small cachucha">
                  <Col>
                    <img src={icon.camas} alt="" />{" "}
                    {propiedad && propiedad.dormitorios}
                  </Col>
                  <Col>
                    <img src={icon.banos} alt="" />{" "}
                    {propiedad && propiedad.banio}
                  </Col>
                  <Col>
                    <img src={icon.m2contruidos} alt="" />
                    <div className="m2derecha">
                      {propiedad && propiedad.superficieUtil} m²
                    </div>
                    <div className="m2derecha peke">Construidos</div>
                  </Col>
                  <Col>
                    <img src={icon.m2totales} alt="" />
                    <div className="m2derecha">
                      {propiedad && propiedad.superficieTotales}m²
                      <div className="peke ">Totales</div>
                    </div>
                  </Col>
                </Row>
              </Card.Title>

              <Card.Footer>
                <Link to={`info-propiedad?idprop=${propiedad && propiedad.id}`}>
                  <Button type="button" variant="referir33">
                    Ver Propiedad
                  </Button>
                </Link>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ));
  };

  render() {
    const listProps = this.renderCard();
    return (
      <section className="bg-white center section-space-p1ex destacada-home ">
        <div className="propdesta">Propiedades destacadas</div>

        {listProps.length > 0 && (
          <AliceCarousel
            items={listProps}
            autoPlayInterval={10000}
            responsive={this.state.responsive}
            autoPlayDirection="rtl"
            autoPlay={true}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={false}
            disableAutoPlayOnAction={true}
            showSlideInfo={false}
            keysControlDisabled={true}
            dotsDisabled={false}
            buttonsDisabled={true}
            stagePadding={this.state.stagePadding}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { propiedades: state.app.destacados };
};
const mapDispatchToProps = (dispatch) => {
  return { getPropiedades: () => dispatch(fetchGetPropiedadesDestacadas()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropiedadesDestacadas);
