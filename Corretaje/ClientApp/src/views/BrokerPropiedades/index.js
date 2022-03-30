import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  getVisitasFiltradas,
  confirmarVisita,
  getPropiedadesPaginadas,
  fetchGetAllClientes,
  setPropiedadesPaginadas
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert2";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import "moment/locale/es";
import TablePagination from "@material-ui/core/TablePagination";

class IndexMisPropiedades extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowsPerPage: 5,
      page: 0,
      idBroker: "",
    };
    const { getPropiedadesPaginadas, fetchGetAllClientes, setPropiedadesPaginadas } = this.props;
    setPropiedadesPaginadas(null);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      console.log("not null");
      getPropiedadesPaginadas("", user.userId, 0, 5);
      fetchGetAllClientes();
    }
  }

  componentDidMount() {
    const { getVisitasFiltradas } = this.props;
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      console.log("m not null");
      //fecha, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas
      getVisitasFiltradas("", "", user.userId, "", true, false, false, false);
      this.setState({
        idBroker: user.userId,
      });
    }
  }

  getCliente  = (idCliente) => {
    const { itemsClientes } = this.props;
    if (itemsClientes != null && itemsClientes.length > 0) {
      return itemsClientes.filter(s => s.id === idCliente).pop();
    }
  }

  getNombreCliente = (cliente) => {
    let nombre = "";
    if (cliente != null) {
      nombre = `${cliente.nombres} ${cliente.apellidos}`;
    }

    return nombre;
  }

  getTelefonoCliente = (cliente) => {
    let telefono = "";
    if (cliente != null) {
      telefono = cliente.telefono;
    }

    return telefono;
  }

  getMailCliente = (cliente) => {
    let mail = "";
    if (cliente != null) {
      mail = cliente.mail;
    }

    return mail;
  }

  handleChangePage = (event, newPage) => {
    const { rowsPerPage, idBroker } = this.state;
    this.setState({
      page: newPage,
    });
    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas("", idBroker, newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    const { idBroker } = this.state;
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });

    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas("", idBroker, 1, parseInt(event.target.value, 10));
  };

  tablePagination = (propiedades) => {
    if (propiedades && propiedades.results && propiedades.results.length > 0) {
      return (
        <TablePagination
          count={propiedades.totalResults}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          rowsPerPage={this.state.rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "Cantidad" },
            native: true,
          }}
          rowsPerPageOptions={[5, 10, 20, 50]}
          labelRowsPerPage={"Resultados por página"}
        />
      );
    } else {
      return <div />;
    }
  };

  showConfirmationDialog = (id, visitaRealizada) => {
    swal
      .fire({
        title: "Confirmar visita",
        text: `Confirma que ${
          visitaRealizada ? "" : "no"
        }  realizó la visita a esta propiedad`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      })
      .then((result) => {
        if (result.value) {
          const { confirmarVisita } = this.props;
          confirmarVisita(id, visitaRealizada);
        }
      });
  };

  feedback = () => {
    const { requestConfirmarVisita, requestPropiedadesPaginadas, requestVisitasBrokerSuscriptor } = this.props;

    if (requestPropiedadesPaginadas === "LOADING" || requestVisitasBrokerSuscriptor === "LOADING") {
      swal.showLoading();
    } else {
      swal.close();
    }

    if (requestConfirmarVisita === "SUCCESS") {
      swal.fire({
        icon: "success",
        title: "Visita actualizada",
        text: "Se ha actualizado la visita exitosamente",
        onAfterClose: () => {
          window.location.reload();
        },
      });
    }

    if (requestConfirmarVisita === "ERROR") {
      swal.fire("Error", "No se ha podido actualizar la visita", "error");
    }

    if (requestPropiedadesPaginadas === "ERROR") {
      swal.fire("Error", "No se haN podido cargar las propiedades", "error");
    }
  };

  render() {
    const { visitasBrokerSuscriptor, propiedadesPaginadas, requestPropiedadesPaginadas, requestVisitasBrokerSuscriptor } = this.props;
    let visitasPasadas = [];
    let visitasFuturas = [];
    if (
      visitasBrokerSuscriptor &&
      visitasBrokerSuscriptor != null &&
      visitasBrokerSuscriptor.length > 0
    ) {
      visitasBrokerSuscriptor.forEach((v) => {
        let fechaSinTiempo = v.fecha.split(" ")[0];
        let fechaPartes = fechaSinTiempo.split("-");
        let dia = fechaPartes[0];
        let mes = fechaPartes[1];
        let anio = fechaPartes[2];
        if (anio.length == 2) {
          anio = `20${anio}`;
        }
        let newFecha = `${anio}-${mes}-${dia}`;
        if (moment(newFecha).isAfter(moment())) {
          visitasFuturas.push(v);
        } else {
          visitasPasadas.push(v);
        }
      });
    }

    return (
      <Container fluid className="main-content-container px-4">
        {this.feedback()}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Gestiona tus propiedades"
            subtitle="Aqui puedes ver las propiedades que tienes asignadas y las visitas que estas propiedades tienen y tuvieron"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col sm={4}>
            <h3>Mis propiedades</h3>
            {requestPropiedadesPaginadas != "LOADING" && propiedadesPaginadas &&
              propiedadesPaginadas.results != null &&
              propiedadesPaginadas.results.length > 0 &&
              propiedadesPaginadas.results.map((p) => {
                let cliente = this.getCliente(p.idCliente);
                return (
                  <Card className="margin-abajillo">
                    <div>Tipo propiedad:{p.tipoPropiedad}</div>
                    <div>
                      Dirección: {p.nombreCalle}
                      {p.direccionReferencial} {p.numero}
                    </div>
                    <div>Comuna: {p.comuna}</div>
                    <div>Propietario: {this.getNombreCliente(cliente)}</div>
                    <div>Telefono: {this.getTelefonoCliente(cliente)}</div>
                    <div>Email: {this.getMailCliente(cliente)}</div>
                  </Card>
                )
              })}

            { requestPropiedadesPaginadas != "LOADING" && (propiedadesPaginadas == null || (propiedadesPaginadas.results != null && propiedadesPaginadas.results.length == 0)) && (
              <div>Al parecer no tienes propiedades asignadas todavía</div>
            ) }

            {this.tablePagination(propiedadesPaginadas)}
          </Col>
          <Col sm={8}>
            <div className="mb-4">
              <h3>Visitas agendadas</h3>
              { requestVisitasBrokerSuscriptor != "LOADING" && (visitasFuturas.length == 0) && (
              <div>No tienes visitas programadas</div>
              ) }
              {visitasFuturas != null &&
                visitasFuturas.length > 0 &&
                visitasFuturas.map((v) => {
                  let fechaPartes = v.fecha && v.fecha.split(" ");
                  let fecha = fechaPartes[0];
                  return (
                    <Row>
                      <Col>
                        <Card variant="outlined" className="pt-8px mb-2">
                          <CardContent>
                            <Row className={"marginmisprop123"}>
                              <Col>
                                <div> Fecha: </div>
                                <Typography variant="body2" component="div">
                                  {fecha}
                                </Typography>
                              </Col>
                              <Col>
                                <div> Hora:</div>
                                <Typography variant="body2" component="div">
                                  {v.tramo}
                                </Typography>
                              </Col>
                              <Col>
                                <div> Direccion: </div>
                                <Typography
                                  gutterBottom
                                  variant="body2"
                                  component="div"
                                >
                                  {v.propiedadDireccion} {v.tipoPropiedad}
                                </Typography>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="colorterr">
                                  {" "}
                                  Contacto Visita{" "}
                                </div>
                                <Typography
                                  variant="body2"
                                  component="div"
                                  className="subtarjetaprop"
                                >
                                  <div>Nombre: {v.nombre}</div>
                                  <div>Mail: {v.emailComprador}</div>
                                </Typography>
                              </Col>
                              <Col>
                                <div className="colorterr">
                                  {" "}
                                  Contacto Propietario
                                </div>
                                <Typography
                                  variant="body2"
                                  component="div"
                                  className="subtarjetaprop"
                                >
                                  <div>Nombre: {v.nombrePropietario}</div>
                                  <div>Mail: {v.emailPropietario}</div>
                                </Typography>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Grid item md container>
                                  <Button
                                    color={"secondary"}
                                    className="w-100"
                                    variant="contained"
                                    startIcon={<CloseIcon />}
                                    onClick={() =>
                                      this.showConfirmationDialog(v.id, false)
                                    }
                                    size="small"
                                  >
                                    Cancelar visita
                                  </Button>
                                </Grid>
                              </Col>
                            </Row>
                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  );
                })}
            </div>
            <div>
              <h3>Confirmar visitas pasadas</h3>
              { requestVisitasBrokerSuscriptor != "LOADING" && (visitasPasadas.length == 0) && (
              <div>No tienes visitas por confirmar</div>
              ) }
              {visitasPasadas != null &&
                visitasPasadas.length > 0 &&
                visitasPasadas.map((v) => {
                  let fechaPartes = v.fecha && v.fecha.split(" ");
                  let fecha = fechaPartes[0];
                  return (
                    <Row>
                      <Col>
                        <Card variant="outlined" className="pt-8px mb-2">
                          <CardContent>
                            <Grid
                              container
                              spacing={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={2} sm sm={2} container>
                                <Typography variant="body2" component="div">
                                  {fecha} {v.tramo}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                sm
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Typography
                                  gutterBottom
                                  variant="body2"
                                  component="div"
                                >
                                  {v.propiedadDireccion}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="overline"
                                  component="div"
                                >
                                  {v.tipoPropiedad}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} xs container>
                                <Typography variant="body2" gutterBottom>
                                  Propietario: {v.nombrePropietario}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                lg
                                container
                                direction="column"
                                xs={6}
                                lg={4}
                                spacing={1}
                              >
                                <Grid item md container>
                                  <Button
                                    variant="contained"
                                    className="w-100"
                                    startIcon={<CheckIcon />}
                                    onClick={() =>
                                      this.showConfirmationDialog(v.id, true)
                                    }
                                    color="primary"
                                    size="small"
                                  >
                                    Realicé esta visita
                                  </Button>
                                </Grid>
                                <Grid item md container>
                                  <Button
                                    color={"secondary"}
                                    className="w-100"
                                    variant="contained"
                                    startIcon={<CloseIcon />}
                                    onClick={() =>
                                      this.showConfirmationDialog(v.id, false)
                                    }
                                    size="small"
                                  >
                                    No realicé esta visita
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visitasBrokerSuscriptor: state.app.visitasBrokerSuscriptor,
    requestVisitasBrokerSuscriptor: state.app.requestVisitasBrokerSuscriptor,
    requestConfirmarVisita: state.app.requestConfirmarVisita,
    propiedadesPaginadas: state.app.propiedadesPaginadas,
    requestPropiedadesPaginadas: state.app.requestPropiedadesPaginadas,
    itemsClientes: state.app.itemsClientes
  };
};

const mapDispatchToProps = (dispatch) => ({
  getVisitasFiltradas: (
    fechaInicial,
    fechaFinal,
    idBroker,
    idSuscripcion,
    mostrarSoloSinConfirmar,
    mostrarSoloTramos,
    incluirVisitasPasadas,
    incluirVisitasFuturas
  ) =>
    dispatch(
      getVisitasFiltradas(
        fechaInicial,
        fechaFinal,
        idBroker,
        idSuscripcion,
        mostrarSoloSinConfirmar,
        mostrarSoloTramos,
        incluirVisitasPasadas,
        incluirVisitasFuturas
      )
    ),
  dispatch: (action) => {
    dispatch(action);
  },
  confirmarVisita: (idVisita, visitaRealizada) =>
    dispatch(confirmarVisita(idVisita, visitaRealizada)),
  getPropiedadesPaginadas: (estado, idBroker, page, pageSize) =>
    dispatch(getPropiedadesPaginadas(estado, idBroker, page, pageSize)),
  fetchGetAllClientes: () => dispatch(fetchGetAllClientes()),
  setPropiedadesPaginadas: (propiedades) => dispatch(setPropiedadesPaginadas(propiedades))
});

IndexMisPropiedades = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexMisPropiedades);

export default IndexMisPropiedades;
