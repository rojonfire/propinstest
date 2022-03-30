import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Table, Pagination } from "antd";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Map from "../../components/GoogleMap";
import {
  postGetTasacion,
  postGetPropiedadesSimilaresTasacion,
  setTipoPlanSeleccionado
} from "../../action";
import { LoadingModal } from "../../components/Loading";
import swal from "sweetalert";
import utilfunc from "../../utils/utilsFunc";

const columns = [
  {
    title: "Barrio, Comuna",
    width: 100,
    render: (record) => (
      <React.Fragment>
        {record.barrio},{" "}
        <br />
        {record.comuna}
      </React.Fragment>
    ),
  },
  {
    title: "Tipo Propiedad",
    dataIndex: "tipoPropiedad",
    key: "tipoPropiedad",
    width: 100,
    render: (text, record) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        {text}
      </div>
    )
  },
  {
    title: "Superficie total",
    dataIndex: "superficieTotal",
    key: "superficieTotal",
    width: 100,
    responsive: ["md", "xl"],
    render: (text, record) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        {text}
      </div>
    )
  },
  {
    title: "Precio",
    dataIndex: "precio",
    key: "precio",
    width: 100,
    render: (text, record) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        {text}
      </div>
    )
  },
];

class ResultadosTasar extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      address: "",
      id: undefined,
      page: 1,
      pageSize: 5,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      postGetTasacion,
      datosPropiedadTasacion,
      postGetPropiedadesSimilaresTasacion,
      setTipoPlanSeleccionado
    } = this.props;
    if (datosPropiedadTasacion != null) {
      const { page, pageSize } = this.state;
      const data = {
        comuna: datosPropiedadTasacion.comuna,
        sector: datosPropiedadTasacion.barrio,
        tipoVivienda: datosPropiedadTasacion.tipoVivienda,
        numeroDormitorios: datosPropiedadTasacion.dormitorios,
        numeroEstacionamientos: datosPropiedadTasacion.estacionamientos,
        metrosUtiles: datosPropiedadTasacion.metrosUtiles,
        metrosTotales: datosPropiedadTasacion.metrosTotales,
      };
      postGetTasacion(datosPropiedadTasacion.tipo, data);
      postGetPropiedadesSimilaresTasacion(datosPropiedadTasacion.tipo, data, pageSize, page);
      setTipoPlanSeleccionado(datosPropiedadTasacion.tipo);
    }
  }

  handleClick(address) {
    this.setState({ address });
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = async (value) => {
    const results = value;
    return results;
  };

  onChange = (page, pageSize) => {
    const { datosPropiedadTasacion, postGetPropiedadesSimilaresTasacion } =
      this.props;
    if (datosPropiedadTasacion != null) {
      const data = {
        comuna: datosPropiedadTasacion.comuna,
        sector: datosPropiedadTasacion.barrio,
        tipoVivienda: datosPropiedadTasacion.tipoVivienda,
        numeroDormitorios: datosPropiedadTasacion.dormitorios,
        numeroEstacionamientos: datosPropiedadTasacion.estacionamientos,
        metrosUtiles: datosPropiedadTasacion.metrosUtiles,
        metrosTotales: datosPropiedadTasacion.metrosTotales,
      };
      postGetPropiedadesSimilaresTasacion(datosPropiedadTasacion.tipo, data, pageSize, page);
      this.setState({
        page,
        pageSize,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { datosPropiedadTasacion, postGetPropiedadesSimilaresTasacion } =
      this.props;
    if (datosPropiedadTasacion != null) {
      const data = {
        comuna: datosPropiedadTasacion.comuna,
        sector: datosPropiedadTasacion.barrio,
        tipoVivienda: datosPropiedadTasacion.tipoVivienda,
        numeroDormitorios: datosPropiedadTasacion.dormitorios,
        numeroEstacionamientos: datosPropiedadTasacion.estacionamientos,
        metrosUtiles: datosPropiedadTasacion.metrosUtiles,
        metrosTotales: datosPropiedadTasacion.metrosTotales,
      };
      postGetPropiedadesSimilaresTasacion(datosPropiedadTasacion.tipo, data, size, 1);
      this.setState({
        page: 1,
        pageSize: size,
      });
    }
  };

  feedback = () => {
    const { requestStateTasacion, errorMessage } = this.props;

    if (requestStateTasacion === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestStateTasacion === "ERROR") {
      swal(errorMessage, {
        icon: "error",
        buttons: {
          cancel: false,
          confirm: true,
        },
      });
    }
  };

  render() {
    const {
      resultadoTasacion,
      datosPropiedadTasacion,
      requestStateTasacion,
      propiedadesSimilaresTasacion,
      requestStatePropiedadesSimilaresTasacion
    } = this.props;

    let valorFast = 0;
    let valorFastMinimo = 0;
    let valorMaximo = 0;
    let valorMedio = 0;
    let valorMinimo = 0;

    if (resultadoTasacion && resultadoTasacion.data) {
      valorFast = resultadoTasacion.data.valorFast;
      valorFastMinimo = resultadoTasacion.data.valorFastMinimo;
      valorMaximo = resultadoTasacion.data.valorMaximo;
      valorMedio = resultadoTasacion.data.valorMedio;
      valorMinimo = resultadoTasacion.data.valorMinimo;
    }

    let tipoMoneda = datosPropiedadTasacion && datosPropiedadTasacion.tipo == "arriendo" ? "CLP" : "UF";
    if (tipoMoneda == "CLP") {
      valorMinimo = utilfunc.formatToThousandSeparator(valorMinimo);
      valorMaximo = utilfunc.formatToThousandSeparator(valorMaximo);
    }

    let tipo = datosPropiedadTasacion && datosPropiedadTasacion.tipo == "arriendo" ? "arriendo" : "venta";
    let tipoVerbo = datosPropiedadTasacion && datosPropiedadTasacion.tipo == "arriendo" ? "arrendar" : "vender";

    const tableScroll = {x: 300, y: '100%'};

    return (
      <Container>
        <div className="titulo-real-tasacion">Resultados de la Tasación</div>
        {this.feedback()}
        <Row justify="center" gutter={[16, 0]}>
          <Col xs={24} sm={24} md={24} lg={10} x={10}>
            <Row className="mb-2rem">
              <Col span={24}>
                <div className="card-estimacion">
                  <div className="titulo-terj-resultados">
                    ESTIMACIÓN VALOR DE {tipo.toUpperCase()} {tipoMoneda}
                  </div>

                  <Row justify="space-between">
                    <Col span={10}>
                      <div className="ValorUf-inmedia">
                        {valorMinimo} {tipoMoneda}
                      </div>
                    </Col>
                    <Col flex="auto">
                      <div className="ValorUf-inmedia"> - </div>
                    </Col>
                    <Col span={10}>
                      <div className="ValorUf-inmedia">
                        {valorMaximo} {tipoMoneda}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>           
            { datosPropiedadTasacion && datosPropiedadTasacion.tipo == "venta" && (
              <Row className="mb-2rem">
                <Col span={24}>
                  <div className="card-estimacion">
                    <div className="titulo-terj-resultados">
                      VALOR VENTA INMEDIATA CON PLAN FAST
                    </div>
                    <div className="ValorUf-inmedia">{valorFastMinimo} {tipoMoneda}</div>
                  </div>
                </Col>
              </Row>              
            ) }
            <Row className="mb-2rem">
              <Col span={24}>
                <div className="card-estimacion">
                  <div className="text-center titulo-terj-resultados">
                    ELIGE EL PLAN QUE MÁS TE ACOMODE
                  </div>
                  <div className="text-center titulo-terj-resultados">
                    PARA {tipoVerbo.toUpperCase()} TU PROPIEDAD
                  </div>
                  <Row gutter={[16, 16]} className="center">
                    <Col className="text-center center" span={12}>
                      <Link to={"/planes?tasacion=true"}>
                        <Button className="center resultadostasa">
                          Ver Planes
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="mb-2rem">
              <Col span={24}>
                <Map
                  className="maparesultados google-map"
                  google={window.google}
                  onDragend={this.onMapClicked}
                  zoom={this.state.zoom}
                  initialCenter={{
                    lat: -33.443321676379696,
                    lng: -70.65447339104816,
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} x={10}>
            <Row className="mb-2rem">
              <Col span={24}>
                <div className="card-estimacion">
                  <div className="titulo-terj-resultados">
                    DATOS DE LA PROPIEDAD TASADA
                  </div>
                  <div className="padding-dpt center">
                    <Row gutter={[16, 16]}>
                      <Col lg={{ span: 12, offset: 0 }} span={24}>
                        <div>TIPO DE PROPIEDAD:</div>
                        <div>
                          {datosPropiedadTasacion &&
                            datosPropiedadTasacion.tipoVivienda}
                        </div>
                      </Col>
                      <Col lg={{ span: 12, offset: 0 }} span={24}>
                        <div>DIRECCIÓN:</div>
                        <div>
                          {datosPropiedadTasacion.Direccion === ""
                            ? "NO APLICA"
                            : datosPropiedadTasacion.Direccion}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="titulo-terj-resultados">
                    CARACTERÍSTICAS DE LA PROPIEDAD TASADA
                  </div>
                  <div className="padding-dpt center">
                    <Row justify="space-between" gutter={[0, 0]}>
                      <Col xs={11} sm={11} md={8}>
                        DORMITORIOS:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion &&
                          datosPropiedadTasacion.dormitorios}
                      </Col>
                      <Col flex="auto" />
                      <Col span={8}>
                        BODEGA:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion.bodega === ""
                          ? "NO"
                          : datosPropiedadTasacion.bodega}
                      </Col>
                    </Row>
                    <Row justify="space-between" gutter={[0, 0]}>
                      <Col xs={11} sm={11} md={8}>
                        BAÑOS:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion && datosPropiedadTasacion.banos}
                      </Col>
                      <Col flex="auto" />
                      <Col span={8}>
                        M2 TOTALES:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion &&
                          datosPropiedadTasacion.metrosTotales}
                      </Col>
                    </Row>
                    <Row justify="space-between" gutter={[0, 0]}>
                      <Col xs={11} sm={11} md={8}>
                        ESTACIONAMIENTO:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion &&
                          datosPropiedadTasacion.estacionamientos}
                      </Col>
                      <Col flex="auto" />
                      <Col span={8}>
                        M2 ÚTILES:
                      </Col>
                      <Col
                        span={1}
                        className="text-center"
                      >
                        {datosPropiedadTasacion &&
                          datosPropiedadTasacion.metrosUtiles}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="card-estimacion ox-scroll">
                  <div className="titulo-terj-resultados">
                    VALOR DE PROPIEDADES SIMILARES EN EL SECTOR
                  </div>
                  {requestStatePropiedadesSimilaresTasacion === "LOADING" && (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {propiedadesSimilaresTasacion &&
                    requestStatePropiedadesSimilaresTasacion !== "LOADING" && (
                      <Table
                        scroll={tableScroll}
                        pagination={false}
                        dataSource={
                          propiedadesSimilaresTasacion &&
                          propiedadesSimilaresTasacion.data &&
                          propiedadesSimilaresTasacion.data.results
                        }
                        columns={columns}
                      />
                    )}
                  <div className="text-center pt-3">
                    <Pagination
                      //showSizeChanger
                      //onShowSizeChange={this.onShowSizeChange}
                      pageSize={this.state.pageSize}
                      defaultPageSize={5}
                      defaultCurrent={1}
                      onChange={this.onChange}
                      total={
                        propiedadesSimilaresTasacion &&
                        propiedadesSimilaresTasacion.data &&
                        propiedadesSimilaresTasacion.data.totalResults
                      }
                      size={"small"}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.data,
  ...state.app,
  ...state.auth,
  datosPropiedadTasacion: state.app.datosPropiedadTasacion,
  requestStateTasacion: state.app.requestStateTasacion,
  resultadoTasacion: state.app.resultadoTasacion,
  propiedadesSimilaresTasacion: state.app.propiedadesSimilaresTasacion,
  requestStatePropiedadesSimilaresTasacion:
    state.app.requestStatePropiedadesSimilaresTasacion,
});

const mapDispatchToProps = (dispatch) => ({
  setTipoPlanSeleccionado: (tipoPlan) =>
    dispatch(setTipoPlanSeleccionado(tipoPlan)),
  postGetTasacion: (tipo, datosPropiedad) =>
    dispatch(postGetTasacion(tipo, datosPropiedad)),
  postGetPropiedadesSimilaresTasacion: (tipo, datosPropiedad, pageSize, page) =>
    dispatch(
      postGetPropiedadesSimilaresTasacion(tipo, datosPropiedad, pageSize, page)
    ),
  dispatch: (action) => {
    dispatch(action);
  },
});

ResultadosTasar = connect(mapStateToProps, mapDispatchToProps)(ResultadosTasar);

export default ResultadosTasar;
