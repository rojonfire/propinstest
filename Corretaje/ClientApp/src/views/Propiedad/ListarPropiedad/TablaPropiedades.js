import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Launch from "@material-ui/icons/Launch";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import FaceIcon from "@material-ui/icons/Face";
import DescriptionIcon from "@material-ui/icons/Description";
import DirectionsIcon from "@material-ui/icons/Directions";
import Badge from "@material-ui/core/Badge";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormSelect,
  FormGroup,
  FormInput,
} from "shards-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { ESTADOS_PROPIEDAD } from "../../../utils/constants";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import {
  getPropiedadById,
  postTarjetaProp,
  setPropiedad,
  updateEstadoPropiedad,
  putPropiedadAsignarBroker,
} from "../../../action";
import Swal from "sweetalert2";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Schedule from "../../../components/common/Schedule";

class TablaPropiedades extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params;
    this.state = {
      propiedades: this.props.propiedades,
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      propiedadSeleccionada: {},
      modalCambioEstado: false,
      nuevoEstado: "",
      modalContrato: false,
      modalAsignacionBroker: false,
      nuevoBroker: "",
      brokerPropiedadSeleccionada: null,
      suscriptor: "",
      valorCompraPropiedad: 0,
      openTooltipValidacionValorPropiedad: false,
      modalHorarioVisitas: false,
      schedule: null
    };
  }

  getNombreSuscripcion = (id) => {
    let nombreSuscriptor = "";
    const { suscripciones } = this.props;
    if (
      suscripciones != null &&
      suscripciones.results != null &&
      suscripciones.results.length > 0
    ) {
      let suscripcion = suscripciones.results.filter((s) => s.id === id).pop();

      if (suscripcion != null && suscripcion.nombreUsuario != null) {
        nombreSuscriptor = suscripcion.nombreUsuario;
      }
    }
    return nombreSuscriptor;
  };

  selectSuscriptores = () => {
    let options = [];
    options.push(
      <option key="" value="">
        - Seleccione suscriptor -
      </option>
    );
    const { suscripciones } = this.props;
    if (
      suscripciones != null &&
      suscripciones.results != null &&
      suscripciones.results.length > 0
    ) {
      suscripciones.results.forEach((s) => {
        let nombre = `${s.nombreUsuario} - ${s.emailUsuario}`;
        options.push(
          <option key={s.id} value={s.id}>
            {nombre}
          </option>
        );
      });
    }

    return options;
  };

  selectEstadosPropiedad = () => {
    let optionsEstados = [];
    optionsEstados.push(
      <option key="" value="">
        - Seleccione nuevo estado -
      </option>
    );
    const estadosNumero = Object.keys(ESTADOS_PROPIEDAD);
    estadosNumero.forEach((k, v) => {
      if (
        this.state.propiedadSeleccionada != undefined &&
        this.state.propiedadSeleccionada.propiedad != undefined &&
        this.state.propiedadSeleccionada.propiedad.estadoPropiedad != k
      ) {
        optionsEstados.push(
          <option key={k} value={k}>
            {ESTADOS_PROPIEDAD[k]}
          </option>
        );
      }
    });
    return optionsEstados;
  };

  selectBrokers = () => {
    let brokersOptions = [];
    brokersOptions.push(
      <option key="" value="">
        - Cambiar broker -
      </option>
    );
    const { propiedadSeleccionada } = this.state;
    const { brokers } = this.props;
    if (brokers != null) {
      brokers.forEach((k, v) => {
        if (
          propiedadSeleccionada != undefined &&
          propiedadSeleccionada.propiedad != undefined &&
          propiedadSeleccionada.idBroker != k.id
        ) {
          brokersOptions.push(
            <option key={k.id} value={k.id}>
              {k.nombres} {k.apellidos}
            </option>
          );
        }
      });
    }
    return brokersOptions;
  };

  toggleTooltipValidacionValorPropiedad() {
    this.setState({
      openTooltipValidacionValorPropiedad: !this.state
        .openTooltipValidacionValorPropiedad,
    });
  }

  toggleModalCambioEstado = (e, propiedadSeleccionada) => {
    this.setState({
      modalCambioEstado: !this.state.modalCambioEstado,
    });

    if (propiedadSeleccionada != null) {
      this.setState({
        propiedadSeleccionada,
        nuevoEstado: "",
      });
    }
  };

  toggleModalContrato = (e, propiedadSeleccionada) => {
    this.setState({
      modalContrato: !this.state.modalContrato,
    });

    if (propiedadSeleccionada != null) {
      this.setState({
        propiedadSeleccionada,
        nuevoEstado: "",
      });
    }
  };

  toggleModalAsignacionBroker = (e, propiedadSeleccionada) => {
    const { brokers } = this.props;
    let brokerPropiedadSeleccionada = null;
    this.setState({
      modalAsignacionBroker: !this.state.modalAsignacionBroker,
    });

    if (propiedadSeleccionada != null) {
      if (brokers != null && propiedadSeleccionada.idBroker != null) {
        brokerPropiedadSeleccionada = brokers
          .filter((b) => b.id == propiedadSeleccionada.idBroker)
          .pop();
      }

      this.setState({
        propiedadSeleccionada,
        nuevoBroker: "",
        brokerPropiedadSeleccionada,
      });
    }
  };

  toggleModalHorarioVisitas = (e, propiedadSeleccionada) => {    
    this.setState({
      modalHorarioVisitas: !this.state.modalHorarioVisitas,
      propiedadSeleccionada,
    });
  }

  feedback = () => {
    const {
      requestPostTarjetaProp,
      requestUpdateEstadoPropiedad,
      requestPropiedadBroker,
      requestUpdateAgendaCliente,
      errorMessage
    } = this.props;
    if (requestPostTarjetaProp == "LOADING") {
      Swal.fire({
        title: "Cargando",
        text: "Espere unos segundos",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });
    }
    if (requestPostTarjetaProp == "SUCCESS") {
      Swal.fire(
        "Tarjeta propiedad generada",
        "Se ha generado la tarjeta para la propiedad seleccionada",
        "success"
      );
    }
    if (requestPostTarjetaProp == "ERROR") {
      Swal.fire(
        "Error",
        errorMessage,
        "error"
      );
    }
    if (requestUpdateEstadoPropiedad == "ERROR") {
      Swal.fire({
        title: "Cambio estado",
        text: errorMessage,
        icon: "error",
      });
    }
    if (requestPropiedadBroker == "ERROR") {
      Swal.fire({
        title: "Asignar broker",
        text: errorMessage,
        icon: "error",
      });
    }
    if (requestUpdateAgendaCliente == "ERROR") {
      Swal.fire({
        title: "Actualización horario",
        text: errorMessage ? errorMessage : "Ha habido un error actualizando el horario de visitas de la propiedad",
        icon: "error",
      });
    }
    if (requestUpdateEstadoPropiedad == "SUCCESS") {
      Swal.fire({
        title: "Cambio estado",
        text: "Se ha cambiado el estado de la propiedad con éxito",
        icon: "success",
        position: "top",
      }).then((result) => {
        if (result.value || result.dismiss == "backdrop") {
          window.location.reload();
        }
      });
    }
    if (requestPropiedadBroker == "SUCCESS") {
      Swal.fire({
        title: "Asignar broker",
        text: "Se ha asignado el broker a la propiedad con éxito",
        icon: "success",
        position: "top",
      }).then((result) => {
        if (result.value || result.dismiss == "backdrop") {
          window.location.reload();
        }
      });
    }
    if (requestUpdateAgendaCliente == "SUCCESS") {
      Swal.fire({
        title: "Actualización horario",
        text: "Se ha actualizado el horario de visitas de la propiedad con éxito",
        icon: "success",
        position: "top",
      }).then((result) => {
        if (result.value || result.dismiss == "backdrop") {
          window.location.reload();
        }
      });
    }
  };

  showConfirmationDialog = (e, row) => {
    Swal.fire({
      title: "Generar tarjeta propiedad",
      text: "Confirma que desea generar la tarjeta para esta propiedad",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.value) {
        const { postTarjetaProp } = this.props;
        postTarjetaProp(row.id);
      }
    });
  };

  cambiarEstado = () => {
    const {
      propiedadSeleccionada,
      nuevoEstado,
      valorCompraPropiedad,
      suscriptor,
    } = this.state;
    const { updateEstadoPropiedad } = this.props;

    const data = {
      estado: nuevoEstado,
      idSuscripcionDelComprador: suscriptor,
      valorCompraPropiedad: valorCompraPropiedad,
    };

    updateEstadoPropiedad(propiedadSeleccionada.id, data);
  };

  asignarBroker = () => {
    const { propiedadSeleccionada, nuevoBroker } = this.state;
    const { putPropiedadAsignarBroker } = this.props;
    putPropiedadAsignarBroker(propiedadSeleccionada.id, nuevoBroker);
  };

  actualizarHorarioPropiedad = (data) => {
    const { updateAgendaCliente } = this.props;
    updateAgendaCliente(data);
  }

  handleCambioValorCompraPropiedad = (e) => {
    this.setState({
      valorCompraPropiedad: e.target.value,
    });
  };

  handleCambioSuscriptor = (e) => {
    this.setState({
      suscriptor: e.target.value,
    });
  };

  handleCambioEstado = (e) => {
    this.setState({
      nuevoEstado: e.target.value,
    });
  };

  handleCambioBroker = (e) => {
    this.setState({
      nuevoBroker: e.target.value,
    });
  };

  handleCheck = (val) => {
    this.setState({ schedule: val });
  };

  render() {
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 12,
      },
    }))(TableCell);

    const StyledWideTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
        width: 300,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const {
      propiedades,
      requestUpdateEstadoPropiedad,
      clientes,
      requestPropiedadBroker,
    } = this.props;
    let items = [];

    if (propiedades != undefined) {
      propiedades.results.map(function(item) {
        let nombreCliente = "";
        let cliente = null;
        clientes.forEach((c) => {
          if (c.id == item.idCliente) {
            cliente = c;
          }
        });
        if (cliente != undefined) {
          nombreCliente = cliente.nombres + " " + cliente.apellidos;
        }
        items.push({
          id: item.id,
          Cliente: nombreCliente,
          Valor: item.valor,
          Disponible: item.disponibilidad,
          Destacar: item.destacar ? "Si" : "No",
          Exclusiva: item.exclusividad ? "Si" : "No",
          propiedad: item,
          comuna: item.comuna,
          tipoMoneda: item.tipoPrecio,
          direccion: item.direccionReferencial,
          tipoPropiedad: item.tipoPropiedad,
          pisoNumero: item.pisoNumero,
          ap: item.ap,
          disponible: item.disponible,
          planContratado: item.planContratado,
          serviciosAdicionalesContratados: item.serviciosAdicionalesContratados,
          idBroker: item.idBroker,
        });
        return null;
      });
    }

    const { propiedadSeleccionada, brokerPropiedadSeleccionada } = this.state;
    let nombrePlan = "Sin data";
    let valorPlan = "Sin data";
    let serviciosAdicionalesContratados = "";
    let fastPlan = false;
    let fechaContratacion = "Sin data";
    if (
      propiedadSeleccionada != undefined &&
      propiedadSeleccionada.planContratado != undefined
    ) {
      nombrePlan = propiedadSeleccionada.planContratado.nombre;
      valorPlan = `${propiedadSeleccionada.planContratado.precio} UF`;
      if (propiedadSeleccionada.serviciosAdicionalesContratados != undefined) {
        propiedadSeleccionada.serviciosAdicionalesContratados.forEach((s) => {
          if (
            propiedadSeleccionada.serviciosAdicionalesContratados.indexOf(s) ==
            propiedadSeleccionada.serviciosAdicionalesContratados.length - 1
          ) {
            serviciosAdicionalesContratados += `${s.nombre}`;
          } else {
            serviciosAdicionalesContratados += `${s.nombre}, `;
          }
        });
      }
      fastPlan = propiedadSeleccionada.planContratado.fast;
      fechaContratacion =
        propiedadSeleccionada.planContratado.fechaContratacion;
    }
    let user = JSON.parse(localStorage.getItem("user"));

    return (
      <TableContainer component={Paper}>
        {this.feedback()}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Cliente</StyledTableCell>
              <StyledTableCell align="left">Valor</StyledTableCell>
              <StyledTableCell align="left">Comuna</StyledTableCell>
              <StyledTableCell align="left">Direccion</StyledTableCell>
              <StyledTableCell align="left">Tipo</StyledTableCell>
              <StyledTableCell align="left">Estado propiedad</StyledTableCell>
              <StyledTableCell align="left">Estado formulario</StyledTableCell>
              <StyledWideTableCell align="left">Acciones</StyledWideTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => {
              const tipoDireccion =
                row.propiedad.tipoPropiedad === "Departamento"
                  ? "depto" + row.propiedad.ap
                  : "";

              const direccion =
                row.propiedad.nombreCalle == null
                  ? `${row.propiedad.direccionReferencial} ${row.propiedad.numero} ${tipoDireccion}` 
                  : `${row.propiedad.nombreCalle} ${row.propiedad.numero} ${tipoDireccion}`;
              return (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.Cliente}</TableCell>
                  <TableCell align="left">
                    {row.Valor} {row.tipoMoneda}
                  </TableCell>
                  <TableCell align="left">{row.comuna}</TableCell>
                  <TableCell align="left">{direccion}</TableCell>
                  <TableCell align="left">{row.tipoPropiedad}</TableCell>
                  <TableCell style={{ width: 80 }} align="left">
                    {ESTADOS_PROPIEDAD[row.propiedad.estadoPropiedad]}
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="left">
                    {row.propiedad.glosa != undefined ? (
                      <Tooltip
                        title="El formulario esta completo"
                        aria-label="Formulario completado"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Cambiar estado"
                          component="span"
                        >
                          <AssignmentTurnedInIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Faltan datos por completar en el formulario"
                        aria-label="Formulario incompleto"
                      >
                        <IconButton
                          color="secondary"
                          aria-label="Cambiar estado"
                          component="span"
                        >
                          <AssignmentLateIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>

                  <TableCell align="left">
                    <Tooltip title="Editar" aria-label="editar">
                      <Link
                        to={{
                          pathname: `/updatepropiedad/${row.propiedad.id}`,
                          state: {
                            propiedad: row.propiedad,
                          },
                        }}
                      >
                        <IconButton
                          color="primary"
                          aria-label="Editar"
                          component="span"
                        >
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    {user.tipoCuenta !== 10 ? (
                      <Tooltip
                        title="Generar tarjeta propiedad"
                        aria-label="generar tarjeta prop"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Generar tarjeta prop"
                          component="span"
                          onClick={(e) => this.showConfirmationDialog(e, row)}
                        >
                          <ArtTrackIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {user.tipoCuenta !== 10 ? (
                      <Tooltip
                        title="Cambiar estado"
                        aria-label="cambiar estado"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Cambiar estado"
                          component="span"
                          onClick={(e) => this.toggleModalCambioEstado(e, row)}
                        >
                          <Launch />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    <Tooltip title="Ver contrato" aria-label="ver contrato">
                      <IconButton
                        color="primary"
                        aria-label="Ver contrato"
                        component="span"
                        onClick={(e) => this.toggleModalContrato(e, row)}
                      >
                        <DescriptionIcon />
                      </IconButton>
                    </Tooltip>
                    {user.tipoCuenta !== 10 ? (
                      <Tooltip
                        title="Ver broker asignado"
                        aria-label="ver broker asignado"
                      >
                        <IconButton
                          color="primary"
                          aria-label="ver broker asignado"
                          component="span"
                          onClick={(e) =>
                            this.toggleModalAsignacionBroker(e, row)
                          }
                        >
                          {!row.idBroker ? (
                            <Badge badgeContent={"!"} color="secondary">
                              <FaceIcon />
                            </Badge>
                          ) : (
                            <FaceIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    <Tooltip title="Ver o cambiar horario visitas" aria-label="ver contrato">
                      <IconButton
                        color="primary"
                        aria-label="Ver o cambiar horario visitas"
                        component="span"
                        onClick={(e) => this.toggleModalHorarioVisitas(e, row)}
                      >
                        <DirectionsIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>{this.props.tablePagination()}</TableRow>
          </TableFooter>
        </Table>
        <Modal
          fade={false}
          open={this.state.modalCambioEstado}
          toggle={this.toggleModalCambioEstado}
        >
          <ModalHeader>Cambiar estado propiedad</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                Propiedad:{" "}
                {propiedadSeleccionada && propiedadSeleccionada.direccion}
                <br />
                Estado actual de esta propiedad:{" "}
                {propiedadSeleccionada &&
                  propiedadSeleccionada.propiedad &&
                  ESTADOS_PROPIEDAD[
                    propiedadSeleccionada.propiedad.estadoPropiedad
                  ]}
                {propiedadSeleccionada &&
                  propiedadSeleccionada.propiedad &&
                  propiedadSeleccionada.propiedad.estadoPropiedad &&
                  propiedadSeleccionada.propiedad.estadoPropiedad === 5 && (
                    <div>
                      <div className={"info px-3 py-2 text-white"}>
                        Esta propiedad ya ha sido entregada.
                      </div>
                      {propiedadSeleccionada.propiedad
                        .idSuscripcionDelComprador && (
                        <div>
                          Propiedad entregada a{" "}
                          {this.getNombreSuscripcion(
                            propiedadSeleccionada.propiedad
                              .idSuscripcionDelComprador
                          )}
                        </div>
                      )}
                      {propiedadSeleccionada.propiedad
                        .fechaCambioEstadoAPropiedadEntregada && (
                        <div>
                          Fecha cambio estado a propiedad entregada:{" "}
                          {moment(
                            propiedadSeleccionada.propiedad
                              .fechaCambioEstadoAPropiedadEntregada
                          ).format("DD/MM/YYYY")}
                        </div>
                      )}
                      {propiedadSeleccionada.propiedad.valorCompraPropiedad && (
                        <div>
                          Valor de compra propiedad: $
                          {propiedadSeleccionada.propiedad.valorCompraPropiedad}{" "}
                          CLP
                        </div>
                      )}
                    </div>
                  )}
              </Col>
            </Row>
            {propiedadSeleccionada &&
              propiedadSeleccionada.propiedad &&
              propiedadSeleccionada.propiedad.estadoPropiedad !== 5 && (
                <div>
                  <Row className="mb-3 mt-2">
                    <Col>
                      <FormSelect
                        onChange={(e) => this.handleCambioEstado(e)}
                        value={this.state.nuevoEstado}
                      >
                        {this.selectEstadosPropiedad()}
                      </FormSelect>
                    </Col>
                  </Row>
                  {this.state.nuevoEstado == 5 && (
                    <div>
                      <Row className="mb-3 mt-2">
                        <Col>
                          <FormGroup>
                            <label htmlFor="#suscriptor">Suscriptor</label>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="Este campo es requerido"
                            >
                              <FormSelect
                                id="#suscriptor"
                                onChange={(e) => this.handleCambioSuscriptor(e)}
                                value={this.state.suscriptor}
                                className={"mt-0"}
                              >
                                {this.selectSuscriptores()}
                              </FormSelect>
                            </Tooltip>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mb-3 mt-2">
                        <Col>
                          <FormGroup>
                            <label htmlFor="#valor">Precio compra (CLP)</label>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="El precio compra de la propiedad debe contener solo números y ser mayor o igual a cero"
                            >
                              <FormInput
                                id="#valor"
                                onChange={(e) =>
                                  this.handleCambioValorCompraPropiedad(e)
                                }
                                value={this.state.valorCompraPropiedad}
                                className={"mt-0"}
                              />
                            </Tooltip>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  )}
                  <Row>
                    <Col className="text-center">
                      <Button
                        onClick={this.cambiarEstado}
                        disabled={
                          this.state.nuevoEstado == "" ||
                          requestUpdateEstadoPropiedad == "LOADING" ||
                          (this.state.nuevoEstado == 5 &&
                            (isNaN(this.state.valorCompraPropiedad) ||
                              this.state.valorCompraPropiedad <= 0 ||
                              this.state.suscriptor == "" ||
                              this.state.suscriptor === null))
                        }
                      >
                        {requestUpdateEstadoPropiedad == "LOADING"
                          ? "Cargando..."
                          : "Confirmar cambio de estado"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
          </ModalBody>
        </Modal>

        <Modal
          fade={false}
          open={this.state.modalContrato}
          toggle={this.toggleModalContrato}
        >
          <ModalHeader>Detalles contrato</ModalHeader>
          <ModalBody className="p-0">
            <List className="p-0">
              <ListItem className="p-0">
                <ListItemText
                  primary="Plan contratado"
                  secondary={nombrePlan}
                />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography
                  //</li>className={classes.dividerFullWidth}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                />
              </li>
              <ListItem className="p-0">
                <ListItemText
                  disableTypography={false}
                  primary="Servicios adicionales contratados"
                  secondary={serviciosAdicionalesContratados}
                />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography
                  //</li>className={classes.dividerFullWidth}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                />
              </li>
              <ListItem className="p-0">
                <ListItemText
                  primary="Fecha contratacion"
                  secondary={fechaContratacion}
                />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography
                  //</li>className={classes.dividerFullWidth}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                />
              </li>
              <ListItem className="p-0">
                <ListItemText primary="Valor" secondary={valorPlan} />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography
                  //</li>className={classes.dividerFullWidth}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                />
              </li>
              <ListItem className="p-0">
                <ListItemText
                  primary="Fast"
                  secondary={fastPlan ? "Si" : "No"}
                />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography
                  //</li>className={classes.dividerFullWidth}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                />
              </li>
            </List>
          </ModalBody>
        </Modal>

        <Modal
          fade={false}
          open={this.state.modalAsignacionBroker}
          toggle={this.toggleModalAsignacionBroker}
        >
          <ModalHeader>Ver, asignar o cambiar broker</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                Propiedad:{" "}
                {propiedadSeleccionada && propiedadSeleccionada.direccion}
                <br />
                {brokerPropiedadSeleccionada
                  ? `Broker asignado para esta propiedad: ${
                      brokerPropiedadSeleccionada.nombres
                    } ${brokerPropiedadSeleccionada.apellidos}`
                  : "Esta propiedad no tiene un broker asignado"}
              </Col>
            </Row>
            <Row className="mb-3 mt-2">
              <Col>
                <FormSelect
                  onChange={(e) => this.handleCambioBroker(e)}
                  value={this.state.nuevoBroker}
                >
                  {this.selectBrokers()}
                </FormSelect>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button
                  onClick={this.asignarBroker}
                  disabled={
                    this.state.nuevoBroker == "" ||
                    requestPropiedadBroker == "LOADING"
                  }
                >
                  {requestPropiedadBroker == "LOADING"
                    ? "Cargando..."
                    : "Confirmar cambio de broker"}
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Modal
          fade={false}
          open={this.state.modalHorarioVisitas}
          toggle={this.toggleModalHorarioVisitas}
          size="lg"
          
        >
          <ModalHeader>Ver o cambiar horario visitas</ModalHeader>
          <ModalBody className="big-modal-overflow">
            <Row>
              <Col>
                Propiedad:{" "}
                {propiedadSeleccionada && propiedadSeleccionada.direccion}
              </Col>
            </Row>
            <Row className="mb-3 mt-2">
              <Col>
                <Schedule 
                  propiedadId={this.state.propiedadSeleccionada && this.state.propiedadSeleccionada.id}
                  hideButton={false}
                  onCheck={this.handleCheck}
                  clienteId={this.state.propiedadSeleccionada && this.state.propiedadSeleccionada.propiedad && this.state.propiedadSeleccionada.propiedad.idCliente}
                />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    propiedad: state.app.propiedad,
    requestGetPropiedad: state.app.requestGetPropiedad,
    tarjetaProp: state.app.tarjetaProp,
    requestPostTarjetaProp: state.app.requestPostTarjetaProp,
    responseMessage: state.app.responseMessage,
    requestUpdateEstadoPropiedad: state.app.requestUpdateEstadoPropiedad,
    propiedadBroker: state.app.propiedadBroker,
    requestPropiedadBroker: state.app.requestPropiedadBroker,
    suscripciones: state.app.suscripciones,
    requestUpdateAgendaCliente: state.app.requestUpdateAgendaCliente,
    erroMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPropiedad: (datosPropiedad) => dispatch(setPropiedad(datosPropiedad)),
  getPropiedadById: (id) => dispatch(getPropiedadById(id)),
  postTarjetaProp: (id) => dispatch(postTarjetaProp(id)),
  updateEstadoPropiedad: (id, estado) =>
    dispatch(updateEstadoPropiedad(id, estado)),
  putPropiedadAsignarBroker: (idPropiedad, idBroker) =>
    dispatch(putPropiedadAsignarBroker(idPropiedad, idBroker)),
});

TablaPropiedades = connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaPropiedades);

export default TablaPropiedades;
