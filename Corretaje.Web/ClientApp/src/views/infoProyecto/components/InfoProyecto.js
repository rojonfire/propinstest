/** @format */

import React, { Component } from "react";

import {
  Container,
  Row,
  Button,
  Card,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import { fetchGetUF, setProyectoIdState } from "../../../action";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import "moment-timezone";
import { CardlItem } from "../../../components/Card";
import icon from "../../../utils/images";
import utilsFunc from "../../../utils/utilsFunc";
import { CarrouselItem } from "../../../components/Carrousel";

const { formatNumeros, formatToThousandSeparator } = utilsFunc;

export class InfoProyecto extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.state = {
      proyecto: null,
      loading: false,
      selectedModelos: [],
      buttonSelected: [],
      black: true,
    };
  }

  componentDidMount = async () => {
    const { dispatch, proyecto } = this.props;
    dispatch(setProyectoIdState(proyecto.id));
  };

  render() {
    const { proyecto, uf } = this.props;
    const valorUf = parseFloat(uf.replace(".", "").replace(",", "."));
    return (
      <Container fluid={true} className="bg-light">
        <Container>
          <Row className="info-proyectos-type">
            <div>
              Modelos del proyecto
              <br />
              Total de modelos encontrados:{" "}
              {proyecto && proyecto.modelos ? proyecto.modelos.length : ""}
            </div>
          </Row>
          <br />

          <Row className="row-cols-auto">
            {proyecto && proyecto.modelos
              ? proyecto.modelos.map((item, index) => (
                  <div
                    key={proyecto.id}
                    className=" prop-alto pabox w-table-50 "
                  >
                    <CardlItem
                      key={proyecto.id}
                      header={
                        <CarrouselItem
                          key={proyecto.id}
                          arrayOps={item.imagenes}
                          onChangePropiedad={() =>
                            this.props.showModelDetails(index)
                          }
                        />
                      }
                      body={
                        <div>
                          <div className="etiquetas-propiedades">
                            <img src={icon.etiquetanuevo} alt="" />
                          </div>
                          {proyecto.habilitarLive === true ? (
                            <div>
                              <div className="iconzoom">
                                <img src={icon.iconlive} alt="" />
                              </div>
                            </div>
                          ) : null}

                          <Row>
                            <Col xs="12">
                              <div
                                className="img-destacado"
                                style={
                                  proyecto.destacar ? { display: "block" } : {}
                                }
                              >
                                <img src={icon.imgDestacado} alt="" />
                              </div>
                              {proyecto.exclusividad && (
                                <OverlayTrigger
                                  overlay={
                                    <Tooltip id="tooltip-disabled">
                                      Proyecto Exclusivo Propins
                                    </Tooltip>
                                  }
                                >
                                  <div className="exclusive-propins">
                                    <img src={icon.exclusive} alt="exclusive" />
                                  </div>
                                </OverlayTrigger>
                              )}

                              <Card.Title className="titulo-arriba">
                                <Row>
                                  <h4 style={{ margin: "0px" }}>
                                    {item.Nombre}
                                  </h4>
                                </Row>

                                <Row>
                                  <Col>{proyecto.tipoProyecto}</Col>
                                </Row>

                                <Row>
                                  <Col>{proyecto.comuna}</Col>
                                  <Col>
                                    <span className="cod_prop">
                                      <div className="text-inmo">
                                        Inmobiliaria:{" "}
                                      </div>

                                      <strong>
                                        {proyecto.nombreInmobiliaria}
                                      </strong>
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="uf text-inmo ">
                                      {/* UF {item.ValorDesde ? formatNumeros(item.valorDesde) : ""} */}
                                      UF{" "}
                                      {item.valorDesde
                                        ? formatNumeros(item.valorDesde)
                                        : ""}
                                    </div>
                                  </Col>
                                  <Col>
                                    <Link to={"/referir"}>
                                      <Button variant="ganxreferir gana">
                                        <Row className="text-inmo center">
                                          Ganancia por referir hasta
                                        </Row>
                                        <Row>
                                          <div className="entre-letra center" />
                                        </Row>
                                        <Row>
                                          <div className="center gana2">
                                            CLP{" "}
                                            {uf &&
                                              formatToThousandSeparator(
                                                Math.trunc(
                                                  item.valorDesde *
                                                    0.0045 *
                                                    valorUf
                                                )
                                              )}
                                          </div>
                                        </Row>
                                      </Button>
                                    </Link>
                                  </Col>
                                </Row>

                                <Row className="letter-small cachucha">
                                  <Col>
                                    <img src={icon.camas} alt="" />{" "}
                                    {item.dormitorio}
                                  </Col>
                                  <Col>
                                    <img src={icon.banos} alt="" /> {item.banio}
                                  </Col>
                                  <Col>
                                    <img src={icon.m2contruidos} alt="" />
                                    {item.superficieDesde}m²
                                    <div className="m2derecha peke">
                                      Construidos
                                    </div>
                                  </Col>
                                  <Col>
                                    <img src={icon.m2totales} alt="" />
                                    {item.superficieDesde}m²
                                    <div className="peke m2derecha ">
                                      Totales
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Title>

                              <Card.Footer>
                                <div className="">
                                  <Button
                                    onClick={() =>
                                      this.props.showModelDetails(index)
                                    }
                                    style={{ cursor: "pointer" }}
                                    variant="referir34"
                                  >
                                    <span style={{ color: "white" }}>
                                      Ver propiedad
                                    </span>
                                  </Button>{" "}
                                </div>
                              </Card.Footer>
                            </Col>
                          </Row>
                        </div>
                      }
                    />
                  </div>
                ))
              : null}
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
  inmobiliariaId: state.app.inmobiliariaId,
  inmobiliariaData: state.app.inmobiliariaData,
  proyectoId: state.app.proyectoId,
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  dispatch: (action) => {
    dispatch(action);
  },
});

InfoProyecto = connect(mapStateToProps, mapDispatchToProps)(InfoProyecto);

export default InfoProyecto;
