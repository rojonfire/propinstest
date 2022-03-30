import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Row, CardGroup, Col, Card, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import AccountSidebar from "../../components/AccountSidebar";
import {
  getTasacionPropiedad,
  findTasacionByPropiedadId,
  fetchGetUF,
  setResultadoTasacion,
  getVisitasVirtualesByPropiedadAndPeriodo,
  fetchGetPlanById
} from "../../action";
import Chart from "react-google-charts";
import utilsFunc from "../../utils/utilsFunc";
import { Divider } from "@material-ui/core";
import moment from "moment";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class MetricasPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPressedButton: false,
    };
    const {
      findTasacionByPropiedadId,
      dispatch,
      getVisitasVirtualesByPropiedadAndPeriodo,
      fetchGetPlanById
    } = this.props;
    dispatch(setResultadoTasacion(null));
    fetchGetPlanById(this.props.location.state.planId);
    findTasacionByPropiedadId(this.props.location.state.propiedadId);
    getVisitasVirtualesByPropiedadAndPeriodo(
      this.props.location.state.propiedadId,
      this.getPeriodoActual()
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      const {
        findTasacionByPropiedadId,
        getVisitasVirtualesByPropiedadAndPeriodo,
        fetchGetPlanById
      } = this.props;
      fetchGetPlanById(this.props.location.state.planId);
      findTasacionByPropiedadId(this.props.location.state.propiedadId);
      getVisitasVirtualesByPropiedadAndPeriodo(
        this.props.location.state.propiedadId,
        this.getPeriodoActual()
      );
    }
  }

  getPeriodoActual = () => {
    let currentMonth = moment().month() + 1;
    currentMonth =
      currentMonth.toString().length === 1
        ? `0${currentMonth.toString()}`
        : currentMonth.toString();
    let currentYear = moment().year().toString();
    let currentMonthAndYear = currentYear.concat(currentMonth);
    return currentMonthAndYear;
  };

  tasarPropiedad = () => {
    const { getTasacionPropiedad } = this.props;
    getTasacionPropiedad(this.props.location.state.propiedadId);
    this.setState({
      hasPressedButton: true,
    });
  };

  feedback = () => {
    const { errorMessage, requestStateTasacion } = this.props;

    if (requestStateTasacion === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestStateTasacion === "SUCCESS") {
      swal("Se han obtenido las métricas de su propiedad exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        }}
      );
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

    return null;
  };

  render() {
    const {
      requestTasacionByPropiedad,
      requestStateTasacion,
      resultadoTasacion,
      uf,
      requestVisitasVirtuales,
      visitasVirtuales,
      plan
    } = this.props;
    const { formatToThousandSeparator } = utilsFunc;
    const { propiedad } = this.props.location.state;
    const valorUf = uf
      ? parseFloat(uf.replace(".", "").replace(",", "."))
      : 29064;

    //const valorxM2 = propiedad.tipoPrecio == "CLP" ? (propiedad.valor/valorUf)/propiedad.superficieTotales : propiedad.valor/propiedad.superficieTotales;
    
    let valorxM2 =
      resultadoTasacion &&
      Math.trunc(
        resultadoTasacion.valorMedio / propiedad.superficieTotales
      );
    let valorSugeridoPropiedadEnUf =
      resultadoTasacion &&
      Math.trunc(resultadoTasacion.valorMedio);
    let valorSugeridoPropiedadEnClp =
      resultadoTasacion &&
      Math.trunc(resultadoTasacion.valorMedio * valorUf);
    let valorMedioxM2 = 0;

    let tipoMoneda = "UF";
    if (!plan.esVenta) {
      tipoMoneda = "CLP";
      valorxM2 =
        resultadoTasacion &&
        Math.trunc(
          resultadoTasacion.valorMedio / propiedad.superficieTotales
        );
      valorSugeridoPropiedadEnUf =
        resultadoTasacion &&
        Math.trunc(resultadoTasacion.valorMedio/valorUf);
      valorSugeridoPropiedadEnClp =
        resultadoTasacion &&
        Math.trunc(resultadoTasacion.valorMedio);
    }

    let plotData = [["Propiedad", tipoMoneda, { role: "style" }]];

    if (
      resultadoTasacion != null &&
      resultadoTasacion.propiedadesSimilares != null &&
      resultadoTasacion.propiedadesSimilares.length > 0
    ) {
      let propsSimilares = resultadoTasacion.propiedadesSimilares;
      let totalPrecio = 0;
      let totalM2 = 0;
      propsSimilares.forEach((t, index) => {
        if (index <= 5) {
          let prop = [`Propiedad ${index}`, t.precio, "#CCCCCC"];
          plotData.push(prop);
        }
        totalPrecio += t.precio;
        totalM2 += t.superficieTotal;
      });

      if (plan.esVenta) {
        plotData.push(["Tu propiedad", valorSugeridoPropiedadEnUf, "#009639"]);
      } else {
        plotData.push(["Tu propiedad", valorSugeridoPropiedadEnClp, "#009639"]);
      }

      valorMedioxM2 = Math.trunc(totalPrecio / totalM2);
    }

    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">Métricas de tu propiedad</div>
          {(requestStateTasacion === "LOADING" ||
            requestTasacionByPropiedad === "LOADING") && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
          {(resultadoTasacion == null || resultadoTasacion.estado === 1) &&
            !this.state.hasPressedButton &&
            requestTasacionByPropiedad !== "LOADING" &&
            requestStateTasacion !== "LOADING" && (
              <div>
                <Row>
                  <Col md={"12"}>
                    <div className="tituloperfilsinmargensub">
                      No has evaluado tu propiedad todavía. Haz clic en el botón
                      para continuar.
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={"12"}>
                    <Button
                      onClick={() => this.tasarPropiedad()}
                      variant="primary"
                      className="center mover-metricas"
                    >
                      Obtener métricas
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          {(resultadoTasacion == null || resultadoTasacion.estado === 1) &&
            this.state.hasPressedButton &&
            requestTasacionByPropiedad !== "LOADING" &&
            requestStateTasacion !== "LOADING" && (
              <Row>
                <Col md={"12"}>No se ha podido evaluar tu propiedad</Col>
              </Row>
            )}
          {resultadoTasacion &&
            resultadoTasacion.estado === 0 &&
            resultadoTasacion != null &&
            requestTasacionByPropiedad !== "LOADING" &&
            requestStateTasacion !== "LOADING" &&
            propiedad && (
              <Card>
                <Card.Body className="card-carct-perfil-status2">
                  <Card.Text>
                    <div className="meciosugeri">Precio sugerido</div>
                    <p className="fondo-valorplan4">
                      {`${formatToThousandSeparator(
                        valorSugeridoPropiedadEnUf
                      )} UF`}
                    </p>
                    <div>
                      {`${formatToThousandSeparator(
                        valorSugeridoPropiedadEnClp
                      )} CLP`}
                    </div>
                    <div className="meciosugeri">Precio referencia</div>
                  </Card.Text>
                  <div
                    className="center "
                    style={{ display: "flex", maxWidth: 900 }}
                  >
                    <Chart
                      width={"200px"}
                      height={"200px"}
                      chartType="ColumnChart"
                      loader={<div>Cargando Grafico</div>}
                      data={plotData}
                      options={{
                        vAxis: { title: tipoMoneda, format: `# ${tipoMoneda}` },
                        hAxis: { title: "Propiedad" },
                        seriesType: "bars",
                        colors: ["#d3d3d3"],
                      }}
                      rootProps={{ "data-testid": "1" }}
                    />
                  </div>
                  <div className="meciosugeri">Precio por M2</div>
                  <div className="tituloposicionmetros"> Tu propiedad</div>
                  <div className="posicisionmetros">
                    {`${valorxM2} ${tipoMoneda}/M2`}
                  </div>
                  <div className="tituloposicionmetros">
                    {" "}
                    Promedio en tu comuna
                  </div>
                  <div className="posicisionmetros">
                    {`${valorMedioxM2} ${tipoMoneda}/M2`}
                  </div>
                </Card.Body>
              </Card>
            )}
        </div>
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="8">
              {" "}
              <div className="tituloperfil">Métricas de tu propiedad</div>
              <div className="sub-titulo-perfil">
                Te mostramos el rendimiento que esta teniendo tu propiedad
              </div>
              {(requestStateTasacion === "LOADING" ||
                requestTasacionByPropiedad === "LOADING") && (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
              {(resultadoTasacion == null || resultadoTasacion.estado === 1) &&
                !this.state.hasPressedButton &&
                requestTasacionByPropiedad !== "LOADING" &&
                requestStateTasacion !== "LOADING" && (
                  <div>
                    <Row>
                      <Col md={"12"}>
                        No has evaluado tu propiedad todavía. Haz clic en el
                        botón para continuar.
                      </Col>
                    </Row>
                    <Row>
                      <Col md={"12"}>
                        <Button
                          onClick={() => this.tasarPropiedad()}
                          variant="primary"
                          className="center"
                        >
                          Obtener métricas
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              {(resultadoTasacion == null || resultadoTasacion.estado === 1) &&
                this.state.hasPressedButton &&
                requestTasacionByPropiedad !== "LOADING" &&
                requestStateTasacion !== "LOADING" && (
                  <Row>
                    <Col md={"12"}>No se ha podido evaluar tu propiedad</Col>
                  </Row>
                )}
              {resultadoTasacion &&
                resultadoTasacion.estado === 0 &&
                resultadoTasacion != null &&
                requestTasacionByPropiedad !== "LOADING" &&
                requestStateTasacion !== "LOADING" &&
                propiedad && (
                  <Row>
                    <Col md={6}>
                      <CardGroup>
                        <Card className="tarjetametricas">
                          <div className="meciosugeri">Precio sugerido</div>
                          <Card.Text>
                            <p className="fondo-valorplan">
                              {`UF ${formatToThousandSeparator(
                                valorSugeridoPropiedadEnUf
                              )} `}
                            </p>
                            <div>
                              {`${formatToThousandSeparator(
                                valorSugeridoPropiedadEnClp
                              )} CLP`}
                            </div>
                          </Card.Text>
                          <Divider />
                          <div className="meciosugeri">Precio Referencia</div>
                          <div
                            className="center "
                            style={{ display: "flex", maxWidth: 900 }}
                          >
                            <Chart
                              width={"500px"}
                              height={"350px"}
                              chartType="ColumnChart"
                              loader={<div>Cargando Grafico</div>}
                              data={plotData}
                              options={{
                                vAxis: { title: tipoMoneda, format: `# ${tipoMoneda}` },
                                hAxis: { title: "Propiedad" },
                                seriesType: "bars",

                                colors: ["#d3d3d3"],
                              }}
                              rootProps={{ "data-testid": "1" }}
                            />
                          </div>
                          <Divider />
                          <div className="meciosugeri">Precio por M2</div>
                          <Row>
                            <Col>
                              <div className="tituloposicionmetros">
                                {" "}
                                Tu propiedad
                              </div>
                            </Col>
                            <Col>
                              <div className="posicisionmetros">
                                {`${valorxM2} ${tipoMoneda}/M2`}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="tituloposicionmetros">
                                Promedio en tu comuna
                              </div>
                            </Col>
                            <Col>
                              <div className="posicisionmetros">
                                {`${valorMedioxM2} ${tipoMoneda}/M2`}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </CardGroup>
                    </Col>
                    <Col md={4}>
                      <Card className="tarjetametricas mb-3">
                        <div className="meciosugeri">VISITAS PRESENCIALES</div>
                        <Card.Text>
                          <p className="fondo-valorplan">{`0 visitas`}</p>
                          <div>{`en el último mes`}</div>
                        </Card.Text>
                      </Card>
                      {requestVisitasVirtuales !== "LOADING" &&
                        visitasVirtuales != null &&
                        visitasVirtuales != null &&
                        visitasVirtuales.estado !== 0 && (
                          <Card className="tarjetametricas">
                            <div className="meciosugeri">VISITAS VIRTUALES</div>
                            <Card.Text>
                              <p className="fondo-valorplan">
                                {visitasVirtuales.cantidadVisitas}
                              </p>
                              <div>{`en el último mes`}</div>
                            </Card.Text>
                          </Card>
                        )}
                    </Col>
                  </Row>
                )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  requestStateTasacion: state.app.requestStateTasacion,
  resultadoTasacion: state.app.resultadoTasacion,
  requestTasacionByPropiedad: state.app.requestTasacionByPropiedad,
  uf: state.app.uf,
  visitasVirtuales: state.app.visitasVirtuales,
  requestVisitasVirtuales: state.app.requestVisitasVirtuales,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGetPlanById: (id) => dispatch(fetchGetPlanById(id)),
  getTasacionPropiedad: (datosPropiedad) =>
    dispatch(getTasacionPropiedad(datosPropiedad)),
  findTasacionByPropiedadId: (idPropiedad) =>
    dispatch(findTasacionByPropiedadId(idPropiedad)),
  getVisitasVirtualesByPropiedadAndPeriodo: (idPropiedad, periodo) =>
    dispatch(getVisitasVirtualesByPropiedadAndPeriodo(idPropiedad, periodo)),
  getUf: () => dispatch(fetchGetUF()),
  dispatch: (action) => {
    dispatch(action);
  },
});

MetricasPerfil = connect(mapStateToProps, mapDispatchToProps)(MetricasPerfil);

export default MetricasPerfil;
