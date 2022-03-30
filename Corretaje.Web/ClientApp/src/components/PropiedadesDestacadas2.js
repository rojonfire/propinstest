import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  Badge,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import icon from "../utils/images";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGetPropiedadesDestacadas } from "../action";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import utilfunc from "../utils/utilsFunc";

class PropiedadesDestacadas2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: {
        0: { items: 1 },
        1024: { items: 4 },
        1366: { items: 4 },
      },
      stagePadding: {
        paddingLeft: 0, // in pixels
        paddingRight: 0,
      },
    };
    const { getPropiedades } = this.props;
    getPropiedades();
  }

  handleOnDragStart = (e) => {
    e.preventDefault();
  };

  renderCard = () => {
    const { propiedades } = this.props;
    let listOfData = propiedades ? propiedades : [];

    return listOfData.map((propiedad, index) => (
      <Col>
        <Card
          sm="12"
          key={index}
          className="paFull deri propiedad destacado bg-white"
        >
          <div className="img-destacado" style={{display: "block"}}/>
          {propiedad && propiedad.imagenes && propiedad.imagenes.length > 0 ? (
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
            {propiedad && propiedad.exclusividad && (
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Propiedad Exclusiva Propins
                  </Tooltip>
                }
              >
                <div className="exclusive-propins">
                  <img src={icon.exclusive} alt="exclusive" />
                </div>
              </OverlayTrigger>
            )}
            <Badge className="badge-category">
              {propiedad && propiedad.operacion}
            </Badge>
            <Card.Title>
              {propiedad && propiedad.tipoPropiedad}{" "}
              {propiedad && propiedad.glosa}
              <br />
              <span>{propiedad && propiedad.comuna}</span>
            </Card.Title>

            <Card.Text>
              <span className="uf text-success">
                UF{" "}
                {propiedad && propiedad.valor
                  ? utilfunc.formatNumeros(propiedad.valor)
                  : ""}
              </span>
              <p className="small">
                código propiedad:{" "}
                <strong>
                  {propiedad && propiedad.codigoPropiedad
                    ? propiedad.codigoPropiedad
                    : ""}
                </strong>
              </p>
              <span className="cont-dependencias">
                <span>
                  <Badge className="badge-secondary">
                    {propiedad && propiedad.dormitorios}D/
                    {propiedad && propiedad.banio}B
                  </Badge>
                </span>
                <span>
                  <Badge className="badge-secondary">
                    {propiedad && propiedad.superficieUtil} -{" "}
                    {propiedad && propiedad.superficieTotales} m²
                  </Badge>
                </span>
              </span>
            </Card.Text>
            <Card.Footer>
              <Link to={`info-propiedad?idprop=${propiedad && propiedad.id}`}>
                <Button variant="primary border">Ver Propiedad</Button>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  render() {
    const listProps = this.renderCard();
    return (
      <section className="bg-light section-space destacada-home ">
        <Container className="pa0">
          <div className="title-section text-center">
          </div>

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
        </Container>
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
)(PropiedadesDestacadas2);
