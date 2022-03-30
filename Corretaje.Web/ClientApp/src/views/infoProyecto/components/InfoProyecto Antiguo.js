/** @format */

import React, { Component } from "react";

import {
  Container,
  Row,
  Button,
  Breadcrumb,
  Card,
  OverlayTrigger,
  Tooltip,
  Badge,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import utilfunc from "../../../utils/utilsFunc";
import {
  fetchGetUF,
  setInmobiliariaIdState,
  setProyectoIdState,
  fetchGetInmobiliaria,
} from "../../../action";
import "react-alice-carousel/lib/alice-carousel.css";
import "moment-timezone";
import { Link } from "react-router-dom";
// import styles from './styles.scss';
import { CardlItem } from "../../../components/Card";
import icon from "../../../utils/images";
import utilsFunc from "../../../utils/utilsFunc";
import isEqual from "lodash/isEqual";
import api from "../../../api";
const { formatNumeros } = utilsFunc;

export class InfoProyecto extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.state = {
      proyecto: null,
      loading: false,
    };
  }

  componentDidMount = async () => {
    const { dispatch, proyecto } = this.props;
    dispatch(setProyectoIdState(proyecto.id));
    // dispatch(fetchGetInmobiliaria(proyecto.inmobiliariaId));
  };

  render() {
    const { proyecto, history, inmobiliariaId } = this.props;
    const estados = [
      { value: 0, label: "En Blanco" },
      { value: 1, label: "En Verde" },
      { value: 2, label: "Entrega Inmediata" },
    ];
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

            <div className="button-proyecto">
              <Link to={inmobiliariaId ? `/live/${inmobiliariaId}` : "/live"}>
                <Button variant={"info"}>IR A PROYECTOS</Button>
              </Link>
            </div>
          </Row>
          <br />
          <Row>
            {proyecto && proyecto.modelos
              ? proyecto.modelos.map((item, index) => (
                  <div
                    key={proyecto.id}
                    className="col-md-3 pabox w-table-50 card-proyecto"
                  >
                    <CardlItem
                      key={proyecto.id}
                      header={
                        <div className="caja">
                          {" "}
                          <div className="box">
                            <img
                              src={
                                item.imagenes && item.imagenes[0]
                                  ? item.imagenes[0].downloadLink
                                  : icon.noResultados
                              }
                              alt="Img"
                              // style={{borderColor: "black", borderStyle: "dotted", margin: "10px"}}
                            />
                          </div>
                        </div>
                      }
                      body={
                        <Row>
                          <Col xs="6">
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

                            <Badge className="badge-category">
                              {proyecto.operacion}
                            </Badge>
                            <Card.Title>
                              {proyecto.tipoProyecto}
                              <br />
                              <h4 style={{ margin: "0px" }}>{item.Nombre}</h4>
                              <span>{proyecto.comuna}</span>
                            </Card.Title>
                            <Card.Text>
                              <span className="uf text-success">
                                {/* UF {item.ValorDesde ? formatNumeros(item.valorDesde) : ""} */}
                                UF{" "}
                                {item.valorDesde
                                  ? formatNumeros(item.valorDesde)
                                  : ""}
                              </span>
                              <span className="small">
                                Inmobiliaria:{" "}
                                <strong>{proyecto.nombreInmobiliaria}</strong>
                              </span>
                              <br />
                              <span className="small">
                                Estado:{" "}
                                <strong>
                                  {
                                    estados.find(
                                      (o) => o.value === proyecto.estado
                                    ).label
                                  }
                                </strong>
                              </span>
                              <span className="cont-dependencias">
                                <span>
                                  <Badge className="badge-secondary">
                                    {item.dormitorio}D/{item.banio}B
                                  </Badge>
                                </span>
                                <span>
                                  <Badge className="badge-secondary">
                                    {item.superficieDesde} m²
                                  </Badge>
                                </span>
                              </span>
                            </Card.Text>
                          </Col>
                          <Col xs="6">
                            {proyecto.habilitarLive ? (
                              <Col sm="12">
                                <Button
                                  className="buttonLive1"
                                  onClick={() =>
                                    history.push(
                                      inmobiliariaId
                                        ? "/live/reserva-usuario/" +
                                            proyecto.id +
                                            "/" +
                                            inmobiliariaId
                                        : "/live/reserva-usuario/" + proyecto.id
                                    )
                                  }
                                >
                                  AGENDAR LIVE
                                </Button>
                                {/* </Link> */}
                              </Col>
                            ) : null}
                            <Col sm="12">
                              <Button
                                onClick={() =>
                                  this.props.showModelDetails(index)
                                }
                                style={{ cursor: "pointer" }}
                                className="buttonLive2"
                              >
                                <span style={{ color: "white" }}>
                                  MÁS DETALLES
                                </span>
                              </Button>
                            </Col>

                            {proyecto.habilitarLive ? (
                              <Col sm="12">
                                <Button
                                  onClick={() =>
                                    history.push(`/live/room/${proyecto.id}`)
                                  }
                                  disabled={
                                    !(this.props.liveIsAllowed === true)
                                  }
                                  className="buttonLive2"
                                >
                                  <span style={{ color: "white" }}>
                                    UNIRSE A LIVE
                                  </span>
                                </Button>
                              </Col>
                            ) : null}
                          </Col>
                        </Row>
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
