import React, { Component } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  
} from "react-bootstrap";
import ClampLines from "react-clamp-lines";
import utilfunc from "../../utils/utilsFunc";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SubscriptionPopup from "../../components/Popups/SubscriptionPopup";
import {
  fetchGetProyectos,
  getEvaluacion,
  setInmobiliariaIdState,
  cleanInmobiliaria,
  fetchGetInmobiliaria,
} from "../../action";
import icon from "../../utils/images";
import { FiltroHeaderLive } from "../../components/FiltroHeaderLive";
import { LoadingModal } from "../../components/Loading";
import utilsFunc from "../../utils/utilsFunc";
import StarRatings from "react-star-ratings";
import "./live.css";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};
// const id = utilfunc.getUrlParameter('id');

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      show: false,
      allProyectos: [],
      currentProyectos: [],
      currentPage: null,
      totalPages: null,
      countProyectos: 0,
      sidebar: false,
      zoom: 13,
      lugar: "Santiago",
      showingInfoWindow: false,
      imagen: "",
      porcentaje: 0,
      showSubscriptionPopup: false,
      conectividad: 0,
      rentabilidad: 0,
      terminaciones: 0,
      equipamiento: 0,
      habilitarLive: 0,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
    this.searchProyectos = this.searchProyectos.bind(this);
  }

  componentDidMount() {
    const { match, dispatch } = this.props;
    const urlQuery = utilsFunc.getUrlParameter("query");
    console.log("match live:", match);
    if (match && match.params && match.params.id) {
      const inmobiliariaId = match.params.id;
      dispatch(setInmobiliariaIdState(inmobiliariaId));
      dispatch(fetchGetInmobiliaria(inmobiliariaId));
    } else {
      dispatch(cleanInmobiliaria());
    }
    this.searchProyectos(urlQuery ? urlQuery : "");
    initGA();
    logPageView();
  }

  componentDidUpdate(prevProps) {
    const { match, inmobiliariaId, dispatch } = this.props;
    if (inmobiliariaId !== prevProps.inmobiliariaId) {
      const urlQuery = utilsFunc.getUrlParameter("query");
      if (match && match.params && match.params.id) {
        const inmobiliariaId = match.params.id;
        dispatch(setInmobiliariaIdState(inmobiliariaId));
        dispatch(fetchGetInmobiliaria(inmobiliariaId));
      } else {
        dispatch(setInmobiliariaIdState(""));
      }
      this.searchProyectos(urlQuery ? urlQuery : "");
    }
  }

  togglePopup = () => {
    const { showSubscriptionPopup } = this.state;
    this.setState({ showSubscriptionPopup: !showSubscriptionPopup });
  };

  onPageChanged(data) {
    const { inmobiliariaId, getProyectos } = this.props;
    let query = document.getElementById("txtQuery").value;
    let operacion = document.getElementById("txtOp").value;
    let tipo = document.getElementById("txtTipoPro").value;
    let estadopro = document.getElementById("txtEstadoPro").value;

    const { currentPage, totalPages, pageLimit } = data;

    let offset = (currentPage - 1) * pageLimit;
    if (offset < 0) offset = 9;

    const datos = {
      idInmo: inmobiliariaId,
      limit: 0,
      skip: 0,
      direccion: query,
      isFirts: false,
      tipoOperacion: operacion,
      tipoProyecto: tipo,
      estadoPro: estadopro,
    };

    getProyectos(datos, totalPages, currentPage);
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      propId: props.propId,
      showingInfoWindow: true,
    });
  };

  searchProyectos(urlQuery) {
    const { match } = this.props;
    urlQuery =
      typeof urlQuery === "string" && urlQuery !== "" ? urlQuery : null;
    const { getProyectos, inmobiliariaId } = this.props;

    let query = document.getElementById("txtQuery").value;
    let estadopro = document.getElementById("txtEstadoPro").value;
    let operacion = document.getElementById("txtOp").value;
    let tipo = document.getElementById("txtTipoPro").value;

    const data = {
      idInmo: inmobiliariaId
        ? inmobiliariaId
        : match && match.params && match.params.id
        ? match && match.params && match.params.id
        : undefined,
      limit: 0,
      skip: 0,
      direccion: urlQuery || query,
      isFirts: false,
      tipoOperacion: operacion,
      tipoProyecto: tipo,
      estadoPro: estadopro,
    };
    getProyectos(data, 0, 0);
  }

  render() {
    const {
      respuesta,
      loading,
    } = this.props;
    const {
      showSubscriptionPopup,
    } = this.state;
    let currentProyectos = [];
    let countProyectos = 0;
    // let totalPaginas = 1;
    // let pageActual = 1;

    if (respuesta && respuesta.estado === 1) {
      currentProyectos = respuesta.data;

      let pDestacadas = currentProyectos.filter((key) => key.destacar);
      let pNoDestacadas = currentProyectos.filter((key) => !key.destacar);

      currentProyectos = [...pDestacadas, ...pNoDestacadas];

      countProyectos = respuesta.data.length;
    }
    let totalProyectos = countProyectos;

    return (
      <Container fluid={true} className="flex-auto">
        <SubscriptionPopup
          show={showSubscriptionPopup}
          togglePopup={this.togglePopup}
        />

        {loading && (
          <LoadingModal
            porcentaje={this.state.porcentaje}
            finish={() => this.setState({ porcentaje: 0 })}
          />
        )}

        <Row>
          <div className="bg-light-two navbar col-12">
            <div className="cont-buscador col-md-10 w-table-100">
              <FiltroHeaderLive searchProyectos={this.searchProyectos} />
              <Button
                className="w-table-100"
                variant="outline-primary"
                onClick={this.searchProyectos}
              >
                <img src={icon.iconSearchColor} alt="" />
              </Button>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 bg-light cont-scroll-resultados card-proyecto-all-proyects">
            <div className="row">
              {loading && (
                <div className="sin-resultados bg-light">Cargando...</div>
              )}

              {!loading && (
                <React.Fragment>
                  {currentProyectos.length === 0 && (
                    <div className="sin-resultados bg-light">
                      <div>
                        <img src={icon.noResultados} alt="" />
                        <span>
                          Lo sentimos, no hay resultados para su búsqueda
                        </span>
                      </div>
                    </div>
                  )}
                  {currentProyectos.length > 0 && (
                    <div className="col-12 pabox">
                      <span>
                        <small>
                          Total de proyectos encontrados: {totalProyectos}{" "}
                          {/* Página {pageActual}/{totalPaginas} */}
                        </small>
                      </span>
                    </div>
                  )}
                </React.Fragment>
              )}

              {currentProyectos.map((item) => (
                <div key={item.id} className="col-lg-6 col-12 pabox">
                  <Row className="col-12">
                    <Col
                      className="col-md-12 pa0 shadow cardlive"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Col
                          className="col-md-12 pa0-proy"
                          style={{
                            maxHeight: "300px",
                            overflow: "hidden",
                            paddingRight: "0px",
                            paddingLeft: "0px",
                          }}
                        >
                          <div className="caja-pro">
                            <div className="box-pro">
                              <img
                                src={
                                  item.imagenes[0]
                                    ? item.imagenes[0].downloadLink
                                    : icon.noResultados
                                }
                                style={
                                  item.imagenes[0]
                                    ? {}
                                    : { height: "226px", marginTop: "86px" }
                                }
                               alt=""/>
                            </div>
                          </div>
                        </Col>
                        <Col className="col-md-12 pad w-table-50">
                          <h4>{item.nombre}</h4>
                          <br />
                          <Row className="col-12">
                            {item.rentabilidad === true ? (
                              <div className="col-6">
                                <label>Rentabilidad</label>
                                <br />
                                <StarRatings
                                  rating={item.evaluacionRentabilidad}
                                  starDimension="20px"
                                  starRatedColor="rgba(252, 186, 3, 1)"
                                  numberOfStars={5}
                                  name="Rentabilidad"
                                />
                                <br />
                                <br />
                              </div>
                            ) : null}
                            {item.conectividad === true ? (
                              <div className="col-6">
                                <label>Conectividad</label>
                                <br />
                                <StarRatings
                                  rating={item.evaluacionConectividad}
                                  starDimension="20px"
                                  starRatedColor="rgba(252, 186, 3, 1)"
                                  numberOfStars={5}
                                  name="Rentabilidad"
                                />
                                <br />
                                <br />
                              </div>
                            ) : null}
                            {item.terminaciones === true ? (
                              <div className="col-6">
                                <label>Terminaciones</label>
                                <br />
                                <StarRatings
                                  rating={item.evaluacionTerminaciones}
                                  starDimension="20px"
                                  starRatedColor="rgba(252, 186, 3, 1)"
                                  numberOfStars={5}
                                  name="Rentabilidad"
                                />
                                <br />
                                <br />
                              </div>
                            ) : null}
                            {item.equipamiento === true ? (
                              <div className="col-6">
                                <label>Equipamiento</label>
                                <br />
                                <StarRatings
                                  rating={item.evaluacionEquipamiento}
                                  starDimension="20px"
                                  starRatedColor="rgba(252, 186, 3, 1)"
                                  numberOfStars={5}
                                  name="Rentabilidad"
                                />
                                <br />
                                <br />
                              </div>
                            ) : null}
                          </Row>
                          <span>{item.nombreInmobiliaria}</span>
                          <br />
                          <br />
                          <span>
                            Desde{" "}
                            {item.valorDesde
                              ? utilfunc.formatNumeros(item.valorDesde)
                              : ""}
                            {"UF"}
                          </span>
                          <br />
                          <span>
                            M2 Utiles Desde: {item.superficieUtilDesde}
                          </span>
                          <br />
                          <span>
                            M2 Totales Desde: {item.superficieTotalesDesde}
                          </span>
                          <br />
                          <br />
                          {item.observacionesPublicas ? (
                            <ClampLines
                              text={item.observacionesPublicas}
                              id="really-unique-id"
                              lines={4}
                              ellipsis="..."
                              moreText="Expandir"
                              lessText="Reducir"
                              buttons={false}
                              className="line-clamp"
                              innerElement="p"
                            />
                          ) : (
                            ""
                          )}
                        </Col>
                      </div>
                      <div style={{ margin: "20px" }}>
                        <Link
                          to={
                            this.props.inmobiliariaId
                              ? "/live/info-proyecto/" +
                                item.id +
                                "/" +
                                this.props.inmobiliariaId
                              : "/live/info-proyecto/" + item.id
                          }
                        >
                          <Button className="purple-button" type="button">
                            Ver Proyecto
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
              <div className="col-12 pabox">
                <div className="flex-row pa0 col-12 d-table">
                  {currentProyectos.length > 0 && (
                    <span>
                      <small className="align-middle">
                        Total de proyectos encontrados: {totalProyectos}{" "}
                      </small>
                    </span>
                  )}

                  <div className="float-md-right"/>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

const validate = (values) => {
  let errors = {};
  if (values.Pregunta === "") {
    errors.Pregunta = "Completa este campo";
  }
};
const mapStateToProps = (state) => ({
  respuesta: state.app.respuesta,
  totalPages: state.app.totalPages,
  currentPage: state.app.currentPage,
  loading: state.app.loading,
  user: state.app.user,
  inmobiliariaId: state.app.inmobiliariaId,
  evaluacionesProyectos: state.app.evaluacionesProyectos,
});

const mapDispatchToProps = (dispatch) => ({
  getProyectos: (query, totalPages, currentPage) =>
    dispatch(fetchGetProyectos(query, totalPages, currentPage)),
  getProyectosSingle: (evaluaciones, proyectoId) =>
    dispatch(getEvaluacion(evaluaciones, proyectoId)),
  dispatch: (action) => {
    dispatch(action);
  },
});

Live = connect(mapStateToProps, mapDispatchToProps)(Live);

export default Live;
